type GenericObject = { [key: string]: any }; // Rename the custom type to avoid conflict with `Object`

const isObject = (item: any): item is object => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const deepMerge = (target: GenericObject, source: GenericObject, level = 0) => {
  const copyTarget = level === 0 ? structuredClone(target) : target;

  for (const key in source) {
    const sourceValue = source[key];

    if (!isObject(sourceValue)) {
      copyTarget[key] = sourceValue;
    } else {
      if (!isObject(copyTarget[key])) {
        copyTarget[key] = {};
      }
      deepMerge(copyTarget[key], sourceValue, level + 1);
    }
  }
  return copyTarget;
};
