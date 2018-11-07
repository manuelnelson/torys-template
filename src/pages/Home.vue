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
import breakpointMixin from '../mixins/breakpoint-mixin.js'
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      map: null,
      projects: window.__INTIALSTATE__.projects,
      markers: [],
      selectedProject: null,
      menuOpen: false,
      markerCluster: null      
    }
  },
  mixins: [breakpointMixin],
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
        center: {lat: 20, lng: 0},
        zoom: 2
      });
      
      //Add all projects to map and add to markers list
      this.addProjectsToMap(this.projects, true);
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    }, 
    openProject() {
    },
    filterProjects(selectedIndustries, selectedRegions) {
      this.clearMap();
      let selectedProjects = this.projects;
      console.log(selectedRegions)
      if(selectedIndustries.length > 0) {
         selectedProjects = selectedProjects.filter(project => project.Industries.map(x=>x.Guid).filter(industryId => selectedIndustries.indexOf(industryId) > -1).length > 0);
      }
      if(selectedRegions.length > 0) {
         selectedProjects = selectedProjects.filter(project => project.Regions.map(x=>x.Guid).filter(regionId => selectedRegions.indexOf(regionId) > -1).length > 0);
      }

      this.addProjectsToMap(selectedProjects);
    },
    addProjectsToMap(projects, initialLoad) {
      this.markers = [];
      let bounds  = new google.maps.LatLngBounds();
      projects.forEach(project => {
        let latLng = {lat:project.Latitude,lng:project.Longitude};
        let marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            title: project.Name,
            icon: this.getIcon(project)
        });
        let projectMarker = {
          marker: marker,
          project: project
        } 
        this.markers.push(projectMarker);
        let that = this;
        marker.addListener('click', function() {that.setProject(projectMarker)}); 
        let loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
        bounds.extend(loc);              
      });
      this.markerCluster = new MarkerClusterer(this.map, this.markers.map(x => x.marker),
        {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      if(!initialLoad && !this.isMobile()){
        this.map.fitBounds(bounds);       // auto-zoom
        this.map.panToBounds(bounds);     // auto-center
      }
      this.selectedProject = null;
    },
    getIcon(project) {      
//      return project.Industries && project.Industries.length > 0 ? project.Industries[0].Icon : "";
      //console.log(project.Industries && project.Industries.length > 0 ? project.Industries[0].Icon : "");
      return project.Industries && project.Industries.length > 0 ? project.Industries[0].Icon.replace("/~/media/images/map/", "/static/icons/").replace("png","svg") : "";
    },
    setProject(projectMarker){
      //debugger;
      if(!projectMarker) {
        this.selectedProject = null;
        return;
      }
      console.log(projectMarker.project)
      if(this.$refs.menu.menuOpen) {
        this.$refs.menu.menuOpen = false;
        var that = this;
        setTimeout(()=> {
          that.selectedProject = projectMarker.project;
        }, 500)
      } 
      else if (this.selectedProject) {
        this.selectedProject = null;
        var that = this;
        setTimeout(()=> {
          that.selectedProject = projectMarker.project;
        }, 500)
      }
      else {
        this.selectedProject = projectMarker.project;
      }
      this.map.setCenter(projectMarker.marker.position);
    },
    removeProject() {
      this.selectedProject = null;
    },
    clearMap() {
      this.markers.forEach(marker => {
        marker.marker.setMap(null);
        marker.marker = [];
      })
      this.markers = [];
      if(this.markerCluster)
        this.markerCluster.setMap(null);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
