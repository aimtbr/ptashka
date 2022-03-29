import React, { useState } from 'react';

import { ResourceList } from './ResourceList';
import { InputURL, Button, InfoBanner } from '/src/components';
import { RESOURCE_LIST_MAX_LENGTH } from '/src/lib/constants.js';
import { isURL } from '/src/lib/validations.js';

const Body = (props) => {
  const { setWarning } = props;

  const defaultResource = 'https://';
  const initialResource = '';

  const initialResourceList = [];

  // 'https://webhook.site/81d016ce-da41-454f-843e-1096abc2fc0b'
  const [resource, setResource] = useState(initialResource);

  const [resourceList, setResourceList] = useState(initialResourceList);

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
      // setWarning(`Ptashka is already working on "${origin}".`);
      setWarning(`Пташка вже працює над "${resource}".`);

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

  // TODO: implement
  const hideBodyHeading = () => {};

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
    const isResourceDefault = resource === defaultResource;

    if (isResourceDefault) {
      await resetResource();
    }
  };

  return (
    <main className="home-body" role="main">
      <div className="home-body-heading">
        <h2 className="home-body-heading__description">
          Підтримайте Україну, перевіривши російські та білоруські веб-сайти на
          стресостійкість 😉
        </h2>
      </div>

      <InfoBanner />

      <div className="home-body-main-form-container">
        <form
          className="home-body-main-form"
          onSubmit={handleFormSubmit}
          onBlur={handleInputBlur}
        >
          <InputURL
            className="home-body-main-form__input"
            list="home-body-main-form__input"
            // title="For example, 'https://www.gosuslugi.ru'"
            title="Наприклад, 'https://www.gosuslugi.ru'"
            // placeholder="Enter a website link"
            placeholder="Введіть посилання на веб-сайт"
            value={resource}
            onChange={handleResourceChange}
            onFocus={handleInputFocus}
          />

          <datalist id="home-body-main-form__input">
            <option value="https://www.minobrnauki.gov.ru" />
            <option value="https://www.economy.gov.ru" />
            <option value="https://www.ved.gov.ru" />
            <option value="https://www.mid.ru" />
            <option value="https://cdek.ru" />
            <option value="https://www.gosuslugi.ru" />
            <option value="https://ok.ru" />
          </datalist>

          <Button className="home-body-main-form__button" type="submit">
            {/* Send Ptashka */}
            Надіслати Пташку
          </Button>
        </form>
      </div>

      <ResourceList list={resourceList} deleteResource={deleteResource} />
    </main>
  );
};

export default Body;
