<template>
  <div id="home" class="page d-flex p-3">
    <!-- <add-blog-component v-if="false"></add-blog-component>
    <blog-modal></blog-modal> -->
    <!-- <hr /> -->
    <!-- <div class="d-flex p-3" id="row"> -->
    <div id="account" class="d-flex flex-column align-items-start col-3 p-0">
      <account-component
        :profile="false"
        :stats="false"
        :route-buttons="['Home', 'Add Blog']"
        :profile-buttons="['Stats', 'Blogs', 'Comments']"
        :blog-page="false"
      ></account-component>
    </div>
    <div
      id="stats"
      class="d-flex flex-column align-items-end col-9 p-0 fancy-scrollbar"
      v-if="accountView == 'Stats' && account.name"
    >
      <div id="stats-card">
        <h1>Email: {{ account.email }}</h1>
        <h1 id="stats-name">
          Name:
          <span contenteditable="true" @blur="changeName">{{
            account.name
          }}</span>
        </h1>
        <h1>Nickname: {{ account.name.split("@")[0] }}</h1>
        <h1>Blogs: {{ blogs.length }}</h1>
        <h1>Comments: {{ comments.length }}</h1>
      </div>
    </div>
    <div
      id="blogs"
      class="d-flex flex-column align-items-end col-9 p-0 fancy-scrollbar"
      v-if="accountView == 'Blogs'"
    >
      <blog-component
        v-for="blog in blogs"
        :key="blog.id"
        :blog="blog"
      ></blog-component>
    </div>
    <div
      id="comments-profile"
      class="d-flex flex-column align-items-end col-9 p-0 fancy-scrollbar"
      v-if="accountView == 'Comments'"
    >
      <div id="comments">
        <comment-component
          v-for="comment in comments"
          :key="comment.id"
          :comment="comment"
          :account-view="true"
        ></comment-component>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    onMounted(() => {
      accountService.getBlogs()
      accountService.getComments()
    })
    return {
      account: computed(() => AppState.account),
      blogs: computed(() => AppState.accBlogs),
      comments: computed(() => AppState.accComments),
      accountView: computed(() => AppState.accountView),
      changeName(e) {
        accountService.changeName(e.target.innerText)
      }
    }
  }
}
</script>

<style scoped>
@import "../assets/css/global.css";
@import "../assets/css/home.css";
@import "../assets/css/account-card.css";
@import "../assets/css/blog.css";
@import "../assets/css/comment.css";
@import "../assets/css/stats.css";
</style>
