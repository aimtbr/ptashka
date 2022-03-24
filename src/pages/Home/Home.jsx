import React, { useState } from 'react';

import { ResourceList } from './ResourceList';
import { Warning } from './Warning';
import { InputURL, Button } from '../../components';
import { RESOURCE_LIST_MAX_LENGTH } from '../../lib/constants.js';
import { isURL } from '../../lib/validations.js';

import './styles.scss';

const Home = () => {
  const defaultResource = 'https://';

  const initialResource = 'https://ok.ru';
  const initialResourceList = [];
  const initialWarning = '';

  // 'https://webhook.site/81d016ce-da41-454f-843e-1096abc2fc0b'
  const [resource, setResource] = useState(initialResource);

  const [resourceList, setResourceList] = useState(initialResourceList);

  const [warning, setWarning] = useState(initialWarning);

  const addResource = async (resource) => {
    const isResourceListFull = resourceList.length === RESOURCE_LIST_MAX_LENGTH;

    if (isResourceListFull) {
      setWarning(
        `Досягнута максимальна кількість веб-сайтів: ${RESOURCE_LIST_MAX_LENGTH}.`
      );

      return;
    }

    if (!isURL(resource)) {
      // setWarning('The provided resource is not a URL.');
      setWarning('Введена адреса не є коректним посиланням на веб-сайт.');

      return;
    }

    const resourceUrl = new URL(resource);

    const { origin, pathname, searchParams } = resourceUrl;

    const isUrlExists = resourceList.some((resource) => {
      const url = new URL(resource);

      const isOriginEqual = url.origin === origin;
      const isPathnameEqual = url.pathname === pathname;

      return isOriginEqual && isPathnameEqual;
    });

    if (isUrlExists) {
      // setWarning(`Ptashka is already working on '${origin}'.`);
      setWarning(`Пташка вже працює над '${resource}'.`);

      return;
    }

    const searchParamsEncoded = new URLSearchParams('');

    searchParams.forEach((value, key) => {
      const valueEncoded = encodeURIComponent(value);
      const keyEncoded = encodeURIComponent(key);

      searchParamsEncoded.append(keyEncoded, valueEncoded);
    });

    resourceUrl.search = `?${searchParamsEncoded}`;

    const resourceUrlHref = resourceUrl.toString();

    setResourceList([resourceUrlHref, ...resourceList]);

    await resetResource();
  };

  const deleteResource = async (resource) => {
    const isResourceExists = resourceList.includes(resource);

    if (isResourceExists) {
      const filteredResourceList = resourceList.filter(
        (oldResource) => oldResource !== resource
      );

      setResourceList(filteredResourceList);
    }
  };

  const resetResource = async () => {
    setResource(initialResource);
  };

  const handleResourceChange = async (event) => {
    const { value } = event.target;

    const httpProtocol = 'http://';
    const httpsProtocol = 'https://';
    const protocols = [httpProtocol, httpsProtocol];

    const isProtocolSupported = protocols.some((protocol) =>
      value.startsWith(protocol)
    );

    if (isProtocolSupported) {
      setResource(value);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // VALIDATE THE URL ON SUBMIT

    await addResource(resource);
  };

  const handleInputFocus = async () => {
    const isResourceUnchanged = resource === initialResource;

    if (isResourceUnchanged) {
      setResource(defaultResource);
    }
  };

  const handleInputBlur = async () => {
    const isDefaultResourceEntered = resource === defaultResource;

    if (isDefaultResourceEntered) {
      await resetResource();
    }
  };

  return (
    <div className="home">
      <Warning message={warning} setMessage={setWarning} />

      <header className="home-header">
        <h1 className="home-header-heading">PTASHKA</h1>
      </header>

      <main className="home-body" role="main">
        <div className="home-body-heading">
          <h2 className="home-body-heading__text">
            Підтримай Україну перевіривши російські та білоруські веб-сайти на
            стресостійкість 😉
          </h2>
        </div>

        <div className="home-body-header">
          <form
            className="home-body-header-form"
            onSubmit={handleFormSubmit}
            onBlur={handleInputBlur}
          >
            <InputURL
              className="home-body-header-form__input"
              list="home-body-header-form__input"
              // title="For example, 'https://www.gosuslugi.ru'"
              title="Наприклад, 'https://www.gosuslugi.ru'"
              // placeholder="Enter a website link"
              placeholder="Введіть посилання на веб-сайт"
              value={resource}
              onChange={handleResourceChange}
              onFocus={handleInputFocus}
            />

            <datalist id="home-body-header-form__input">
              <option value="https://ok.ru" />
              <option value="https://www.gosuslugi.ru" />
            </datalist>

            <Button className="home-body-header-form__button" type="submit">
              {/* Send Ptashka */}
              Надіслати Пташку
            </Button>
          </form>
        </div>

        <ResourceList list={resourceList} deleteResource={deleteResource} />
      </main>

      <footer className="home-footer"></footer>
    </div>
  );
};

export default Home;
