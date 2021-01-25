export class Comment {
  constructor(data) {
    this.body = data.body
    this.blogId = data.blog
    this.id = data.id
    this.name = data.creator.name.split('@', 1)[0]

    // For reference
    this.creator = data.creator
  }
}
