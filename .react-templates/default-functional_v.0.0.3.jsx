import styles from "./${styleFileName}";

export const ${componentName} = () => {
    return (
        <>
            <div className={styles.${camelCase}}>Hello from ${componentName}</div>;
        </>
    );
}
