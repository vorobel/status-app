export const sortByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export const transformData = (obj) => {
  const array = [];
  for (let key in obj) {
    array.push({ ...obj[key], productName: key })
  }
  return array;
}