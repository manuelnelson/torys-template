<template>
  <div>
    <div class="map-menu" :class="{'open':menuOpen}" v-touch:swipe.left="closeMenu">
        <div class="map-menu__container">
          <div class="map-menu__header">
            <h2>Explore Our Projects</h2>
            <span>Choose your filters below.</span>
          </div>
          <div class="map-menu__main">
            <!-- <span v-for="(region,ndx) in activeIndustries" :key="ndx">{{region.Name}}</span> -->
            <div class="service-list">
              <div class="service-list__main">
                <span class="service-list__header" @click="regionsOpen = !regionsOpen">Regions <i class="fa" :class="getExpandClass(regionsOpen)"></i></span>
                <ul class="service-list__container" :class="{'open': regionsOpen}">
                    <li class="service-list__item" @click="activateRegion(region)" v-for="(region,ndx) in regions" :key="ndx"><i :class="getItemClass(region)" class="far"></i>{{region.Name}}</li>
                </ul>
              </div>
              <div class="service-list__main">
                <span class="service-list__header" @click="industriesOpen = !industriesOpen">Industries <i class="fa" :class="getExpandClass(industriesOpen)"></i></span>
                <ul class="service-list__container" :class="{'open': industriesOpen}">
                  <li class="service-list__item" @click="activateIndustry(industry)" v-for="(industry,ndx) in industries" :key="ndx">
                    <i class="far" :class="getItemClass(industry)"></i>{{industry.Name}}
                    <ul v-if="industry.Children">
                      <li class="service-list__item" @click.stop="activateIndustry(child)" v-for="(child,ndx) in industry.Children" :key="ndx">
                        <i :class="getItemClass(child)" class="far"></i>{{child.Name}}</li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div>
                <button class="btn btn-primary" @click="updateMap">Apply Filters</button>
                <button class="btn btn-primary" @click="clearFilters">Clear All</button>
              </div>
            </div>
          </div>
        </div>
        <div @click="toggleMenu" class="map-menu__collapsible">
          <i class="fa fa-chevron-right" v-if="!menuOpen"></i>
          <i class="fa fa-chevron-left" v-if="menuOpen"></i>
        </div>
    </div>
    <div class="map-project" :class="{'open': project != null }" v-touch:swipe.left="closeProject">
      <div class="map-project__container" v-if="project != null">
        <span class="map-project__close" @click="closeProject()"><i class="fa fa-times"></i></span>
        <h1>{{project.Name}}</h1>
        <div class="project-detail" v-if="project.Industries.length > 0">
          <span class="project-detail__label">Industry</span>
          <span class="project-detail__value">{{project.Industries[0].Name}} <img class="project-detail__img" :src="getIcon(project)" /></span>
        </div>
        <div class="project-detail" v-if="project.ClientName.length > 0">
          <span class="project-detail__label">Client Name</span>
          <span class="project-detail__value">{{project.ClientName}}</span>
        </div>
        <div class="project-detail" v-if="project.ClientRole.length > 0">
          <span class="project-detail__label">Client Role</span>
          <span class="project-detail__value">{{project.ClientRole}}</span>
        </div>
        <div class="project-detail" v-if="project.Service && project.Service.Name">
          <span class="project-detail__label">Service</span>
          <span class="project-detail__value">{{project.Service.Name}}</span>
        </div>
        <div class="project-detail" v-if="project.Value.length > 0">
          <span class="project-detail__label">Value</span>
          <span class="project-detail__value">{{project.Value}}</span>
        </div>
        <div class="project-detail" v-if="project.Url.length > 0">
          <a class="project-detail__url" :href="project.Url">Read more at Torys.com <i class="fa fa-external-link-alt"></i></a>
        </div>
        <div class="project-detail" v-if="project.Level.length > 0">
          <span class="project-detail__label">Government Level</span><html></html>
          <span class="project-detail__value">{{project.Level}}</span>
        </div>
        <div class="project-detail no-bottom-line" v-if="project.Description.length > 0">
          <div class="project-detail__value" v-html="project.Description"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import breakpointMixin from '../mixins/breakpoint-mixin.js'
import { setTimeout } from 'timers';

export default {
  props: ["project", "filterProjects", "removeProject"],
  data() {
    return {
      menuOpen: !this.isMobile(),
      industries: window.__INTIALSTATE__.industries,
      regions: window.__INTIALSTATE__.regions,
      industriesOpen: false,
      regionsOpen: false,
      projectOpen: false,
    }
  },
  mixins: [breakpointMixin],
  mounted(){
    let that = this;
    if(this.isMobile()) {
      setTimeout(() => {
        that.menuOpen = true;
      }, 5000)
    }
  },
  components: {
  },
  computed: {
    activeIndustries() {
      let list = [];
      this.industries.map(x => 
        {
          x.active ? list.push(x) : ""; 
          if(Array.isArray(x.Children)) { 
            x.Children.map(y=>{ y.active ? list.push(y) : ""})
          }
        });
      return list;
    },
    activeRegions() {
      let list = [];
      this.regions.map(x => 
        {
          x.active ? list.push(x) : ""; 
          if(Array.isArray(x.Children)) { 
            x.Children.map(y=>{ y.active ? list.push(y) : ""})
          }
        });
      return list;
    }
  },
  watch: {
  },
  methods: {
    closeMenu() {
      this.menuOpen = false;
    },
    closeProject() {
      this.removeProject();
    },
    getIcon(project) {
      return project.Industries[0].Icon.replace("/~/media/images/map/", "/static/icons/").replace("png","svg")
    },
    getItemClass(item) {      
      return item.active ? 'fa-check-square' : 'fa-square';
    },
    clearFilters() {
      this.industries.forEach(industry => {
        Vue.set(industry, 'active', false);
        if(industry.Children && industry.Children.length > 0) {
          industry.Children.map(x => {Vue.set(x,'active', false);});
        }
      });
      this.regions.forEach(region => {
        Vue.set(region, 'active', false);
      });
      this.updateMap();
    },
    getExpandClass(open) {      
      return open ? 'fa-minus' : 'fa-plus';
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    updateMap() {
      this.filterProjects(this.activeIndustries.map(x=>x.Guid), this.activeRegions.map(x=>x.Guid));
      if(this.isMobile()) {
        this.menuOpen = false;
      }
    },
    activateIndustry(item) {
      if(!item.active) {
        Vue.set(item, 'active',true);                
        if(item.Children && item.Children.length > 0) {
          item.Children.map(x => {Vue.set(x,'active', true);});
        }
      }
      else {
        Vue.set(item, 'active',false);
        if(item.Children && item.Children.length > 0) {
          item.Children.map(x => {Vue.set(x,'active', false);});
        }
      }
    },
    activateRegion(item) {
      if(!item.active) {
        Vue.set(item, 'active',true);
        //this.activeRegions.push(item);                
        if(item.Children && item.Children.length > 0) {
          item.Children.map(x => {Vue.set(x,'active', true);});
        }
      }
      else {
        Vue.set(item, 'active',false);
        //this.activeRegions = this.activeRegions.filter(x => x != item);                
        if(item.Children && item.Children.length > 0) {
          item.Children.map(x => {Vue.set(x,'active', false);});
        }
      }
    }
  }
}

</script>
