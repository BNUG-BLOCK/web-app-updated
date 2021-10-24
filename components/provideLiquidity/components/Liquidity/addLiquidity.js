import React, { useState } from 'react'
import styled from 'styled-components';
import { handleApprove } from '../../../contractCalls/bnugTokenContract';
import { addLiquidityFunc, priceOracleFunc } from '../../../contractCalls/miningContractCalls';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import StakingModal from '../../../stake/components/StakingModal';
import Modal from '../addLiqModal';
import AddLiqModal from '../addLiqModal';
import useDebounce from '../../../useDebounce';

const AddLiquidity=styled('div')`
    height: 450px;
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

    .interchange-sign{
        margin-top: 20px;
        margin-left: 250px;
    }

    .equivalent-div{
        width: 520px;
        height: 64px;
        background: #282828;
        border-radius: 16px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin-top: 20px;
    }

    .equivalent-div-light{
        width: 520px;
        height: 64px;
        background: transparent;
        border-radius: 16px;
        display: flex;
        flex-direction: row;
        border: 1px solid #EDF2EE;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin-top: 20px;
    }

    .add-liquidity{
        margin-top: 40px;
        width: 520px;
        height: 54px;
        background: #71C21B;
        border-radius: 16px;
        outline: none;
        border: 1px solid rgba(245, 166, 6, 0.1);
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        color: white;
        cursor: pointer;

        &:hover{
            color: white;
            background: #006400;
        }
    }

    .add-liquidity-disabled{
        margin-top: 40px;
        width: 520px;
        height: 54px;
        background: #71C21B;
        border-radius: 16px;
        outline: none;
        border: 1px solid rgba(245, 166, 6, 0.1);
        font-family: Inter;
        font-style: normal;
        font-weight: bold;
        font-size: 16px;
        color: white;
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

export default function AddLiquidityComp({userData,setUserData,userLpAmount,setLpAmount,setLpAmountFunc,bnugBalance,darkMode}) {
    const classes = useStyles();
    const [inputValue,setInput] = useState(0);
    const [equivalentBNB,setEquivalentBNB] = useState(-1);
    const [sliderValue, setSliderValue] = React.useState(0);

    


    const [modal,setModal]= useState(false);
    const handleCloseModal = ()=>{
      if(modal){
        setModal(false);
      }
    }

    const handleOpenModal = ()=>{
        setModal(true);
    }
    useDebounce(async() =>{
        console.log("Use Debounce triggered");
        const eqBNB = await priceOracleFunc(((sliderValue/100)*bnugBalance).toString(),process.env.bscTestnet);
        if(eqBNB)
        {
            setEquivalentBNB(eqBNB);
        }
    }, 1000, [sliderValue])

    const handleSliderChange = async(event, newValue) => {
        setEquivalentBNB(-1);
        setSliderValue(newValue);
        setInput(((newValue/100)*bnugBalance).toString());
      };

    const handleAddLiquidity = async()=>{
        setModal(false);
        try{
            if(userData.chainId==97 && inputValue>0)
            {   
            const resp = await handleApprove(userData.web3);
            if(resp )
            {
                    if(userData.type==2)
                    {
                        setTimeout(setLpAmountFunc,10000);
                    }
                    const txHash= await addLiquidityFunc(inputValue,equivalentBNB,userData.web3);
                    if(txHash)
                    {
                        setLpAmountFunc();
                    }
                    console.log("Returned TxHash : "+ txHash);
            
           
            }
            else
            {
                console.log("There has been an error while approving!!");
            }
            }
            else
            {
                console.log("Different Network Connected!! Please switch to BSC Testnet");
            }
        }
        catch(e){
            console.log("Error Occured"+e);
        }
      
    }
    

    const handlePriceOracle=async(e)=>{
        setEquivalentBNB(-1);
        setInput(e.target.value);
        const num = (e.target.value/bnugBalance)*100;
        setSliderValue(num);
        const eqBNB = await priceOracleFunc(e.target.value,process.env.bscTestnet);

        if(eqBNB)
        {
            setEquivalentBNB(eqBNB);
        }

    }

    return (
        <>
        <AddLiquidity>
            <input className='staking-input' value={inputValue} onChange={handlePriceOracle} type="number" min="0"/>
            <div className='min-stake'>Min. stake: 1 BNUG</div>
            <div className='slider-div'>
                <Slider disabled={(bnugBalance==-1 || bnugBalance==0)?true:false} value={sliderValue} onChange={handleSliderChange} aria-labelledby="continuous-slider" className={classes.root} />
                <ZeroPercent>0%</ZeroPercent>
                <FirstDotImg src={darkMode?'./svg/dot.svg':'./svg/dotLight.svg'}/>
                <SecondDotImg src={darkMode?'./svg/dot.svg':'./svg/dotLight.svg'}/>
                <ThirdDotImg src={darkMode?'./svg/dot.svg':'./svg/dotLight.svg'}/>
                <FourthDotImg src={darkMode?'./svg/dot.svg':'./svg/dotLight.svg'}/>
                <HundredPercent>100%</HundredPercent>
            </div>

            <div className="interchange-sign">
                    <img src={darkMode?'./svg/interchange.svg':'./svg/interchangeDark.svg'}/>
            </div>

            <div className={darkMode?"equivalent-div":'equivalent-div-light'}>
                <div style={{display:'flex',flexDirection:'row',padding:'10px',width:'125px',justifyContent:'space-around',alignItems:'center'}}>
                    <img src='./svg/bnb.svg' ></img>
                    <div>BNB</div>
                    <img src='./svg/down.svg' ></img>
                </div>

               <div>
                   {inputValue==0?0:(inputValue!=0 && equivalentBNB==-1)?'Loading...':parseFloat(equivalentBNB).toFixed(5)}
                </div>
            </div>
            {
                inputValue==0 && ( <button className='add-liquidity-disabled'>Add Liquidity</button>)
            }
            {
                inputValue!=0 && (    <button className='add-liquidity' onClick={handleOpenModal}>Add Liquidity</button>)
            }
          
            
           

        </AddLiquidity>

        <AddLiqModal darkMode={darkMode} inputValue={inputValue} modal={modal} handleCloseModal={handleCloseModal} handleAddLiquidity={handleAddLiquidity}/>
        </>
    )
}
