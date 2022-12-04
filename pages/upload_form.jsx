
import { useState } from "react";
import Web3Modal from "web3modal";
import {ethers} from 'ethers';
import {addForm, addFormResponse, createFormOnBackend, createIpfs, createFormResponse } from '../adapter/main'

function UploadForm() {
    const [providerConnected, setProviderConnected] = useState(false)
    const [textInput, setInput] = useState(undefined)
    const [cid, setCid] = useState()

    const onConnectClick = async () => {
        if (typeof window === 'undefined' || window.ethereum.selectedAddress === null) {
            setProviderConnected(false)
            const providerOptions = {
                /* See Provider Options Section */
              };
              
              const web3Modal = new Web3Modal({
                cacheProvider: true, // optional
                providerOptions // required
              });
              
              const provider = await web3Modal.connect();
              
              window.provider = provider
             
              setProviderConnected(true)
        }else if (window.ethereum.selectedAddress !== null) {
            setProviderConnected(true)
        }
        
    }

    const onAddFormClick = async () => {
        setInput('Uploading')
        if (window.ipfs === undefined ){
            window.ipfs = await createIpfs()
          }
        const textArea = document.querySelector('textarea')
        const json = JSON.parse(textArea.value)
        const title = json.title
        console.log(window.ethereum.selectedAddress);
        const hash = await addForm(title, window.ethereum.selectedAddress, json)
        await createFormOnBackend(window.ethereum.selectedAddress, hash.path)
        setInput(hash.path)
        setCid(hash.path)
        textArea.value = ''
    }
    const onAddResponseClick = async () => {
        setInput('Uploading')
        if (window.ipfs === undefined ){
            window.ipfs = await createIpfs()
          }
        const textArea = document.querySelector('textarea')
        const json = JSON.parse(textArea.value)
        const title = json.title
        console.log(window.ethereum.selectedAddress);
        const hash = await addFormResponse(title, window.ethereum.selectedAddress, json)
        await createFormResponse(window.ethereum.selectedAddress, hash.path)
        setInput(hash.path)
        textArea.value = ''
    }

    return <div style={{'width': '100vw', 'height': '100vh', paddingTop: '40px', 'display': 'flex', 'flexDirection': 'column'}}>

    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
        <textarea cols={80} rows={20}></textarea>
    </div>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop:'40px'}}>
        <input value={cid} onChange={(v) => {setCid(v)}} placeholder='Form Cid' />
    </div>
    
    {textInput !== undefined ? <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '40px'}}><p>{textInput}</p></div>: <></>}
    {
        providerConnected === false ?
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '40px'}}>
        <button onClick={onConnectClick}>Connect</button>
    </div>
    :
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '40px'}}>
        <button onClick={onAddFormClick}>Create Form</button>
        <button style={{'marginLeft': '4px'}} onClick={onAddResponseClick}>Add Response</button>
    </div>
}

</div>

}

export default UploadForm;