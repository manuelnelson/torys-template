<template>
  <div class="interactive-map">
    <div class="interactive-map__container">
      <menu-component ref="menu" :project="selectedProject" :remove-project="removeProject" :filter-projects="filterProjects"></menu-component>
      <div id="map" class="interactive-map__map" @click="openProject">
      </div>
    </div>
  </div>
</template>

<script>
import $Scriptjs from 'scriptjs';
import MenuComponent from '../components/menu-component.vue';
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      map: null,
      projects: window.__INTIALSTATE__.projects,
      markers: [],
      selectedProject: null,
      menuOpen: false
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
        center: {lat: -0, lng: 0},
        zoom: 3
      });
      
      //Add all projects to map and add to markers list
      this.addProjectsToMap(this.projects);
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }, 
    openProject() {
    },
    filterProjects(selectedIndustries, selectedRegions) {
      this.clearMap();
      let selectedProjects = this.projects;
      
      if(selectedIndustries.length > 0) {
         selectedProjects = selectedProjects.filter(project => project.Industries.map(x=>x.Guid).filter(industryId => selectedIndustries.indexOf(industryId) > -1).length > 0);
      }
      if(selectedRegions.length > 0) {
         selectedProjects = selectedProjects.filter(project => project.Regions.map(x=>x.Guid).filter(regionId => selectedRegions.indexOf(regionId) > -1).length > 0);
      }
      console.log('selected ---');
      console.log(selectedIndustries);
      console.log(selectedRegions);
      this.addProjectsToMap(selectedProjects);
    },
    addProjectsToMap(projects) {
      this.markers = [];
      projects.forEach(project => {
        let latLng = {lat:project.Latitude,lng:project.Longitude};
        let marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: project.Name
        });
        this.markers.push({
          marker: marker,
          project: project
        });
        let that = this;
        marker.addListener('click', function() {that.setProject(project)})         
      });
    },
    setProject(project){
      //debugger;
      if(this.$refs.menu.menuOpen) {
        this.$refs.menu.menuOpen = false;
        var that = this;
        setTimeout(()=> {
          that.selectedProject = project;
        }, 500)
      } else {
        this.selectedProject = project;
      }
    },
    removeProject() {
      this.selectedProject = null;
    },
    clearMap() {
      this.markers.forEach(marker => {
        marker.marker.setMap(null);
      })

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
