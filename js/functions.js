
function _handleTileTap(oEvent) {
    app.to("profil");
    profil.setBindingContext(this.getBindingContext());
};


/**
* Return number of entries in Contacts
*/
function __count(oValue) {
    if (oValue) {
        var sPath = this.getBindingContext().getPath() + "/Contacts";
        return this.getModel().bindList(sPath).getContexts().length;
    }
};


function __logOn(oEvent) {

    // getting login and pass from log form
    D_login = I_login.getValue();
    D_pass = I_pass.getValue();
  
   // go to menu
    app.to(menu);
};


/**
* 
*
*/
function __logOff(oEvent) {

    oModel = new sap.ui.model.odata.ODataModel( 
        "_vti_bin/listdata.svc",
        false
    ); 

    sap.ui.getCore().setModel(oModel);

    // go to log window
    app.to(log);
};

function __filter(filter){

    oTileCont.unbindAggregation("tiles", {
        path : "/Contacts",
        template : oTileTmp
    });
    oTileCont.destroyTiles();

    oTileCont.bindAggregation("tiles", {
        path : "/Contacts?$filter=Place eq '" 
            + filtre + "' and startswith(LastName,'" 
            + I_lastName.getValue() 
            + "') or startswith(FirstName'" 
            + I_firstName.getValue() 
            + "')&",
        template : oTileTmp
    }); 

    directory.removeAllContent();
    directory.addContent(filter);
    directory.setEnableScrolling(false).addContent(oTileCont);

    filter.setVisible(false);
}



function __getProfil(lastname, name){

    oTileCont.unbindAggregation("tiles", {
        path : "/Contacts",
        template : oTileTmp
    });

    oTileCont.destroyTiles();

    oTileCont.bindAggregation("tiles", {
        path : "/Contacts?$filter=substringof('" 
            + lastname 
            + "',LastName) and substringof('" 
            + name 
            + "',FirstName)&",
        template : oTileTmp
    }); 

    directory.removeAllContent();
    directory.addContent(filter);
    directory.setEnableScrolling(false).addContent(oTileCont);

    filter.setVisible(false);

    app.to(directory);
}


function __bookmark(oEvent){
 
    jQuery.sap.require("sap.m.MessageBox");
    
    sap.m.MessageBox.show(
        "Add to bookmark?",
        "sap-icon://menu",
        "Bookmark",
        [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO]
    );
}

    
function _getVal(evt) {
    return sap.ui.getCore().byId(evt.getParameter('id')).getValue();
}


function handleEmail(evt) {
    sap.m.URLHelper.triggerEmail(_getVal(evt), "Info Request");
}


function __handleFilter (oEvent) {
    if(filter.getVisible()){
        filter.setVisible(false);
    }
    else{
        filter.setVisible();
    }
}


function __search(oEvent){


        path = "/Contacts?$filter=startswith(LastName,'"
                + I_lastName.getValue()
                + "') and startswith(FirstName,'"
                + I_firstName.getValue()
                + "')&";
          
            
        oTileCont.unbindAggregation("tiles", {
            path : "/Contacts",
            template : oTileTmp

        oTileCont.destroyTiles();

        oTileCont.bindAggregation("tiles", {

            path : path, 

            template : oTileTmp
        }); 

        directory.removeAllContent();
        directory.addContent(filter);
        directory.setEnableScrolling(false).addContent(oTileCont);
        app.to(directory);
    }
}

