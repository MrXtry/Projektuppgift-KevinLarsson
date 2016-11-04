/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("ChannelController", [
        "$scope",
        "$routeParams",
        "channelsApi",
        "$timeout",
        "$location",
        "$anchorScroll",
        function ($scope, $routeParams, channelsApi, $timeout, $location, $anchorScroll) {
            $scope.title = "Channel";
            $scope.newMessage = {
                author: "",
                body: ""
            };

            $scope.channel = $scope.channels.filter(function (channel) {
                return channel.id == $routeParams.id;
            })[0];

            $scope.addMessage = function () {
                $scope.newMessage.channelId = $scope.channel.id;
                channelsApi.addMessage($scope.newMessage)
                    .then(function (data) {
                        $scope.newMessage = {};
                    });
            };
        }
    ]);