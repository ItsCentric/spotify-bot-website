import { Preferences } from '../models/User';

export default function handleInputChange(
  event: any,
  stateObject: { value: any; setValue: Function }
) {
  console.log(stateObject);
  const target = event.target;
  const value = target.type !== 'checkbox' ? target.value : target.checked;
  const splitArray = target.name.split('-');
  const categories = splitArray.slice(0, splitArray.length - 1);
  const id = splitArray[splitArray.length - 1];
  const updatedObject = updateNestedFieldValue(
    stateObject.value,
    `${categories.join('.')}.${id}`,
    value
  );

  stateObject.setValue((previousProgress: Preferences) => ({
    ...previousProgress,
    ...updatedObject,
  }));
}

function updateNestedFieldValue(object: object, fieldPath: string, newValue: any) {
  const fieldPathArray = fieldPath.split('.');
  const nextObject = object[fieldPathArray[0]];
  const refObject = { ...object };
  if (fieldPathArray.length === 1) {
    refObject[fieldPathArray[0]] = newValue;
    return { ...refObject, [fieldPathArray[0]]: newValue };
  }
  refObject[fieldPathArray[0]] = updateNestedFieldValue(
    nextObject,
    fieldPathArray.slice(1).join('.'),
    newValue
  );

  return refObject;
}
