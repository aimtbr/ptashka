import React from 'react';

import config from '/config';
import { Anchor } from '/src/components';
import { unifyClassNames } from '/src/lib/helpers.js';

const Footer = (props) => {
  const { baseClassName } = props;
  const { version, social } = config;
  const { telegram, twitter, email } = social;

  const className = `${baseClassName}-footer`;
  const socialClassName = unifyClassNames(className, 'social');

  return (
    <footer className={className}>
      <div className={socialClassName}>
        <div className={unifyClassNames(socialClassName, 'links')}>
          <div className={unifyClassNames(socialClassName, 'links-text')}>
            Слідкуйте за розвитком Пташки 🕊️
          </div>

          <Anchor
            baseClassName={unifyClassNames(socialClassName, 'links')}
            href={telegram}
            target="_blank"
          >
            Telegram
          </Anchor>

          <Anchor
            baseClassName={unifyClassNames(socialClassName, 'links')}
            href={twitter}
            target="_blank"
          >
            Twitter
          </Anchor>
        </div>

        <div className={unifyClassNames(socialClassName, 'email')}>
          <address className={unifyClassNames(socialClassName, 'email-address')}>
            <span className={unifyClassNames(socialClassName, 'email-address-text')}>
              Спілкуйтеся та співпрацюйте з нами за адресою
            </span>

            <Anchor
              baseClassName={unifyClassNames(socialClassName, 'email-address')}
              href={`mailto:${email}`}
              target="_blank"
            >
              {email}
            </Anchor>
          </address>

          <div className={unifyClassNames(className, 'version')}>v{version}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
