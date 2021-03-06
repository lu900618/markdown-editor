export const flattenArray = (array) => {
  return array.reduce((map, item) => {
    map[item.id] = item;
    return map;
  }, {});
};

export const obj2Arr = (obj) => {
  return Object.keys(obj).map((key) => obj[key]);
};
