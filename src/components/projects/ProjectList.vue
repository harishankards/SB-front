<template>
  <div class="row">
    <div class="col-md-8">
      <div class="noProjects" v-show="noProjects">
          <h4> Oops! You have no Projects to view. </h4>
          <button class="btn btn-primary btn-micro" @click="createNew"> New project</button>              
      </div>
      <vuestic-widget class="" v-for="project in projectArray" :key="project.id">
        <div>
          <div id="projects-name-div">
            <span class="projects-name"><strong><a href="" @click.prevent="viewProject(project._id)">{{project.title}}</a> </strong></span><br>
            <span class="projects-time"><timeago :since="project.createdAt" :auto-update="60"></timeago></span>
          </div>
          <div class="deleteIconDiv">
            <i class="fa fa-edit editIcon" @click="takeToEdit(project)"></i>            
            <i class="fa fa-trash deleteIcon" @click="showDeleteModal(project._id)"></i>
          </div>
        </div>

        <div id="projects-content-div">
          <span id="projects-description">{{project.abstract}}</span>
          <!-- <a href="" class="viewMoreBtn" @click="viewProject(project._id)"> Read More <i class="fa fa-arrow-right"></i> </a>           -->
        </div>
        <div id="tagDiv">
          <strong>Tags:</strong><span v-for="tag in project.tags" :key="tag.id" class="tagNames">{{tag.name}}</span>
        </div>
        
      </vuestic-widget>
    </div>
    <div class="col-md-8 col-sm-12 side">
      <vuestic-widget class="createproject-div sidenav1">
        <div class="col-md-offset-6 col-md-12">
          <h5 class="gotnew">Got something new?</h5>
          <button class="btn btn-primary btn-micro" @click="createNew"> New project</button>    
        </div>
      </vuestic-widget>
      <Livefeeds></Livefeeds>
    </div>
  </div>
</template>

<script>
  import { eventBus } from '../../main.js'
  import Livefeeds from '../rightsidebar/Livefeeds'
  export default {
    name: 'projectList',
    components: {Livefeeds},
    data () {
      return {
        projectArray: [],
        noProjects: false,
        authToken: this.$ls.get('token')
      }
    },

    methods: {
      createNew: function () {
        this.$router.push('/student/projects/new')
      },
      viewProject: function (projectId) {
        this.$router.push('/student/project/' + projectId)
      },
      takeToEdit: function (project) {
        eventBus.projectToBeEdited = project
        this.$router.push('/student/projects/edit/' + project._id)
      },
      showDeleteModal: function (projectId) {
        const self = this
        const authToken = this.$ls.get('token')
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#BA1F33',
          cancelButtonColor: '#4ae387',
          confirmButtonText: 'Yes, delete it!'
        })
        .then((result) => {
          if (result.value) {
            self.$http({
              method: 'delete',
              url: '/projects/delete',
              data: {
                'project': projectId
              },
              headers: {
                'Authorization': 'Bearer ' + authToken,
                'Content-Type': 'application/json'
              }
            })
            .then(function (projectDeleted) {
              console.log('project delete', projectDeleted)
              self.projectArray.map((project) => {
                if (project._id === projectId) {
                  const index = self.projectArray.indexOf(project)
                  if (index > -1) {
                    self.projectArray.splice(index, 1)
                  }
                }
              })
              self.$swal(
                'Deleted!',
                'Your project has been deleted.',
                'success'
              )
            })
            .catch(function (projectDeleteErr) {
              console.log('projectDeleteErr', projectDeleteErr)
            })
          } else if (result.dismiss === self.$swal.DismissReason.cancel) {
            self.$swal(
              'Cancelled',
              'Your Project is safe :)',
              'error'
            )
          }
        })
      }
    },
    updated () {
      if (this.projectArray.length === 0) {
        this.noProjects = true
      }
    },
    created () {
      const email = this.$ls.get('email')
      const lsToken = this.$ls.get('token')
      this.$http.get('/students/get?email=' + email, {
        headers: {
          'Authorization': 'Bearer ' + lsToken
        }
      })
      .then((studentData) => {
        console.log('student Data', studentData.data)
        const projectArr = studentData.data[0].projects
        // console.log('projectArr', projectArr)
        if (projectArr.length === 0) {
          this.noProjects = true
        }
        projectArr.map(project => {
          console.log('single project', project)
          this.$http.get('/projects/get?id=' + project, {
            headers: {
              'Authorization': 'Bearer ' + lsToken
            }
          })
          .then((projectData) => {
            // console.log('project data', projectData)
            this.projectArray.push(projectData.data)
            console.log('project array', this.projectArray)
          })
          .catch((projectErr) => {
            console.log('project err', projectErr)
          })
        })
      }).catch((studentErr) => {
        console.log('student err', studentErr)
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../sass/_variables.scss";

  .createproject-div{
    text-align: center;
  }
  .newsfeed-page{
    padding-left: 0rem !important;
  }
  .projects-time{
    margin-top: 3px;
    color: #a29e9e;
  }

  #projects-name-div{
    display: inline-block;
    // margin-left: 0.4rem;
  }

  #projects-content-div{
    margin-top: 0.5rem;
  }
  .sidenav1{
    // position: absolute;
    margin-left: 720px;
    width: 40%;
    height: 161px;
    // top: 13.7%;
  }
  @media screen and (max-width: 650px)
  {
    .sidenav1{
    position: relative !important;
    margin-left: 0px !important;
    width: 100% !important;
    top: 5% !important;
    }
  }
  .gotnew{
    margin-bottom: 1.5rem;
  }
  .noProjects {
    text-align: center;
    font-weight: bold;
    margin-top: 7rem;
  }
  #tagDiv {
    display: inline-block;
    margin-top: 1rem;
  }
  .tagNames {
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
    background: $tagcolor;
    color: white;
    border-radius: 5%;
  }

  .viewMoreBtn {
    display: block;
  }
  .deleteIconDiv {
    float: right;
  }
  .deleteIcon {
    font-size: 1.2rem;
    cursor: pointer;
  }
  .editIcon {
    font-size: 1.1rem;
    margin-right: 0.5rem;
    cursor: pointer;
  }
  .side{
    position: fixed;
  }
</style>
