<template>
  <div class="col-md-8">
    <vuestic-tabs class="tabs" :names="['Password', 'SecondTab', 'ThirdTab']">
			<div slot="Password" class="d-flex justify-content-center">
				<div class="formStyle">
					<div class="divStyle">
						<label class="labelStyle" for="currentPassword">Current Password:</label>
						<input class="inputboxStyle" v-model="currentPassword" name="currentPassword" type="password" id="currentPassword">
					</div>
					<div class="divStyle">
						<label class="labelStyle" for="newPassword">New Password:</label>
						<input class="inputboxStyle" v-model="newPassword" name="newPassword" type="password" id="newPassword">
					</div>
					<div class="divStyle">
						<label class="labelStyle" for="confirmNewPassword">Confirm Password:</label>
						<input class="inputboxStyle" v-model="confirmNewPassword" name="confirmNewPassword" type="password" id="confirmNewPassword">
					</div>
					<div class="divStyle">
						<button class="buttonSave" @click="savePassword()"><b>Save</b></button>
						<button class="buttonReset" @click="resetPassword()"><b>Reset</b></button>
					</div>
				</div>
			</div>
			<div slot="SecondTab" class="d-flex justify-content-center">
  		</div>
			<div slot="ThirdTab" class="d-flex justify-content-center">
  		</div>
		</vuestic-tabs>
	</div>
</template>

<script>
export default {
  name: 'settings',
  data () {
    return {
      newPassword: '',
      currentPassword: '',
      confirmNewPassword: ''
    }
  },
  methods: {
    savePassword: function () {
      console.log('Inside Save password function')
    },
    resetPassword: function () {
      console.log('Inside reset password function')
      this.newPassword = ''
      this.currentPassword = ''
      this.confirmNewPassword = ''
    }
  }
}
</script>

<style scoped>
.inputboxStyle{
	  right: 5%;
	  top: 4%;
		float: right;
    font-size: 15px;
    width: 16rem;
    padding: 6px 25px;
    border: 1px solid #bdc7d8;
    border-radius: 5px;
    color:#333;
  }
	.divStyle{
		margin-top: 4%;
		padding-top: 8%;
	}
	.labelStyle{
		margin-top: 1.6% !important;
		color: #4ae387;
		top: 4%;
  }
	.buttonSave{
  background-color: #4ae387;
	align-content: center;
	border: 3px;
	margin-top: 5%;
	margin-left: 1%;
  width: 20%;
  padding-top: 1%;
  padding-bottom: 1%;
	margin-left: 50%;
	display: inline-block;
}
.buttonReset{
  background-color: #4ae387;
	align-content: center;
	border: 3px;
  padding-top: 1%;
  padding-bottom: 1%;
	width: 20%;
}
.formStyle{
	margin-left: 0% !important;
	top: 2.5% !important;
}
@media screen and (max-width: 650px){
   .formStyle{
     margin-left: 20px !important;
     width: 100% !important;
     top: 2.5% !important;
    }
		.inputboxStyle{
	  margin-top: 2%;
		width: 13rem !important;
		float: left;
		margin-left: 1% !important;
		border: 1px solid #bdc7d8;
  }
	.vuestic-tabs .tab-content{
		padding-top: 0.125rem !important;
		width: 120%;
	}
}
@media screen and (max-width: 1024px){
   .formStyle{
     margin-left: 10px !important;
     width: 100% !important;
     top: 2.5% !important;
    }
		.inputboxStyle{
	  margin-top: 2%;
		width: 13rem !important;
		float: left;
		margin-left: 1% !important;
		border: 1px solid #bdc7d8;
  }
	.vuestic-tabs .tab-content{
		padding-top: 0.125rem !important;
		width: 120%;
	}
	.button{
  background-color: #4ae387;
	border: none;
	margin-top: 8%;
  width: 24%;
  padding-top: 1%;
  padding-bottom: 1%;
	margin-left: 40%;
}
.justify-content-center {
    -webkit-box-pack: left !important;
    justify-content: left !important;
		margin-left: 10% !important;
}
}
.justify-content-center {
    -webkit-box-pack: left !important;
    justify-content: left !important;
		margin-left: 10% !important;
}
label {
    width:200px;
    clear:left;
    text-align:right;
    padding-right:40px;
}
input, label {
    float:left;
}
</style>
