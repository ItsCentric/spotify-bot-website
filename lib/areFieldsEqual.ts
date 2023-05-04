export default function areFieldsEqual(
  objectOne: object,
  objectTwo: object,
  fieldsToFilter?: string[]
) {
  const objectOneKeys = !fieldsToFilter
    ? Object.keys(objectOne).toString()
    : Object.keys(objectOne)
        .filter((key) => !fieldsToFilter.includes(key))
        .toString();
  const objectTwoKeys = !fieldsToFilter
    ? Object.keys(objectTwo).toString()
    : Object.keys(objectTwo)
        .filter((key) => !fieldsToFilter.includes(key))
        .toString();

  return objectOneKeys === objectTwoKeys;
}
