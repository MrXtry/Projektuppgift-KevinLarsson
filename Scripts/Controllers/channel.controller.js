/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("ChannelController", [
        "$scope",
        "$routeParams",
        "channelsApi",
        "$timeout",
        function ($scope, $routeParams, channelsApi, $timeout) {
            $scope.title = "Channel";
            $scope.newMessage = {
                author: "",
                body: ""
            };

            var poll = function () {
                $timeout(function () {
                    $scope.channel = $scope.channels.filter(function (channel) {
                        return channel.id == $routeParams.id;
                    })[0];
                    poll();
                }, 1000);
            };

            


            $scope.addMessage = function () {
                $scope.newMessage.channelId = $scope.channel.id;
                channelsApi.addMessage($scope.newMessage)
                    .then(function (data) {
                        $scope.channel.messages.push($scope.newMessage);
                        $scope.newMessage = {};
                    });
            };

            poll();
        }
    ]);