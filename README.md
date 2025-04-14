# React Component Maker (VS Code Extension)

Quickly generate customizable React components using your own templates.
This extension helps developers create structured and ready-to-use React components with a single right-click.

<br>

## ✨ Features

- Create components from your own templates (`.react-templates` folder)
- Supports TypeScript or JavaScript
- Auto-generate:
  - Style files (CSS, SCSS, or CSS Modules)
  - Index files
  - Type declaration files
  - Unit tests (in `tests/` subfolder)
- Custom file and folder naming styles
- Easy configuration in settings

<br>

## 🚀 How to Use

1. **Right-click** on any folder in the Explorer
2. Choose **"Create React Component"**
3. Enter a component name
4. Select a template from your template folder

> 💡 Your templates must be `.jsx` files stored in the `.react-templates` folder inside the extension directory.

<br>

## ⚙️ Configuration

You can customize the behavior in `Settings → Extensions → React Component Maker` or CTRL + , → type "react component maker" for Windows and CMD + , → type "react component maker" for Mac.

### Available options:

- **TypeScript support**: Enable `.tsx` files
- **Folder and file naming styles**: camelCase, PascalCase, kebab-case, lowercase
- **Style options**:
  - Enable/disable style file generation
  - Set style extension: `css`, `scss`, `module.css`, `module.scss`
- **Test generation**:
  - Enable/disable unit test files
  - Provide a test template
- **Index and types templates**: customize exports and interfaces

<br>

## 📂 Template Folder

Use the command **"Open Component Templates"** from the right-click menu to open your template folder (max 5 files shown). In the editor, right-click on any template shortcut and in the context menu, click **"Reveal in File Explorer"**.

Each template file should use placeholders like:

```js
import styles from "./${styleFileName}";

export function ${componentName}() {
    return (
        <div className={styles.${camelCase}}>
            Hello from ${componentName}
        </div>
    );
}
```

Pay attention to the literals in the template, during generation they will be replaced with the corresponding values:
- `${styleFileName}` with the name of the style file taking into account the suffixes (suffixes are specified in the settings)
- `${componentName}` with the name of the component in the style specified in the settings
- `${camelCase}` with the name of the component in the camelCase style

<br><br><br>




# React Component Maker (расширение для VS Code)

Быстрое создание настраиваемых по шаблонам React-компонентов.
Это расширение помогает разработчикам создавать структуру компонентов с минимальными усилиями — по правому клику мыши.

<br>

## ✨ Возможности

- Создание компонентов на основе ваших шаблонов (`.react-templates`)
- Поддержка JavaScript и TypeScript
- Автоматическая генерация:
  - Файлов стилей (CSS, SCSS, CSS Modules)
  - Index-файлов
  - Типов (`types.ts`)
  - Тестов (в папке `tests`)
- Настройка стилей именования файлов и папок
- Гибкие настройки в интерфейсе VS Code

<br>

## 🚀 Как использовать

1. **Кликните правой кнопкой мыши** по нужной папке
2. Выберите **"Create React Component"**
3. Введите имя компонента
4. Выберите шаблон из своей папки шаблонов

> 💡 Шаблоны — это `.jsx` файлы, хранящиеся в папке `.react-templates` внутри папки расширения.

<br>

## ⚙️ Настройки

Настроить расширение можно в `Настройки → Расширения → React Component Maker` или CTRL + , → введите "react component maker" для Windows или CMD + , → введите "react component maker" для Mac.

### Доступные опции:

- **TypeScript**: включение `.tsx` вместо `.jsx`
- **Стили именования**:
  - Название папок и файлов: camelCase, PascalCase, kebab-case, lowercase
- **Стили компонентов**:
  - Генерация файла стилей (вкл/выкл)
  - Расширения: `css`, `scss`, `module.css`, `module.scss`
- **Генерация тестов**:
  - Вкл/выкл
  - Шаблон теста
- **Шаблоны index и types файлов**

<br>

## 📂 Папка шаблонов

Команда **"Open Component Templates"** (по правому клику) откроет папку шаблонов (откроется до 5 файлов одновременно). В редакторе, на любом ярлыке шаблона кликните правой кнопкой мыши и в контенстном меню нажмите на пункт **"Reveal in File Explorer"**.

Каждый шаблон может использовать переменные:

```js
import styles from "./${styleFileName}";

export function ${componentName}() {
    return (
        <div className={styles.${camelCase}}>
            Hello from ${componentName}
        </div>
    );
}
```

Обратите внимание на литералы в шаблоне, при генерации они будут заменены на соответсвующие значения:
- `${styleFileName}` на имя файла с стилей с учетом суффиксов (суффиксы задаются в настройках)
- `${componentName}` на имя компонента в стиле заданом в настройках
- `${camelCase}` на имя компонента в стиле camelCase
