(function() {
  'use strict';
  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService)
  ;

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(service) {
    var controller = this;
    controller.items = service.toBuyItems();
    controller.service = service;
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(service) {
    var controller = this;
    controller.items = service.boughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyList = [
      {name:'chocolates',quantity:10}
      ,{name:'sugar bags',quantity:6}
      ,{name:'beers',quantity:8}
      ,{name:'loaves of bread',quantity:3}
      ,{name:'tamarindos',quantity:2}
    ];
    var boughtList = [];

    service.toBuyItems = function() {
      return toBuyList;
    }

    service.boughtItems = function() {
      return boughtList;
    }

    service.buy = function(index) {
        boughtList.push(toBuyList.splice(index,1)[0]);
    }

  }

})();
