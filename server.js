const fs = require('fs');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const readLine = require('readline');
const path = require('path');

const app = express();
const port = 5000 || process.env.PORT;
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true, 
    exposedHeaders: 'auth_token'
}));

app.use(express.urlencoded({extended: true}));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, "images")));

app.listen(port, ()=>{
    console.log(`Connected to port ${port}`);
});

const read = ()=>{
    const fd = fs.openSync(`./Files/transfers.txt`);
    const readData = fs.readFileSync(fd).toString().split('\n');
    const returnData = [];
    readData.forEach((obj)=>{
        returnData.push(JSON.parse(obj));
    });
    fs.closeSync(fd);
    return returnData;
}


const dynamicSort = (property)=> {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return  (a,b) => {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}



app.get(`/transfers`, (req, res)=>{
    const readData = read();
    res.send(readData);
})



app.post(`/transfers`, (req, res)=>{
    const fdesc = fs.openSync('./Files/transfers.txt', 'a+');
    const index = fs.readFileSync('./Files/transfers.txt', 'utf-8').split('\n').length;
    const dataToAppend = req.body;
    dataToAppend.transferId = index + 1;
    fs.appendFileSync(fdesc, '\n'+JSON.stringify(dataToAppend));
    res.send({status: 'Transferred'});
    fs.closeSync(fdesc);
})



app.get(`/transferSort/:sortBy`, (req, res)=>{
    const dataRead = read();
    dataRead.sort(dynamicSort(req.params.sortBy));
    res.send(dataRead);
})



app.delete(`/transfers/:transferId`, (req, res)=>{
    const dataRead = read();
    const writeData = dataRead.filter((obj)=>{
        return obj.transferId !== Number(req.params.transferId)
    });
    const fdesc = fs.openSync('./Files/transfers.txt', 'a+');
    writeData.forEach((obj, i)=>{
       if(i===0){
           fs.writeFileSync('./Files/transfers.txt', JSON.stringify(obj), {flag: 'w'});
           return;
       }
       fs.appendFileSync(fdesc, '\n'+JSON.stringify(obj));
    })
    res.send('Delete initiated');
    fs.closeSync(fdesc);
})


app.get('/getTeams', (req, res)=>{
    const teamData = fs.readFileSync('./Files/teams.txt').toString().split('\n');
    const returnData = [];
    teamData.forEach((obj)=>{
        returnData.push(JSON.parse(obj));
    });
    res.send(returnData);
});

app.get(`/searchTransfers/:query`, async(req, res)=>{
    const readStream = fs.createReadStream('./Files/transfers.txt');

    const readData = readLine.Interface({
        input: readStream,
        crlfDelay: Infinity
    });

    for await (const line of readData){
        let parsedData = JSON.parse(line.toString());
        if(parsedData.player === req.params.query){
            parsedData.message = 'Found'
            res.send(parsedData);
            return;
        }
    }
    res.send({message: 'Not Found'});
})





app.get('/test/:id', async(req, res)=>{
    var config = {
        method: 'get',
        url: `https://api.football-data.org/v4/competitions/${req.params.id}/teams`,
        headers: {"X-Auth-Token": '2b945be7ee5e4a739e9288a8d0e8a215'}      
    }
    const getData = await axios(config).then(response=>response.data);
    getData.teams.forEach((obj, i)=>{
        const writeData = {
            id: obj.id,
            name: obj.name
        }
        fs.appendFileSync('./Files/teams.txt', JSON.stringify(writeData)+'\n');
    })
    res.send(getData);
});



