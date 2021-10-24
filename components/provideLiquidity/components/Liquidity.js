import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import AddLiquidityComp from './Liquidity/addLiquidity';
import RemoveLiquidityComp from './Liquidity/removeLiquidity';
import {getUserLPAmountFunc,getTotalLPAmountFunc} from '../../contractCalls/miningContractCalls';
import { balanceOfFunc } from '../../contractCalls/bnugTokenContract';
import { balanceOfFunc as daoBalanceOf  } from '../../contractCalls/governanceContractCalls';
import copy from "copy-to-clipboard"; 


const MainContainer = styled('div')`
    width: 100vw;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    .copied-text{
        position: absolute;
        margin-top: -35px;
        margin-left: 710px;
    }

`;

const LiquidityContainer = styled('div')`
width: 740px;
height: 710px;

border-radius: 32px;
background: ${(props)=>props.darkMode?'#1C1C1C':'white'};
border:${(props)=>props.darkMode?'1px solid transparent':'1px solid #EDF2EE'};
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

const LiquidityPoolAddress = styled('div')`
    width: 740px;   
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 40px;
    align-items: center;
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

    const [totalLp,setTotalLp]=useState(-1);

     
    const [bnugBalance,setBnugBalance]=useState(-1);
    const [daoBalance,setDaoBalance]=useState(-1);

    const [copied,setCopied]=useState(false);

    const copyToClipboard = () => {
        copy('0xDd9e02299c0536FEb304a2989656Fe58bB22e6bf');
        setCopied(true);
        setTimeout(()=>setCopied(false),1500);
     }
    
    
    useEffect(()=>{
        balanceOfFunc(userData.web3).then((bal)=>setBnugBalance(bal));

        daoBalanceOf(userData.web3).then((bal)=>setDaoBalance(bal));
    },[])

    const setTotalLpAmountFunc = ()=>{
        console.log("Total Lp Amount Function Triggered!");
        getTotalLPAmountFunc(process.env.bscTestnet).then((value)=>setTotalLp(value));
    }
 
    useEffect(()=>{
        setTotalLpAmountFunc();
        const interval = setInterval(setTotalLpAmountFunc,45000);

        return()=>{
            clearInterval(interval);
        }

    },[])

    const setLpAmountFunc = ()=>{
        console.log("Set Lp Amount Func Trigggered!");
        if(userData.chainId==97)
        {
            getUserLPAmountFunc(userData.address,process.env.bscTestnet).then((value)=>setLpAmount(value)); 
        }
        else
        {
            console.log("Please change Network to BSC TestNet!! Different Network detected!!");
        }
    }

    return (
        <MainContainer  darkMode={darkMode}>
             
                <LiquidityPoolAddress  darkMode={darkMode}>
                 <div>Liquidity Pool Address:</div>
                 {
                    copied && (
                        <div className="copied-text">Copied!</div>
                    )
                }
                 <div > 0xDd9e02299c0536FEb304a2989656Fe58bB22e6bf<img style={{paddingTop:'10px',cursor:'pointer'}} src={darkMode?'./svg/copy.svg':'./svg/copyBlack.svg'} height='25px' width={'25px'} onClick={()=>copyToClipboard()}/></div>
                </LiquidityPoolAddress>

                <LiquidityContainer  darkMode={darkMode}>
                        <TotalLiquidityProvided  darkMode={darkMode}>Total Liquidity provided: {totalLp==-1?'Loading...':parseFloat(totalLp).toFixed(4)}</TotalLiquidityProvided>
                        
                        <div className='liquidity-name'>
                            {addLiqBtn?'Add Liquidity':'Remove Liquidity'}
                        </div>
                        
                        <Line  darkMode={darkMode}/>

                        <LiquidityBtnDiv  darkMode={darkMode}>
                          <div className={addLiqBtn?'active':'inactive'} onClick={()=>setAddBtn(true)} >Add Liquidity</div>
                          <div className={addLiqBtn?'inactive':'active'} onClick={()=>setAddBtn(false)}>Remove Liquidity</div>
                        </LiquidityBtnDiv>
                        {
                            addLiqBtn && (
                                <AddLiquidityComp  darkMode={darkMode} bnugBalance={bnugBalance} userData={userData} setUserData={setUserData} userLpAmount={userLpAmount} setLpAmount={setLpAmount} setLpAmountFunc={setLpAmountFunc}></AddLiquidityComp>
                            )
                        }

                        {
                            !addLiqBtn && (
                                <RemoveLiquidityComp  darkMode={darkMode} userData={userData} setUserData={setUserData} userLpAmount={userLpAmount} setLpAmount={setLpAmount} setLpAmountFunc={setLpAmountFunc}></RemoveLiquidityComp>
                            )
                        }

                      
                       
                </LiquidityContainer>
             
        </MainContainer>
    )
}
