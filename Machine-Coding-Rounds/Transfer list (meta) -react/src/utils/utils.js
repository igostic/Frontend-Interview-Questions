export const diff = (a, b) => {
  return a.filter((item) => b.indexOf(item) !== -1);
};

export const notChecked = (a, b) => {
  return a.filter((item) => b.indexOf(item) === -1);
};
