export function getUniqueObjects(array: any[], key: string) {
  const unique = new Map();
  array.forEach((obj) => {
    if (!unique.has(obj[key])) {
      unique.set(obj[key], obj);
    }
  });
  return Array.from(unique.values());
}

export function cleanFormObject(form: any) {
  const cleanedForm: any = {};

  Object.keys(form).forEach((key) => {
    const value = form[key as keyof typeof form];
    if (
      value !== undefined &&
      value !== '' &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      cleanedForm[key] = value;
    }
  });

  return cleanedForm;
}
