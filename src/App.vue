<template>
  <!-- <header>
    <Navbar />
  </header> -->
  <main>
    <canvas id="c"></canvas>
    <matrix-component></matrix-component>
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <!-- <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer> -->
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import MatrixComponent from './components/MatrixComponent.vue'
export default {
  components: { MatrixComponent },
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "bootstrap";
@import "assets/css/global.css";
body {
  background-color: black;
}
</style>
