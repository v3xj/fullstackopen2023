import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createNew = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = axios.post(baseUrl, newObject, config)
  return response.data
}

const addLike = async updatedObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = axios.put(baseUrl + "/" + updatedObject.id, updatedObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createNew, addLike }