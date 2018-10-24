import Vue from 'vue'
import Vuex from 'vuex'

//import MenuStore from './menu-store';

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

//let modules = {MenuStore};

//export default new Vuex.Store(modules)
export default new Vuex.Store()


