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
        url: '/search',
        data: {
            searchQuery: searchQuery
        }
    });
}

const sendSelection = (selectionID) => {
    return server({
        method: 'get',
        url: '/select',
        data: {
            selectionID: selectionID
        }
    });
}

const prompter = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function promptForQuery(callback) {prompter.question('Please enter a food to search: ', (searchQuery) => {
    console.log(`Results for "${searchQuery}":`)
    sendSearch(searchQuery).then(response => {
        
        let resultIndex = 1
        searchResults = response.data.map(item => ({
            index: resultIndex++,
            fdcId: item.fdcId,
            description: item.description
        }))

        searchResults.forEach(result => {
            console.log(`${result.index}. ${result.description}`)
        });
        callback();
    })
    
})}

function promptForSelection(){prompter.question('Type the number result or "C" to cancel search: ', (input) => {
    selectionID = searchResults.find(result => {
        return result.index == input}).fdcId

        console.log(selectionID)
        
    sendSelection(selectionID).then(response => {
        console.log(response.data)
        
    })
    
})}

promptForQuery(promptForSelection);

  // do a /select here