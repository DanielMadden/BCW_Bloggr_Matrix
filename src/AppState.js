import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  accountView: 'Stats',
  blogs: [],
  accBlogs: [],
  currBlog: {},
  // previewBlog: null,
  comments: [],
  accComments: [],
  drafts: []
})

// computed(() => AppState.blogs.filter(blog => blog.creatorId === AppState.account.creator.id)),
