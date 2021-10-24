const Web3=require('web3');
const web3= new Web3(process.env.bscTestnet);
import {abi,address} from '../contracts/bnugToken';
import {address as miningTokenAddress} from '../contracts/miningProtocol';

export const handleApprove =async(_web3)=>{

  
      try
      {
      const bnugContract = new _web3.eth.Contract(abi,address);
      let allowance=null;
      const supply = await _web3.utils.toBN('200000000000000000000000000');
      const acc=await _web3.eth.getAccounts();
     
           await bnugContract.methods.allowance(acc[0],miningTokenAddress).call((err,result)=>{
              if(!err)
                allowance=result;
  
            });
  
            if(allowance==="0")
            {
              console.log("Allowance triggered");
              await  bnugContract.methods.approve(miningTokenAddress,supply).send({from:acc[0]},(err,txHash)=>{
                if(!err)
                  console.log(" Approval Transaction Hash : "+txHash);
              });
              return true;
            }
            else
            {
              return true;
            }
         
        }
        catch(e)
        {
          console.log("Error on allowance "+e);
          return false;
        }

   

}


export const balanceOfFunc =async(_web3)=>{
  try
  {
    const bnugContract = new _web3.eth.Contract(abi,address);
    let balance=null;
    const acc=await _web3.eth.getAccounts();
    await bnugContract.methods.balanceOf(acc[0]).call((err,result)=>{
      if(!err)
        balance=_web3.utils.fromWei(result,'ether');
    });
    return balance;
  }
  catch(e)
  {
    console.log("Some Error Occured While checking balance"+e);
    return null;
  }


}