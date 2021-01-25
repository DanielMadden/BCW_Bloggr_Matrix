<template lang="">
  <div id="blogpage"
       class="page page d-flex p-3"
  >
    <!-- <div class="d-flex p-3" id="row"> -->
    <div id="account"
         class="d-flex flex-column align-items-start col-3 p-0"
    >
      <account-component
        :stats="true"
        :route-buttons="['Account', 'Home']"
      ></account-component>
    </div>
    <div
      id="blogs"
      class="d-flex flex-column align-items-end col-9 p-0 fancy-scrollbar justify-content-start"
    >
      <!-- <add-blog-component></add-blog-component> -->
      <!-- #region BLOG FORM -->
      <div id="blog-form">
        <!-- <form @submit.prevent="addBlog()" @change="savePreview()" novalidate> -->
        <div class="d-flex flex-column">
          <span>Title: </span>
          <input type="text"
                 v-model="form.title"
                 placeholder="Title..."
                 required="true"
                 id="blog-form-title"
          /><br />
          <span>Body: </span>
          <textarea
            v-model="form.bodyInput"
            placeholder="Body..."
            required="true"
            id="blog-form-body"
            class="fancy-scrollbar"
          ></textarea><br />
          <span>Image: </span>
          <input type="text"
                 v-model="form.imgUrl"
                 placeholder="Image URL..."
                 required="false"
          /><br />
          <span>Tags:</span>
          <input type="text"
                 v-model="form.tagInput"
                 placeholder="Separate each tag with a comma"
                 required="false"
          />
        </div>
        <!-- </form> -->
      </div>
      <!-- #endregion BLOG FORM -->

      <!-- #region POST PREVIEW -->
      <div class="blog-post d-flex flex-column my-3"
           v-if="form.title || form.body || form.imgUrl || form.tagInput"
      >
        <h4 class="d-flex align-items-end">
          <img :src="`https://robohash.org/${state.name}?set=set1`"
               class="blog-profile-image"
               v-if="state.name"
          />
          <span class="ml-1 blog-name">{{ state.name }}</span>
        </h4>
        <p class="blog-tags">
          <span class="blog-tag"
                v-for="tag in form.tags"
                :key="tag"
          >#{{ tag }}</span>
        </p>
        <div class="card blog-card my-2"
             :class="{'image':form.imgUrl}"
        >
          <div class="blog-image"
               v-if="form.imgUrl"
               :style="`background: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.2)),
    url(${form.imgUrl}) no-repeat center center / cover;`"
          ></div>
          <!-- <img :src="blog.imgUrl" class="blog-image" v-if="blog.imgUrl" /> -->
          <div class="blog-contents"
               :class="{'image':form.imgUrl}"
          >
            <h3 class="blog-title">
              {{ form.title }}
            </h3>
            <div class="blog-body">
              <span v-html="form.body"></span>
            </div>
            <!-- {{ blog }} -->
            <!-- </router-link> -->

            <div class="blog-card-fade"
                 v-if="form.body.length > 200"
            ></div>
          </div>
        </div>
        <button id="blog-form-submit"
                @click="updateBlog()"
                class="d-flex justify-content-center mt-5"
                v-if="form.title && form.body"
        >
          <h5 class="m-0 p-0">
            Update
          </h5>
        </button><br />
      </div>
      <!-- #endregion POST PREVIEW -->
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import { computed, reactive, onMounted } from 'vue'
// import AddBlogComponent from '../components/AddBlogComponent.vue'
// import BlogPreviewComponent from '../components/BlogPreviewComponent.vue'
import { AppState } from '../AppState'
import { blogService } from '../services/BlogService'
import { useRoute, useRouter } from 'vue-router'
import { logger } from '../utils/Logger'
export default {
  // components: { BlogPreviewComponent },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const form = reactive({
      title: '',
      bodyInput: '',
      body: computed(() => form.bodyInput.split('\n').join('<br/>')),
      imgUrl: '',
      tagInput: '',
      tags: computed(() => form.tagInput.split(', ').join(',').split(',').filter(str => str !== ''))
    })
    const state = reactive({
      name: computed(() => AppState.user.nickname)
    })
    onMounted(async () => {
      await blogService.getBlog(route.params.id)
      form.title = AppState.currBlog.title
      form.bodyInput = AppState.currBlog.body.split('<br/>').join('\n')
      form.imgUrl = AppState.currBlog.imgUrl
      form.tagInput = AppState.currBlog.tags.join(', ')
    })
    return {
      form,
      state,
      async updateBlog() {
        // form.tags = form.tagInput.split(', ').join(',').split(',').filter(str => str !== '')
        try {
          blogService.updateBlog(form, route.params.id)
          router.push({ path: '/blog/' + route.params.id })
        } catch (error) {
          logger.error('', error)
        }
      }
    }
  }
}
</script>
<style>
@import "../assets/css/global.css";
@import "../assets/css/account-card.css";
@import "../assets/css/blog.css";
</style>
