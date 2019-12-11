<template>
  <div id="app">
      <player></player>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Player from './components/Player.vue'

export default {
  name: 'app',
  components: {
     Player
  }
}
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
    }
</style>
