<template>
  <div>
    <div class="map-menu" :class="{'open':menuOpen}">
        <div class="map-menu__container">
          <div class="map-menu__header">
            <h2>Explore Our Projects</h2>
            <span>Choose your filters below.</span>
          </div>
          <div class="map-menu__main">
            <span v-for="(region,ndx) in activeIndustries" :key="ndx">{{region.Name}}</span>
            <div class="service-list">
              <div class="service-list__main">
                <span class="service-list__header">Regions <i class="fa fa-plus"></i></span>
                <ul class="service-list__container">
                    <li class="service-list__item" @click="activateRegion(region)" v-for="(region,ndx) in regions" :key="ndx"><i :class="getItemClass(region)" class="far"></i>{{region.Name}}</li>
                </ul>
              </div>
              <div class="service-list__main">
                <span class="service-list__header">Industries <i class="fa fa-plus"></i></span>
                <ul class="service-list__container">
                  <li class="service-list__item" @click="activateIndustry(industry)" v-for="(industry,ndx) in industries" :key="ndx">
                    <i class="far" :class="getItemClass(industry)"></i>{{industry.Name}}
                    <ul v-if="industry.Children">
                      <li class="service-list__item" @click.stop="activateIndustry(child)" v-for="(child,ndx) in industry.Children" :key="ndx">
                        <i :class="getItemClass(child)" class="far"></i>{{child.Name}}</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div @click="toggleMenu" class="map-menu__collapsible"></div>
    </div>
    <div class="map-project" :class="{'open': projectOpen}">
      <h1>Project Information</h1>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
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
    project: (value) => {
      console.log(value);
    }
  },
  mounted() {
    console.log(this.industries)
  },
  methods: {
    getItemClass(item) {      
      return item.active ? 'fa-check-square' : 'fa-square';
    },
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
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
