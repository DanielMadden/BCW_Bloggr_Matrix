import { AppState } from '../AppState'
import { Blog } from '../models/Blog'
import { Comment } from '../models/Comment'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const baseURL = '/account/'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get(baseURL)
      AppState.account = res.data
      this.getBlogs()
      this.getComments()
      // logger.log(AppState.account)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getBlogs() {
    try {
      const res = await api.get(baseURL + 'blogs')
      AppState.accBlogs = res.data.map(data => new Blog(data)).reverse()
    } catch (error) {
      logger.error(error)
    }
  }

  async getComments() {
    try {
      const res = await api.get(baseURL + 'comments')
      AppState.accComments = res.data.map(data => new Comment(data)).reverse()
    } catch (error) {
      logger.error(error)
    }
  }

  async changeName(name) {
    try {
      console.log(name)
      await api.put(baseURL, { name: name })
      const res = await api.get(baseURL)
      AppState.account = res.data
    } catch (error) {
      logger.error(error)
    }
  }
}

export const accountService = new AccountService()
