/****************************************/
/*                  PAGES
/****************************************/



    /*******************************************/
    /*                Log
    /*******************************************/

    var log = new sap.m.Page("log", {
        customHeader : new sap.m.Bar({
            contentMiddle : [ new sap.m.Label("connect", { text : "Directory"
            })]
        }),
        content : [
            new sap.m.Panel({
                headerText : "Log",          
                content : [
                    new sap.m.Label({text: 'Login'}),
                    I_login,
                    new sap.m.Label({text: 'Password'}),
                    I_pass,
                    new sap.m.Button({
                        text: "Log in",
                        width: "100%",
                        tap : __connect
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
                        text: "My profil",
                        icon : "sap-icon://group",
                        width: "100%",
                        tap : function(){__getProfil(userName[1],userName[0]);}
                    }),
                    new sap.m.Button({
                        text: "My directory",
                        icon : "sap-icon://favorite-list",
                        width: "100%"
                    }),
                    new sap.m.Button({
                        text: "Find someone",
                        icon : "sap-icon://sys-find",
                        width: "100%",
                        tap : function(){app.to("search");}
                    }),
                     new sap.m.Button({
                        text: "Stats",
                        icon : "sap-icon://bar-chart",
                        width: "100%",
                        tap : function(){app.to("stats");}
                    }),
                    new sap.m.Button({
                        text: "Disconect",
                        icon : "sap-icon://log",
                        width: "100%",
                        tap : __deconnect
                    })
                ],
                cancelButtonTap : function(){ app.back();}
            })
        ]
    });

    menu.addStyleClass("menu");


    /*******************************************/
    /*                Directory
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
        path : "/Contacts",
        template : oTileTmp
    });

    var directory = new sap.m.Page("home", {
    customHeader : new sap.m.Bar({
            contentLeft : [ new sap.m.Button({
                icon : "sap-icon://filter",
                 tap : __handleFilter
            }) ],
            contentMiddle : [ new sap.m.Label("title", { text :  "Directory"
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
                text : "Place",
                key : "place",
                content : [
                    new sap.m.Button({
                         icon : "sap-icon://building",
                         text: "Paris",
                         tap : function(){ __filter("Paris");}
                    }),
                    new sap.m.Button({
                         icon : "sap-icon://building",
                         text: "New york",
                         tap : function(){ __filter("New York");}
                    }),
                    new sap.m.Button({
                         icon : "sap-icon://building",
                         text: "London",
                         tap : function(){ __filter("London");}
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
            new sap.m.StandardListItem({title: "Last Name", info: "{LastName}"}),
            new sap.m.StandardListItem({title: "First Name", info: "{FirstName}"}),
            new sap.m.StandardListItem({title: "Job", info: "{JobTitle}"}),
            new sap.m.StandardListItem({title: "Email", info: "{EMailAddress}",tap : "handleEmail"}),
            new sap.m.StandardListItem({title: "Phone", info: "{BusinessPhone}"}),
            new sap.m.StandardListItem({title: "Place", info: "{Place}"}),
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
                headerText : "Find someone",          
                content : [
                    new sap.m.Label({text: 'LastName'}),
                    I_nom,
                    new sap.m.Label({text: 'FirstName'}),
                    I_prenom,
                    new sap.m.Button({
                        text: "Search",
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

     var oPlaceData = [
            { place: "Paris", number : 51515151},
            { place: "London", number : 5841554184}
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
            name : 'Place',
            value : "{place}"
        } ],

        measures : [ {
            name : "Number",
            value : '{number}'
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

    stats.addContent(placePanel);


    var app = new sap.m.App("App");
    app.addPage(directory).addPage(profil).addPage(log).addPage(menu).addPage(search).addPage(stats).setInitialPage(log);
    var shell = new sap.m.Shell("Shell",{showLogout : true});
    shell.setApp(app).placeAt('body');
