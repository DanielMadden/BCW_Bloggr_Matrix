<template lang="">
  <div class="blog-post d-flex flex-column my-3">
    <h4 class="d-flex align-items-end">
      <img :src="`https://robohash.org/${blog.name}?set=set1`" class="blog-profile-image" />
      <span class="ml-1 blog-name">{{ blog.name }}</span>
    </h4>
    <p class="blog-tags">
      <span class="blog-tag" v-for="tag in blog.tags" :key="tag">#{{ tag }}</span>
    </p>
    <router-link
      :to="`/blog/${blog.id}`"
    >
      <div class="card blog-card my-2" :class="{'image':blog.imgUrl}">
        <!-- <router-link :to="`/blog/${blog.id}`"> -->
        <!-- <button v-if="blog.creator.id==userId" @click="deleteBlog()">
          Delete
        </button> -->
        <div class="blog-image"
             v-if="blog.imgUrl"
             :style="`background: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.2)),
    url(${blog.imgUrl}) no-repeat center center / cover;`"
        ></div>
        <!-- <img :src="blog.imgUrl" class="blog-image" v-if="blog.imgUrl" /> -->
        <div class="blog-contents" :class="{'image':blog.imgUrl}">
          <h3 class="blog-title">
            {{ blog.title }}
          </h3>
          <!-- <span v-for="tag in blog.tags" :key="tag">{{ tag }}</span> -->
          <div class="blog-body">
            <span v-html="blog.body"></span>
          </div>
          <!-- {{ blog }} -->
          <!-- </router-link> -->

          <div class="blog-card-fade" v-if="blog.body.length > 200"></div>
        </div>
      </div>
    </router-link>
    <h4 class="blog-comment-amount">
      {{ state.commentAmount }} comments
    </h4>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { api } from '../services/AxiosService'
export default {
  name: 'BlogComponent',
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      commentAmount: null
    })
    onMounted(async () => {
      const res = await api.get('api/blogs/' + props.blog.id + '/comments')
      state.commentAmount = res.data.length
    })
    return {
      userId: computed(() => AppState.account.id),
      deleteBlog() {
        blogService.deleteBlog(props.blog.id)
      },
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
