/****************************************/
/*                  PAGES
/****************************************/



    /*******************************************/
    /*                 CONNEXION
    /*******************************************/

    var connexion = new sap.m.Page("connexion", {
        customHeader : new sap.m.Bar({
            contentMiddle : [ new sap.m.Label("connect", { text : "Annuaire ATS Nantes"
            })]
        }),
        content : [
            new sap.m.Panel({
                headerText : "Connexion",          
                content : [
                    new sap.m.Label({text: 'Login'}),
                    I_login,
                    new sap.m.Label({text: 'Password'}),
                    I_pass,
                    new sap.m.Button({
                        text: "Se connecter",
                        width: "100%",
                        tap : __connection
                    })
                ]
            })
        ]
    });


    

    /*******************************************/
    /*                 MENU
    /*******************************************/
    var menu = new sap.m.Page("menu", {
        customHeader : new sap.m.Bar({
            contentMiddle : [ new sap.m.Label({ text : "Menu"
            })]
        }),
        content : [
            new sap.m.ActionSheet ({
                buttons : [
                    new sap.m.Button({
                        text: "Mon profil",
                        icon : "sap-icon://group",
                        width: "100%",
                        tap : function(){__getProfil(userName[1],userName[0]);}
                    }),
                    new sap.m.Button({
                        text: "Mon annuaire",
                        icon : "sap-icon://favorite-list",
                        width: "100%"
                    }),
                    new sap.m.Button({
                        text: "Rechercher un employé",
                        icon : "sap-icon://sys-find",
                        width: "100%",
                        tap : function(){app.to("search");}
                    }),
                     new sap.m.Button({
                        text: "Statistiques",
                        icon : "sap-icon://bar-chart",
                        width: "100%",
                        tap : function(){app.to("stats");}
                    }),
                    new sap.m.Button({
                        text: "Se déconnecter",
                        icon : "sap-icon://log",
                        width: "100%",
                        tap : __deconnection
                    })
                ],
                cancelButtonTap : function(){ app.back();}
            })
        ]
    });

    menu.addStyleClass("menu");


    /*******************************************/
    /*                ANNUAIRE
    /*******************************************/
    var oTileCont = new sap.m.TileContainer("tileCont", {});
    //Tile Template
    var oTileTmp = new sap.m.StandardTile({
        icon : "{Attachments}",
        title : "{LastName}",
        info : "{FirstName}",
        press : _handleTileTap
    });

    oTileCont.bindAggregation("tiles", {
        path : "/Contacts_SAPUI2",
        template : oTileTmp
    });

    var annuaire = new sap.m.Page("home", {
    customHeader : new sap.m.Bar({
            contentLeft : [ new sap.m.Button({
                icon : "sap-icon://filter",
                 tap : __handleFilter
            }) ],
            contentMiddle : [ new sap.m.Label("title", { text :  "Annuaire des employés"
            })],
            contentRight : [ new sap.m.Button({
                icon : "sap-icon://menu2",
                tap : function() { app.to("menu");}
            }) ],
        })
     });

    var filter = new sap.m.IconTabBar({
        visible: false,
        items : [
            new sap.m.IconTabFilter({
                icon : "sap-icon://building",
                text : "Batiment",
                key : "batiment",
                content : [
                    new sap.m.Button({
                         icon : "sap-icon://building",
                         text: "Arpège",
                         tap : function(){ __filter("Arpège");}
                    }),
                    new sap.m.Button({
                         icon : "sap-icon://building",
                         text: "Rivière A",
                         tap : function(){ __filter("Rivière A");}
                    }),
                    new sap.m.Button({
                         icon : "sap-icon://building",
                         text: "Rivière B",
                         tap : function(){ __filter("Rivière B");}
                    })
                ]
            })
            

        ]
    });


    annuaire.addContent(filter);
    annuaire.setEnableScrolling(false).addContent(oTileCont);


    /*******************************************/
    /*               PROFIL
    /*******************************************/
    var profil = new sap.m.Page("profil", {
        customHeader : new sap.m.Bar({
            contentLeft : [ new sap.m.Button({
                icon : "sap-icon://undo",
                tap : function() { app.back();}
            }) ],
            contentMiddle : [ new sap.m.Label("lastname", { text : "{LastName}"
            }), new sap.m.Label("firstname", { text : "{FirstName}"
            }) ],
            contentRight : [ 
                new sap.m.Button({
                    icon : "sap-icon://favorite",
                    tap : __bookmark
                }),
                new sap.m.Button({
                    icon : "sap-icon://menu",
                    tap : function() { app.to("menu");}
                })
             ]
        }),
        content : [
            new sap.m.Image({src: "profil.png" }),
            new sap.m.StandardListItem({title: "Nom", info: "{LastName}"}),
            new sap.m.StandardListItem({title: "Prénom", info: "{FirstName}"}),
            new sap.m.StandardListItem({title: "Poste", info: "{JobTitle}"}),
            new sap.m.StandardListItem({title: "Email", info: "{EMailAddress}",tap : "handleEmail"}),
            new sap.m.StandardListItem({title: "Téléphone", info: "{BusinessPhone}"}),
            new sap.m.StandardListItem({title: "Site", info: "{Site}"}),
            new sap.m.StandardListItem({title: "Emplacement", info: "{Emplacement}"})
        ]
    });



    /*******************************************/
    /*                 SEARCH
    /*******************************************/
     var search = new sap.m.Page("search", {
         customHeader : new sap.m.Bar({
            contentLeft : [ new sap.m.Button({
                icon : "sap-icon://undo",
                tap : function() { app.back();}
            }) ],
            contentRight : [ 
                new sap.m.Button({
                    icon : "sap-icon://menu",
                    tap : function() { app.to("menu");}
                })
             ]
        }),
        content: [
            new sap.m.Panel({
                headerText : "Rechercher un employé",          
                content : [
                    new sap.m.Label({text: 'Nom'}),
                    I_nom,
                    new sap.m.Label({text: 'Prénom'}),
                    I_prenom,
                    new sap.m.Button({
                        text: "Rechercher",
                        width: "100%",
                        tap : __search
                    })
                ]
            })
        ]
     });


    /*******************************************/
    /*                 STATS
    /*******************************************/


    var stats = new sap.m.Page("stats", {
        customHeader : new sap.m.Bar({
            contentLeft : [ new sap.m.Button({
                icon : "sap-icon://undo",
                tap : function() { app.back();}
            }) ],
            contentRight : [ 
                new sap.m.Button({
                    icon : "sap-icon://menu",
                    tap : function() { app.to("menu");}
                })
                ]
            }),
        content: [
            new sap.m.Panel({
                headerText : "Statistiques ATS Nantes"
            })
        ]
    });
 



    var placePanel = new sap.m.Panel();

    var modelSite = new sap.ui.model.odata.ODataModel("https://adtppmemea16ws2010.accenture.com/NDC_RES_INDUS_3/_vti_bin/listdata.svc", true);  
    var modelJsonSite = new sap.ui.model.json.JSONModel();  

    modelSite.read("/Contacts_SAPUI2/?$filter=startswith(Site,'Ar')&", null, null, false, function(oData, oResponse) {  
        modelJsonSite.setData(oData);  
    }, null);  

    var nbArpege = modelJsonSite.getData().results.length;  

    modelSite.read("/Contacts_SAPUI2/?$filter=startswith(Site,'Ri')&", null, null, false, function(oData, oResponse) {  
        modelJsonSite.setData(oData);  
    }, null);

    var nbRiviere = modelJsonSite.getData().results.length;  


     var oPlaceData = [
            { site : "Arpège", nombre : nbArpege },
            { site : "Rivière", nombre : nbRiviere }
        ];

    var oPlaceModel = new sap.ui.model.json.JSONModel();

    setTimeout(function() {
        oPlaceModel.setData({
            placeData : oPlaceData
        });
    }, 4000);

     // all charts and the table share the same model, so we set it to a common parent, the shell
    placePanel.setModel(oPlaceModel);

    var placeDataset = new sap.viz.ui5.data.FlattenedDataset({
        dimensions : [ {
            axis : 1,
            name : 'Site',
            value : "{site}"
        } ],

        measures : [ {
            name : "Employés",
            value : '{nombre}'
        } ],

        data : {
            path : "/placeData"
        }
    });

    var placeDonut = new sap.viz.ui5.Donut({
        width : "80%",
        height : "400px",
        title : {
            visible : true,
            text : 'Répartition des employés sur les sites ATS Nantes' 
        },
        dataset : placeDataset
    });


    placePanel.addContent(placeDonut);


