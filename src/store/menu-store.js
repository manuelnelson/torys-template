import Vue from 'vue'

export const actions = {
    /**
     * retrieves all slides for an specific ayeota
     * 
     * @param {any} {commit} 
     * @param {any} ayeotaId  = ayeota id
     */

  

    // async getSlides({commit}, ayeotaId){
    //     let data = await this.$axios.$get(`/slides/?go_id=${ayeotaId}`)  
    //     commit('setSlides', data.slides)            
    // },
    // async createSlide({commit,state}, payload){
    //     let response = await this.$axios.$post('/slides', payload)
    //     commit('addSlide', response.slide)
    // },
    // async deleteSlide({commit,state}, payload){
    //     let response = await this.$axios.$delete(`/slides/${payload.id}`,payload)
    //     commit('deleteSlide', payload)
    // },
    // async updateSlide({commit,state}, payload){
    //     let response = await this.$axios.$put(`/slides/${payload.id}`,payload)
    //     commit('updateSlide', response.slide)
    //     return response.slide; 
    //   }
}

export const getters = {
    projectOpen: state => state.projectOpen,
    menuOpen: state => state.menuOpen,
  };
  
export const mutations = {
    setMenu: (state, payload) => {
      state.menuOpen = payload;
    },
    setProjectOpen: (state, payload) => {
      state.projectOpen = payload;
    },
};
export const state = () => ({
    projectOpen:{},
    menuOpen: []
})

