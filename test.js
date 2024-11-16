/*
This is a sample client to demonstrate the microservice function.
It uses CLI commands to send the client requests.
*/

const axios = require('axios');
const readline = require('readline')


const server = axios.create({
    baseURL: 'http://localhost:3000'
});

const sendSearch = (searchQuery) => {
    return server({
        method: 'post',
        url: '/search/',
        data: {
            searchQuery: searchQuery
        }
    });
}

const searchPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

searchPrompt.question('Please enter a food to search: ', (searchQuery) => {
    console.log(`Here's your query: ${searchQuery}`)
    sendSearch(searchQuery).then(response => {
        console.log(response.data)
    })
})

  // do a /select here