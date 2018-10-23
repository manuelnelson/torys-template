<template>
  <div>
    <div class="map-menu" @click="toggleMenu" :class="{'open':menuOpen}">
        <div class="map-menu__container">
          <div class="service-list">
            <div class="service-item" v-for="(industry,ndx) in industries" :key="ndx">{{industry.Name}}</div>
          </div>
        </div>
        <div class="map-menu__collapsible"></div>
    </div>
    <div class="map-project" :class="{'open': projectOpen}">
      <h1>Project Information</h1>
    </div>
  </div>
</template>
<script>
export default {
  props: ["project"],
  data() {
    return {
      menuOpen: false,
      industries: window.__INTIALSTATE__.industries,
      regions: window.__INTIALSTATE__.regions,
      projectOpen: false,
    }
  },
  components: {
  },
  watch: {
    project: (value) => {
      console.log(value);
    }
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
