const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const { formatName } = require("./utils/formatName.js");

/**
 * Основная функция активации расширения
 * @param {vscode.ExtensionContext} context - Контекст расширения VS Code
 */
function activate(context) {
  const TEMPLATE_FOLDER = ".react-templates";

  // ====================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ======================
  /**
   * Получает абсолютный путь к папке с шаблонами компонентов
   * @returns {string} Абсолютный путь к папке шаблонов
   */
  const getTemplatesPath = () => path.join(context.extensionPath, TEMPLATE_FOLDER);

  /**
   * Применяет замены в шаблоне (заменяет литералы на реальные значения)
   * @param {string} template - Исходный текст шаблона
   * @param {Object} replacements - Объект с заменами (ключ - литерал, значение - замена)
   * @returns {string} Шаблон с примененными заменами
   */
  const applyTemplate = (template, replacements) => {
    let result = template;
    for (const [key, value] of Object.entries(replacements)) {
      result = result.split(key).join(value);
    }
    return result;
  };

  /**
   * Добавляет экспорт в index-файл, если его еще нет
   * @param {string} indexPath - Путь к index-файлу
   * @param {string} exportLine - Строка экспорта для добавления
   */
  const appendExportIfNotExists = (indexPath, exportLine) => {
    let content = "";
    if (fs.existsSync(indexPath)) {
      content = fs.readFileSync(indexPath, "utf8");
      if (content.includes(exportLine.trim())) return; // экспорт уже есть
    }
    content += exportLine + "\n";
    fs.writeFileSync(indexPath, content, "utf8");
  };

  // ====================== КОМАНДЫ РАСШИРЕНИЯ ======================
  /**
   * Команда для создания нового React-компонента
   * @param {vscode.Uri} uri - URI папки, в которой создается компонент
   */
  const createComponentCommand = vscode.commands.registerCommand("reactComponentMaker.createComponent", async (uri) => {
    // 1. Получение имени компонента от пользователя
    const rawComponentName = await vscode.window.showInputBox({
      prompt: "Enter component name",
      validateInput: (text) => (text ? null : "Component name cannot be empty"),
    });
    if (!rawComponentName) return;

    // 2. Проверка наличия папки с шаблонами
    const templatesPath = getTemplatesPath();
    if (!fs.existsSync(templatesPath)) {
      vscode.window.showErrorMessage(`Template folder "${TEMPLATE_FOLDER}" not found in extension.`);
      return;
    }

    // 3. Получение списка доступных шаблонов
    const templates = fs
      .readdirSync(templatesPath)
      .filter((file) => [".jsx", ".tsx", ".js", ".ts"].includes(path.extname(file)))
      .map((file) => path.basename(file, path.extname(file)));

    if (templates.length === 0) {
      vscode.window.showErrorMessage(`No templates found in "${TEMPLATE_FOLDER}".`);
      return;
    }

    // 4. Получение настроек из конфигурации VS Code
    const config = vscode.workspace.getConfiguration("reactComponentMaker");

    /**
     * @description Добавление фейкового шаблона `_default` в начало списка
     * Если пользователь выберет его — будет использован шаблон из настроек (defaultTemplate)
     */
    const defaultTemplateString = config.get("defaultTemplate"); // содержимое шаблона по умолчанию
    const quickPickItems = ["_default", ...templates];

    const selectedTemplateChoice = await vscode.window.showQuickPick(quickPickItems, {
      placeHolder: "Select a component template",
    });
    if (!selectedTemplateChoice) return;

    // Настройки файлов
    const useTS = config.get("useTypeScript");
    const folderName = formatName(rawComponentName, config.get("folderNameStyle"));
    const fileName = formatName(rawComponentName, config.get("fileNameStyle"));
    const styleName = formatName(rawComponentName, config.get("styleFileNameStyle"));
    const styleExt = config.get("styleExtension") || "module.css";
    const createStyle = config.get("createStyleFile");

    // Настройки index-файла
    const generateIndex = config.get("generateIndexFile");
    const indexInComponentFolder = config.get("indexInComponentFolder");
    const indexTemplate = config.get("indexTemplate");

    // Настройки дополнительных файлов
    const generateTypes = config.get("generateTypesFile");
    const generateTest = config.get("generateTestFile");
    const typesTemplate = config.get("typesTemplate");
    const testTemplate = config.get("testTemplate");

    // Подготовка данных для замены в шаблонах
    const pascalComponentName = formatName(rawComponentName, "PascalCase");
    const camelComponentName = formatName(rawComponentName, "camelCase");
    const kebabClassName = formatName(rawComponentName, "kebab-case");
    const snakeCaseName = formatName(rawComponentName, "snake_case");
    const lowerCaseName = formatName(rawComponentName, "lowercase");
    const styleFileName = `${styleName}.${styleExt}`;
    const componentFileName = `${fileName}.${useTS ? "tsx" : "jsx"}`;
    const componentBaseFileName = `${fileName}`;
    const indexFileName = `index.${useTS ? "ts" : "js"}`;
    const typesFileName = "types.ts";
    const testFileName = `${fileName}.test.${useTS ? "tsx" : "jsx"}`;

    const replacements = {
      "${componentName}": pascalComponentName,
      "${className}": kebabClassName,
      "${styleFileName}": styleFileName,
      "${fileName}": fileName,
      "${camelCase}": camelComponentName,
      "${componentFileName}": componentFileName,
      "${componentBaseFileName}": componentBaseFileName,
      "${componentFolderName}": folderName,
      "${componentStyleFileName}": styleFileName,
      "${componentIndexFileName}": indexFileName,
      "${componentTypesFileName}": typesFileName,
      "${componentTestFileName}": testFileName,
      "${pascalCase}": pascalComponentName,
      "${kebabCase}": kebabClassName,
      "${snakeCase}": snakeCaseName,
      "${lowerCase}": lowerCaseName,
    };

    let componentTemplate = "";

    /**
     * @description Выбор содержимого шаблона:
     * - Если выбран `_default`, используется строка из настроек (defaultTemplate)
     * - Иначе — читается файл шаблона из папки
     */
    if (selectedTemplateChoice === "_default") {
      componentTemplate = defaultTemplateString;
      if (!componentTemplate) {
        vscode.window.showErrorMessage(`Default template is not configured in settings.`);
        return;
      }
    } else {
      const templatePath = path.join(templatesPath, `${selectedTemplateChoice}.jsx`);
      try {
        componentTemplate = fs.readFileSync(templatePath, "utf8");
      } catch (err) {
        vscode.window.showErrorMessage(`Template file "${selectedTemplateChoice}.jsx" not found.`);
        return;
      }
    }

    const componentContent = applyTemplate(componentTemplate, replacements);
    const targetDir = path.join(uri.fsPath, folderName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    // Создание основного файла компонента
    fs.writeFileSync(path.join(targetDir, componentFileName), componentContent);

    // Создание файла стилей (если нужно)
    if (createStyle) {
      fs.writeFileSync(path.join(targetDir, styleFileName), `/* Styles for ${pascalComponentName} */\n`);
    }

    // Создание index-файла (если нужно)
    if (generateIndex) {
      const indexTargetPath = indexInComponentFolder ? path.join(targetDir, indexFileName) : path.join(uri.fsPath, indexFileName);
      const exportLine = applyTemplate(indexTemplate, replacements).trim();
      if (!fs.existsSync(indexTargetPath)) {
        fs.writeFileSync(indexTargetPath, exportLine + "\n");
      } else {
        appendExportIfNotExists(indexTargetPath, exportLine);
      }
    }

    // Создание файла типов (если нужно)
    if (generateTypes) {
      const typesContent = applyTemplate(typesTemplate, replacements);
      fs.writeFileSync(path.join(targetDir, "types.ts"), typesContent);
    }

    // Создание тестового файла (если нужно)
    if (generateTest) {
      const testsDir = path.join(targetDir, "tests");
      if (!fs.existsSync(testsDir)) {
        fs.mkdirSync(testsDir);
      }
      const testContent = applyTemplate(testTemplate, replacements);
      fs.writeFileSync(path.join(testsDir, testFileName), testContent);
    }

    vscode.window.showInformationMessage(`Component ${pascalComponentName} created successfully!`);
  });

  /**
   * Команда для открытия папки с шаблонами
   */
  const openTemplatesCommand = vscode.commands.registerCommand("reactComponentMaker.openTemplateFolder", async () => {
    const templatesPath = getTemplatesPath();
    if (!fs.existsSync(templatesPath)) {
      vscode.window.showErrorMessage(`Template folder "${TEMPLATE_FOLDER}" not found in extension.`);
      return;
    }

    const files = fs
      .readdirSync(templatesPath)
      .filter((file) => file.endsWith(".jsx"))
      .slice(0, 5);
    if (files.length === 0) {
      vscode.window.showInformationMessage("No .jsx templates found.");
      return;
    }

    for (const file of files) {
      const filePath = path.join(templatesPath, file);
      const uri = vscode.Uri.file(filePath);
      await vscode.window.showTextDocument(uri, { preview: false, preserveFocus: true });
    }
  });

  // Регистрация команд расширения
  context.subscriptions.push(createComponentCommand, openTemplatesCommand);
}

/**
 * Функция деактивации расширения
 */
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
