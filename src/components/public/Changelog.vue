 <template>
 <div class="container">
	 <h1>Student Burger</h1>
		<div class="form-inline text-center alphabetIcons">
			<button type="button" class="btn btn-success btn-circle">N</button><h6 class="textStyle">New</h6>
			<button type="button" class="btn btn-danger btn-circle">F</button><h6 class="textStyle">Fix</h6>
			<button type="button" class="btn btn-info btn-circle">E</button><h6 class="textStyle">Enhance</h6>
		</div>
		<div>
			<div class="form-inline">
				<div class="col-md-6 version">
		      <h5>Version 0.0.1</h5><div>(05-07-2018)</div>
				</div>
				<div class="col-md-6 form-inline">
					<button type="button" class="btn btn-success btn-circle">N</button>
					<div class="textStyle">Initial Release</div>
				</div>
		</div>
		</div>
 </div>
 </template>

 <style>
 .btn-circle {
  width: 30px;
  height: 30px;
  text-align: center;
  padding: 0px;
	padding-left: 3px;
  font-size: 16px;
  border-radius: 15px;
	box-shadow: none;
	margin-right: 1%;
	margin-left: 1%;
}
.textStyle{
	margin-top: 0.5%;
}
.container{
	text-align: center;
	margin-top: 1%;
}
.alphabetIcons{
		margin-left: 39%; 
		margin-bottom: 2%;
  }
	.version{
		margin-top: 1%;
	}
 @media screen and (max-width: 650px){
	.alphabetIcons{
		margin-left: 13%;
		word-spacing: 5px;
		margin-bottom: 4%;
  }
	.btn-circle{
		margin-right: 3%;
	  margin-left: 3%;
	}
 }
 </style>
 
 