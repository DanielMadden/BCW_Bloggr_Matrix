import { AppState } from '../AppState'
import { Comment } from '../models/Comment'
import { accountService } from './AccountService'
import { api } from './AxiosService'

const baseURL = 'api/comments/'

class CommentService {
  async getComments(blogId) {
    const res = await api.get('api/blogs/' + blogId + '/comments')
    AppState.comments = res.data.map(data => new Comment(data))
  }

  async addComment(form) {
    await api.post(baseURL, form)
    accountService.getComments()
    this.getComments(form.blog)
  }

  async deleteComment(comment) {
    await api.delete(baseURL + comment.id)
    accountService.getComments()
    this.getComments(comment.blogId)
  }

  async editComment(comment, newBody) {
    await api.put(baseURL + comment.id, { body: newBody })
    this.getComments(comment.blogId)
  }
}

export const commentService = new CommentService()
