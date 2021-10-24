import React, { useState ,useEffect} from 'react'
import styled from 'styled-components';
import { handleApprove } from '../../../contractCalls/bnugTokenContract';
import { addLiquidityFunc, claimFunc, priceOracleFunc, stakeFunc } from '../../../contractCalls/miningContractCalls';
import Slider from '@material-ui/core/Slider';
import { makeStyles } from '@material-ui/core/styles';
import StakingModal from '../StakingModal';
const AddLiquidity=styled('div')`
    height: 450px;
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

    .staking-inside-input{
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

    .max-text{
        cursor: pointer;
    }

    .slider-div{
        width: 520px;
        margin-top: 25px;
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

    .stake-assets-text {
        margin-top: 30px;
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


const YourBalance = styled('div')`
    width: 520px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;

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

const EstimatedApr = styled('div')`
    width: 520px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 30px;

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
        color : white;
    }


`;

const EstimatedDailyRewards = styled('div')`
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
        color : white;
    }


`;


const useStyles = makeStyles({
    root: {
      width: 520,
      color: '#919191'
    },
  });

export default function AddLiquidityComp({userData,setUserData,userLpAmount,setLpAmount,setLpAmountFunc,bnugBalance,daoBalance,darkMode}) {
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

    const handleSliderChange = async(event, newValue) => {
        setSliderValue(newValue);
        setInput(((newValue/100)*bnugBalance).toString());
        const eqBNB = await priceOracleFunc(((newValue/100)*bnugBalance).toString(),process.env.bscTestnet);

        if(eqBNB)
        {
            setEquivalentBNB(eqBNB);
        }

      };


      const handleOpenModal = ()=>{
          setModal(true);
      }

    const handleStaking = async()=>{
        setModal(false);
        try{
            if(userData.chainId==97 && inputValue>0)
            {   
            const resp = await handleApprove(userData.web3);
            if(resp )
            {
                    const txHash= await stakeFunc(inputValue,userData.web3);
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

    
    useEffect(()=>{
        setLpAmountFunc();
        const interval = setInterval(setLpAmountFunc,45000);

        return()=>{
            clearInterval(interval);
        }

      },[])
  

    return (
        <>
        <AddLiquidity darkMode={darkMode}>

            <YourBalance darkMode={darkMode}>
                <div className='grey'>Your balance: </div>
                <div className='white' >{bnugBalance==-1?'Loading...':parseFloat(bnugBalance).toFixed(5)} BNUG</div>
            </YourBalance>

            <CurrentStake darkMode={darkMode}>
                <div className='grey'>Current stake: </div>
                <div className='white' >{userLpAmount} BNUG</div>
            </CurrentStake>

            <div className='stake-assets-text'>Stake assets:</div>

            <div className='staking-input' >
                <div className='left-side'>BNUG</div>
                <input className='staking-inside-input' disabled={(bnugBalance==-1 || bnugBalance==0)?true:false} value={inputValue} onChange={handlePriceOracle} type="number" min="0"/>
                <div className="max-container"><div className="max-text" onClick={()=>{if(bnugBalance!=0 && bnugBalance!=-1) {setInput(bnugBalance);setSliderValue(100)}}}>MAX</div></div>
            </div>
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


            <EstimatedApr darkMode={darkMode}>
                <div className='grey'>Estimated APR: </div>
                <div className='white' >40%</div>
            </EstimatedApr>

            <EstimatedDailyRewards darkMode={darkMode}>
                <div className='grey'>Estimated daily rewards: </div>
                <div className='white' >10 BNUG</div>
            </EstimatedDailyRewards>

            {
                inputValue==0 && ( <button className='add-liquidity-disabled'>Stake</button>)
            }
            {
                inputValue!=0 && (   <button className='add-liquidity'  onClick={()=>setModal(true)}>Stake</button>)
            }
         
            
           

        </AddLiquidity>

        <StakingModal darkMode={darkMode} inputValue={inputValue} modal={modal} handleCloseModal={handleCloseModal} handleStaking={handleStaking}/>
        </>
    )
}
