//add this before defining our queue
import cq from 'concurrent-queue'
//add this when testing the response from the API
import fetch from 'node-fetch'
//add this when defining our doc
import { v4 as uuid } from 'uuid'
//import our configured Sanity client
import { studioClient } from './studioClient'


//here, we set up our queue to run our mutations without hitting the API too quickly
const queue = cq().limit({ concurrency: 2 }).process(task => 
    new Promise((resolve, reject) => {
      console.log('Starting cat creation...')
      setTimeout(resolve.bind(undefined, task), 1000)
    })
  )

//specify the url we're going to call
const url = 'https://api.thecatapi.com/v1/breeds'

//fetch the image and return it as a buffer
const getImage = (url) => {
  return fetch(url).then(res => res.buffer())
}

//add the image to the content lake
const uploadAsset = async (url) => {
  return studioClient.assets.upload('image', await getImage(url))
}

const createCats = async () => {
  //first, lets make sure that we're getting a respnse from the API
  const catData = await fetch(url, {
    method: 'GET',
    headers: {
      'x-api-key': '<ask-RLP-for-API-key>'
    }
  }).then(res => res.json())

  //then, we'll loop through each cat and create a new document for each one
  for (const cat of catData) {
    //add our function to the queue
    queue(cat).then(async () => {
      //upload the image to Sanity
      const image = await uploadAsset(cat.image.url)
      //create an object that matches the schema we're using
      const catDoc = {
        _id: uuid(),
        _type: 'cat',
        name: cat.name,
        image: { 
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: image._id
          }},
        description: cat.description,
        temperament: cat.temperament,
        wikipediaUrl: cat.wikipedia_url,
        originLocation: cat.origin,
        traits: {
          energyLevel: cat.energy_level,
          intelligenceLevel: cat.intelligence,
          affectionLevel: cat.affection_level,
          dogFriendly: cat.dog_friendly
        }
      }

      //now, we'll write our document to the content lake using the Sanity client
      studioClient.create(catDoc)
        .then(res => console.log(`${res.name} created`))
        .catch(err => console.log(`${cat.name} failed to create: ${err.message}`))
    })
  }
}


createCats()