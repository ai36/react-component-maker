# React Component Generator (VS Code Extension)

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

You can customize the behavior in `Settings → Extensions → React Component Generator`.

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

Use the command **"Open Component Templates"** from the right-click menu to open your template folder (max 5 files shown).

Each template file should use placeholders like:

```js
import React from 'react';
import './${styleFileName}';

const ${componentName} = () => {
  return <div className="${className}">${componentName}</div>;
};

export default ${componentName};
```

<br>

## Change Log

v.0.0.1

+ Initial version

<br><br><br>





# React Component Generator (расширение для VS Code)

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

Настроить расширение можно в `Настройки → Расширения → React Component Generator`.

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

Команда **"Open Component Templates"** (по правому клику) откроет папку шаблонов (откроется до 5 файлов одновременно).

Каждый шаблон может использовать переменные:

```js
import React from 'react';
import './${styleFileName}';

const ${componentName} = () => {
  return <div className="${className}">${componentName}</div>;
};

export default ${componentName};
```

<br>

## История версий

v.0.0.1

+ Статовая версия