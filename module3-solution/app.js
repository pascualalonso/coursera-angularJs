(function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('DbServer', "https://davids-restaurant.herokuapp.com")
    ;

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(service) {
      var controller = this;

      controller.narrowItDown = function () {
        controller.found = service.getMatchedMenuItems(controller.searchTerm);
      }

    }

    MenuSearchService.$inject = ['$http','DbServer'];
    function MenuSearchService($http,DbServer) {
      var service = this;
      service.keys = [];
      service.menuItems = [];

      $http({
        method: "GET",
        url: (DbServer + "/menu_items.json")
      }).then(function (result) {
        if (result && result.data && result.data.menu_items) {
          service.menuItems = result.data.menu_items;
          console.log("Received menu items:" + service.menuItems.length);
          if (service.menuItems.length > 0) {
            service.keys = Object.keys(service.menuItems[0]);
            console.log(service.keys);
          }
        } else {
          console.log("Incorrect data format!");
        }
      });

      service.getMatchedMenuItems = function (searchTerm) {
        var found = [];
        var items = service.menuItems || [];
        var keys = service.keys;
        for (var i=0; i < items.length; i++) {
          var item = items[i];
          for (var j=0; j < keys.length; j++) {
            var value = item[keys[j]] || "";
            if (value.toString().indexOf(searchTerm) >= 0) {
              found.push(found);
            }
          }
        }
        console.log(found.length);
        return found;
      }
    }

})();
