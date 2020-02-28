import React, { useEffect } from 'react';

import Authereum from "authereum";
import Box from "3box";
//import { createLink, validateLink } from "3id-blockchain-utils";

function App() {
  useEffect(() => {
    const fn = async () => {
      const authereum = new Authereum("kovan");
      const provider = authereum.getProvider();
      window.auth = authereum
      window.provider = provider
      console.log('isA', provider.isAuthereum)

      const address = (await provider.enable())[0];

      const box = await Box.openBox(address, provider)
      console.log(box.DID)
      const space = await box.openSpace('demo')
      await space.syncDone

      console.log('linked:', await box.isAddressLinked())
      console.log('links:', await box.listAddressLinks())

      //await space.public.set('some-message', 'hello world')
      console.log('content:', await space.public.get('some-message'))
      window.box = box


      //const did = 'did:3:bafyreiay67567jq5ig4ieu3fqfxfpob5ah3av6wayeik5462earutlehki';
      //console.log('acc', account)
      //const proof = await createLink(did, account, provider);
      //console.log(JSON.stringify(proof));

      //const verified = await validateLink(proof);
      //if (verified) {
        //console.log('Proof is valid', proof);
      //} else {
        //console.log('Proof is invalid');
      //}
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
