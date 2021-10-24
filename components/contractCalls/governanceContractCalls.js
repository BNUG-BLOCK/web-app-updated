const Web3=require('web3');
const web3= new Web3(process.env.bscTestnet);
import {abi,address} from '../contracts/governanceToken';
import {address as miningTokenAddress} from '../contracts/miningProtocol';


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

// export const handleApprove =async(_web3)=>{

//     if(_provider)
//     {
//       try
//       {
//       const governanceContract = new web3.eth.Contract(abi,address);
//       let allowance=null;
//       const supply = await web3.utils.toBN('177492772645302');
//       const acc=await web3.eth.getAccounts();
     
//            await governanceContract.methods.allowance(acc[0],miningTokenAddress).call((err,result)=>{
//               if(!err)
//                 allowance=result;
  
//             });
  
//             if(allowance==="0")
//             {
//               console.log("Allowance triggered");
//               await  governanceContract.methods.approve(miningTokenAddress,supply).send({from:acc[0]},(err,txHash)=>{
//                 if(!err)
//                   console.log("Usdt Approval Transaction Hash : "+txHash);
//               });
//               return true;
//             }
//             else
//             {
//               return true;
//             }
         
//         }
//         catch(e)
//         {
//           console.log("Error on allowance");
//           return false;
//         }

//     }
//     else
//     {
//       console.log("Provider is null");
//       return false
//     }
   

// }
