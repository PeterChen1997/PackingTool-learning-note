// common js syntax
// module.exports = {
//     getOne: function() {
//         return fetch('http://api.icndb.com/jokes/random')
//             .then(res => res.json())
//     }
// }


// es6 module syntax
import axios from 'axios'

// export const jokes = {
//     getOne: function() {
//         return fetch('http://api.icndb.com/jokes/random')
//             .then(res => res.json())
//     }
// }
export const jokes = {
    getOne: function() {
        return new Promise((resolve, reject) => {
            axios.get('http://api.icndb.com/jokes/random')
                .then(res => {
                    resolve(res)
                })
        })
        // return axios.get('http://api.icndb.com/jokes/random')
    }
}