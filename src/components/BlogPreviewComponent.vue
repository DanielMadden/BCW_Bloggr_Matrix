<template lang="">
  <div class="blog-post d-flex flex-column my-3" v-if="state.blog">
    <h4 class="d-flex align-items-end">
      <img :src="`https://robohash.org/${state.name}?set=set1`" class="blog-profile-image" />
      <span class="ml-1 blog-name">{{ state.name }}</span>
    </h4>
    <div class="card blog-card my-2" :class="{'image':state.blog.imgUrl}">
      <div class="blog-image"
           v-if="state.blog.imgUrl"
           :style="`background: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.2)),
    url(${state.blog.imgUrl}) no-repeat center center / cover;`"
      ></div>
      <!-- <img :src="blog.imgUrl" class="blog-image" v-if="blog.imgUrl" /> -->
      <div class="blog-contents" :class="{'image':state.blog.imgUrl}">
        <h3 class="blog-title">
          {{ state.blog.title }}
        </h3>
        <span v-for="tag in state.blog.tags" :key="tag">{{ tag }}</span>
        <div class="blog-body">
          {{ state.blog.body }}
        </div>
        <!-- {{ blog }} -->
        <!-- </router-link> -->

        <!-- <div class="blog-card-fade" v-if="blog.body.length > 200"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
// import { blogService } from '../services/BlogService'
// import { api } from '../services/AxiosService'
export default {
  name: 'BlogPreviewComponent',
  setup() {
    const state = reactive({
      blog: computed(() => AppState.previewBlog),
      name: computed(() => AppState.user.nickname)
    })
    return {
      // userId: computed(() => AppState.account.id),
      state
    }
  }
}
</script>
<style scoped>
/* @import "../assets/css/global.css"; */
/* .blog-image {
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(blog.imgUrl) no-repeat center center / cover;
} */
</style>
