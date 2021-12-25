import Web3 from 'web3'
import Crud from '../contracts/Crud.json'
import detectEthereumProvider from '@metamask/detect-provider';
import { useCallback, createContext, useEffect, useState } from 'react';

export const Web3Context = createContext({});

export const Web3Provider = ({ children }) => {
    const [web3, setWeb3] = useState({});
    const [contract, setContract] = useState({});
    const [accounts, setAccounts] = useState({});
    const [loading, setLoading] = useState(true);

    const getWeb3 = async () => {
        try {
            let provider = await detectEthereumProvider();

            if (provider) {
                await provider.request({ method: "eth_requestAccounts" });

                const web3 = new Web3(window.ethereum);

                setWeb3(web3);

                return web3
            }
        } catch (e) {
            console.log(e)
            alert('You need install Metamask')
        }
    }

    const getContracts = async (web3) => {
        const networkId = await web3.eth.net.getId()
        const deployedNetwork = Crud.networks[networkId]
        const crud = new web3.eth.Contract(
            Crud.abi,
            deployedNetwork && deployedNetwork.address
        );
        setContract(crud)
    }

    const init = useCallback(async () => {
        try {
            const web3 = await getWeb3()
            await getContracts(web3)
            const accounts = await web3.eth.getAccounts()
            setAccounts(accounts)
            setLoading(false)
        } catch (e) {
            console.log('INIT ERROR', e)
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <Web3Context.Provider value={{ web3, contract, accounts }}>
            {loading ? <p>Loading...</p> : children}
        </Web3Context.Provider>
    )
}

