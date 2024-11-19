/*
Sycamore Dennis
18 November 2024

This is a sample CLI client to demonstrate the microservice function
in an interactive context.

Error handling for requests copied from "Axios: Handling Errors,"
accessed 18 Nov 2024 from https://axios-http.com/docs/handling_errors
*/

const axios = require('axios');
const readline = require('readline');

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

const sendSelection = (selectionID, nutrients) => {
    return server({
        method: 'post',
        url: '/select',
        data: {
            selectionID: selectionID,
            nutrients: nutrients
        }
    });
}

const prompter = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function promptForQuery(callback) {
    prompter.question('Please enter a food to search: ', (searchQuery) => {
        sendSearch(searchQuery).then(response => {
            try {
                let resultIndex = 1
                searchResults = response.data.map(item => ({
                    index: resultIndex++,
                    fdcId: item.fdcId,
                    description: item.description
                }))

                console.log(`Nutrition data for "${searchQuery}":`)
                searchResults.forEach(result => {
                    console.log(`${result.index}. ${result.description}`)
                });

                callback();

            } catch {
                console.log(`No results for "${searchQuery}." Try another search.`)
                promptForQuery(promptForSelection);
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
            promptForQuery(promptForSelection);
        });
    })
}

function displayNutrients(item) {
    let nutrientResults = []

    nutrientResults = item.foodNutrients.map(item => ({
        name: item.name,
        amount: item.amount,
        unit: item.unitName
    }))

    console.log(`Results for "${item.description}":`)
    nutrientResults.forEach(result => {
        console.log(`${result.name}: ${result.amount} ${result.unit}`)
    });
}

function promptForSelection() {
    prompter.question('Type the number of the result you want to see, or "C" to cancel search: ', (input) => {
        selected = searchResults.find(result => {
            return result.index == input
        })

        // Hard-coded nutrient filters for the sake of demonstration
        let sampleNutrients = "203,204,205" 

        if (selected) {
            sendSelection(selected.fdcId, sampleNutrients).then(response => {
                displayNutrients(response.data)
                promptForQuery(promptForSelection);
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
        }
        else if (input == "C") {
            console.log("Cancelled search")
            promptForQuery(promptForSelection);
        }
        else {
            console.log("Invalid input")
            promptForSelection()
        }
    })
}

promptForQuery(promptForSelection);