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
    return axios.get('https://api.nal.usda.gov/fdc/v1/foods/search',
        {
            params: {
                api_key: APIkey,
                query: searchQuery
            }
        }
    );
}

app.post('/search', (req, res) => {
    const { searchQuery } = req.body;

    APIsearch(searchQuery).then(response => {
        console.log(response.data); // Handle the response data

        res.status(201).json({
            message: `Processed query: ${searchQuery}`
        });
    })
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
