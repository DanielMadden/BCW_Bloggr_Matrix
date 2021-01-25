<template lang="">
  <div>
    <!-- <form @submit.prevent="addComment()"> -->
    <textarea
      v-model="form.bodyInput"
      placeholder="Add Comment..."
      required="true"
      id="comment-form-body"
      class="fancy-scrollbar"
    ></textarea>
    <!-- <input type="text"
           v-model="form.body"
           placeholder="Body"
           required="true"
    /><br /> -->
    <div class="comment d-flex flex-column my-3" v-if="form.body">
      <h6 class="d-flex align-items-end mb-0">
        <img :src="`https://robohash.org/${name}?set=set1`" class="comment-profile-image" />
        <span class="ml-1 comment-name">{{ name }}:</span>
      </h6>
      <!-- <div class="card comment-card my-2"> -->
      <p v-html="form.body" class="my-2 ml-2"></p>
    <!-- </div> -->
    </div>
    <button @click="addComment()" v-if="form.body">
      Add Comment
    </button>
    <!-- </form> -->
  </div>
</template>
<script>
import { computed, reactive } from 'vue'
import { commentService } from '../services/CommentService'
import { AppState } from '../AppState'
export default {
  name: 'AddBlogComponent',
  props: {
    blogId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const form = reactive({
      bodyInput: '',
      body: computed(() => form.bodyInput.split('\n').join('<br/>')),
      blog: computed(() => AppState.currBlog.id)
    })
    return {
      form,
      name: computed(() => AppState.user.nickname),
      addComment() {
        commentService.addComment(form)
        form.bodyInput = ''
      }
    }
  }
}
</script>
<style lang="">
</style>
