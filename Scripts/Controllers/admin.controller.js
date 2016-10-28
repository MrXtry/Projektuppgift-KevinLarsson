/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("AdminController", [
        "$scope",
        "channelsApi",
        function ($scope, channelsApi) {
            $scope.title = "Admin";
            $scope.newChannel = {
                name: ""
            }
            $scope.newSubscribe = {}

            $scope.addChannel = function () {
                channelsApi.addChannel($scope.newChannel)
                    .then(function (data) {
                        $scope.channels.push(data);
                        $scope.newChannel = {};
                    });
            }

            $scope.subscribe = function (channel) {
                //$scope.newSubscribe.id = channel.id;
                //$scope.newSubscribe.name = channel.name;
                $scope.subscribedChannels.push(channel);

                $scope.saveSubscribedChannels();
            };

            $scope.deleteChannel = function (channel) {
                channelsApi.deleteChannel(channel.id)
                    .then(function () {
                        var index = $scope.channels.map(function (channel) {
                            return channel.id;
                        }).indexOf(channel.id);

                        $scope.channels.splice(index, 1);
                    });
            }
        }
    ]);