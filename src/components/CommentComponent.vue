<template lang="">
  <div class="comment d-flex my-3 align-items-center">
    <div class="comment-content d-flex flex-column">
      <h6 class="d-flex align-items-end mb-0 comment-creator">
        <img :src="`https://robohash.org/${comment.name}?set=set1`" class="comment-profile-image" />
        <span class="ml-1 comment-name">{{ comment.name }}:</span>
      </h6>
      <!-- <div class="card comment-card my-2"> -->
      <p v-html="comment.body"
         class="my-2 ml-2"
         :contenteditable="comment.creator.id === accountId"
         @blur="editComment"
      >
      </p>
    <!-- </div> -->
    </div>
    <h3 class="comment-button ml-5"
        v-if="comment.creator.id === accountId"
        @click="deleteComment()"
    >
      <i
        class="fas fa-trash-alt"
      ></i>
    </h3>
    <h3 class="comment-button ml-5 mr-3"
        v-if="comment.creator.id === accountId && accountView"
        @click="travel()"
    >
      <i class="fas fa-external-link-alt"></i>
    </h3>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { commentService } from '../services/CommentService'
import { useRouter } from 'vue-router'
export default {
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object,
      required: true
    },
    accountView: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const router = useRouter()
    return {
      accountId: computed(() => AppState.account.id),
      deleteComment() {
        commentService.deleteComment(props.comment)
      },
      editComment(e) {
        // console.log('triggering edit')
        commentService.editComment(props.comment, e.target.innerText.split('\n').join('<br/>'))
      },
      travel() {
        router.push({ path: '/blog/' + props.comment.blogId })
      }
    }
  }
}
</script>
<style lang="">
</style>
