import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';
import Navbar from '../NavBar/navbar';
import axios from 'axios';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [queryResponse, setQueryResponse] = useState({});
    const sendQuery = async(e)=>{
        e.preventDefault();
        const data = await axios.get(`http://localhost:5000/searchTransfers/${searchQuery}`);
        setQueryResponse(data.data);
        console.log(data.data);
    }
  return (
    <div style={{background: '#320A28'}}>
    <Navbar />
    <ParentContainer>
    <h1 style={{color: '#fff'}}>Search</h1>
        <SearchbarContainer>
            <Searchbar type='text' onChange={(e)=>{setSearchQuery(e.currentTarget.value)}} />
            <SearchIcon onClick={(e)=>sendQuery(e)} />
        </SearchbarContainer>
        {
            (queryResponse.message === 'Found')?
            <div>
            <Card>
                                <Information>
                                    <PlayerName>Name: {queryResponse.player}</PlayerName>
                                    <TransferFee>Fee: €{queryResponse.fee}</TransferFee>
                                    <TransferDate>Date: {queryResponse.transferDate}</TransferDate>
                                </Information>
                                <TransferTeams>
                                    <TransferFrom src={(`http://localhost:5000/images/${queryResponse.teamFrom}.svg` !== null || undefined)? `http://localhost:5000/images/${queryResponse.teamFrom}.svg` :`http://localhost:5000/images/notFound.png`} />
                                    <TransferTo src={`http://localhost:5000/images/${queryResponse.teamTo}.svg`} />
                                </TransferTeams>
                            </Card>
            </div>
            :
            <h1 style={{background: '#fff', width: '30rem', height: '12rem', textAlign: "center"}}>{queryResponse.message}</h1>
        }
    </ParentContainer>
    </div>
  )
}

export default SearchPage

const ParentContainer = styled.div`
height: 50rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const SearchbarContainer = styled.div`
background: #fff;
color: #000;
width: 30rem;
height: 2rem;
display: flex;
justify-content: space-between;
`;

const Searchbar = styled.input`
border: none;
outline: none;
height: 1.8rem;
width: 25rem;
font-size: 1.5rem;
font-weight: bold;
`;

const SearchIcon = styled(FaSearch)`
height: 1.8rem;
margin-right: 3px;
cursor: pointer;
`;

const Card = styled.div`
margin-top: 10px;
display: flex;
justify-content: space-around;
background: #fff;
height: 12rem;
width: 30rem;
`;

const Information = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
`;

const PlayerName = styled.h1`
${'' /* font-size: 2em; */}
color: #000;
font-size: 1.0rem;
`;

const TransferFee = styled.h2`
${'' /* font-size: 1.7em; */}
color: #000;
font-size: 0.9rem;
`;

const TransferDate = styled.h3`
${'' /* font-size: 1.2em; */}
color: #000;
font-size: 0.7rem;
`;

const TransferTeams = styled.div`
width: 15rem;
display: flex;
justify-content: space-around;
`;

const TransferFrom = styled.img`
height: 5rem;
margin-top: auto;
margin-bottom: auto;
`;

const TransferTo = styled.img`
height: 5rem;
margin-top: auto;
margin-bottom: auto;
`;