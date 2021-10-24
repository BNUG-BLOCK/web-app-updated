import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {removeLiquidityFunc, unstakeFunc } from '../../../contractCalls/miningContractCalls';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const RemoveLiquidity=styled('div')`
height: 400px;
width: 520px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;

.staking-input{
    margin-top: 10px;
    width: 520px;
    height: 64px;
    border: ${props=>props.darkMode?'1px solid #919191':'1px solid #EDF2EE'};
    border-radius: 16px;
    background: transparent;
    color: #909090;
  
    outline: none;
    display: flex;
    flex-direction: row;
}

.left-side{
    width: 87px;
    height: 62px;
    background: ${props=>props.darkMode?'#282828':'#EDF2EE'};
    border-top-left-radius: 16px;
    border-bottom-left-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props=>props.darkMode?'#909090':'black'};
}

.staking-inside-input {
    background: transparent;
    width: 373px;
    height: 62px;
    padding: 10px;
    outline: none;
    border: none;
    color: #919191;
}

.max-container{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 62px;
    background: transparent;
    border: none;
    color: #F5A606;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 120%;
  
}

.slider-div{
    width: 520px;
    margin-top: 50px;
    border: 1px solid transparent;
}



.remove-liquidity{
    margin-top: 40px;
    width: 520px;
    height: 54px;
    background: rgba(211, 8, 8, 0.1);
    border-radius: 16px;
    outline: none;
    border: 1px solid rgba(245, 166, 6, 0.1);
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #D30808;
    cursor: pointer;

    &:hover{
        color: white;
        background: #D30808;
    }
}


.remove-liquidity-disabled{
    margin-top: 40px;
    width: 520px;
    height: 54px;
    background: rgba(211, 8, 8, 0.1);
    border-radius: 16px;
    outline: none;
    border: 1px solid rgba(245, 166, 6, 0.1);
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    color: #D30808;
    cursor: pointer;
    opacity: 0.5;
}

.min-stake{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    color: #909090;
    margin-top: 5px;
    margin-left: 430px;
    }


    .stake-assets-text {
        margin-top: 30px;
    }

`;



const CurrentStake = styled('div')`
    width: 520px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 15px;

    .grey{
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        color: #909090;
    }

    .white{
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        color : ${(props)=>props.darkMode?'white':'#909090'};
    }


`;

const FirstDotImg= styled('img')`
    position: absolute;
    margin-top: -22px;
    margin-left: 130px;

`;

const SecondDotImg= styled('img')`
    position: absolute;
    margin-top: -22px;
    margin-left: 260px;

`;

const ThirdDotImg= styled('img')`
    position: absolute;
    margin-top: -22px;
    margin-left: 390px;

`;
const FourthDotImg= styled('img')`
    position: absolute;
    margin-top: -22px;
    margin-left: 515px;

`;


const ZeroPercent= styled('div')`
    position: absolute;
    margin-top: -50px;
    margin-left: 0px;

`;

const HundredPercent= styled('div')`
    position: absolute;
    margin-top: -50px;
    margin-left: 480px;
    color: #909090;

`;

const useStyles = makeStyles({
    root: {
      width: 520,
      color: '#919191'
    },
  });

export default function RemoveLiquidityComp({userData,setUserData,userLpAmount,setLpAmount,setLpAmountFunc,darkMode}) {
    const classes = useStyles();
    const [inputValue,setInput] = useState(0);
    const [sliderValue, setSliderValue] = React.useState(0);
    
    const handleSliderChange = async(event, newValue) => {
        setSliderValue(newValue);
        setInput(((newValue/100)*userLpAmount).toString());
      };


    const handleunStaking = async()=>{

        if(userData.chainId==97 && inputValue>0)
        {           
      

                const txHash= await unstakeFunc(inputValue,userData.web3);
                if(txHash)
                {
              

                    console.log("Returned TxHash : "+ txHash);
                }

            

        
        }
        else
        {
            console.log("Different Network Connected!! Please switch to BSC Testnet");
        }
    }
    

    useEffect(()=>{
        setLpAmountFunc();
        const interval = setInterval(setLpAmountFunc,45000);

        return()=>{
            clearInterval(interval);
        }

      },[])



    return (
        <RemoveLiquidity darkMode={darkMode}>
            <CurrentStake darkMode={darkMode}>
                <div className='grey'>Current stake: </div>
                <div className='white' >{userLpAmount} BNUG</div>
            </CurrentStake>

            <div className='stake-assets-text'>Unstake assets:</div>

            <div className='staking-input' >
                <div className='left-side'>BNUG</div>
                <input className="staking-inside-input" value={inputValue}  disabled={(userLpAmount==-1|| userLpAmount==0)?true:false}  onChange={(e)=>{setInput(e.target.value);
                    const num = (e.target.value/userLpAmount)*100;
                    setSliderValue(num);
                  }}  type="number" min="0"/>
                <div className="max-container"><div className="max-text" onClick={()=>{if(userLpAmount!=-1 && userLpAmount!=0){setInput(userLpAmount);setSliderValue(100)}}}>MAX</div></div>
            </div>

    
            <div className='slider-div'>
                <Slider value={sliderValue} disabled={(userLpAmount==-1|| userLpAmount==0)?true:false}  onChange={handleSliderChange} aria-labelledby="continuous-slider" className={classes.root} />
                <ZeroPercent>0%</ZeroPercent>
                <FirstDotImg src={darkMode?'./svg/dot.svg':'./svg/dotLight.svg'}/>
                <SecondDotImg src={darkMode?'./svg/dot.svg':'./svg/dotLight.svg'}/>
                <ThirdDotImg src={darkMode?'./svg/dot.svg':'./svg/dotLight.svg'}/>
                <FourthDotImg src={darkMode?'./svg/dot.svg':'./svg/dotLight.svg'}/>
                <HundredPercent>100%</HundredPercent>
            </div>
            {/* <div>
                User LP Amount ={ userLpAmount==-1?'Loading...':parseFloat(userLpAmount).toFixed(4)}
            </div> */}


            {
                inputValue==0 && ( <button className="remove-liquidity-disabled">Unstake</button>)
            }
            {
                inputValue!=0 && (   <button className="remove-liquidity" onClick={handleunStaking}>Unstake</button>)
            }
            

        </RemoveLiquidity>
    )
}
