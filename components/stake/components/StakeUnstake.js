import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import AddLiquidityComp from './Liquidity/staking';
import RemoveLiquidityComp from './Liquidity/unstaking';
import {getUserLPAmountFunc, getUserStakeAmountFunc, totalStakedFunc} from '../../contractCalls/miningContractCalls';

import { balanceOfFunc } from '../../contractCalls/bnugTokenContract';
import { balanceOfFunc as daoBalanceOf  } from '../../contractCalls/governanceContractCalls';

const MainContainer = styled('div')`
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const LiquidityContainer = styled('div')`
width: 740px;
height: 710px;
background: ${(props)=>props.darkMode?'#1C1C1C':'white'};
border:${(props)=>props.darkMode?'1px solid transparent':'1px solid #EDF2EE'};
border-radius: 32px;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 40px;

.liquidity-name {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    margin-top: 40px;
}


`;

const LiquidityBtnDiv = styled('div')`
width: 520px;
height: 64px;
background: ${(props)=>props.darkMode?'#282828':'white'};
border:${(props)=>props.darkMode?'1px solid transparent':'1px solid #EDF2EE'};
border-radius: 30px;
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-around;

.active{
    width: 242px;
    height: 50px;
    background: ${(props)=>props.darkMode?'#1C1C1C':'#EDF2EE'};
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #71C21B;


}

.inactive{
    width: 242px;
    height: 50px;
    border-radius: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #909090;
}

`;



const TotalLiquidityProvided = styled('div')`
    width: 740px;
    height: 64px;
    background: ${(props)=>props.darkMode?'#282828':'white'};
    border:${(props)=>props.darkMode?'1px solid transparent':'1px solid #EDF2EE'};
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    color: #909090;

`;


const Line = styled('hr')`
width: 520px;
height: 0px;
border: ${(props)=>props.darkMode?'1px solid #282828':'1px solid transparent'};
margin-top: 30px;

`;

export default function Liquidity({userData,setUserData,darkMode}) {
    const [userLpAmount,setLpAmount]=useState(-1);
    const [addLiqBtn,setAddBtn]=useState(true);

    const [totalStaking,setTotalStake] = useState(-1);
 
    const [bnugBalance,setBnugBalance]=useState(-1);
    const [daoBalance,setDaoBalance]=useState(-1);


    
    useEffect(()=>{
        balanceOfFunc(userData.web3).then((bal)=>setBnugBalance(bal));

        daoBalanceOf(userData.web3).then((bal)=>setDaoBalance(bal));
    },[])



    const setTotalStakedFunc=()=>{
        console.log("Total Staked Function");
        totalStakedFunc(process.env.bscTestnet).then((value)=>setTotalStake(value));
    }

    useEffect(()=>{
        setTotalStakedFunc();
        const interval = setInterval(setTotalStakedFunc,30000);

        return()=>{
            clearInterval(interval);
        }

        
    },[])

    const setLpAmountFunc = ()=>{
        console.log("Set Lp Amount Func Trigggered!");
        if(userData.chainId==97)
        {
            getUserStakeAmountFunc(userData.address,process.env.bscTestnet).then((value)=>{setLpAmount(value)}); 
        }
        else
        {
            console.log("Please change Network to BSC TestNet!! Different Network detected!!");
        }
    }

    return (
        <MainContainer darkMode={darkMode}>
            
                <LiquidityContainer darkMode={darkMode}>
                        <TotalLiquidityProvided darkMode={darkMode}>Total Staking:  {totalStaking==-1?'Loading...':parseFloat(totalStaking).toFixed(4)}</TotalLiquidityProvided>
                        
                        <div className='liquidity-name'>
                            {addLiqBtn?'Stake BNUG':'Unstake BNUG'}
                        </div>
                        
                        <Line darkMode={darkMode}/>

                        <LiquidityBtnDiv darkMode={darkMode}>
                          <div className={addLiqBtn?'active':'inactive'} onClick={()=>setAddBtn(true)} >Stake</div>
                          <div className={addLiqBtn?'inactive':'active'} onClick={()=>setAddBtn(false)}>Unstake</div>
                        </LiquidityBtnDiv>
                        {
                            addLiqBtn && (
                                <AddLiquidityComp darkMode={darkMode} bnugBalance={bnugBalance} daoBalance={daoBalance} userData={userData} setUserData={setUserData} userLpAmount={userLpAmount} setLpAmount={setLpAmount} setLpAmountFunc={setLpAmountFunc}></AddLiquidityComp>
                            )
                        }

                        {
                            !addLiqBtn && (
                                <RemoveLiquidityComp darkMode={darkMode} userData={userData} setUserData={setUserData} userLpAmount={userLpAmount} setLpAmount={setLpAmount} setLpAmountFunc={setLpAmountFunc}></RemoveLiquidityComp>
                            )
                        }

                      
                       
                </LiquidityContainer>
             
        </MainContainer>
    )
}
