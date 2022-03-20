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

// TODO: implement
// export const throttle = () => {
// };

// TODO: implement
// export const composeClassName = (parentClassName) => {
//   const parentPointer = '&';
//   const parentSeparator = '-';
//   const childSeparator = '__';
//   const modifierSeparator = '_';
//   const classSeparator = ' ';

//   const isChild = (className) => className.indexOf(parentPointer) !== -1;
//   const hasModifier = (className) =>
//     className.indexOf(modifierSeparator) !== -1;

//   return (elementClassName) => {
//     const classes = elementClassName.split(classSeparator);

//     const aggregatedClasses = classes.map((className) => {
//       let extendedClassName = className;

//       if (isChild(className)) {
//         extendedClassName = className.replace(parentPointer, parentClassName);
//       }
//     });

//     return className;
//   };
// };
