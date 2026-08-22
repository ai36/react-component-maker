# React Component Maker (VS Code Extension)

Quickly generate customizable React components using your own templates.
This extension helps developers create structured and ready-to-use React components with a single right-click.

<br>

## ✨ Features

- Create components from your own templates (to access the `.react-templates` folder, see the instructions below)
- Supports TypeScript or JavaScript
- Auto-generate:
  - Style files (CSS, SCSS, or CSS Modules)
  - Index files (Сan be created in the component folder or added to existing re-exports either in parent directory)
  - Type declaration files
  - Unit tests (in `tests/` subfolder)
- Custom file and folder naming styles, like "camelCase", "PascalCase", "kebab-case", "snake_case", "lowercase"
- Easy configuration in settings

<br>

## 🚀 How to Use

1. **Right-click** on any folder in the Explorer
2. Choose **"Create React Component"**
3. Enter a component name
4. Select a template from your template folder

> 💡 Your templates must be `.jsx`, `.tsx`, `.js` or `.ts` files stored in the `.react-templates` folder inside the extension directory.

<br>

## ⚙️ Configuration

You can customize the behavior in `Settings → Extensions → React Component Maker` or CTRL + , → type "react component maker" for Windows and CMD + , → type "react component maker" for Mac.

### Available options:

- **TypeScript support**: Enable `.tsx` files
- **Folder and file naming styles**: camelCase, PascalCase, kebab-case, snake_case, lowercase (folder style also supports `none`, to skip creating a folder and generate files directly in the folder from which the command was invoked)
- **Style options**:
  - Enable/disable style file generation
  - Set style extension: `css`, `scss`, `module.css`, `module.scss`
- **Test generation**:
  - Enable/disable unit test files
  - Provide a test template
- **Component, index and types templates**: customize exports and interfaces

### Project file settings

The `.rcmakerrc.json` file allows you to save local settings for each project separately. The recommended location for this file is next to the project's `package.json`. Now, when switching between projects, there’s no need to change global settings every time.

Local settings take precedence over global ones. The local settings file doesn’t have to include all settings-if something is missing, global settings will be used instead.

When generating a component structure, the system searches for a local settings file starting from the parent folder and moving up the hierarchy until it reaches the folder that defines the VS Code workspace boundary. If no local settings files are found, global settings are applied.

Here’s an example of a local configuration file:

```json
{
  "useTypeScript": false,
  "defaultTemplate": "import styles from './${componentStyleFileName}';\n\nexport const ${componentName} = () => {\n  return (\n    <>\n      <div className={styles.${camelCase}}>Hello from ${componentName}</div>\n    </>\n  );\n}",
  "folderNameStyle": "kebab-case",
  "fileNameStyle": "PascalCase",
  "createStyleFile": true,
  "styleFileNameStyle": "camelCase",
  "styleExtension": "module.css",
  "generateIndexFile": true,
  "indexTemplate": "export * from './${componentFolderName}/${componentBaseFileName}';\n",
  "indexInComponentFolder": false,
  "generateTypesFile": false,
  "typesTemplate": "export interface ${componentName}Props {\n}\n",
  "generateTestFile": false,
  "testTemplate": "import { render } from '@testing-library/react';\nimport ${componentName} from './${componentFolderName}/${componentFileName}';\n\ndescribe('${componentName}', () => {\n  it('renders correctly', () => {\n    render(<${componentName} />);\n  });\n});"
}
```

<br>

## 📂 Template Folder

Use the command **"Open Component Templates"** from the right-click menu to open your template folder (max 5 files shown). In the editor, right-click on any template shortcut and in the context menu, click **"Reveal in File Explorer"**.

Each template file should use placeholders like:

```js
import styles from "./${componentStyleFileName}";

export const ${componentName} = () => {
  return (
    <div className={styles.${camelCase}}>Hello from ${componentName}</div>
  );
}
```

When creating component templates, you can use special literals. These literals will be automatically replaced with the appropriate values based on the component name and your settings.

### Available Literals

