const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
const { formatName } = require("./utils/formatName");

function activate(context) {
    const TEMPLATE_FOLDER = ".react-templates";

    const getTemplatesPath = () => {
        return path.join(context.extensionPath, TEMPLATE_FOLDER);
    };

    const createComponentCommand = vscode.commands.registerCommand("reactComponentGenerator.createComponent", async (uri) => {
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
            .filter((file) => file.endsWith(".jsx"))
            .map((file) => path.basename(file, ".jsx"));

        if (templates.length === 0) {
            vscode.window.showErrorMessage(`No .jsx templates found in "${TEMPLATE_FOLDER}".`);
            return;
        }

        const selectedTemplate = await vscode.window.showQuickPick(templates, {
            placeHolder: "Select a component template",
        });

        if (!selectedTemplate) return;

        const config = vscode.workspace.getConfiguration("reactComponentGenerator");

        const useTS = config.get("useTypeScript");
        const folderName = formatName(rawComponentName, config.get("folderNameStyle"));
        const fileName = formatName(rawComponentName, config.get("fileNameStyle"));
        const styleName = formatName(rawComponentName, config.get("styleFileNameStyle"));
        const styleExt = config.get("styleExtension") || "module.css";
        const createStyle = config.get("createStyleFile");

        const generateIndex = config.get("generateIndexFile");
        const generateTypes = config.get("generateTypesFile");
        const generateTest = config.get("generateTestFile");

        const indexTemplate = config.get("indexTemplate");
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
            "${styleFileName}": styleFileName, // имя файла стилей с суффиксами
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
            const indexContent = applyTemplate(indexTemplate, replacements);
            fs.writeFileSync(path.join(targetDir, indexFileName), indexContent);
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

    const openTemplatesCommand = vscode.commands.registerCommand("reactComponentGenerator.openTemplateFolder", async () => {
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
            vscode.window.showInformationMessage("No .jsx templates found in .react-templates folder.");
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

function applyTemplate(template, replacements) {
    let result = template;
    for (const [key, value] of Object.entries(replacements)) {
        result = result.split(key).join(value);
    }
    return result;
}

function deactivate() {}

module.exports = {
    activate,
    deactivate,
};
