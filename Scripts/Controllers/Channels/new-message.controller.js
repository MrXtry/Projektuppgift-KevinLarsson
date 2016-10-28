/// <reference path="../../angular.js" />

angular.module("mainModule")
    .controller("NewMessageController", [
        "$scope",
        "channelsApi",
        function ($scope, channelsApi) {
            $scope.title = "New post";
            $scope.newMessage = {};

            $scope.addMessage = function () {
                channelsApi.addMessage($scope.newMessage)
                    .then(function (data) {
                        $scope.channels.push(data);
                        $scope.newMessage = {};
                        $scope.go("/");
                    });
            };
        }
    ]);