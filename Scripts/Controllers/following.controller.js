/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("FollowingController", [
        "$scope",
        function ($scope) {
            $scope.title = "Following";

            $scope.getFeed();
        }
    ]);