import React from 'react'
import styled from 'styled-components'
import { Modal } from '@material-ui/core';

const MainModalContainer = styled('div')`
position: absolute;
top: 50%;
left: 50%;
width: 740px;
height: 538px;
background: ${props=>props.darkMode?'#1C1C1C':'white'};
border-radius: 32px;
margin-left: -370px;
margin-top: -267px;

.complete-staking{
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: ${props=>props.darkMode?'white':'black'};
    margin-left: 268px;
    margin-top: 70px;
}

.line{
    width: 521px;
    height: 0px;
    margin-left: 110px;
    border: ${props=>props.darkMode?'1px solid #282828':'1px solid #EDF2EE'};
    margin-top: 30px;
 }

 .notice{
   color: #909090;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    margin-left: 110px;
    margin-top: 50px;

 }
 .notice-text{
    margin-top: 15px;
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: #919191;
    margin-left: 110px;
 }


 .add-liquidity{
    width: 520px;
    height: 54px;
    margin-left: 110px;
    background: #71C21B;
    border-radius: 16px;
    color: white;
    margin-top: 40px;
    border: 1px solid #71C21B;
    cursor: pointer;
 }

`;

const StakingTextDiv = styled('div')`
    width: 520px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;
    margin-left: 110px;

    .thin{
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        color: #909090;
  
    }

    .thick{
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        color : ${props=>props.darkMode?'white':'black'};
    }


`;

export default function AddLiqModal({modal,handleCloseModal,handleAddLiquidity,inputValue,darkMode}) {
    return (
        <Modal
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
        <MainModalContainer darkMode={darkMode}>
            <div className='complete-staking'>Complete LP Provision</div>
            <hr className='line'/>

            <StakingTextDiv darkMode={darkMode}>
                <div className='thin'>You're providing a liquidity of: </div>
                <div className='thick'>{inputValue} BNUG</div>
            </StakingTextDiv>

            <StakingTextDiv darkMode={darkMode}>
                <div className='thin'>Estimated APR: </div>
                <div className='thick'>5,000(40%)</div>
            </StakingTextDiv>

            <div className='notice'>
                Notice
            </div>

            <div className='notice-text'>
            By adding liquidity you'll earn 0.17% of all trades on this pair proportional to your share of the pool. <br/> Fees added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.<br/>
            </div>

            <button className='add-liquidity' onClick={handleAddLiquidity}>Add liquidity</button>
        </MainModalContainer>

        </Modal>
    )
}
