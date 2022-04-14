import { ENV_PRODUCTION } from './constants.js';

export const isProduction = () => process.env.NODE_ENV === ENV_PRODUCTION;

export const setCustomInterval = (func, delay, leading = false, ...args) => {
  const isLeading = leading === true;
  if (isLeading) {
    func(...args);
  }

  const intervalId = setInterval(func, delay, ...args);

  return intervalId;
};

export const unifyClassNames = (baseClassName, classNameExtension) => {
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

    const classNameBase = className.slice(0, baseLastIndexOf);
    const classNameEnding = className.slice(baseLastIndexOf);

    // const unifiedClassName = `${classNameBase}-${classNameExtension}${classNameEnding}`;
    const unifiedClassName = `${className}-${classNameExtension}`;

    return unifiedClassName;
  };

  const unifiedClassNames = classNames.map(unifyClassName).join(classNameSeparator);

  return unifiedClassNames;
};
