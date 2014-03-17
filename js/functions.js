/**
* 
*
*/
function _handleTileTap(oEvent) {
    app.to("profil");
    profil.setBindingContext(this.getBindingContext());
};


/**
* Retourne le nombre d'employés trouvé dans la table Contatcts_SAPUI2
*
*/
function __count(oValue) {
    if (oValue) {
        var sPath = this.getBindingContext().getPath() + "/Contacts_SAPUI2";
        return this.getModel().bindList(sPath).getContexts().length;
    }
};

/**
*  
*
*/
function __connection(oEvent) {

    // récupérqation des identifiants
    D_login = I_login.getValue();
    D_pass = I_pass.getValue();

  /*  // création du model de données 
    oModel = new sap.ui.model.odata.ODataModel( 
        "https://adtppmemea16ws2010.accenture.com/NDC_RES_INDUS_3/_vti_bin/listdata.svc",
        false,
        D_login, 
        D_pass
    );  

    oModel.setCountSupported(false);

    // limite du nombre de profil affichés
    oModel.setSizeLimit(20);

    // application du model
    sap.ui.getCore().setModel(oModel);   

    // récupération du nom de l'utilisateur
    userName = D_login.split(".");

    if(userName.length > 2){
        userName[1] = userName[1] + " " + userName[2];
    }*/
     
    // redirection vers le menu       
    app.to(menu);
};


/**
* 
*
*/
function __deconnection(oEvent) {
    oModel = new sap.ui.model.odata.ODataModel( 
        "https://adtppmemea16ws2010.accenture.com/NDC_RES_INDUS_3/_vti_bin/listdata.svc",
        false
    ); 

    sap.ui.getCore().setModel(oModel);

    // redirection vers la fenêtre de connexion      
    app.to(connexion);
};


/**
* 
*
*/
function __filter(filtre){

    oTileCont.unbindAggregation("tiles", {
        path : "/Contacts_SAPUI2",
        template : oTileTmp
    });
    oTileCont.destroyTiles();

    oTileCont.bindAggregation("tiles", {
        path : "/Contacts_SAPUI2?$filter=Site eq '" 
            + filtre + "' and startswith(LastName,'" 
            + I_nom.getValue() 
            + "') or startswith(FirstName'" 
            + I_prenom.getValue() 
            + "')&",
        template : oTileTmp
    }); 

    annuaire.removeAllContent();
    annuaire.addContent(filter);
    annuaire.setEnableScrolling(false).addContent(oTileCont);

    filter.setVisible(false);
}


/**
* 
*
*/
function __getProfil(lastname, name){

    oTileCont.unbindAggregation("tiles", {
        path : "/Contacts_SAPUI2",
        template : oTileTmp
    });

    oTileCont.destroyTiles();

    oTileCont.bindAggregation("tiles", {
        path : "/Contacts_SAPUI2?$filter=substringof('" 
            + lastname 
            + "',LastName) and substringof('" 
            + name 
            + "',FirstName)&",
        template : oTileTmp
    }); 

    annuaire.removeAllContent();
    annuaire.addContent(filter);
    annuaire.setEnableScrolling(false).addContent(oTileCont);

    filter.setVisible(false);

    app.to(annuaire);
}


/**
* 
*
*/   
function __bookmark(oEvent){
 
    jQuery.sap.require("sap.m.MessageBox");
    
    sap.m.MessageBox.show(
        "Ajouter cet employé aux favoris?",
        "sap-icon://menu",
        "Ajouter au favoris",
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

    var ok = false;
    var path = "";

    if(I_nom.getValue().length == 0 && I_prenom.getValue().length == 0){
        jQuery.sap.require("sap.m.MessageBox");
        sap.m.MessageBox.show(
            "Veuillez remplir au moins un des champs",
            "sap-icon://menu",
            "Erreur"
        );
    }
    else{
        if(I_nom.getValue().length > 0 && I_prenom.getValue().length > 0){

            if(I_nom.getValue().length >= 2 && I_prenom.getValue().length >= 2){
                ok = true;
                path = "/Contacts_SAPUI2?$filter=startswith(LastName,'"
                + I_nom.getValue()
                + "') and startswith(FirstName,'"
                + I_prenom.getValue()
                + "')&";
            }
            else{
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show(
                    "Les champs doivent contenir au moins 2 lettres",
                    "sap-icon://menu",
                    "Erreur"
                );
            }
        }
        else if(I_nom.getValue().length > 0 && I_prenom.getValue().length == 0){

            if(I_nom.getValue().length >= 2){
                ok = true;
                path = "/Contacts_SAPUI2?$filter=startswith(LastName,'"
                + I_nom.getValue()
                + "')&";
            }
            else{
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show(
                    "Le champ nom doit contenir au moins 2 lettres",
                    "sap-icon://menu",
                    "Erreur"
                );
            }
        }
        else if(I_nom.getValue().length == 0 && I_prenom.getValue().length > 0){

            if(I_prenom.getValue().length >= 2){
                ok = true;
                path = "/Contacts_SAPUI2?$filter=startswith(FirstName,'"
                + I_prenom.getValue()
                + "')&";
            }
            else{
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show(
                    "Le champ prénom doit contenir au moins 2 lettres",
                    "sap-icon://menu",
                    "Erreur"
                );
            }
        }

    }


    if(ok){
        oTileCont.unbindAggregation("tiles", {
            path : "/Contacts_SAPUI2",
            template : oTileTmp
        });

        oTileCont.destroyTiles();

        oTileCont.bindAggregation("tiles", {

            path : path, 

            template : oTileTmp
        }); 

        annuaire.removeAllContent();
        annuaire.addContent(filter);
        annuaire.setEnableScrolling(false).addContent(oTileCont);
        app.to(annuaire);
    }
}


function __alpha(letter){
    oTileCont.unbindAggregation("tiles", {
        path : "/Contacts_SAPUI2",
        template : oTileTmp
    });

    oTileCont.destroyTiles();

    oTileCont.bindAggregation("tiles", {
        path : "/Contacts_SAPUI2?$filter=startswith(LastName,'"+letter+"')&",
        template : oTileTmp
    }); 

    annuaire.removeAllContent();
    annuaire.addContent(filter);
    annuaire.setEnableScrolling(false).addContent(oTileCont);
    filter.setVisible(false);
    app.to(annuaire);
}