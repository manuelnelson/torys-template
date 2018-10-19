<template>
  <div class="map-menu" @click="toggleMenu" :class="{'open':menuOpen}">
      <div class="map-menu__menu">
        <div class="service-list">
          <div class="service-item" v-for="(industry,ndx) in industries" :key="ndx">{{industry.Name}}</div>
        </div>
      </div>
      <div class="map-menu__collapsible"></div>
      <div class="map-menu__project">

      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuOpen: false,
      industries: window.__INTIALSTATE__.industries,
      regions: window.__INTIALSTATE__.regions
    }
  },
  components: {
  },
  mounted() {
    console.log(this.industries)
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
}

</script>
