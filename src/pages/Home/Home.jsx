import React, { useState } from 'react';

import { ResourceList } from './ResourceList';
import { Warning } from './Warning';
import { Input, Button } from '../../components';

import './styles.scss';

const Home = () => {
  const [resourceList, setResourceList] = useState([]);

  const [resource, setResource] = useState(
    // 'https://webhook.site/81d016ce-da41-454f-843e-1096abc2fc0b'
    'https://vk.com'
  );

  const [warning, setWarning] = useState('');

  const addResource = (resource) => {
    const resourceUrl = new URL(resource);

    const { origin } = resourceUrl;

    const isUrlExists = resourceList.some((resource) => {
      const url = new URL(resource);

      return url.origin === origin;
    });
    if (isUrlExists) {
      setWarning(`Ptashka is already working on '${origin}'.`);

      return;
    }

    setResourceList((list) => [...list, resource]);
  };

  const handleResourceChange = (event) => {
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

    addResource(resource);
  };

  return (
    <div className="home">
      <header className="home-header">
        <h1 className="home-header-heading">
          <span className="home-header-heading__span">P</span>TASHKA
        </h1>
      </header>

      <main className="home-body" role="main">
        <form className="home-body-form" onSubmit={handleFormSubmit}>
          <Input
            className="home-body-form__input"
            type="url"
            placeholder="Website URL address"
            value={resource}
            onChange={handleResourceChange}
          />

          <Button className="home-body-form__button">Send Ptashka</Button>
        </form>

        <Warning message={warning} setMessage={setWarning} />

        <ResourceList list={resourceList} />
      </main>

      <footer className="home-footer"></footer>
    </div>
  );
};

export default Home;
