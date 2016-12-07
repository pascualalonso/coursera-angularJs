(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['MenuDataService', 'allCategories'];
function CategoriesController(MenuDataService, allCategories) {
  var controller = this;
  controller.items = allCategories.data;
  // console.log("On controller!",controller.items);
}

})();
