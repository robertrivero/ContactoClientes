# Crear proyecto
Este proyecto se debe crear desde el Bussiness Application Studio como un proyecto de SAP Fiori
# Llamado del REST API
Para realizar el llamado de REST API, crearemos un modelo en el manifest.json del proyecto en la seccion de sap.UI5, agregamos nuestro modelo con su URL siguiendo la sintaxis presentada, en este caso se estara agregando el modelo "users".
```JSON
    "models": {
      "i18n": {
        "type": "sap.ui.model.resource.ResourceModel",
        "settings": {
          "bundleName": "contactos.i18n.i18n"
        }
      },
      "users":{
        "type": "sap.ui.model.json.JSONModel",
        "uri": "https://dummyjson.com/user"
      }
```
En la funcion onInit de nuestra primera pantalla, agregaremos el siguiente codigo para realizar el llamado del endpoint y poder utilizar su data, en el cual llamamos al modelo que creamos en el paso anterior y lo seteamos a la data de la pantalla.
```javascript
 onInit: function () {
                var oModel = this.getView().getModel("users");
                this.getView().setModel(oModel);              
            }
```
# Crear vista de la primera pantalla
El mapeo del servicio en la primera pantalla se realiza en el parametro de item cuando se crea la tabla ```items="{users>/users}"> ``` en el cual se coloca primero el nombre del modelo que se creo anteriormente, luego de eso se coloca el path en el que se encuentran los datos a mostrar, en este caso los datos llegan del servicio dentro de un array llamado users, es decir, {users>/users} se refiere a {[nombre del modelo]>/[array de la respuesta]}
```XML
    <Table
		id="contactList"
		class="sapUiResponsiveMargin"
		width="auto"
		items="{users>/users}">
```
Ejemplo de la respuesta del servicio
```JSON
 {
   "users":[
      {
         "id":1,
         "firstName":"Terry",
         "lastName":"Medhurst",
         "maidenName":"Smitham",
         "age":50,
         "gender":"male",
         "email":"atuny0@sohu.com",
         "phone":"+63 791 675 8914",
         "username":"atuny0",
         "password":"9uQFF1Lh",
         "birthDate":"2000-12-25",
         "image":"https://robohash.org/hicveldicta.png",
         "bloodGroup":"A−",
         "height":189,
         "weight":75.4,
         "eyeColor":"Green",
         "hair":{
            "color":"Black",
            "type":"Strands"
         },
         "domain":"slashdot.org",
         "ip":"117.29.86.254",
         "address":{
            "address":"1745 T Street Southeast",
            "city":"Washington",
            "coordinates":{
               "lat":38.867033,
               "lng":-76.979235
            },
            "postalCode":"20020",
            "state":"DC"
         },
         "macAddress":"13:69:BA:56:A3:74",
         "university":"Capitol University",
         "bank":{
            "cardExpire":"06/22",
            "cardNumber":"50380955204220685",
            "cardType":"maestro",
            "currency":"Peso",
            "iban":"NO17 0695 2754 967"
         },
         "company":{
            "address":{
               "address":"629 Debbie Drive",
               "city":"Nashville",
               "coordinates":{
                  "lat":36.208114,
                  "lng":-86.58621199999999
               },
               "postalCode":"37076",
               "state":"TN"
            },
            "department":"Marketing",
            "name":"Blanda-O'Keefe",
            "title":"Help Desk Operator"
         },
         "ein":"20-9487066",
         "ssn":"661-64-2976",
         "userAgent":"Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24"
      },
    ]
}
```
La sintaxis de la tabla completa es la siguiente, en la sección de columns pondremos los valores que tendra cada columna en el header, en la sección de cells se hace el mapeo de los datos del servicio a la tabla, los cuales apareceran asociados al header siguiendo el mismo orden en el que se coloquen.

```XML
    <Table
		id="contactList"
		class="sapUiResponsiveMargin"
		width="auto"
		items="{users>/users}">
		<headerToolbar>
			<Toolbar id="_IDGenToolbar1">
				<ToolbarSpacer id="_IDGenToolbarSpacer1" />
				<SearchField id="_IDGenSearchField1"
					width="50%"
					search=".onFilter"/>
			</Toolbar>
		</headerToolbar>
		<columns>
			<Column id="_IDGenColumn0">
				<Text id="_IDGenText0" text="" />
			</Column>
			<Column id="_IDGenColumn1">
				<Text id="_IDGenText1" text="Nombre" />
			</Column>
			<Column id="_IDGenColumn2">
				<Text id="_IDGenText2" text="Dirección" />
			</Column>
			<Column id="_IDGenColumn3">
				<Text id="_IDGenText3" text="Teléfono" />
			</Column>
			<Column id="_IDGenColumn4">
				<Text id="_IDGenText4" text="Compañia" />
			</Column>
			<Column id="_IDGenColumn5" hAlign="End">
				<Text id="_IDGenText5" text="Email" />
			</Column>
			<Column id="_IDGenColumn6" hAlign="End">
				<Text id="_IDGenText6" text="Pagina Web" />
			</Column>
		</columns>
		<items>
			<ColumnListItem id="_IDGenColumnListItem1"
				type="Navigation"
				press="onPressed">
				<cells>
					<Avatar id="_IDGenAvatar1"
							src="{users>image}"
							displaySize="M"
							displayShape="Circle"
							showBorder="true"
							press="onPress"/>
					<Text id="_IDGenText11" text="{users>firstName} {users>lastName}"/>
					<Text id="_IDGenText22" text="{users>address/address}"/>
					<Text id="_IDGenText33" text="{users>phone}"/>
					<Text id="_IDGenText44" text="{users>company/name}"/>
					<Text id="_IDGenText55" text="{users>email}"/>
					<Text id="_IDGenText66" text="{users>domain}"/>
	
				</cells>
			</ColumnListItem>
		</items>
	</Table>
```
Para mapear un parametro del servicio en una celda, simplemente hay que llamar al nombre modelo seguido del parametro que queramos mostrar EJ: ``` {users>company/name} ```, ya que el mapeado del arreglo ya se realizo arriba, automaticamente se generara la columna con una fila por cada item que llegue en el servicio, 

