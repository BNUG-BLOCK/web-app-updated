import detectEthereumProvider from '@metamask/detect-provider';
import { BscConnector } from '@binance-chain/bsc-connector'
const Web3 = require('web3');
import WalletConnectProvider from "@walletconnect/web3-provider";


export const MetamaskConnectProvider = async()=>{

    const provider = await detectEthereumProvider();
    if (provider) {

        const acc= await provider.request({
            method: 'eth_requestAccounts'
        });
        const chainId = await provider.request({
          method: 'eth_chainId'
        });
    
        const web3=new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        let bal;
        await web3.eth.getBalance(accounts[0]).then((result)=>{
            bal = web3.utils.fromWei(result,'ether');
        });
        
        return [accounts[0],bal,parseInt(chainId),provider,web3];

    } else {
       
        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error('Please install MetaMask!');
        return [null,null,null,null,null];


      }

}


export const BSCConnectProvider = async()=>{
    try
    {
        const bsc = new BscConnector({
            supportedChainIds: [56, 97] // later on 1 ethereum mainnet and 3 ethereum ropsten will be supported
          })
    
        const response =  await bsc.activate();
        console.log(response);
        if (response.provider) {
            const chainId = await bsc.getChainId();
            
            const web3=new Web3(response.provider);
    
            const accounts= await web3.eth.getAccounts();
    
            let bal;
            await web3.eth.getBalance(accounts[0]).then((result)=>{
                bal = web3.utils.fromWei(result,'ether');
            });
            
            return [accounts[0],bal,parseInt(chainId),response.provider,web3];
    
        } else {
           
            // if the provider is not detected, detectEthereumProvider resolves to null
            console.error('Please install MetaMask!');
            return [null,null,null,null,null];
    
    
          }
    }
    catch(error)
    {
        console.log("Error occured "+error);
        return [null,null,null,null,null];
    }

    

}


export const WalletConnectProviderFunc = async()=>{
    try
    {
        const provider = new WalletConnectProvider({
            rpc: {
                1:process.env.ethMainnet,
              56: process.env.bscMainnetWalletNode,
              97: process.env.bscTestnetWalletNode,
              4:process.env.rinkebyETH,
              3:process.env.ropstenETH
              // ...
            },
          });
    
          await provider.enable();
          const web3=new Web3(provider);
            
          const chainId= await web3.eth.getChainId();
          console.log(provider);
          const accounts= await web3.eth.getAccounts();

          let bal;
                  await web3.eth.getBalance(accounts[0]).then((result)=>{
                      bal = web3.utils.fromWei(result,'ether');
                  });

            return [accounts[0],bal,parseInt(chainId),provider,web3];
    //     if (response.provider) {
    //        
    //         const web3=new Web3(response.provider);
    
    //     
    
    //         let bal;
    //         await web3.eth.getBalance(accounts[0]).then((result)=>{
    //             bal = web3.utils.fromWei(result,'ether');
    //         });
            

    
    //     } else {
           
    //         // if the provider is not detected, detectEthereumProvider resolves to null
    //         console.error('Please install MetaMask!');
    //         return [null,null,null,null,null];
    
    
    //       }
    // }
    }
    catch(error)
    {
        console.log("Error occured "+error);
        return [null,null,null,null,null];
    }

    

}

