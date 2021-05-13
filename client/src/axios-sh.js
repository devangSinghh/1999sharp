import axios from 'axios'

const instance = axios.create({

    // Base Domain Name

    // baseURL: 'https://1999sharp.co/api' 
    baseURL: 'http://127.0.0.1:8000/api'

})

// export let base = 'https://1999sharp.co/'
export let base = 'http://127.0.0.1:8000/'

export default instance