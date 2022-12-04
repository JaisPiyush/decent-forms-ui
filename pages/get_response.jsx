
import { useState } from "react";
import Web3Modal from "web3modal";
import * as dfd from "danfojs"

function GetResponse() {
    const [providerConnected, setProviderConnected] = useState(false)
    const onConnectClick = async () => {
        if (providerConnected === false) {
            const providerOptions = {
                /* See Provider Options Section */
              };
              
              const web3Modal = new Web3Modal({
                network: "mainnet", // optional
                cacheProvider: true, // optional
                providerOptions // required
              });
              
              const provider = await web3Modal.connect();
              window.provider = provider
        }else {

        }
    }

    return <div style={{'width': '100vw', 'height': '100vh', paddingTop: '40px', 'display': 'flex', 'flexDirection': 'column'}}>

    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '40px'}}>
        <button onClick={onConnectClick}>Connect</button>
    </div>

</div>

}

export default GetResponse;