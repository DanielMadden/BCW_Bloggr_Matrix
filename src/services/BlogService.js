import { AppState } from '../AppState'
import { Blog } from '../models/Blog'
import { accountService } from './AccountService'
import { api } from './AxiosService'

const baseURL = 'api/blogs/'

class BlogService {
  async getBlogs(query = {}) {
    const res = await api.get(baseURL, query)
    AppState.blogs = res.data.reverse().map(data => new Blog(data))
  }

  async getBlog(id) {
    const res = await api.get(baseURL + id)
    AppState.currBlog = new Blog(res.data)
  }

  // async getAccountBlogs() {
  //   // AppState.accBlogs = AppState.blogs.filter(blog => blog.creator.id === AppState.account.id)
  // }

  async addBlog(data) {
    const res = await api.post(baseURL, data)
    accountService.getBlogs()
    return res.data.id
    // this.getBlogs()
  }

  async deleteBlog(id) {
    await api.delete(baseURL + id)
    accountService.getBlogs()
    this.getBlogs()
  }

  async updateBlog(data, id) {
    await api.put(baseURL + id, data)
    this.getBlogs()
  }
}

export const blogService = new BlogService()
