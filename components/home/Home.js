import React,{useEffect, useState} from 'react';
import styled from 'styled-components';
import {  getUserClaimableRewardsFunc, priceOracleFunc,claimFunc } from '../contractCalls/miningContractCalls';
import copy from "copy-to-clipboard"; 
import { balanceOfFunc } from '../contractCalls/bnugTokenContract';


const MainContainer = styled('div')`
    display: flex;
    flex-direction: column;
    width: 1000x;
    height: 700px;
    margin-top: 25px;

    .copied-text{
        position: absolute;
        margin-top: -25px;
        margin-left: 930px;
    }


    .rewards, .price-oracle{
        margin-top: 15px;
        color: ${(props)=>props.darkMode?'white':'black'};
        font-family: Quicksand;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 120%;
    }
   
   

    .row-div{
        margin-left: 620px;
        width: 395px;
        height: 24px;
    }
    
`;


const BnugDaoContainer =styled('div')`
    width: 1000px;
    height: 100px;
    margin-bottom: 60px;
`;


const Line = styled('hr')`
border:${(props)=>props.darkMode?'1px solid #282828':'1px solid transparent'};
height: 0px;
width: 280px;
`;


const LiquidityPoolAddress = styled('div')`
    width: 980px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 40px;
    color: #919191;


    .address{
        color: white;
    }
    .address-light{
        color: black;
    }

`;

const RewardsContainer = styled('div')`
    height: 250px;
    width: 1000px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    gap: 20px;

`;

const RewardsBox =styled('div')`
    width: 320px;
    height: 230px;
    background: ${(props)=>props.darkMode?'#1C1C1C':'#EDF2EE'};
    border-radius: 16px;

    .title{
    color: #909090;
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    margin-top: 30px;
    margin-left: 30px;
    }

    .token{
        width: 260px;
        height: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 30px;
        margin-top: 30px;
        color: ${(props)=>props.darkMode?'white':'black'};
    }
    .token-second {
        width: 260px;
        height: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-left: 30px;
        margin-top: 10px;
        color: ${(props)=>props.darkMode?'white':'black'};
    }

    .network {
        margin-left: 30px;
        margin-top: 30px;
        color: ${(props)=>props.darkMode?'white':'black'};
        
    }

    .claim{
        margin-top: 50px;
        margin-left: 30px;
        cursor: pointer;
    }

    .claim-staking {
        margin-top: 30px;
        margin-left: 30px;
        cursor: pointer;
    }
`;

const TransparentBox =styled('div')`
    width: 300px;
    height: 230px;
    background: transparent;
    border-radius: 16px;


    .title{
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: white;
        margin-top: 30px;
        margin-left: 30px;
        color: ${(props)=>props.darkMode?'white':'black'};
    } 

    .text{
        width: 260px;
        height: 30px;
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        margin-top: 20px;
        margin-left: 30px;
        color: #919191;
    }

    .start-earning{
        margin-top: 70px;
        margin-left: 30px;
        color: #71C21B;
        
        font-family: Inter;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
    }
`;

const PriceOracleContainer = styled('div')`
    width: 1000px;
    height: 75px;
    margin-top: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 25px;

`;

const PriceOracleInput = styled('div')`
    width: 460px;
    height: 64px;
    background: ${(props)=>props.darkMode?'black':'white'};
    border: ${(props)=>props.darkMode?'1px solid #1C1C1C':'1px solid #EDF2EE'};
    border-radius: 16px;
    display: flex;
    flex-direction: row;
    color: ${(props)=>props.darkMode?'white':'black'};

    .left-side{
        width: 105px;
        height: 62px;
        background: ${(props)=>props.darkMode?'#1C1C1C':'#EDF2EE'};
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: space-around;
     
    }
    .left-side-bnb{
        width: 105px;
        height: 62px;
        background: ${(props)=>props.darkMode?'black':'white'};
        border-top-left-radius: 16px;
        border-bottom-left-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: space-around;

     
    }

    input{
        background: transparent;
        outline: none;
        color: ${(props)=>props.darkMode?'white':'black'};
        padding-left: 10px;
        width : 300px;
        border: none;
        
    }

    .eq-bnb{
        margin-top: 22px;
        margin-left: 22px;
    }

    .max-text-disabled{
        border: none;
        color: #F5A606;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 120%;  
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        cursor: pointer;
    }
    
    .max-text{
        border: none;
        color: #F5A606;
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        line-height: 120%;  
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }




`;

