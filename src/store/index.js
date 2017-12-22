import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const state = {
  activeIndex: '1',
  hotelID: 0
}
export default new Vuex.Store({
  state
})
