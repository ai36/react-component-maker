# Future plans

- creating an index.js file that includes all components in the parent folder. The logic is as follows: if the settings specify creating an index.js file (or another re-export file), check another setting (not yet implemented) - whether to include the re-export of all components found in subfolders (JSX, TSX, JS, or TS). However, include TSX and TS only if the "Use TypeScript" setting is enabled; otherwise, only include JS and JSX.
An important note: if a subfolder already has its own index.js (or index.ts), use its re-export and do not go deeper into the folder hierarchy. If a component or script is already re-exported in the index.js (or index.ts), do not include it again.
Account for working with default exports if that syntax is used instead of named exports.

