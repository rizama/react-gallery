import axios from 'axios'
import { hostPlaceholder } from '../configs/host'

// GET
const GET = (path) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { data } = await axios.get(`${hostPlaceholder}/${path}`)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}


const API = {
    GET
}

export default API