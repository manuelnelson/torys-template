<template>
  <div class="interactive-map">
    <div class="interactive-map__container">
      <menu-component></menu-component>
      <div id="map" class="interactive-map__map">
      </div>
    </div>
  </div>
</template>

<script>
import $Scriptjs from 'scriptjs';
import MenuComponent from '../components/menu-component.vue';
export default {
  data() {
    return {
      map: null
    }
  },
  components: {
    MenuComponent
  },
  mounted() {
    $Scriptjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyAzBfPzy4A1crGJfeChgjnqZ3JvamQtKhg', () => {
      this.initMap()
    })
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      })
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