Las celdas en este caso simplemente tienen un widget de Texto para mostrar el parametro, el primer widget que contiene la imagen es el de Avatar, al cual simplemente hay que asignarle el URL de la imagen al parametro ``` src="{users>image}" ```

# Crear la segunda pantalla
Para la primera pantalla se asume que se estuvo utilizando la vista y el controlador que se crean automaticamente al crear el proyecto, para crear una segunda pantalla primero crearemos un nuevo controlador dentro de >webapp>controller, el nombre en este caso sera detalles.js, con la siguiente sintaxis, se estaran importando librerias que utilizaremos mas adelante en el proyecto. 
```javascript
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

            },

        });
    });
```
Ahora crearemos la vista, dentro de >webapp>view, con el mismo nombre que el controlador y la extension .view.xml, en este caso detalles.view.xml, se el agregara la siguiente sintaxis, para asignarle el controlador se debe tener en cosideracion la signite linea, ``` <mvc:View controllerName="contactos.controller.detalles"``` en donde contactos es el nombre del proyecto y detalles el nombre que le dimos al controlador que acabamos de crear
```XML
<mvc:View controllerName="contactos.controller.detalles"
    xmlns:mvc="sap.ui.core.mvc" displayBlock="true"
    xmlns="sap.m">
    <Page id="page" title="detalles">

    </Page>
</mvc:View>

```
# Routing y Navegación con parametro
Para poder realizar la navegacion a la segunda pantalla pasandole la informacion de la fila que seleccionamos se debera configurar el routing y la navegacion.
## Configurar el routing a la segunda pantalla
En el manifest.json en la seccion de routing configuraremos el target de la pantalla donde queramos navegar, en este caso creamos el target de la pantalla detalles siguiendo la siguiente sintaxis, en viewName y viewId pondremos el nombre de la pantalla que creamos anteriormente, y le asignamos el nombre del Target como Targetdetalles para poder identificarlo en la ruta.
```JSON
"targets": {
        "Targetcontactos": {
          "viewType": "XML",
          "transition": "slide",
          "clearControlAggregation": false,
          "viewId": "contactos",
          "viewName": "contactos"
        },
        "Targetdetalles": {
					"viewType": "XML",
					"viewName": "detalles",
          "viewId": "detalles",
          "clearControlAggregation": false
				}
      }
    },
```
Ahora debe configurarse la ruta siguiendo la sintaxis, le pondremos el mismo nombre que le asignamos al Target y en la seccion de target le asignamos el que se acaba de crear, en pattern pondremos ``` "pattern": "Routedetalles/{parameter}", ``` donde parameter hace referencia al valor del id del usuario que seleccionemos en la primera pantalla, el cual se utilizara para obtener la data en la segunda pantalla.
```JSON
"routes": [
        {
          "name": "Routecontactos",
          "pattern": ":?query:",
          "target": [
            "Targetcontactos"
          ]
        },
        {
            "name": "Targetdetalles",
            "pattern": "Routedetalles/{parameter}",
            "titleTarget": "",
			"greedy": false,
			"target": [
				"Targetdetalles"
			]
        }
      ],
```
Con esto estara configurada la ruta a la segunda pantalla
## Obtener la data de la fila seleccionada y realizar la navegacion
Para poder utilizar la data del usuario seleccionado en la segunda pantalla deberemos enviar el id durante la navegacion, crearemos la siguiente funcion en el controlador de la primera pantalla
```javascript
            onPressed: function (oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var contacto =  oEvent.getSource().getBindingContext("users").getObject();
			    oRouter.navTo("Targetdetalles", { parameter : contacto.id} );
            }
```
Se crea el oRouter que hara referencia a la configuracion que hicimos en el manisfest.json.
En la siguiente linea ``` var contacto =  oEvent.getSource().getBindingContext("users").getObject();``` se obtiene la data del usuario que seleccionamos, haciendo referencia a "users" que es el nombre de nuestro modelo.
Y con ``` oRouter.navTo("Targetdetalles", { parameter : contacto.id} ); ``` realizaremos la navegacion a la segunda pantalla, pasando el parameter con el id del usuario seleccionado para referenciarlo en la segunda pantalla.

# Crear y mapear la vista de la segunda pantalla
Para poder utilizar 


## Mostrar destalles en pestañas
## Mostrar form en cada pestaña
