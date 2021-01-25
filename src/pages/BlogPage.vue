<template>
  <div id="blog-page" class="page d-flex p-3" v-if="blog">
    <!-- <add-blog-component v-if="false"></add-blog-component>
    <blog-modal></blog-modal> -->
    <!-- <hr /> -->
    <!-- <div class="d-flex p-3" id="row"> -->
    <div id="account" class="d-flex flex-column align-items-start col-3 p-0">
      <account-component
        :stats="true"
        :route-buttons="['Account', 'Home']"
        :blog-page="true"
      ></account-component>
    </div>
    <div
      id="blogs"
      class="d-flex flex-column align-items-end col-9 p-0 fancy-scrollbar"
      v-if="blog.title"
    >
      <div
        class="blog-post d-flex flex-column my-3"
        v-if="blog.title || blog.body || blog.imgUrl || blog.tagInput"
      >
        <h4 class="d-flex align-items-end">
          <img
            :src="`https://robohash.org/${blog.name}?set=set1`"
            class="blog-profile-image"
            v-if="blog.name"
          />
          <span class="ml-1 blog-name">{{ blog.name }}</span>
        </h4>
        <p class="blog-tags">
          <span class="blog-tag" v-for="tag in blog.tags" :key="tag">
            #{{ tag }}
          </span>
        </p>
        <div class="card my-2" :class="{ image: blog.imgUrl }" id="blog-card">
          <div
            id="blog-image"
            v-if="blog.imgUrl"
            :style="`background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.5)),
    url(${blog.imgUrl}) repeat center center / cover;`"
          ></div>
          <!-- <img :src="blog.imgUrl" class="blog-image" v-if="blog.imgUrl" /> -->
          <div id="blog-contents" :class="{ image: blog.imgUrl }">
            <h3 class="blog-title">
              {{ blog.title }}
            </h3>
            <div class="blog-body">
              <span v-html="blog.body"></span>
            </div>
            <!-- {{ blog }} -->
            <!-- </router-link> -->
          </div>
        </div>
      </div>
      <!-- </div> -->
      <div id="comments" class="d-flex flex-column my-3">
        <AddCommentComponent :blog-id="blog.id"></AddCommentComponent><br />
        <comment-component
          v-for="comment in comments.reverse()"
          :key="comment.id"
          :comment="comment"
        ></comment-component>
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
// import BlogComponent from '../components/BlogComponent.vue'
import CommentComponent from '../components/CommentComponent.vue'
import AddCommentComponent from '../components/AddCommentComponent.vue'
import { blogService } from '../services/BlogService'
import { commentService } from '../services/CommentService'
import { AppState } from '../AppState'
export default {
  // components: { BlogComponent },
  components: { CommentComponent, AddCommentComponent },
  name: 'BlogPage',
  setup() {
    onMounted(async () => {
      await blogService.getBlog(useRoute().params.id)
      await commentService.getComments(AppState.currBlog.id)
    })
    return {
      blog: computed(() => AppState.currBlog),
      comments: computed(() => AppState.comments)
    }
  }
}
</script>
  <style scoped>
@import "../assets/css/global.css";
@import "../assets/css/account-card.css";
@import "../assets/css/blog.css";
@import "../assets/css/comment.css";
</style>
