sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("contactos.controller.contactos", {
            onInit: function () {
                var oModel = this.getView().getModel("users");
                this.getView().setModel(oModel);

               
            },

            onPressed: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var contacto =  oEvent.getSource().getBindingContext("users").getObject();
                console.log('Data contacto');
                console.log(contacto);
			    oRouter.navTo("Targetdetalles", { parameter : contacto.id} );
                
            }


        });
    });
