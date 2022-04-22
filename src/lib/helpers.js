import { ENV_PRODUCTION } from './constants.js';

const isProduction = () => process.env.NODE_ENV === ENV_PRODUCTION;

const setCustomInterval = (func, delay, leading = false, ...args) => {
  const isLeading = leading === true;
  if (isLeading) {
    func(...args);
  }

  const intervalId = setInterval(func, delay, ...args);

  return intervalId;
};

const unifyClassNames = (baseClassName, classNameExtension) => {
  const classNameSeparator = ' ';
  const elementSeparator = '__';
  const modifierSeparator = '_';

  const classNames = baseClassName
    .split(classNameSeparator)
    .filter((className) => className?.length > 0);

  const unifyClassName = (className) => {
    let baseLastIndexOf = className.length;

    const elementIndexOf = className.indexOf(elementSeparator);
    const modifierIndexOf = className.indexOf(modifierSeparator);

    if (elementIndexOf !== -1) {
      baseLastIndexOf = elementIndexOf;
    } else if (modifierIndexOf !== -1) {
      baseLastIndexOf = modifierIndexOf;
    }

    const unifiedClassName = `${className}-${classNameExtension}`;

    return unifiedClassName;
  };

  const unifiedClassNames = classNames.map(unifyClassName).join(classNameSeparator);

  return unifiedClassNames;
};

const modifyClassNames = (classNames, modifier) => {
  const classNameSeparator = ' ';
  const modifierSeparator = '_';

  const classNamesModified = classNames
    .split(classNameSeparator)
    .map((className) => {
      const classNameModified = `${className}${modifierSeparator}${modifier}`;

      const classNames = [className, classNameModified].join(classNameSeparator);

      return classNames;
    })
    .join(classNameSeparator);

  return classNamesModified;
};

export { isProduction, setCustomInterval, unifyClassNames, modifyClassNames };
