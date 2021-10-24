import Head from 'next/head';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import React,{useState, useEffect} from 'react'
import Home from '../components/home/Home';
import ProvideLiquidity from '../components/provideLiquidity/ProvideLiquidity';
import Vault from '../components/vault/Vault';
import styled from 'styled-components';
import More from '../components/more/More';
import Stake from '../components/stake/Stake';


const RouteContainer = styled('div')`
  width: 100vw;
  height: 100vh;
  background: ${(props)=>props.darkMode?'black':'white'};
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;



export default function Main() {

  const [btn,setBtn]= useState(0);
  const [connected,setConnected] = useState(false);
  const [userData,setUserData] = useState(null);
  const [darkMode,setDarkMode]=useState(true);


  useEffect(()=>{


  },[userData])


  return (
    <>
      <Head>
        <title>BNUG.Finance</title>
        <meta name="description" content="Africas first crypto-native organization." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <Navbar btn={btn} setBtn={setBtn} connected={connected} setConnected={setConnected} userData={userData} setUserData={setUserData} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <RouteContainer darkMode={darkMode}>
        {
          btn==0 && (<Home  darkMode={darkMode}  userData={userData} setUserData={setUserData}/>)
        }
        {
          btn==1 && (<Stake darkMode={darkMode} connected={connected} setConnected={setConnected} userData={userData} setUserData={setUserData}/>)
        }
        {
          btn==2 && (<ProvideLiquidity darkMode={darkMode} connected={connected} setConnected={setConnected} userData={userData} setUserData={setUserData}/>)
        }
        {
          btn==3 && (<Vault  darkMode={darkMode} connected={connected} setConnected={setConnected} userData={userData} setUserData={setUserData} />)
        }
        {
          btn==4 && (<More darkMode={darkMode} />)
        }

      </RouteContainer>

      </>
  )
}
