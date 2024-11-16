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

app.post('/search', (req, res) => {
    const { searchQuery } = req.body;

    APIsearch(searchQuery).then(APIresponse => {
        console.log(APIresponse.data);

        res.status(201).json(APIresponse.data);
    })
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
