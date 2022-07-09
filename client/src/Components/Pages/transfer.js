import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Navbar from '../NavBar/navbar';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

const TransferPage = () => {
    const navigate = useNavigate();
    const [selectData, setSelectData] = useState([]);
    const [player, setPlayer] = useState('');
    const [fee, setFee] = useState(0);
    const [fromTeam, setFromTeam] = useState();
    const [toTeam, setToTeam] = useState();
    const [status, setStatus] = useState('');
    useEffect(()=>{
        axios.get(`http://localhost:5000/getTeams`)
        .then(response=>setSelectData(response.data));
    }, []);

    const getDate = ()=>{
        const fullDate = new Date();
        const date = fullDate.getDate();
        const month = fullDate.getMonth()+1;
        const year = fullDate.getFullYear();
        var returnDate = `${year}`;
        if(month<10)
            returnDate = returnDate + `-0${month}`;
        else
            returnDate = returnDate+`${month}`;
        if(date<10)
            returnDate = returnDate + `-0${date}`;
        else
            returnDate = returnDate+`-${date}`;
            return returnDate;
    }

    const formSubmit = (e)=>{
        e.preventDefault();
        getDate();
        var data = {
            player: player,
            fee: fee,
            teamFrom: fromTeam,
            teamTo: toTeam,
            transferDate: getDate()
        }
        if(data.player.length===0 || !data.teamFrom || !data.teamTo){
            setStatus('Incorrect Input');
            return;
        }
        axios.post(`http://localhost:5000/transfers`, data)
        .then(response=>setStatus(response.data.status));
    }
    useEffect(()=>{
        if(status === 'Transferred')
        navigate('/');
    }, [status]);
  return (
    <div  style={{background: '#320A28', color: '#fff'}}>
    <Navbar />
    <div style={{marginTop: '5em'}}>
    {
        status.length>0 ? 
        <h1 style={{textAlign: 'center'}}>{status}</h1>
        :
        <></>
    }
        <FormContainer>
            <Form>
            <FormLabel>
            Player Name
            </FormLabel>
                <FormInput type='text' onChange={(e)=>{setPlayer(e.target.value)}} />
                <FormLabel>
                Transfer Fee(in Euros)
                </FormLabel>
                <FormInput type='number' onChange={(e)=>{setFee(e.target.value)}} />
                <FormLabel>From Team</FormLabel>
                <FormSearch options={selectData.map((obj)=>{return {value: obj.id, label: obj.name}})} onChange={(e)=>{setFromTeam(e.value)}} />
                <FormLabel>
                To Team
                </FormLabel>
                <FormSearch options={selectData.map((obj)=>{return {value: obj.id, label: obj.name}})} onChange={(e)=>{setToTeam(e.value)}} />
                <FormButton onClick={e=>formSubmit(e)}>Submit</FormButton>
            </Form>
        </FormContainer>
    </div>
    </div>
    
  )
}

export default TransferPage


const FormContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
overflow: hidden;
height: 40em;
`;

const Form = styled.form`
display: flex;
flex-direction: column;
height: 35em;
width: 25em;
background: #000;
align-items: center;
justify-content: center;
`;

const FormInput = styled.input`
font-size: 1.5em;
border-radius: 5px;
width: 10em;
`;

const FormSearch = styled(Select)`
width: 15em;
color: #000;
`;

const FormButton = styled.button`
margin-top: 2em;
margin-bottom: 2em;
border: none;
outline: none;
padding: 1em;
width: 20em;
color: #000;
background: #fff;
cursor: pointer;
:hover{
    background: #320A28;
    color: #fff;
}
`;

const FormLabel = styled.label`
font-size: 1.8em;
margin-top: 1.2em;
`;
