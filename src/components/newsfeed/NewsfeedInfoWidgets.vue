<template>
  <div class="row dashboard-info-widgets ">
    <div class="col-md-6"> 
      <vuestic-widget class="info-widget firstnav">
        <div class="uv-project-header">
          <span class="uv-project-header-title"> Most upvoted project today </span>
          <i class="fa fa-thumbs-up uv-project-header-icon"></i>
        </div>
        <div class="uv-project-content">
          <div class="uv-project-title"><a href="#">Polymorphism in plants</a></div>
          <div><small>This projects provides better analysis of polymorphism in plants and also the...</small></div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-6">
      <vuestic-widget class="info-widget centrenav">
        <div class="searched-contest-header">
          <span class="searched-contest-header-title"> Most searched contest today </span>
          <i class="fa fa-bolt searched-contest-header-icon"></i>
        </div>
        <div class="searched-contest-content">
          <div class="searched-contest-title"><a href="#">Google summer of code 2018</a></div>
          
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-info-widgets'
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .stats-number, .stats-title {
    line-height: 1;
  }
  .info-widget{
    max-height: 80%;
  }

  .uv-project-header-title{
    display: inline-block;
    font-size: 1em; 
  }
  .uv-project-header-icon{
    font-size: 2em;
    float: right;
  }

  .uv-project-header{
    padding-bottom: 2%;
  }

  .uv-project-title{
    font-size: 1.5em;
  }

  .centrenav{
    height: 172px;
    overflow: auto;
  }

  .firstnav{
    height: 172px;
    overflow: auto;
  }

  .searched-contest-header-title{
    display: inline-block;
    font-size: 1em; 
  }
  .searched-contest-header-icon{
    font-size: 2em;
    float: right;
  }

  .searched-contest-header{
    padding-bottom: 2%;
  }

  .searched-contest-title{
    font-size: 1.5em;
  }

  .ad-header-title{
    display: inline-block;
    font-size: 1em; 
  }
  .ad-header-icon{
    font-size: 2em;
    float: right;
  }

  .ad-header{
    padding-bottom: 2%;
  }

  .ad-title{
    font-size: 1.1em;
  }
  .info-widget-inner {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;

    &.has-chart {
      justify-content: space-between;
    }

    .stats {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }

  .stats-number {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 2.625rem;
    margin-bottom: 0.5rem;

    .stats-icon {
      font-size: 1.5625rem;
      position: absolute;
      top: 0.625rem;
      left: -1.25rem;

      &.icon-wide {
        left: -1.875rem;
      }
    }
  }
</style>
