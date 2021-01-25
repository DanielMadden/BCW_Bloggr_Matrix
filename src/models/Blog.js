export class Blog {
  constructor(data) {
    // Visible
    this.title = data.title
    this.body = data.body
    this.imgUrl = data.imgUrl
    this.name = data.creator.name.split('@', 1)[0]

    // Sorting
    this.tags = data.tags
    this.id = data.id
    this.createdAt = data.createdAt
    this.creator = data.creator

    // Draft/Published
    this.published = data.published
  }
}
