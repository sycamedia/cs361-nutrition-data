/*
Sycamore Dennis
18 November 2024

Food Database Microservice

This program interfaces between a client program and the 
USDA FoodData Central API (https://fdc.nal.usda.gov/api-guide.html)
to perform searches for nutritional profiles of food items. 
Data is transferred via HTTP requests.

Express setup based on example from "Express: Hello World Example,"
accessed 16 Nov from https://expressjs.com/en/starter/hello-world.html

Error handling for requests copied from "Axios: Handling Errors,"
accessed 18 Nov 2024 from https://axios-http.com/docs/handling_errors
*/

const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000
const APIkey = "" // add your API key here

app.use(express.json());    // Parses JSON request bodies

// Request to API
const APIsearch = (searchQuery) => {
    return axios.get('https://api.nal.usda.gov/fdc/v1/foods/list',
        {
            params: {
                api_key: APIkey,
                query: searchQuery,
                dataType: "Foundation,SR Legacy,Survey",
                pageSize: 10
            }
        }
    );
}

// Receive & respond to request from client
app.post('/search', (req, res) => {
    const { searchQuery } = req.body;
    APIsearch(searchQuery).then(APIresponse => {
        if (APIresponse.status == 404) {
            console.log("caught a bad one")
            res.status(404).json(`No results for ${searchQuery}`);
        }
        else {
            console.log("Response: ", APIresponse.data);

            res.status(201).json(APIresponse.data);
        }
    }).catch(function (error) {
        if (error.response) {
            // Request was made; server responded with a status code beyond 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    });
});

// Request to API
const APIselect = (selectionID, nutrients) => {
    return axios.get(`https://api.nal.usda.gov/fdc/v1/food/${selectionID}`,
        {
            params: {
                api_key: APIkey,
                format: "abridged",
                nutrients: nutrients
            }
        }
    )
}

// Receive & respond to request from client
app.post('/select', (req, res) => {
    const { selectionID, nutrients} = req.body;
    APIselect(selectionID, nutrients).then(APIresponse => {
        console.log(APIresponse.data);
        res.status(201).json(APIresponse.data);
    }).catch(error => {
        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
        } else if (error.request) {
            console.error("Error request:", error.request);
        } else {
            console.error("Error message:", error.message);
        }
    })
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
