import React,{useEffect, useState} from 'react'
import styled from 'styled-components';
import { balanceOfFunc } from '../../contractCalls/bnugTokenContract';
import { balanceOfFunc as daoBalanceOf  } from '../../contractCalls/governanceContractCalls';

const BalanceDiv=styled('div')`

    height: 100px;
    width: 250px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border: 1px solid black;
`;

export default function Balance({userData,setUserData}) {

    const [bnugBalance,setBnugBalance]=useState(-1);
    const [daoBalance,setDaoBalance]=useState(-1);

    useEffect(()=>{
        balanceOfFunc(userData.web3).then((bal)=>setBnugBalance(bal));

        daoBalanceOf(userData.web3).then((bal)=>setDaoBalance(bal));
    },[])


    return (
        <BalanceDiv>
            <div>Balance:</div>
            <div>BNB: {parseFloat(userData.balance).toFixed(4)}</div>
            <div>BNUG :{bnugBalance==-1?'Loading...':parseFloat(bnugBalance).toFixed(4)}</div>
            <div>BNUGDAO :{daoBalance==-1?'Loading...':parseFloat(daoBalance).toFixed(4)}</div>
        </BalanceDiv>
    )
}
