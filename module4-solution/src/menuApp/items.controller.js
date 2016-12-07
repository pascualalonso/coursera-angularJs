(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'itemsByCategory'];
function ItemsController(MenuDataService, itemsByCategory) {
  var controller = this;
  controller.data = itemsByCategory.data;
  console.log("On ItemsController!",controller.data);
}

})();
