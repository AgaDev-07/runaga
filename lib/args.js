module.exports = function args() {
  const argv = process.argv
    .slice(2)
    .join(' ')
    .split('--')
    .map((arg, i) => {
      const [key, ...value] = arg.trim().split(' ');
      if (key === 'init' && i === 0) {
        return ['init', true];
      }
      if (i === 0) {
        return ['file', key];
      }
      return [key, value];
    });

  const args = Object.fromEntries(argv);

  return args;
};
