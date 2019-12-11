export default function filterProperty(obj) {
  let newObj = new Object();
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
