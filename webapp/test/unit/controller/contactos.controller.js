/*global QUnit*/

sap.ui.define([
	"contactos/controller/contactos.controller"
], function (Controller) {
	"use strict";

	QUnit.module("contactos Controller");

	QUnit.test("I should test the contactos controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
