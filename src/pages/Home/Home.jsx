import React, { useState } from 'react';

import { PtashkaList } from './PtashkaList';
import { Ptashka } from '../../lib/entities';
import { Input, Button } from '../../components';

import './styles.scss';

const Home = () => {
  const [ptashkaList, setPtashkaList] = useState([]);

  const [resourceURL, setResourceURL] = useState(
    // 'https://webhook.site/81d016ce-da41-454f-843e-1096abc2fc0b'
    'https://vk.com'
  );

  const addPtashka = (ptashka) => {
    setPtashkaList((list) => [...list, ptashka]);
  };

  const handleResourceURLChange = (event) => {
    setResourceURL(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // VALIDATE THE URL ON SUBMIT

    const ptashka = await Ptashka.send(resourceURL);

    addPtashka(ptashka);
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
            placeholder="https://ok.ru"
            value={resourceURL}
            onChange={handleResourceURLChange}
          />

          <Button className="home-body-form__button">Send Ptashka</Button>
        </form>

        <PtashkaList list={ptashkaList} />
      </main>

      <footer className="home-footer"></footer>
    </div>
  );
};

export default Home;
