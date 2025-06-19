# Change Log

## [0.0.8] - 2025-06-19

+ Added support for local configuration files. You can now set the extension's preferences in an `.rcmakerrc.json` file (we recommend placing it next to your project's `package.json`). This lets you maintain different settings for each project without needing to change your global preferences each time.

## [0.0.7] - 2025-06-16

+ Fixed a bug that caused the types.ts file to be created instead of index.ts

## [0.0.6] - 2025-05-27

+ Added a new literal available for use in templates: `${componentBaseFileName}`. This is the name of the component file without the jsx or tsx extension
+ The template of the `index.js` (or `index.ts`) re-export file has been changed, now the component export line in this file is formed based on the name of the component file without the `.jsx` (or .`tsx`) extension
+ The default component template is now editable from the VS Code settings. When creating a component, the default template `_default` will always be at the top of the list and will be selected automatically when pressing Enter in the template selection dialog. The ability to use user templates remains unchanged.
+ Fixed a bug that caused the creation of an index file with the js extension when the "Use TypeScript" setting was active

## [0.0.5] - 2025-05-04

+ Fast fix

## [0.0.4] - 2025-05-04

+ Added favicon
+ Added guidance and tips in settings for replaceable variables in templates

## [0.0.3] - 2025-05-03

+ Added the ability to easily edit templates `index.js`, `component.test.jsx/tsx` and `types.ts`
+ Component templates can be in the formats jsx, tsx, js and ts
+ Added a function to create a barrel file (re-export) in the current folder using a template or to add a re-export to an `index.js` file in the parent folder. In settings, configure whether to create `index.js`, edit the template for adding/creating, and set where the file will be created—in the component folder or the parent directory.
+ Added a new naming style — **snake_case**.

## [0.0.2] - 2025-04-13

+ Only one test template is left. You can create the rest yourself
+ In the template, you can use the literal `${camelCase}` - this is the name of the created component in camelCase style
+ Updated documentation

## [0.0.1] - 2025-04-12

+ Initial version