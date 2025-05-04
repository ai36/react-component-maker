/**
 * Разбивает имя на слова по различным правилам:
 * - разделяет по символу `-` (kebab-case)
 * - разделяет по переходу от строчных к заглавным буквам (camelCase, PascalCase)
 * - учитывает последовательности цифр
 *
 * @param {string} name - исходная строка
 * @returns {string[]} - массив слов
 */
function splitWords(name) {
    if (name.includes("-")) {
      return name.split("-");
    }
  
    // Разделение по заглавным буквам и числам
    const words = name.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|[0-9]+/g);
    return words ? words : [name];
  }
  
  /**
   * Форматирует строку имени в указанный стиль:
   * - camelCase
   * - PascalCase
   * - kebab-case
   * - lowercase
   * - snake_case
   *
   * @param {string} name - имя для форматирования
   * @param {string} style - стиль форматирования
   * @returns {string} - отформатированное имя
   */
  function formatName(name, style) {
    const words = splitWords(name);
  
    switch (style) {
      case "camelCase":
        return words
          .map((word, index) =>
            index === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join("");
  
      case "PascalCase":
        return words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join("");
  
      case "kebab-case":
        return words.map((word) => word.toLowerCase()).join("-");
  
      case "snake_case":
        return words.map((word) => word.toLowerCase()).join("_");
  
      case "lowercase":
        return words.join("").toLowerCase();
  
      default:
        return name;
    }
  }
  
  // Экспорт функций (CommonJS)
  module.exports = {
    splitWords,
    formatName,
  };
  