import { Modal } from '@material-ui/core';
import styled from 'styled-components';

const MainContainer = styled('div')`
width: 223px;
height: 276px;

outline: none;
position: absolute;
right: 5%;
top: 6.5%;
background: ${(props)=>props.darkMode?'#111111':'white'};
color: ${(props)=>props.darkMode?'white':'black'};


border: ${(props)=>props.darkMode?'1px solid #282828':'1px solid #EDF2EE'};
box-shadow: 0px 0px 8px rgba(255, 255, 255, 0.05);
border-radius: 16px;

.heading{
    width: 125px;
height: 19px;
left: 20px;
top: 30px;
margin-left: 20px;
margin-top: 30px;
font-family: Quicksand;
font-style: normal;
font-weight: 500;
font-size: 16px;
}

.network-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 190px;
    height: 200px;
    margin-left: 20px;
margin-top: 12px;
}

.card{
    width: 195px;
    height: 48px;
    display: flex;
    flex-direction: row;
    border-radius: 4px;
    cursor: pointer;
    border: 1px solid transparent;
    &:hover {
        border: 1px solid purple;
    }

    .logo{
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .name{
        width: 70%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .active{
        width: 10%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

}



`;


export default function ChangeNetworkModal({modal,setChangeNetworkModal,darkMode}) {

    const handleCloseModal = ()=>{
        setChangeNetworkModal(false);
    }


    return (
        <Modal
        open={modal}
        onClose={handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        BackdropProps={{ invisible: true }}
        >
        <MainContainer darkMode={darkMode}>
            <div className='heading'>Change Network</div>
            
            <div className='network-container'>

                <div className='card'>
                    <div className='logo'>
                        <img src='./svg/bnbtitled.svg'/>
                    </div>
                    <div className='name'>Binance Chain</div>
                    <div className='active'>
                        <img src='./svg/greendot.svg'/>
                    </div>
                </div>


                <div className='card'>
                    <div className='logo'>
                         <img src='./svg/solana.svg'/>
                    </div>
                    <div className='name'>Solana</div>
                    <div className='active'></div>
                </div>

                <div className='card'>
                    <div className='logo'>
                        <img src='./svg/polkadot.svg'/>
                    </div>
                    <div className='name'>Polkadot</div>
                    <div className='active'></div>
                </div>


                <div className='card'>
                    <div className='logo'>
                        <img src='./svg/polygon.svg'/>
                    </div>
                    <div className='name'>Polygon</div>
                    <div className='active'></div>
                </div>


            </div>
        </MainContainer>
        </Modal>
    )
}
