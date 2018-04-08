<template>
  <div class="row dashboard-info-widgets">
    <div class="col-md-8 col-xl-4"> 
      <vuestic-widget class="info-widget">
        <div class="uv-project-header">
          <h6 class=""> Most upvoted project today <i class="fa fa-thumbs-up"></i></h6>
        </div>
        <div class="uv-project-content">
          <div class="uv-project-title"><a href="#">Polymorphism in plants</a></div>
          <div><small>This projects provides better analysis of polymorphism in plants and also the...</small></div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-8 col-xl-4">
      <vuestic-widget class="info-widget">
        <div class="info-widget-inner">
          <div class="stats">
            <div class="stats-number">
              <i class="ion ion-arrow-down-c text-danger stats-icon"></i>
              12
            </div>
            <div class="stats-title">{{'dashboard.versions' | translate}}</div>
          </div>
        </div>
      </vuestic-widget>
    </div>
    <div class="col-md-8 col-xl-4">
      <vuestic-widget class="info-widget brand-danger">
        <div class="info-widget-inner">
          <div class="info-widget-inner has-chart">
            <div class="stats">
              <div class="stats-number">
                425
              </div>
              <div class="stats-title">Commits</div>
            </div>
            <div class="chart-container">
              <vuestic-progress-bar type="circle" ref="circleProgress" :colorName="'white'" :backgroundColorName="'danger'"
                            :startColorName="'danger'"></vuestic-progress-bar>
            </div>
          </div>
        </div>
      </vuestic-widget>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'dashboard-info-widgets',

    mounted () {
      this.$refs.circleProgress.$data.value = 70
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .stats-number, .stats-title {
    line-height: 1;
  }
  .project-header{
    padding: 1%;
  }

  .uv-project-title{
    font-size: 1.5em;
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
