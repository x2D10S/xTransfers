import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {CircleLoader} from 'react-spinners/'

const Body = () => {
    const [data, setData] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        axios.get(`http://localhost:5000/transfers`)
        .then(response=>{setData(response.data);
            console.log(response.data);
            setTimeout(()=>{
            setLoading(false);
        }, 800);})
        .catch(error=>console.log(error));
    }, []);
    useEffect(()=>{
        if(sortBy.length !== 0)
        axios.get(`http://localhost:5000/transferSort/${sortBy}`)
        .then(response=>{setData(response.data); setTimeout(()=>{
            setLoading(false);
        }, 800)});
    }, [sortBy]);

    useEffect(()=>{
        axios.get(`http://localhost:5000/images/44.png`).then(response=>[console.log(response.status)]);
    }, []);
//   return (
  
//     <div style={{background: '#320A28', color: '#fff'}}>
//     <ParentContainer>
//     {
//         loading? 
//         <Loader>
//         <CircleLoader size='100'/>
//     </Loader>
//     :
//     <div>
//     <SelectionContainer>
//         <SortSelector onChange={(e)=>{setSortBy(e.target.value); setLoading(true);}}>
            // <SortOption disabled selected>Sort By</SortOption>
            // <SortOption value="player">Name ascending</SortOption>
            // <SortOption value="-player">Name descending</SortOption>
            // <SortOption value="fee">Fee ascending</SortOption>
            // <SortOption value="-fee">Fee descending</SortOption>
            // <SortOption value="transferDate">Date ascending</SortOption>
            // <SortOption value="-transferDate">Date descending</SortOption>
//         </SortSelector>
//     </SelectionContainer>
//     <TableContainer>
//         <TransferTable>
//         <TableHead>
//             <TableHeadRow>
//                 <TableHeadData>Name</TableHeadData>
//                 <TableHeadData>From</TableHeadData>
//                 <TableHeadData>To</TableHeadData>
//                 <TableHeadData>Fee</TableHeadData>
//                 <TableHeadData>Date</TableHeadData>
//             </TableHeadRow>
//         </TableHead>
//         <TableBody>
//                 {
//                     data?.length && data.map((obj)=>{
//                         return(<>
//                             <TableBodyRow>
//                                 <TableBodyData>{obj.player}</TableBodyData>
//                                 <TableBodyData>{obj.teamFrom}</TableBodyData>
//                                 <TableBodyData>{obj.teamTo}</TableBodyData>
//                                 <TableBodyData>€{obj.fee}</TableBodyData>
//                                 <TableBodyData>{obj.transferDate}</TableBodyData>
//                             </TableBodyRow>
//                         </>)
//                     })
//                 }
//         </TableBody>
//         </TransferTable>
//     </TableContainer>
//     </div> 


//     }
    
//     </ParentContainer>
//     </div>
//   )
// }
return(
    <div style={{background: '#320A28', color: '#fff'}}>
    <ParentContainer>
        {
            loading? 
            <Loader>
            <CircleLoader size='100'/>
            </Loader>
            :
            <div>
            <BodyContainer>
                <InformationContainer>
                <SelectionContainer>
                <SortSelector onChange={(e)=>{setSortBy(e.target.value); setLoading(true);}}>
                <SortOption disabled selected>Sort By</SortOption>
            <SortOption value="player">Name ascending</SortOption>
            <SortOption value="-player">Name descending</SortOption>
            <SortOption value="fee">Fee ascending</SortOption>
            <SortOption value="-fee">Fee descending</SortOption>
            <SortOption value="transferDate">Date ascending</SortOption>
            <SortOption value="-transferDate">Date descending</SortOption>
                </SortSelector>
                </SelectionContainer>
                <CardContainer>
                    {/* <Card>
                        <Information>
                            <PlayerName>A</PlayerName>
                            <TransferFee>B</TransferFee>
                            <TransferDate>C</TransferDate>
                        </Information>
                        <TransferTeams>
                            <TransferFrom src='#' />
                            <TransferTo src='#' />
                        </TransferTeams>
                    </Card> */}
                    {
                        data?.length && data.map((obj)=>{
                            return(<Card>
                                <Information>
                                    <PlayerName>Name: {obj.player}</PlayerName>
                                    <TransferFee>Fee: €{obj.fee}</TransferFee>
                                    <TransferDate>Date: {obj.transferDate}</TransferDate>
                                </Information>
                                <TransferTeams>
                                    <TransferFrom src={(`http://localhost:5000/images/${obj.teamFrom}.svg` !== null || undefined)? `http://localhost:5000/images/${obj.teamFrom}.svg` :`http://localhost:5000/images/notFound.png`} />
                                    <TransferTo src={`http://localhost:5000/images/${obj.teamTo}.svg`} />
                                </TransferTeams>
                            </Card>)
                        })
                    }
                </CardContainer>
                </InformationContainer>
                <ImageContainer>
                <Image src={`http://localhost:5000/images/home.png`} />
                </ImageContainer>
            </BodyContainer>
            </div>
        }
    </ParentContainer>
    </div>
)
}
export default Body

const ParentContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
${'' /* height: 50em; */}
${'' /* overflow: scroll;
::-webkit-scrollbar {
  display: none;
}
-ms-overflow-style: none;  
  scrollbar-width: none; */}
`;

const SelectionContainer = styled.div`
margin-top: 3em;
`;

const SortSelector = styled.select`
height: 2em;
width: 10em;
border: none;
outline: none;
`;

const SortOption = styled.option`
`;

const Loader = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-top: 30%;
margin-bottom: 30%;
`;

const BodyContainer = styled.div`
display: flex;
`;

const InformationContainer = styled.div`
display: flex;
flex-direction: column;
height: 45rem;
overflow-y: scroll;
-ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar{
    displaY: none;
  }
`;

const ImageContainer = styled.div`
height: 40rem;
display: flex;
align-items: center;
justify-content: center;
`;

const Image = styled.img`
height: 30rem;
width: 30rem;
margin-top: auto;
margin-bottom: auto;
`;

const CardContainer = styled.div`
${'' /* display: flex;
flex-direction: column;
justify-content: space-between; */}
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