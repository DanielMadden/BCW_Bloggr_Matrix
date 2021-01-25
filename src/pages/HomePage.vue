<template>
  <div id="home" class="page d-flex p-3">
    <!-- <add-blog-component v-if="false"></add-blog-component>
    <blog-modal></blog-modal> -->
    <!-- <hr /> -->
    <!-- <div class="d-flex p-3" id="row"> -->
    <div id="account" class="d-flex flex-column align-items-start col-3 p-0">
      <account-component
        :stats="true"
        :route-buttons="['Account', 'Add Blog']"
        :blog-page="false"
      ></account-component>
    </div>
    <div
      id="blogs"
      class="d-flex flex-column align-items-end col-9 p-0 fancy-scrollbar"
    >
      <blog-component
        v-for="blog in blogs"
        :key="blog.id"
        :blog="blog"
      ></blog-component>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import BlogComponent from '../components/BlogComponent.vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
// import AddBlogComponent from '../components/AddBlogComponent.vue'
// import MatrixComponent from '../components/MatrixComponent.vue'
import AccountComponent from '../components/AccountComponent.vue'
// import BlogModal from '../components/BlogModal.vue'
export default {
  components: { BlogComponent, AccountComponent },
  name: 'Home',
  setup() {
    onMounted(() => {
      blogService.getBlogs()
      AppState.currBlog = {}
      AppState.comments = []
    })
    return {
      blogs: computed(() => AppState.blogs)
    }
  }
}
</script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/home.css";
@import "../assets/css/account-card.css";
@import "../assets/css/blog.css";
#home {
  /* text-align: center; */
  user-select: none;
}
/* > img {
    height: 200px;
    width: 200px;
  } */
/* } */
</style>
