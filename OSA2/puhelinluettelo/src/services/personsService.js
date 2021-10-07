/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
/* const baseUrl = 'http://localhost:3002/api/persons'
 */

/* const baseUrl = 'https://fullstack21puhelinluettelo.herokuapp.com/api/persons'
 */

const baseUrl = 'api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPersonObject => {
    return axios.post(baseUrl, newPersonObject)
}

const update = (id, newPersonObject) => {
    return axios.put(`${baseUrl}/${id}`, newPersonObject)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    deletePerson
}


