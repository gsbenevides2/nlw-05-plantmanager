import axios from 'axios'

const api = axios.create({
  baseURL: 'http://google.gui.dev.br:3001'
})

export default api
