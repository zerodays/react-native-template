const colors = require('tailwindcss/colors');
// We delete the deprecated colors to avoid warnings
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

const theme = {
  ...colors,
  primary: colors.sky,
};

module.exports = theme;
