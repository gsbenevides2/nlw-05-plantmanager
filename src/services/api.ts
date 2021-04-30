import axios from 'axios'

const api = axios.create({
  baseURL: 'https://gsbenevides-server.herokuapp.com/'
})

export default api