/*******************************************/

    var sexPanel = new sap.m.Panel();

    var modelSexe = new sap.ui.model.odata.ODataModel("https://adtppmemea16ws2010.accenture.com/NDC_RES_INDUS_3/_vti_bin/listdata.svc", true);  
    var modelJsonSexe = new sap.ui.model.json.JSONModel();  

    modelSexe.read("/Contacts_SAPUI2/?$filter=SexeValue eq 'Homme'&", null, null, false, function(oData, oResponse) {  
        modelJsonSexe.setData(oData);  
    }, null);  

    var nbHomme = modelJsonSexe.getData().results.length;  

    modelSexe.read("/Contacts_SAPUI2/?$filter=SexeValue eq 'Femme'&", null, null, false, function(oData, oResponse) {  
        modelJsonSexe.setData(oData);  
    }, null);

    var nbFemme = modelJsonSexe.getData().results.length;  

    var oSexData = [
     
            { sexe : "Hommes", nombre : nbHomme },
            { sexe : "Femmes", nombre : nbFemme }
     
        ];

   var oSexModel = new sap.ui.model.json.JSONModel();

    setTimeout(function() {
        oSexModel.setData({
            sexData : oSexData
        });
    }, 4000);

     // all charts and the table share the same model, so we set it to a common parent, the shell
    sexPanel.setModel(oSexModel);

    var sexDataset = new sap.viz.ui5.data.FlattenedDataset({
        dimensions : [ {
            axis : 1,
            name : 'Sexe',
            value : "{sexe}"
        } ],

        measures : [ {
            name : 'Nombre',
            value : '{nombre}'
        } ],

        data : {
            path : "/sexData"
        }
    });

    var sexDonut = new sap.viz.ui5.Donut({
        width : "80%",
        height : "400px",
        title : {
            visible : true,
            text : 'Répartition hommes/femmes à ATS Nantes'
        },
        dataset : sexDataset
    });


    sexPanel.addContent(sexDonut);

    stats.addContent(placePanel);
    stats.addContent(sexPanel);

    var app = new sap.m.App("App");
    app.addPage(annuaire).addPage(profil).addPage(connexion).addPage(menu).addPage(search).addPage(stats).setInitialPage(connexion);
    var shell = new sap.m.Shell("Shell",{showLogout : true});
    shell.setApp(app).placeAt('body');
