function splitWords(name) {
    // Преобразуем main-content -> ['main', 'content']
    // Преобразуем mainContent -> ['main', 'Content']
    // Преобразуем MainContent -> ['Main', 'Content']
    // Преобразуем maincontent -> ['maincontent']
    if (name.includes('-')) {
      return name.split('-');
    }
  
    // Разделение по заглавным буквам (оставляя их в слове)
    const words = name.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])|[0-9]+/g);
    return words ? words : [name];
  }
  
  function formatName(name, style) {
    const words = splitWords(name);
  
    switch (style) {
      case 'camelCase':
        return words
          .map((word, index) =>
            index === 0
              ? word.toLowerCase()
              : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join('');
  
      case 'PascalCase':
        return words
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join('');
  
      case 'kebab-case':
        return words.map(word => word.toLowerCase()).join('-');
  
      case 'lowercase':
        return words.join('').toLowerCase();
  
      default:
        return name;
    }
  }
  
  module.exports = { formatName };
  