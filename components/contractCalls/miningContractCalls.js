const Web3=require('web3');
const web3= new Web3(process.env.bscTestnet);
import {abi,address} from '../contracts/miningProtocol';


export const priceOracleFunc=async(_bnugAmount,_BscNode)=>{
    try
    {
        const web3 = new Web3(_BscNode);
        const inWei = web3.utils.toWei(_bnugAmount,'ether');
        const contract = await new web3.eth.Contract(abi,address);
        let value=null;
        await contract.methods.priceOracle(inWei).call((err,result)=>{
        if(!err)
            {
            //    console.log("Bnug priceOracle(_bnugAmount) Function  Result : "+result);
               value=web3.utils.fromWei(result,'ether');
           }
        else
           {
               console.log("Auction Contract Read Function bidTimeRemaining Error :" + err);
           }
        });//createNftContract


        return value;

    }
    catch(e)
    {
        console.log("Some Error Occured: "+ e);
        return null;
    }
  
}


export const totalStakedFunc=async(_BscNode)=>{
    try
    {
        const web3 = new Web3(_BscNode);
        const contract = await new web3.eth.Contract(abi,address);
        let value=null;
        await contract.methods.totalStaked().call((err,result)=>{
        if(!err)
            {
            //    console.log("Bnug priceOracle(_bnugAmount) Function  Result : "+result);
               value=web3.utils.fromWei(result,'ether');
           }
        else
           {
               console.log("Auction Contract Read Function total Staked Error :" + err);
           }
        });//createNftContract


        return value;

    }
    catch(e)
    {
        console.log("Some Error Occured: "+ e);
        return null;
    }
  
}


export const getUserLPAmountFunc=async(_address,_BscNode)=>{
    try
    {
        const web3 = new Web3(_BscNode);
        const contract = await new web3.eth.Contract(abi,address);
        let value=null;
        await contract.methods.getUserLPAmount(_address).call((err,result)=>{
        if(!err)
            {
            //    console.log("Bnug priceOracle(_bnugAmount) Function  Result : "+result);
                value=web3.utils.fromWei(result,'ether');
           }
        else
           {
               console.log("Auction Contract Read Function bidTimeRemaining Error :" + err);
           }
        });//createNftContract

        return value;

    }
    catch(e)
    {
        console.log("Some Error Occured: "+ e);
        return null;
    }
  
}

export const getUserStakeAmountFunc=async(_address,_BscNode)=>{
    try
    {
        const web3 = new Web3(_BscNode);
        const contract = await new web3.eth.Contract(abi,address);
        let value=null;
        await contract.methods.getUserStakeAmount(_address).call((err,result)=>{
        if(!err)
            {
            //    console.log("Bnug priceOracle(_bnugAmount) Function  Result : "+result);
                value=web3.utils.fromWei(result,'ether');
           }
        else
           {
               console.log("Auction Contract Read Function bidTimeRemaining Error :" + err);
           }
        });//createNftContract

        return value;

    }
    catch(e)
    {
        console.log("Some Error Occured: "+ e);
        return null;
    }
  
}



export const getTotalLPAmountFunc=async(_BscNode)=>{
    try
    {
        const web3 = new Web3(_BscNode);
        const contract = await new web3.eth.Contract(abi,address);
        let value=null;
        await contract.methods.getTotalLPAmount().call((err,result)=>{
        if(!err)
            {
            //    console.log("Bnug priceOracle(_bnugAmount) Function  Result : "+result);
                value=web3.utils.fromWei(result,'ether');
           }
        else
           {
               console.log("Auction Contract Read Function bidTimeRemaining Error :" + err);
           }
        });//createNftContract

        return value;

    }
    catch(e)
    {
        console.log("Some Error Occured: "+ e);
        return null;
    }
  
}




export const getUserClaimableRewardsFunc=async(_address,_BscNode)=>{
    try
    {
        const web3 = new Web3(_BscNode);
        const contract = await new web3.eth.Contract(abi,address);
        let value=null;
        await contract.methods.getUserClaimableRewards(_address).call((err,result)=>{
        if(!err)
            {
            //    console.log("Bnug priceOracle(_bnugAmount) Function  Result : "+result);
                value=[web3.utils.fromWei(result.fromLP,'ether'),web3.utils.fromWei(result.fromStaking,'ether'),web3.utils.fromWei(result.total,'ether')]
          
           }
        else
           {
               console.log("Auction Contract Read Function bidTimeRemaining Error :" + err);
           }
        });//createNftContract

        return value;

    }
    catch(e)
    {
        console.log("Some Error Occured: "+ e);
        return null;
    }
  
}


