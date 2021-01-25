<template lang="">
  <div class="card d-flex flex-column align-items-center justify-content-center" id="account-card">
    <div id="view-account" v-if="account.isAuthenticated" class=" d-flex flex-column align-items-center justify-content-between">
      <div id="account-top" class="d-flex flex-column justify-content-start align-items-center" v-if="profile">
        <img :src="`https://robohash.org/${account.nickname}?set=set1`" id="account-image" />
        <h1>{{ account.nickname }}</h1>
        <div id="account-stats" v-if="stats" class="d-flex flex-column align-items-center">
          <hr />
          <p>{{ blogCount }} blogs</p>
          <p>{{ commentCount }} comments</p>
          <hr />
        </div>
      </div>
      <div id="account-buttons" class="d-flex flex-column justify-content-around align-items-center" :class="{'full':!profile}">
        <button v-for="button in routeButtons"
                :key="button"
                @click="travel(button)"
                class="account-button d-flex justify-content-center"
        >
          <h5 class="m-0 p-0">
            {{ button }}
          </h5>
        </button>
        <button v-for="button in profileButtons"
                :key="button"
                @click="profileView(button)"
                class="account-button d-flex justify-content-center"
                :class="{'active': accountView == button}"
        >
          <h5 class="m-0 p-0">
            {{ button }}
          </h5>
        </button>
        <div v-if="blogView.creator && blogPage === true" v-show="blogView.creator.id === accountId">
          <h1 v-if="blogView.creator.id === accountId && blogPage === true" class="m-0 p-0 d-flex">
            <i class="fas fa-pencil-alt account-blog-button" @click="editPost()"></i>
            <i class="fas fa-trash-alt ml-5 account-blog-button" @click="deletePost()"></i>
          </h1>
        </div>
        <!-- <button v-for="[buttonName, modalId] in modalButtons" :key="buttonName" data-toggle="modal" :data-target="`#${modalId}`" class="account-button d-flex justify-content-center">
          <h5 class="m-0 p-0">
            {{ buttonName }}
          </h5>
        </button> -->
      </div>
      <div @click="logout" class="account-logout-button">
        <i class="fas fa-sign-out-alt"></i> Logout
      </div>
      <!-- <button v-if="buttons.home">
        Home
      </button>
      <button v-if="buttons.account" @click="travel('Account')">
        Account
      </button> -->
    </div>
    <div id="view-loading-account" v-else-if="Object.keys(account).length !== 0 && !account.isAuthenticated">
      Authenticating...
    </div>
    <div id="view-login" v-else class="d-flex flex-column align-items-center justify-content-center">
      <button
        @click="login()"
        class="account-button d-flex justify-content-center"
      >
        <h5 class="m-0 p-0">
          Log In
        </h5>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { useRouter } from 'vue-router'
import { blogService } from '../services/BlogService'
import { AuthService } from '../services/AuthService'
export default {
  name: 'AccountComponent',
  props: {
    stats: {
      type: Boolean
    },
    profile: {
      type: Boolean,
      default: true
    },
    routeButtons: {
      type: Array,
      required: true
    },
    profileButtons: {
      type: Array,
      default: null
    },
    blogPage: {
      type: Boolean,
      required: true
    }
    // modalButtons: {
    //   type: Array,
    //   required: true
    // }
  },
  setup(props) {
    const router = useRouter()
    const blogView = computed(() => AppState.currBlog)
    return {
      account: computed(() => AppState.user),
      localAcc: computed(() => AppState.account),
      blogCount: computed(() => AppState.accBlogs.length),
      commentCount: computed(() => AppState.accComments.length),
      blogView,
      accountId: computed(() => AppState.account.id),
      accountView: computed(() => AppState.accountView),
      travel(routeName) {
        router.push({
          name: routeName
        })
      },
      profileView(viewName) {
        AppState.accountView = viewName
      },
      editPost() {
        router.push({
          path: '/editblog/' + blogView.value.id
        })
      },
      async deletePost() {
        await blogService.deleteBlog(blogView.value.id)
        router.push({
          name: 'Home'
        })
      },
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        await AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>
<style lang="">
</style>
