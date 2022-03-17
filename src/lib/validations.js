import { PATTERN_URL } from './patterns.js';
import { LENGTH_MIN_URL, LENGTH_MAX_URL } from './constants.js';

const conductTests = (tests) =>
  tests.every((test) => {
    const successValue = true;

    const result = test();

    const isTestPassed = result === successValue;

    return isTestPassed;
  });

const composeValidation = (validation) => {
  return (...args) => {
    const tests = validation(...args);

    const result = conductTests(tests);

    return result;
  };
};

const isURL = composeValidation((url) => {
  const isLengthValid = () =>
    url.length && url.length >= LENGTH_MIN_URL && url.length < LENGTH_MAX_URL;

  const isPatternValid = () => PATTERN_URL.test(url);

  const tests = [isLengthValid, isPatternValid];

  return tests;
});

export { isURL };
