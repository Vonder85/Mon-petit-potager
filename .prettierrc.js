module.exports = {
  printWidth: 120,
  trailingComma: 'all',
  endOfLine: 'auto',
  overrides: [
    {
      files: '*.{js,jsx,ts,tsx,json,css,scss,md}',
      options: {
        singleQuote: true,
      },
    },
  ],
};
