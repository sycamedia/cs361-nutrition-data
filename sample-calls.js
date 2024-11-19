/*
Sycamore Dennis
18 November 2024

Short sample calls to demonstrate the microservice function.
*/

const axios = require('axios');

const server = axios.create({
    baseURL: 'http://localhost:3000'
});

sendSearch = (searchQuery) => {
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

// Sample response with search term "peanuts"
sendSearch("peanuts").then(response => {
    console.log(response.data)
})

// Sample response with fdcId for 'Rose-apples, raw'
// Showing protein, fats, and carbs
sendSelection(168171, "203,204,205").then(response => {
    console.log(response.data)
})