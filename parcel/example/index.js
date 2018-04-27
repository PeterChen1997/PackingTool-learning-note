// const jokes = require('./jokes')
import { jokes } from './jokes'
import fs from 'fs'

jokes.getOne()
    .then(data => {
        data = data.data
        let joke = document.querySelector('.joke')
        joke.textContent = data.value.joke
    })

const copy = fs.readFileSync(__dirname + '/copyright.txt', 'utf8')

console.log(copy)