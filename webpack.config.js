const path = require('path');

module.exports = {
  entry: '/src/js/main.js', // какой файл собираем
  output: { // куда поместим
    path: path.resolve(__dirname, 'build'), // путь
    filename: 'main.js', // какое будет имя бандла
  },
};