export const addLiquidityFunc=async(_BNUGAmount,_eqBNB,_web3)=>{
    
    try
     {
  
         if(_web3)
         {
              const bnugContract = new _web3.eth.Contract(abi,address);
              let transactionHash=null;
              const inWeiBnug = _web3.utils.toWei(_BNUGAmount,"ether");
              const inWeiBNB = _web3.utils.toWei(_eqBNB,"ether");
              const account = await _web3.eth.getAccounts();
              await bnugContract.methods.addLiquidity(inWeiBnug).send({from:account[0],value:inWeiBNB},(err,txHash)=>{
              if(!err)
                 {
                  console.log("Mining Contract addLiquidity Transaction Hash : "+txHash);
                  transactionHash=txHash;      
                 }
              else
                 {
                 console.log("Error Occured while using addLiquidity Function  " + err);
                 }
              });                 
              console.log("Returning TxHash!! "+transactionHash);
              return transactionHash;
  
         }//if
         else
         {
             console.log("Response recieved is null in function");
             return null;
         }//else
         
     }   
     catch(e)
     {
         console.log("There has been an error"+e);
         return null;
     } 
  
  }
  
export const removeLiquidityFunc=async(_lpAmount,_web3)=>{
    
    try
     {
  
         if(_web3)
         {
              const bnugContract = new _web3.eth.Contract(abi,address);
              let transactionHash=null;
              const inWeilpAmount = _web3.utils.toWei(_lpAmount,"ether");
              const account = await _web3.eth.getAccounts();
              await bnugContract.methods.removeLiquidity(inWeilpAmount).send({from:account[0]},(err,txHash)=>{
              if(!err)
                 {
                  console.log("Mining Contract removeLiquidity Transaction Hash : "+txHash);
                  transactionHash=txHash;      
                 }
              else
                 {
                 console.log("Error Occured while using removeLiquidity Function  " + err);
                 }
              });                 
              console.log("Returning TxHash!! "+transactionHash);
              return transactionHash;
  
         }//if
         else
         {
             console.log("Response recieved is null in function");
             return null;
         }//else
         
     }   
     catch(e)
     {
         console.log("There has been an error"+e);
         return null;
     } 
  
  }
  

  export const claimFunc=async(_web3)=>{
    
    try
     {
  
         if(_web3)
         {
              const bnugContract = new _web3.eth.Contract(abi,address);
              let transactionHash=null;
              const account = await _web3.eth.getAccounts();
              await bnugContract.methods.claim().send({from:account[0]},(err,txHash)=>{
              if(!err)
                 {
                  console.log("Mining Contract  claim Function Transaction Hash : "+txHash);
                  transactionHash=txHash;      
                 }
              else
                 {
                 console.log("Error Occured while using claim Function  Mining Contract " + err);
                 }
              });                 
              console.log("Returning TxHash!! "+transactionHash);
              return transactionHash;
  
         }//if
         else
         {
             console.log("Response recieved is null in function");
             return null;
         }//else
         
     }   
     catch(e)
     {
         console.log("There has been an error"+e);
         return null;
     } 
  
  }
  


  export const stakeFunc=async(_BNUGAmount,_web3)=>{
    
    try
     {
  
         if(_web3)
         {
              const bnugContract = new _web3.eth.Contract(abi,address);
              let transactionHash=null;
              const inWeiBnug = _web3.utils.toWei(_BNUGAmount,"ether");
              const account = await _web3.eth.getAccounts();
              await bnugContract.methods.stake(inWeiBnug).send({from:account[0]},(err,txHash)=>{
              if(!err)
                 {
                  console.log("Mining Contract staking Transaction Hash : "+txHash);
                  transactionHash=txHash;      
                 }
              else
                 {
                 console.log("Error Occured while using staking Function  " + err);
                 }
              });                 
              console.log("Returning TxHash!! "+transactionHash);
              return transactionHash;
  
         }//if
         else
         {
             console.log("Response recieved is null in function");
             return null;
         }//else
         
     }   
     catch(e)
     {
         console.log("There has been an error"+e);
         return null;
     } 
  
  }
  

  
  export const unstakeFunc=async(_BNUGAmount,_web3)=>{
    
    try
     {
  
         if(_web3)
         {
              const bnugContract = new _web3.eth.Contract(abi,address);
              let transactionHash=null;
              const inWeiBnug = _web3.utils.toWei(_BNUGAmount,"ether");
              const account = await _web3.eth.getAccounts();
              await bnugContract.methods.unstake(inWeiBnug).send({from:account[0]},(err,txHash)=>{
              if(!err)
                 {
                  console.log("Mining Contract staking Transaction Hash : "+txHash);
                  transactionHash=txHash;      
                 }
              else
                 {
                 console.log("Error Occured while using staking Function  " + err);
                 }
              });                 
              console.log("Returning TxHash!! "+transactionHash);
              return transactionHash;
  
         }//if
         else
         {
             console.log("Response recieved is null in function");
             return null;
         }//else
         
     }   
     catch(e)
     {
         console.log("There has been an error"+e);
         return null;
     } 
  
  }
  