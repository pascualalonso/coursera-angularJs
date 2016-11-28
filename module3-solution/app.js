(function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('DbServer', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItems)
    ;

    function FoundItems() {
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          items: '<',
          calls: '<',
          onRemove: '&'
        }
      };
      return ddo;
    }

    if (Array.prototype.extend === undefined) {
      Array.prototype.extend = function(other) {
        this.push.apply(this, arguments.length > 1 ? arguments : other);
        return this;
      };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(service) {
      var controller = this;
      controller.test = "Test";
      controller.found = []
      controller.calls = 0;

      controller.narrowItDown = function () {
        service.getMatchedMenuItems(controller.searchTerm,controller.found);
        controller.calls++;
      }

      controller.remove = function(index) {
        controller.found.splice(index,1);
      }
    }

    MenuSearchService.$inject = ['$http','DbServer'];
    function MenuSearchService($http,DbServer) {
      var service = this;
      service.keys = ["name","description"];
      service.menuItems = [];

      function filter(searchTerm,found) {
        found.length = 0;
        if (searchTerm === undefined || searchTerm === "") {
          // uncommet this to include all entries.
          // service.found.extend(service.menuItems);
        } else {
          searchTerm = searchTerm.toLowerCase();
          var keys = service.keys;
          var items = service.menuItems;
          for (var i=0; i < items.length; i++) {
            var item = items[i];
            for (var j=0; j < keys.length; j++) {
              var value = item[keys[j]] || "";
              if (value.toString().toLowerCase().indexOf(searchTerm) >= 0) {
                found.push(item);
                break;
              }
            }
          }
        }
        console.log("Filter:" + found.length);
      }

      service.getMatchedMenuItems = function (searchTerm,found) {
        if (service.menuItems.length > 0) {
          filter(searchTerm,found);
        } else {
          $http({
            method: "GET",
            url: (DbServer + "/menu_items.json")
          }).then(function (result) {
            if (result && result.data && result.data.menu_items) {
              service.menuItems = result.data.menu_items;
              console.log("Received menu items:" + service.menuItems.length);
              filter(searchTerm,found);
            } else {
              console.log("Incorrect data format!");
            }
          });
        }
      }
    }

})();
