/** Command-line tool to generate Markov text. */
const MarkovMachine = require("./markov")
const fs = require('fs');
const axios = require('axios')

function generateText(text) {
    const mm  = new MarkovMachine.MarkovMachine(text);
    console.log(mm.makeText())
}

function makeText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("ERROR-FS: ", err)
            process.kill(1)
        }
        generateText(data)
    })
}

async function makeTextUrl(url) {
    let resp;
    try {
        resp = await axios.get(url)
    } catch(err) {
        console.log("ERROR-AXIOS: ", err)
        process.kill(1)
    }
    generateText(resp.data)
}

if (process.argv[2] === "file") {
    console.log(makeText(process.argv[3]))
    makeText(process.argv[3])
} else if (process.argv[2] === "url") {
    makeTextUrl(process.argv[3])
}





// One popular library in NPM that can strip out HTML from Axios received data is called striptags.

// striptags is a small, fast JavaScript library that strips HTML tags from a string. It is designed to be lightweight and easy to use. It can be installed via NPM using the following command:

// Copy code
// npm install striptags
// Here is an example of how to use striptags to remove HTML from an Axios response:

// javascript
// Copy code
// const axios = require('axios');
// const striptags = require('striptags');

// axios.get('https://www.example.com/')
//   .then(function (response) {
//     const strippedResponse = striptags(response.data);
//     console.log(strippedResponse);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });