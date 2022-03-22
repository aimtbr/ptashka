import React from 'react';

import { URL_MIN_LENGTH, URL_MAX_LENGTH } from '/src/lib/constants.js';
import { PATTERN_URL } from '/src/lib/patterns.js';
import { Input } from '../Input';

const InputURL = (props) => {
  const {
    minLength = URL_MIN_LENGTH,
    maxLength = URL_MAX_LENGTH,
    pattern = PATTERN_URL.source,
    spellCheck = false,
    ...rest
  } = props;

  const type = 'url';

  return (
    <Input
      type={type}
      {...rest}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
    />
  );
};

export default InputURL;
