(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$http']
function MenuDataService($http) {
  var service = this;
  var dbServer ="https://davids-restaurant.herokuapp.com";
  // console.log("MenuDataService",service);

  service.getAllCategories  = function () {
    var url = dbServer + "/categories.json";
    // console.log("getAllCategories",url);

    var promise = $http({
      method: "GET",
      url: url
    });

    return promise;
  };

  service.getItemsForCategory = function (categoryShortName) {
    var url = dbServer + "/menu_items.json";
    // console.log("getItemsForCategory",categoryShortName,url);
    var promise = $http({
      method: "GET",
      url: url,
      params : {
        category : categoryShortName
      }
    });

    return promise;
  };
}

})();
