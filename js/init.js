/*******************************************/
/*                INIT
/*******************************************/
var D_login = "";
var D_pass = ""; 

var I_login = new sap.m.Input("login",{type: sap.m.InputType.Text, placeholder: 'Enter login ...'});
var I_pass = new sap.m.Input("pass", {type: sap.m.InputType.Password, placeholder: 'Enter Password ...'});

var I_lastName = new sap.m.Input("lastname",{type: sap.m.InputType.Text});
var I_firstName = new sap.m.Input("name", {type: sap.m.InputType.Text});
var userName = "";


var oModel = new sap.ui.model.odata.ODataModel( "_vti_bin/listdata.svc",false,D_login, D_pass);  
oModel.setCountSupported(false);
oModel.setSizeLimit(200);

sap.ui.getCore().setModel(oModel); 
