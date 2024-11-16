/*
This is a sample client to demonstrate the microservice function.
It uses CLI commands to send the client requests.
*/

const axios = require('axios');
const readline = require('readline')
let searchResults;


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

const selectPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

searchPrompt.question('Please enter a food to search: ', (searchQuery) => {
    console.log(`Results for "${searchQuery}":`)
    sendSearch(searchQuery).then(response => {
        
        let resultIndex = 1
        searchResults = response.data.map(item => ({
            index: resultIndex++,
            description: item.description
        }))

        searchResults.forEach(result => {
            console.log(`${result.index}. ${result.description}`)
        });
    })
})

selectPrompt.question('Type the number result or "Cancel" to cancel search')

  // do a /select here