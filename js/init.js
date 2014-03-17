/*******************************************/
/*                INIT
/*******************************************/
var D_login = "";
var D_pass = ""; 

var I_login = new sap.m.Input("login",{type: sap.m.InputType.Text, placeholder: 'Enter login ...'});
var I_pass = new sap.m.Input("pass", {type: sap.m.InputType.Password, placeholder: 'Enter Password ...'});

var I_nom = new sap.m.Input("nom",{type: sap.m.InputType.Text});
var I_prenom = new sap.m.Input("prenom", {type: sap.m.InputType.Text});
var userName = "";


var oModel = new sap.ui.model.odata.ODataModel( "https://adtppmemea16ws2010.accenture.com/NDC_RES_INDUS_3/_vti_bin/listdata.svc",false,D_login, D_pass);  
oModel.setCountSupported(false);
oModel.setSizeLimit(200);

sap.ui.getCore().setModel(oModel); 
