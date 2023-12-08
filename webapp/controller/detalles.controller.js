sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
	"sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, JSONModel, Device, MessageToast) {
        "use strict";

        return Controller.extend("contactos.controller.detalles", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Targetdetalles").attachPatternMatched(this._onRouteMatched, this);
            Device.media.attachHandler(this._handleMediaChange, this);
			this._handleMediaChange();

            var json = {
                "selectedKey": "page1",
                "navigation": [
                    {
                        "title": "Datos Personales",
                        "key": "page1"
                    },
                    {
                        "title": "Empresa",
                        "key": "page2"
                    },
                    {
                        "title": "Banco",
                        "key": "page3"
                    },
                    {
                        "title": "Dirección",
                        "key": "page4"
                    },
                ]
            };

            var oModel2 = new JSONModel(json);
            this.getView().setModel(oModel2);
            },

            _onRouteMatched: function (oEvent) {
                
               var oArguments = oEvent.getParameter(("arguments" ));
                var oView = this.getView();
                var num = oArguments.parameter - 1;
                oView.bindElement({path: `users>/users/${num}`});
  
    
            },

            onNavBack: function (oEvent) {
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    oRouter.navTo("Targetcontactos", true);
                }
            },
            onItemSelect: function (oEvent) {
                var oItem = oEvent.getParameter("item");
                this.byId("pageContainer").to(this.getView().createId(oItem.getKey()));
            },

            _handleMediaChange: function () {
                var rangeName = Device.media.getCurrentRange("StdExt").name;
    
                switch (rangeName) {
                    // Shell Desktop
                    case "LargeDesktop":
                        this.byId("productName").setVisible(true);

                        MessageToast.show("Screen width is corresponding to Large Desktop");
                        break;
    
                    // Tablet - Landscape
                    case "Desktop":
                        this.byId("productName").setVisible(true);
                       
                        MessageToast.show("Screen width is corresponding to Desktop");
                        break;
    
                    // Tablet - Portrait
                    case "Tablet":
                        this.byId("productName").setVisible(true);

                        MessageToast.show("Screen width is corresponding to Tablet");
                        break;
    
                    case "Phone":

                        this.byId("productName").setVisible(false);

                        MessageToast.show("Screen width is corresponding to Phone");
                        break;
                    default:
                        break;
                }
            },
        });
    });
