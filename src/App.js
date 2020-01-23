import React, { useEffect } from 'react';

import Authereum from "authereum";
import Web3 from "web3";
import { createLink, validateLink } from "3id-blockchain-utils";

function App() {
  useEffect(() => {
    const fn = async () => {
      const authereum = new Authereum("kovan");
      const provider = authereum.getProvider();
      const web3 = new Web3(provider);
      await web3.currentProvider.enable();

      const did = 'did:3:bafypwg9834gf';
      const account = (await web3.eth.getAccounts())[0];
      const proof = await createLink(did, account, web3.currentProvider);
      console.log(proof);

      const verified = await validateLink(proof);
      if (verified) {
        console.log('Proof is valid', proof);
      } else {
        console.log('Proof is invalid');
      }
    }

    fn();
  }, []);

  return (
    <div className="App">
      Check console
    </div>
  );
}

export default App;
