import styled from 'styled-components';
import { MetamaskConnectProvider , BSCConnectProvider,WalletConnectProviderFunc} from './wallets';
import { useRouter } from 'next/router'
import { Modal } from '@material-ui/core';
import ChangeNetworkModal from './ChangeNetworkModal';
import React ,{useState,useEffect} from 'react'


const MainContainer = styled('div')`
    width: 100vw;
    height: 65px;
    display: flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    background: ${(props)=>props.darkMode?'black':'white'};
    padding-left: 60px;
    padding-right: 60px;

    .light-button{
      width: 24px;
      height: 24px;
      margin-left: 30px;
      cursor: pointer;
    }

    .logo-container{
      width: 250px;
      display: flex;
      flex-direction:row;
      align-items:center;
    }

    .bnug-text{
      margin-left: 5px;
      cursor: pointer;
    }

    .connect-wallet{
      width: 185px;
      height: 40px;
      background: #282828;
      padding: 10px 20px;
      border-radius: 200px;
      border: 1px solid #282828;
      font-size: 16px;
      color: white;
      cursor: pointer;
      margin-left: 60px;
  }


  .connect-wallet-light{
    width: 185px;
    height: 40px;
    background: #EDF2EE;
    padding: 10px 20px;
    border-radius: 200px;
    border: 1px solid #EDF2EE;
    font-size: 16px;
    color: #000000;
    cursor: pointer;
    margin-left: 60px;
}


.connected-wallet{
  width: 100px;
  height: 30px;
  background: #282828;
  border-radius: 200px;
  border: 1px solid #282828;
  font-size: 14px;
  color: #FF0000;
  cursor: pointer;
}


.connected-wallet-light{
width: 100px;
height: 30px;
background: #EDF2EE;

border-radius: 200px;
border: 1px solid #EDF2EE;
font-size: 14px;
color: #FF0000;
cursor: pointer;
}

.address-dark {
  color: white;
}

.address-light {
  color: black;
}

`;




const RoundImage = styled('img')`
    height: 40px;
    width: 40px;
    border-radius:50%;
    margin-left: 12px;
    background: ${(props)=>props.darkMode?'black':'white'};
`;




const TabsDiv = styled('div')`
    width: 550px;
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:flex-start;
    width: 50vw;
    display: flex;
    align-items: center;
    justify-content: center;
  

`;

const TabHeadingsDiv = styled('div')`
    color: #909090;
    margin-left: 10px;
    cursor: pointer;

    padding: 5px 9px;
    background: ${(props)=>props.darkMode?'#1C1C1C':'#EDF2EE'};
    border-radius: 20px;
    min-width: 60px;
    height: 30px;



`;

const TabHeadingsDivActive = styled('div')`
    color: ${(props)=>props.darkMode?'white':'black'};
    cursor: pointer;
    margin-left: 10px;
    padding: 5px 9px;
    background: ${(props)=>props.darkMode?'#1C1C1C':'#EDF2EE'};
    border-radius: 20px;
    min-width: 60px;
    height: 30px;
`;





const ModalContainer = styled('div')`
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -222.5px;
    position: absolute;
    border: ${(props)=>props.darkMode?'1px solid #383838':'none'};
    border-radius: 16px;
    width: 400px;
    height: 445px;
    display: flex;
    flex-direction: column;

    background: ${(props)=>props.darkMode?'black':'white'};

    .connect-text {
      margin-left: 20px;

      margin-top: 30px;
      color: white;
    }

    .terms-div{
      width: 360px;
      height: 99px;
      margin-top: 15px;
      margin-left: 20px;
      background: ${(props)=>props.darkMode?'#111111':'#EDF2EE'};
      color: ${(props)=>props.darkMode?'#919191':'black'};
      border: none;
      border-radius: 16px;
      padding: 15px;
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 15px;
      line-height: 120%;
      margin-bottom: 30px;
    }

    .green{
      color: green;
      text-decoration: underline;
      cursor: pointer;
    }

    .wallet{
      width: 360px;
      height: 48px;
      border: ${(props)=>props.darkMode?'1px solid #383838':'1px solid #EDF2EE'};
      border-radius: 8px;
      cursor: pointer;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding-left: 15px;
      padding-right: 15px;
      margin-left: 20px;
      color: ${(props)=>props.darkMode?'white':'black'};
      font-family: Quicksand;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;

    }
   

`;

const ConnectedDiv = styled('div')`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 330px;

    .chain {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 2px;
      cursor: pointer;
    }

    .chain-light {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 2px;
      cursor: pointer;
      color: black;
    }

    .dropdownIcon {
      margin-left: 2px;
      margin-top: 2px;
    }

`;



