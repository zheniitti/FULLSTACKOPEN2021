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

/* {
  "persons":[
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]
} */


