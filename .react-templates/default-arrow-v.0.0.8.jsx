import styles from "./${componentStyleFileName}";

export const ${componentName} = () => {
  return (
    <div className={styles.${camelCase}}>Hello from ${componentName}</div>
  );
}