const Footer =styled('div')`
    width: 537px;
    height: 24px;
    margin-left: 250px;
    margin-top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;

    div{
        margin-left: 30px;
        cursor: pointer;
        font-family: Quicksand;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        color: #919191;
    }
`;

export default function Home({userData,setUserData,darkMode}) {
    const [inputValue,setInput] = useState(0);
    const [equivalentBNB,setEquivalentBNB] = useState(0);
    const [bnugBalance,setBnugBalance]=useState(-1);

    const [userRewards,setUserRewards]= useState(['0','0','0']);

    const [copied,setCopied]=useState(false);
    const copyToClipboard = () => {
        copy('0xDd9e02299c0536FEb304a2989656Fe58bB22e6bf');
        setCopied(true);
        setTimeout(()=>setCopied(false),1500);
     }

    useEffect(()=>{
        console.log("Use Effect triggered!")
        if(userData){
            balanceOfFunc(userData.web3).then((bal)=>setBnugBalance(bal));
        }
      
        setClaimableRewardsFunc();

    },[userData])


    const handleClaim = async()=>{
       
        if(userData && userData.chainId==97 )
        {
            const resp = await claimFunc(userData.web3);
            console.log("Transaction Hash Returned : "+resp);

        }
        else
        {
            console.log("Different Network Detected!! Please change to BSC TestNet or User Not Logged in");
        }
    }


    const setClaimableRewardsFunc = ()=>{
        if(userData)
        {
            getUserClaimableRewardsFunc(userData.address,process.env.bscTestnet).then((value)=>{
                console.log(value);
                setUserRewards(value);
            });
        }
        else
        {
            console.log("User Is not logged in");
        }
    }
    const handlePriceOracle=async(e)=>{
        setEquivalentBNB(-1);
        setInput(e.target.value);
        const eqBNB = await priceOracleFunc(e.target.value,process.env.bscTestnet);

        if(eqBNB)
        {
            setEquivalentBNB(eqBNB);
        }
        else{
            setEquivalentBNB(0);
        }

    }

    const setMaxBNUG=async()=>{
        setInput(bnugBalance);
        const eqBNB = await priceOracleFunc(bnugBalance,process.env.bscTestnet);

        if(eqBNB)
        {
            setEquivalentBNB(eqBNB);
        }
        else{
            setEquivalentBNB(0);
        }

    }


    return (
        <MainContainer darkMode={darkMode}>
            
            <BnugDaoContainer>


                
            <LiquidityPoolAddress >
                <div>BNUGDAO Liquidity Pool Address:</div>
                {
                    copied && (
                        <div className="copied-text">Pool Address Copied!</div>
                    )
                }
                <div className={darkMode?'address':'address-light'}>0xDd9e02299c0536FEb304a2989656Fe58bB22e6bf <img style={{paddingTop:'10px',cursor:'pointer'}} src={darkMode?'./svg/copy.svg':'./svg/copyBlack.svg'} height='25px' width={'25px'} onClick={()=>copyToClipboard()}/></div>
            </LiquidityPoolAddress>
            </BnugDaoContainer>


            <div className='rewards'>Rewards</div>
            <RewardsContainer>
                <RewardsBox darkMode={darkMode}>
                    {
                        !userData && (
                            <>
                            <div className='title'>Staking rewards</div>
                            <div className='network'>No wallet Connected! <br/> Please Connect a wallet to view and claim User Staking Rewards</div>
                            </>
                        )
                    }


                    {

                        userData && userData.chainId!=97 && (
                            <>
                            <div className='title'>Staking rewards</div>
                            <div className='network'>Different Network Detected! <br/> Please Change Network to BSC Testnet to claim Staking Rewards</div>
                            </>
                        )

                    }


                    {
                        userData && userData.chainId==97 && (
                            <>
                            <div className='title'>Staking rewards</div>
                            <div className='token'>
                                <div>BNB</div>
                                <div>{parseFloat(userRewards[1]).toFixed(4)}</div>
                            </div>
                            <Line darkMode={darkMode}/>
                            <div className='token-second'>
                                <div>BNUG</div>
                                <div>{parseFloat(userRewards[0]).toFixed(4)}</div>
                            </div>
    
                            <img src='./svg/claim.svg'  onClick={handleClaim} className='claim-staking' />
                            </>
                        )
                    }
                    
                      
                </RewardsBox>

                <RewardsBox  darkMode={darkMode}>

                    {
                        !userData && (
                            <>
                            <div className='title'>Liquidity rewards</div>
                            <div className='network'>No wallet Connected! <br/> Please Connect a wallet to view and claim User LP Rewards</div>
                            </>
                        )
                    }

                    {

                        userData && userData.chainId!=97 && (
                        <>
                        <div className='title'>Liquidity rewards</div>
                        <div className='network'>Different Network Detected! <br/> Please Change Network to BSC Testnet to claim LP Rewards</div>
                        </>
                        )       

                    }               

                    {
                        userData && userData.chainId==97 && (
                            <>
                            <div className='title'>Liquidity rewards</div>
                            <div className='token'>
                                    <div>BNUGDAO</div>
                                    <div>{parseFloat(userRewards[0]).toFixed(4)}</div>
                            </div>
                            <Line/>
        
                            <img src='./svg/claim.svg'  onClick={handleClaim} className='claim' />
                            </>
                        )
                    }
                 
                </RewardsBox>

                <TransparentBox  darkMode={darkMode}>
                    <div className='title'>Earn rewards when you stake
                    <br/> or provide liquidity into our pool
                    </div>
                    <div className='text'>We're a DAO, Leveraging a strong community to build an inclusive financial ecosystem. We're agile, collaborative, diversified and transparent!</div>
                    <div className='start-earning'>Start earning</div>
                </TransparentBox>

            </RewardsContainer>

            <div className='price-oracle'>Price oracle</div>
            <PriceOracleContainer darkMode={darkMode}>
                <PriceOracleInput darkMode={darkMode}>
                    <div className='left-side'>
                        <div>BNUG</div>
                        <img src='./svg/down.svg' ></img>
                    </div>
                    <input  placeholder="Enter an amount"  value={inputValue} onChange={handlePriceOracle} type="number" min="0"/>
                    <div className={userData?'max-text':'max-text-disabled'} onClick={userData?setMaxBNUG:()=>{}}>MAX</div>
                </PriceOracleInput>
                <div>
                    <img src={darkMode?'./svg/interchangeStraight.svg':'./svg/interChangeBlack.svg'} />
                </div>
                <PriceOracleInput darkMode={darkMode}>
                     <div className='left-side-bnb'>
                        <div>BNB</div>
                        <img src='./svg/down.svg' ></img>
                    </div>
                    <div className='eq-bnb'>{equivalentBNB==-1?'Loading...':parseFloat(equivalentBNB).toFixed(4)}</div>
                </PriceOracleInput>
            </PriceOracleContainer>

            <Footer>
                <div><a href="https://bnug.finace/#contact">Team</a></div>  
                <div>Support</div>  
                <div><a href="https://bnug.finace/#contact">About bnugDAO</a></div>  
                <div>Legal &amp; Privacy</div>  
                <div><a href="https://bnug.finace/#contact">Contact</a></div>  
            </Footer>
        </MainContainer>
    )
}
