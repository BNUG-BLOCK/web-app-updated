import React from 'react'
import styled from 'styled-components';

const MainContainer = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;



`;

export default function Vault({connected,setConnected,userData,setUserData}) {
    return (
        <MainContainer>
            
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