function waitforme(milisec) {
  return new Promise(resolve => {
      setTimeout(() => { resolve('') }, milisec);
  })
}

export default function Navbar({setBtn,btn,connected,setConnected,userData,setUserData,darkMode,setDarkMode}) {




  const setDarkModeToggle = ()=>{
    setDarkMode(true);
    sessionStorage.setItem('mode','dark');
  }

  const setLightModeToggle =()=>{
    setDarkMode(false);
    sessionStorage.setItem('mode','white');

  }

  const router = useRouter()
  const [modal,setModal]= useState(false);

  const [changeNetworkModal,setChangeNetworkModal]=useState(false);

  const handleCloseModal = ()=>{
    if(modal){
      setModal(false);
    }
  }

  useEffect(()=>{
    const mode = sessionStorage.getItem('mode');
    if(mode && mode=='white'){
      setDarkMode(false);
    }
  },[])

  useEffect(()=>{
    const prov= sessionStorage.getItem('provider')
    if(prov==1)
    {
       connectMetamaskWallet();
    }
    else if(prov==2)
    {
      connectBSCWallet();
    }
    else if(prov==3)
    {
      connectWalletConnect();
    }
   

  },[])





  const handleConnectClick = async()=>{
    setModal(true);

  }

  const connectMetamaskWallet = async()=>{
    handleCloseModal();
    // await waitforme(2000);
    const resp = await MetamaskConnectProvider();
    if(resp[0] && resp[1] && resp[2] && resp[3])
    {
      sessionStorage.setItem('provider','1');
      const userDetails = {
        address:resp[0],
        balance:resp[1],
        chainId:resp[2],
        provider:resp[3],
        web3: resp[4],
        type: 1
      }
      setUserData(userDetails);
      setConnected(true);
      resp[3].on('chainChanged', (_chainId) => {
        router.reload();
        
    });
    resp[3].on('accountsChanged', (_chainId) => {
      router.reload();
      
  });
    }
    else
    {
      console.log("Response Recieved is null");
    }
  }



  const connectWalletConnect = async()=>{
    handleCloseModal();
    // await waitforme(2000);
    const resp = await WalletConnectProviderFunc();
    if(resp[0] && resp[1] && resp[2] && resp[3])
    {
      sessionStorage.setItem('provider','3');
      const userDetails = {
        address:resp[0],
        balance:resp[1],
        chainId:resp[2],
        provider:resp[3],
        web3: resp[4],
        type: 3
      }
      setUserData(userDetails);
      setConnected(true);
      resp[3].on('chainChanged', (_chainId) => {
        router.reload();
        
    });
    resp[3].on('accountsChanged', (_chainId) => {
      router.reload();
      
  });
    }
    else
    {
      console.log("Response Recieved is null");
    }
  }


  const connectBSCWallet = async()=>{
    handleCloseModal();
    const resp = await BSCConnectProvider();
    console.log(resp);
    if(resp[0] && resp[1] && resp[2] && resp[3])
    {
      sessionStorage.setItem('provider','2');
      const userDetails = {
        address:resp[0],
        balance:resp[1],
        chainId:resp[2],
        provider:resp[3],
        web3: resp[4],
        type :2
      }
      setUserData(userDetails);
      setConnected(true);
      resp[3].on('chainChanged', (_chainId) => {
        router.reload();
        
    });
    resp[3].on('accountsChanged', (_chainId) => {
      router.reload();
      
  });
    }
    else
    {
      console.log("Response Recieved is null");
    }
  }




  const disconnectWallet = ()=>{
    setUserData(null);
    setConnected(false);
    sessionStorage.clear();
  }



    return (
        <>
        <MainContainer darkMode={darkMode}>
          <div className='logo-container'>
              <RoundImage src='./logo.svg' darkMode={darkMode}/>
              <img src ={darkMode?'./svg/bnugtext.svg':'./svg/bnuglogoDark.svg'} onClick={()=>setBtn(0)} className='bnug-text'/>
              <img src ={darkMode?'./svg/lightMode.svg':'./svg/darkMode.svg'} onClick={darkMode?setLightModeToggle:setDarkModeToggle} className='light-button'/>
          </div>
          <TabsDiv darkMode={darkMode}>
          
                { 
                  btn==1 && <TabHeadingsDivActive  darkMode={darkMode}>Stake</TabHeadingsDivActive>
                }
                { 
                  btn!=1 &&   <TabHeadingsDiv  darkMode={darkMode} onClick={()=>setBtn(1)}>Stake</TabHeadingsDiv>
                }
                { 
                  btn==2 && <TabHeadingsDivActive  darkMode={darkMode}>Liquidity</TabHeadingsDivActive>
                }
                { 
                  btn!=2 &&   <TabHeadingsDiv  darkMode={darkMode} onClick={()=>setBtn(2)}>Liquidity</TabHeadingsDiv>
                }
                { 
                  btn==3 && <TabHeadingsDivActive  darkMode={darkMode}><a href="https://snapshot.org/#/bnugdao.eth" target="_blank" rel="noopener noreferrer">Governance</a><span>↗</span></TabHeadingsDivActive>
                }
                { 
                  btn!=3 &&   <TabHeadingsDiv  darkMode={darkMode} ><a href="https://snapshot.org/#/bnugdao.eth" target="_blank" rel="noopener noreferrer">Governance</a><span>↗</span></TabHeadingsDiv>
                }
                { 
                  btn==4 && <TabHeadingsDivActive  darkMode={darkMode}><a href="#" target="_blank" rel="noopener noreferrer">NFT Mart</a><span>↗</span></TabHeadingsDivActive>
                }
                { 
                  btn!=4 &&   <TabHeadingsDiv  darkMode={darkMode}><a href="#" target="_blank" rel="noopener noreferrer">NFT Mart</a><span>↗</span></TabHeadingsDiv>
                }
                { 
                  btn==5 && <TabHeadingsDivActive  darkMode={darkMode}><a href="#" target="_blank" rel="noopener noreferrer">GameFI</a><span>↗</span></TabHeadingsDivActive>
                }
                { 
                  btn!=5 &&   <TabHeadingsDiv  darkMode={darkMode}><a href="#" target="_blank" rel="noopener noreferrer">GameFI</a><span>↗</span></TabHeadingsDiv>
                }
                { 
                  btn==6 && <TabHeadingsDivActive  darkMode={darkMode}><a href="#" target="_blank" rel="noopener noreferrer">Buy BNUG</a><span>↗</span></TabHeadingsDivActive>
                }
                { 
                  btn!=6 &&   <TabHeadingsDiv  darkMode={darkMode}><a href="#" target="_blank" rel="noopener noreferrer">Buy BNUG</a><span>↗</span> <img style={{marginLeft:'5px'}} src='./svg/boxArrowUp.svg'/></TabHeadingsDiv>
                }


                
                {/* {
                  connected && (
                    <div className='address'>{userData.address.substr(0,5)+'...'+userData.address.substr(-8)}</div>
                  )
                } */}
              
            </TabsDiv>

            
            <div >
                {
                  !connected && (
                    <ConnectedDiv>
                    <button className={darkMode?"connect-wallet":"connect-wallet-light"} onClick={handleConnectClick}>Connect to a DeFi Wallet</button>
                    </ConnectedDiv>
                  )
                }

                {
                  connected && (
                    <ConnectedDiv>
                    <div className={darkMode?"address-dark":"address-light"}>{userData.address.substr(0,3)+'...'+userData.address.substr(-3)}</div>
                    <div className={darkMode?'chain':'chain-light'}>
                      
                      <div onClick={()=>setChangeNetworkModal(true)}>Binance Smart Chain</div>
                      <ChangeNetworkModal modal={changeNetworkModal} setChangeNetworkModal={setChangeNetworkModal} darkMode={darkMode} />
                      <img src={darkMode?'./svg/dropDownIcon.svg':'./svg/dropdownIconLight.svg'} className="dropdownIcon"/>

                    </div>
                    <button  className={darkMode?"connected-wallet":"connected-wallet-light"} onClick={disconnectWallet}>Disconnect</button>
                    </ConnectedDiv>
                  )


                }
            </div>

        </MainContainer>
        <Modal
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
        <ModalContainer darkMode={darkMode}>
        <div className='connect-text'>Connect to a DeFi wallet</div>
        <div className='terms-div'>
          By connecting your wallet, you agree to BNUG DAO<span className='green'>Terms of Service </span> and acknowledge that you have read and indeed, understood the <span className='green'> BNUGDAO Group protocol disclaimer.</span>
        </div>
        <div onClick={connectMetamaskWallet} className='wallet'>
           <div> Metamask</div>
           <img src ='./svg/metamask.svg' width="20px" height="20px"/>
          
        </div>
        <div onClick={connectBSCWallet} className='wallet'>
           <div> Binance Smart Chain</div>
           <img src ='./svg/bnb.svg' width="20px" height="20px" /> 
        </div>
        <div onClick={connectWalletConnect} className='wallet'>
           <div> WalletConnect</div>
           <img src ='./svg/walletconnect.svg' width="20px" height="20px" />  
        </div>
        <div onClick={connectWalletConnect} className='wallet'>
           <div>Lead Wallet</div>
           <img src ='./svg/lead.svg' width="20px" height="20px" />  
        </div>
        </ModalContainer >
      </Modal>




        </>
    )
}