#### 📁 File and Folder Names

| Literal                    | Example              | Description                                                                                       |
|----------------------------|----------------------|---------------------------------------------------------------------------------------------------|
| `${componentName}`         | `NavBar`             | Component name in PascalCase                                                                      |
| `${componentFileName}`     | `NavBar.tsx`         | Component file name with extension (depends on *File Name Style* and *Use Type Script* settings)  |
| `${componentBaseFileName}` | `NavBar`             | Component file name without extension (depends on *File Name Style*)                              |
| `${componentFolderName}`   | `nav-bar`            | Component folder name (depends on *Folder Name Style* setting)                                    |
| `${componentStyleFileName}`| `navBar.module.css`  | Style file name (depends on *Style File Name Style* and *Style Extension* settings)               |
| `${componentIndexFileName}`| `index.ts`           | Index file name (always `index.js`)                                                               |
| `${componentTypesFileName}`| `types.ts`           | Types file name (always `types.ts`)                                                               |
| `${componentTestFileName}` | `NavBar.test.tsx`    | Test file name (depends on *File Name Style* and *Use Type Script* settings)                      |

#### 🔤 Name Formats

| Literal        | Example     | Description                      |
|----------------|-------------|----------------------------------|
| `${pascalCase}`| `NavBar`    | PascalCase (default)             |
| `${camelCase}` | `navBar`    | camelCase                        |
| `${kebabCase}` | `nav-bar`   | kebab-case                       |
| `${snakeCase}` | `nav_bar`   | snake_case                       |
| `${lowerCase}` | `navbar`    | all lowercase letters            |

<br><br><br>




# React Component Maker (расширение для VS Code)

Быстрое создание настраиваемых по шаблонам React-компонентов.
Это расширение помогает разработчикам создавать структуру компонентов с минимальными усилиями — по правому клику мыши.

<br>

## ✨ Возможности

- Создание компонентов на основе ваших шаблонов (как добраться до папки шаблонов `.react-templates` читайте ниже)
- Поддержка JavaScript и TypeScript
- Автоматическая генерация:
  - Файлов стилей (CSS, SCSS, CSS Modules)
  - Index-файлов (index.js может быть создан в папке компонента или в родительской - создан или добавлен к существующим реэкспортам)
  - Типов (`types.ts`)
  - Тестов (в папке `tests`)
- Настройка стилей именования файлов и папок, поддерживаются "camelCase", "PascalCase", "kebab-case", "snake_case", "lowercase"
- Гибкие настройки в интерфейсе VS Code

<br>

## 🚀 Как использовать

1. **Кликните правой кнопкой мыши** по нужной папке
2. Выберите **"Create React Component"**
3. Введите имя компонента
4. Выберите шаблон из своей папки шаблонов

> 💡 Шаблоны — это `.jsx`, `.tsx`, `.js` или `.ts` файлы, хранящиеся в папке `.react-templates` внутри папки расширения.

<br>

## ⚙️ Настройки

Настроить расширение можно в `Настройки → Расширения → React Component Maker` или CTRL + , → введите "react component maker" для Windows или CMD + , → введите "react component maker" для Mac.

### Доступные опции:

- **TypeScript**: включение `.tsx` вместо `.jsx`
- **Стили именования**:
  - Название папок и файлов: camelCase, PascalCase, kebab-case, snake_case, lowercase (для папки также доступен стиль `none` - отдельная папка не создается, файлы компонента создаются прямо в папке, из которой была вызвана команда)
- **Стили компонентов**:
  - Генерация файла стилей (вкл/выкл)
  - Расширения: `css`, `scss`, `module.css`, `module.scss`
- **Генерация тестов**:
  - Вкл/выкл
  - Шаблон теста
- **Шаблоны компонента, index и types файлов**

### Локальная конфигурация

С помощью файла `.rcmakerrc.json` можно сохранить локальные настройки для каждого проекта отдельно. Рекомендуемое расположение файла - рядом с `package.json` проекта. Теперь при переключении между проектами нет необходимости изменять каждый раз глобальные настройки.

