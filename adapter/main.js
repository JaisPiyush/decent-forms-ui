import axios from 'axios';
import {ethers} from 'ethers'
// import EncryptRsa from 'encrypt-rsa';
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
// import {} from ''

const INFURA_ID = '2IPyhgsHX6zKWqEd36OUzIFQi0X'
const INFURA_SECRET_KEY = 'ab05cbb822ad89c86bf1a7e1d312d824'
const BASE_URL = 'http://localhost:8000'



export function createIpfs() {
    let ipfs
    const auth =
    'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
    try {
      ipfs = create({
        url: "https://ipfs.infura.io:5001/api/v0",
        headers: {
            authorization: auth,
        },
  
      });
    
      return ipfs;
    } catch (error) {
      console.error("IPFS error ", error);
      ipfs = undefined;
    }
}

export async function putJSONOnIpfs(ipfs, data) {
  return await ipfs.add(JSON.stringify(data))
}

export async function getJSONFromIpfs(ipfs, cid) {
  return JSON.parse(await ipfs.get(cid));
}

export async function addForm(title, creator, schema) {
  const _schema = {
    title: title,
    creator: creator,
    schema: schema
  }
  return await putJSONOnIpfs(window.ipfs, _schema);
}

export async function addFormResponse(formCid, recp, schema) {
  const _schema = {
    formCid: formCid,
    recp: recp,
    schema: schema
  }
  return await putJSONOnIpfs(window.ipfs, _schema)
}

export async function createFormOnBackend(creator, cid) {
  const res = await axios.post(`${BASE_URL}/form`, {form_cid: cid, creator: creator})
  console.log(res)
}

export async function createFormResponse(form_cid, part, cid) {
  const res = await axios.post(`${BASE_URL}/response`, {cid: cid, form_cid: form_cid, participant: part})
  return res;
}