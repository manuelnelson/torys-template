<template>
  <div class="map-menu" @click="toggleMenu" :class="{'open':menuOpen}">
      <div class="map-menu__menu"></div>
      <div class="map-menu__collapsible"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuOpen: false,
    }
  },
  components: {
  },
  mounted() {
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
}

</script>
