import Player from './components/Player.vue'

const install = (Vue) => {
  Vue.component(Player.name, Player)
}

// auto install if used in browser
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export {
  Player
}

export default install