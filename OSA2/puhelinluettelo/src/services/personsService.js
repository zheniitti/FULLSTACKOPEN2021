/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}



const create = newPersonObject => {
    return axios.post('http://localhost:3001/persons/', newPersonObject)
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




