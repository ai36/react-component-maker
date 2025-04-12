import styles from "./${styleFileName}";

export function ${componentName}() {
    return (
        <>
            <div className="${styles.className}">Hello from ${componentName}</div>;
        </>
    );
}