Локальные настройки имеют приоритет над глобальными. Файл локальных настроек необязательно должен содержать все настройки. Если в локальном файле чего-то не хватает, будут использованы глобальные настройки.

При создании структуры компонента происходит поиск файла с локальными настройками начиная с папки-родителя выше по иерархии вплоть до папки, которая ограничивает рабочее пространство VS Code. Если файлов с локальными настройками не найдено - используются глобальные.

Вот пример файла локальной конфигурации:

```json
{
  "useTypeScript": false,
  "defaultTemplate": "import styles from './${componentStyleFileName}';\n\nexport const ${componentName} = () => {\n  return (\n    <>\n      <div className={styles.${camelCase}}>Hello from ${componentName}</div>\n    </>\n  );\n}",
  "folderNameStyle": "kebab-case",
  "fileNameStyle": "PascalCase",
  "createStyleFile": true,
  "styleFileNameStyle": "camelCase",
  "styleExtension": "module.css",
  "generateIndexFile": true,
  "indexTemplate": "export * from './${componentFolderName}/${componentBaseFileName}';\n",
  "indexInComponentFolder": false,
  "generateTypesFile": false,
  "typesTemplate": "export interface ${componentName}Props {\n}\n",
  "generateTestFile": false,
  "testTemplate": "import { render } from '@testing-library/react';\nimport ${componentName} from './${componentFolderName}/${componentFileName}';\n\ndescribe('${componentName}', () => {\n  it('renders correctly', () => {\n    render(<${componentName} />);\n  });\n});"
}
```

<br>

## 📂 Папка шаблонов

Команда **"Open Component Templates"** (по правому клику) откроет папку шаблонов (откроется до 5 файлов одновременно). В редакторе, на любом ярлыке шаблона кликните правой кнопкой мыши и в контекстном меню нажмите на пункт **"Reveal in File Explorer"**.

Каждый шаблон может использовать переменные:

```js
import styles from "./${componentStyleFileName}";

export const ${componentName} = () => {
  return (
    <div className={styles.${camelCase}}>Hello from ${componentName}</div>
  );
}
```

При создании шаблонов компонентов можно использовать специальные литералы. Они будут автоматически заменены на соответствующие значения в зависимости от имени компонента и настроек.

### Доступные переменные

#### 📁 Названия файлов и папок

| Литерал                    | Пример                | Описание                                                                                       |
|----------------------------|-----------------------|------------------------------------------------------------------------------------------------|
| `${componentName}`         | `NavBar`              | Название компонента в PascalCase                                                               |
| `${componentFileName}`     | `NavBar.tsx`          | Имя файла компонента с расширением (зависит от настроек - *File Name Style*, *Use Type Script*)|
| `${componentBaseFileName}` | `NavBar`              | Имя файла компонента без расширения (зависит от настройки - *File Name Style*)                 |
| `${componentFolderName}`   | `nav-bar`             | Имя папки компонента (зависит от настройки - *Folder Name Style*)                              |
| `${componentStyleFileName}`| `navBar.module.css`   | Имя файла стилей (зависит от настроек - *Style File Name Style*, *Style Extension*)            |
| `${componentIndexFileName}`| `index.ts`            | Имя index-файла (всегда index.js)                                                              |
| `${componentTypesFileName}`| `types.ts`            | Имя файла с типами (всегда types.ts)                                                           |
| `${componentTestFileName}` | `NavBar.test.tsx`     | Имя тестового файла (зависит от настроек - *File Name Style*, *Use Type Script*)               |

#### 🔤 Форматы имени

| Литерал        | Пример       | Описание                         |
|----------------|--------------|----------------------------------|
| `${pascalCase}`| `NavBar`     | PascalCase (по умолчанию)        |
| `${camelCase}` | `navBar`     | camelCase                        |
| `${kebabCase}` | `nav-bar`    | kebab-case                       |
| `${snakeCase}` | `nav_bar`    | snake_case                       |
| `${lowerCase}` | `navbar`     | все строчные буквы               |
