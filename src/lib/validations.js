import { PATTERN_URL } from './patterns.js';
import { URL_MIN_LENGTH, URL_MAX_LENGTH } from './constants.js';

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
    url.length && url.length >= URL_MIN_LENGTH && url.length < URL_MAX_LENGTH;

  const isPatternValid = () => PATTERN_URL.test(url);

  const tests = [isLengthValid, isPatternValid];

  return tests;
});

export { isURL };
