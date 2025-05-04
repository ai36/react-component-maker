const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const { formatName } = require("./utils/formatName.js");

/**
 * Основная функция активации расширения
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  const TEMPLATE_FOLDER = ".react-templates";

  /**
   * Получает абсолютный путь к папке с шаблонами компонентов
   * @returns {string}
   */
  const getTemplatesPath = () => path.join(context.extensionPath, TEMPLATE_FOLDER);

  /**
   * Применяет замены в шаблоне
   * @param {string} template - Исходный шаблон
   * @param {Object} replacements - Объект замен
   * @returns {string}
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
   * @param {string} exportLine - Строка экспорта
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

  const createComponentCommand = vscode.commands.registerCommand("reactComponentMaker.createComponent", async (uri) => {
    const rawComponentName = await vscode.window.showInputBox({
      prompt: "Enter component name",
      validateInput: (text) => (text ? null : "Component name cannot be empty"),
    });
    if (!rawComponentName) return;

    const templatesPath = getTemplatesPath();
    if (!fs.existsSync(templatesPath)) {
      vscode.window.showErrorMessage(`Template folder "${TEMPLATE_FOLDER}" not found in extension.`);
      return;
    }

    const templates = fs
      .readdirSync(templatesPath)
      .filter((file) => [".jsx", ".tsx", ".js", ".ts"].includes(path.extname(file)))
      .map((file) => path.basename(file, path.extname(file)));
    if (templates.length === 0) {
      vscode.window.showErrorMessage(`No templates found in "${TEMPLATE_FOLDER}".`);
      return;
    }

    const selectedTemplate = await vscode.window.showQuickPick(templates, {
      placeHolder: "Select a component template",
    });
    if (!selectedTemplate) return;

    const config = vscode.workspace.getConfiguration("reactComponentMaker");

    const useTS = config.get("useTypeScript");
    const folderName = formatName(rawComponentName, config.get("folderNameStyle"));
    const fileName = formatName(rawComponentName, config.get("fileNameStyle"));
    const styleName = formatName(rawComponentName, config.get("styleFileNameStyle"));
    const styleExt = config.get("styleExtension") || "module.css";
    const createStyle = config.get("createStyleFile");

    const generateIndex = config.get("generateIndexFile");
    const indexInComponentFolder = config.get("indexInComponentFolder");
    const indexTemplate = config.get("indexTemplate");

    const generateTypes = config.get("generateTypesFile");
    const generateTest = config.get("generateTestFile");

    const typesTemplate = config.get("typesTemplate");
    const testTemplate = config.get("testTemplate");

    const pascalComponentName = formatName(rawComponentName, "PascalCase");
    const camelComponentName = formatName(rawComponentName, "camelCase");
    const kebabClassName = formatName(rawComponentName, "kebab-case");
    const styleFileName = `${styleName}.${styleExt}`;
    const componentFileName = `${fileName}.${useTS ? "tsx" : "jsx"}`;
    const indexFileName = `index.${useTS ? "ts" : "js"}`;

    const replacements = {
      "${componentName}": pascalComponentName,
      "${className}": kebabClassName,
      "${styleFileName}": styleFileName,
      "${fileName}": fileName,
      "${camelCase}": camelComponentName,
    };

    const templatePath = path.join(templatesPath, `${selectedTemplate}.jsx`);
    let componentTemplate = "";
    try {
      componentTemplate = fs.readFileSync(templatePath, "utf8");
    } catch (err) {
      vscode.window.showErrorMessage(`Template file "${selectedTemplate}.jsx" not found.`);
      return;
    }

    const componentContent = applyTemplate(componentTemplate, replacements);
    const targetDir = path.join(uri.fsPath, folderName);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }

    fs.writeFileSync(path.join(targetDir, componentFileName), componentContent);

    if (createStyle) {
      fs.writeFileSync(path.join(targetDir, styleFileName), `/* Styles for ${pascalComponentName} */\n`);
    }

    if (generateIndex) {
      const indexTargetPath = indexInComponentFolder
        ? path.join(targetDir, indexFileName)
        : path.join(uri.fsPath, indexFileName);

      const exportLine = applyTemplate(indexTemplate, replacements).trim();

      if (!fs.existsSync(indexTargetPath)) {
        fs.writeFileSync(indexTargetPath, exportLine + "\n");
      } else {
        appendExportIfNotExists(indexTargetPath, exportLine);
      }
    }

    if (generateTypes) {
      const typesContent = applyTemplate(typesTemplate, replacements);
      fs.writeFileSync(path.join(targetDir, "types.ts"), typesContent);
    }

    if (generateTest) {
      const testFileName = `${fileName}.test.${useTS ? "tsx" : "jsx"}`;
      const testsDir = path.join(targetDir, "tests");
      if (!fs.existsSync(testsDir)) {
        fs.mkdirSync(testsDir);
      }

      const testContent = applyTemplate(testTemplate, replacements);
      fs.writeFileSync(path.join(testsDir, testFileName), testContent);
    }

    vscode.window.showInformationMessage(`Component ${pascalComponentName} created successfully!`);
  });

  const openTemplatesCommand = vscode.commands.registerCommand("reactComponentMaker.openTemplateFolder", async () => {
    const templatesPath = getTemplatesPath();
    if (!fs.existsSync(templatesPath)) {
      vscode.window.showErrorMessage(`Template folder "${TEMPLATE_FOLDER}" not found in extension.`);
      return;
    }

    const files = fs.readdirSync(templatesPath).filter((file) => file.endsWith(".jsx")).slice(0, 5);
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
