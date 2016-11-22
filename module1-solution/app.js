(function() {
  'use strict';
  angular.module('LunchCheck',[])
  .controller('LunchCheckController',LunchCheckController);

  function countItems(commaDelimitedList) {
    var items = 0;
    if (commaDelimitedList) {
      var list = commaDelimitedList.split(",");
      for (var i=0; i < list.length; i++) {
        if (list[i].trim().length > 0) {
          items++;
        }
      }
    }
    return items;
  }

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.onCheckIfTooMuch = function() {
      var items = countItems($scope.lunchInput);
      if (items <= 0) {
        $scope.message = "Please enter data first";
        $scope.color = "red";
      } else if (items <= 3) {
        $scope.message = "Enjoy!";
        $scope.color = "green";
      } else {
        $scope.message = "Too much!";
        $scope.color = "green";
      }
    }
  }
})();
