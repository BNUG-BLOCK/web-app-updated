import React,{useState} from 'react'



import styled from 'styled-components';
import Liquidity from './components/StakeUnstake';



const MainContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: ${(props)=>props.darkMode?'black':'white'};
    color: ${(props)=>props.darkMode?'white':'black'};


`;

export default function Stake({connected,setConnected,userData,setUserData,darkMode}) {
   
    return (
        <MainContainer darkMode={darkMode}>
            {
                connected && userData.chainId==97 && (
                    <>
                    <Liquidity userData={userData} setUserData={setUserData} darkMode={darkMode}/>

                    {/* <div className='tile'>
                        <Balance userData={userData} setUserData={setUserData}></Balance>
                        <ClaimComp userData={userData} setUserData={setUserData}></ClaimComp>
                    </div> */}
                    </>
                )
            }

            {
                connected && userData.chainId!=97 && (
                    <h1>Different Chain Detected!! Please Change to BSC Testnet</h1>
                )

            }

            {
                !connected && (
                    <h1>Please Connect Your Wallet!</h1>
                )
            }
        
        </MainContainer>
    )
}
