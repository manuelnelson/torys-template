let breakpointMixin =  {
  methods: {
    isMobile() {
      return window.innerWidth < 656;
    }
  }
}

export default breakpointMixin;