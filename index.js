/*
Express setup based on example from "Express: Hello World Example,"
accessed 16 November from https://expressjs.com/en/starter/hello-world.html
*/

const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const APIkey = ""

app.use(express.json());    // Parses JSON request bodies

// Request to API
const APIsearch = (searchQuery) => {
    return axios.get('https://api.nal.usda.gov/fdc/v1/foods/list',
        {
            params: {
                api_key: APIkey,
                query: searchQuery,
                dataType: "Foundation",
                pageSize: 10
            }
        }
    );
}

// Receive & respond to request from client
app.post('/search', (req, res) => {
    const { searchQuery } = req.body;

    APIsearch(searchQuery).then(APIresponse => {
        console.log(APIresponse.data);

        res.status(201).json(APIresponse.data);
    })
});

// Request to API
const APIselect = (selectionID) => {
    return axios.get(`https://api.nal.usda.gov/fdc/v1/food/${selectionID}`,
    {
        params: {
            api_key: APIkey
        }
    })
}

// Receive & respond to request from client
app.post('/select', (req, res) => {
    const { selectionID } = req.body;

    APIselect(selectionID).then(APIresponse => {
        console.log(APIresponse.data);

        res.status(201).json(APIresponse.data);
    })
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
