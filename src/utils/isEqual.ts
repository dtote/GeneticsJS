
export function isEqual(firstItem: any, secondItem: any): boolean {
  if (firstItem === secondItem) {
    return true;
  }
  if (typeof(firstItem) === 'object' && typeof(secondItem) === 'object') {
    for (const property in firstItem) {
      if (firstItem[property] === secondItem[property]) {
        continue;
      } 
      if (firstItem.hasOwnProperty(property) && secondItem.hasOwnProperty(property)) {
        if (!isEqual(firstItem[property], secondItem[property])) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}