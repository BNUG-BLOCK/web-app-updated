import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import { getUserClaimableRewardsFunc,claimFunc } from '../../contractCalls/miningContractCalls';

const ClaimContainer = styled('div')`

height: 100px;
width: 250px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
border: 1px solid black;
`;

export default function ClaimComp({userData,setUserData}) {
    
    const [claimValue,setClaimValue] = useState(-1);

    const handleClaim = async()=>{
        if(userData.chainId==97 )
        {
            const resp = await claimFunc(userData.web3);
            console.log("Transaction Hash Returned : "+resp);

        }
        else
        {
            console.log("Different Network Detected!! Please change to BSC TestNet");
        }
    }

    useEffect(()=>{
       setClaimableRewardsFunc();
       setInterval(setClaimableRewardsFunc,15000);
         
    },[])


    const setClaimableRewardsFunc = ()=>{
        if(userData.chainId==97)
        {
            getUserClaimableRewardsFunc(userData.address,process.env.bscTestnet).then((value)=>setClaimValue(value)); 
        }
        else
        {
            console.log("Please change Network to BSC TestNet!! Different Network detected!!");
        }
    }

    return (
        <ClaimContainer>
            <div>Available to claim {claimValue==-1?'Loading...':parseFloat(claimValue).toFixed(4)} BNUGDAO</div>
            <button onClick={handleClaim}>Claim</button>
        </ClaimContainer>
    )
}
