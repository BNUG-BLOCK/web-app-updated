import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import {removeLiquidityFunc } from '../../../contractCalls/miningContractCalls';
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
    margin-top: 40px;
    width: 520px;
    height: 64px;
    border: ${props=>props.darkMode?'1px solid #919191':'1px solid #EDF2EE'};
    border-radius: 16px;
    background: transparent;
    color: #909090;
    padding: 10px;
    outline: none;
}

.slider-div{
    width: 520px;
    margin-top: 50px;
    border: 1px solid transparent;
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

.min-stake{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    color: #909090;
    margin-top: 5px;
    margin-left: 430px;
    }

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
    const userAddedLiquidity =userLpAmount;
    
    const handleSliderChange = async(event, newValue) => {
        setSliderValue(newValue);
        setInput(((newValue/100)*userAddedLiquidity).toString());
      };


    const handleremoveLiquidity = async()=>{

        if(userData.chainId==97 && inputValue>0)
        {           
                if(userData.type==2)
                {
                setTimeout(setLpAmountFunc,10000);
                }
                const txHash= await removeLiquidityFunc(inputValue,userData.web3);
                if(txHash)
                {
                    setLpAmountFunc();

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
    },[])



    return (
        <RemoveLiquidity>
            <input value={inputValue}  disabled={(userLpAmount==-1|| userLpAmount==0)?true:false} className='staking-input' onChange={(e)=>{setInput(e.target.value);
                    const num = (e.target.value/userAddedLiquidity)*100;
                    setSliderValue(num);
            }}  type="number" min="0"/>
            <div className='min-stake'>Min. stake: 1 BNUG</div>
            <div className='slider-div'>
                <Slider value={sliderValue} onChange={handleSliderChange} aria-labelledby="continuous-slider" className={classes.root} />
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
                inputValue==0 && (    <button className="remove-liquidity-disabled">Remove Liquidity</button>)
            }
            {
                inputValue!=0 && (     <button className="remove-liquidity" onClick={handleremoveLiquidity}>Remove Liquidity</button>)
            }
    

        </RemoveLiquidity>
    )
}
