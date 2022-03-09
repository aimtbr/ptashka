import React, { useState } from 'react';

import { checkResource } from '../../lib/scripts';

import './styles.scss';

const Home = () => {
  const [resourceAddress, setResourceAddress] = useState('');

  const handleResourceAddressChange = (event) => {
    setResourceAddress(event.target.value);
  };

  const sendPtashka = (event) => {
    event.preventDefault();

    checkResource(resourceAddress);
  };

  return (
    <div className="home">
      <form onSubmit={sendPtashka}>
        <input
          type="url"
          placeholder="https://ok.ru"
          onChange={handleResourceAddressChange}
        />

        <button>Send Ptashka</button>
      </form>
    </div>
  );
};

export default Home;
