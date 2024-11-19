# USDA Food Database Microservice

Performs searches of nutrition data in the USDA FoodData Central database via HTTP requests. Includes sample calls and a sample client to demonstrate use.

## Setup

### Requirements

* `node`: ^22.9.0 or higher

### Dependencies 

* `axios` ^1.7.7
* `express` ^4.21.1

### Installation

1. Clone the repository: `git clone https://github.com/username/repository.git` (or your preferred cloning method)

2. Install dependencies: `npm install`

### Additional Setup

:warning: **Important:** You need to [get an API key from FoodData Central](https://fdc.nal.usda.gov/api-key-signup.html). Paste this key into the designated variable declaration in `microservice.js`.

This microservice is set up to work with a client over localhost. Make sure the port number in `microservice.js` is correct for your setup.

## Requesting Data

### Searching for an Item

Send a request to the `/search` endpoint with a search term to get a list of up to 10 related results.

Example call for initial search:

```
const sendSearch = (searchQuery) => {
    return server({
        method: 'post',
        url: '/search',
        data: {
            searchQuery: searchQuery
        }
    });
}

sendSearch("peanuts")
```

### Selecting a Search Result

Send a request to the `/select` endpoint with the fdcId number of the desired item (can be obtained from previous search results) to see its nutrition data.

Example call for result selection:

```
const sendSelection = (selectionID, nutrients = "") => {
    return server({
        method: 'post',
        url: '/select',
        data: {
            selectionID: selectionID,
            nutrients: nutrients
        }
    });
}

sendSelection(2515376, "203,204,205")
```

### Filtering Nutrients

When selecting the individual food item to view, you can filter the nutrients shown by passing a string of comma-separated codes in your request. An empty string shows all of the food item's associated nutrients. Here are some of the nutrient codes:
* 203 - protein
* 204 - fat
* 205 - carbs
* 301 - calcium
* 303 - iron
* 304 - magnesium
* 306 - potassium
* 307 - sodium

(There are many more, but I couldn't find a list of them. You can see lots of them in selection results if you leave the nutrients parameter empty.)

## Receiving Data

Data can be accessed as a JSON object from `response.data`.

### Receiving Search Results

The initial search returns a list of up to 10 food item objects in the "abridged" format. 

Example of handling response from initial search (will print the list of objects):

```
sendSearch("peanuts").then(response => {
    console.log(response.data)
})
```
### Receiving Nutrition Data

Requests to the `/select` endpoint return a food item as a JSON object. Nutrient information is found in a list of nutrient objects within the foodNutrients attribute.

Example of handling response from item selection (will print the food item object):

```
sendSelection(168171, "203,204,205").then(response => {
    console.log(response.data)
})
```

Format data as desired for your UI. `sample-client.js` gives an example of formatting the data to look nice in a CLI app.

## UML Diagram
![UML Diagram](/img/UML.png "UML sequence diagram")
