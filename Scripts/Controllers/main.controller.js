/// <reference path="../angular.js" />

angular.module("mainModule")
    .controller("MainController", [
        "$scope",
        "$location",
        "$route",
        "channelsApi",
        "Hub",
        "$timeout",
        "$rootScope",
        function ($scope, $location, $route, channelsApi, Hub, $timeout, $rootScope) {
            $scope.$route = $route;
            $scope.channels = [];
            $scope.followingChannels = [];
            $scope.feed = [];

            $scope.getFeed = function () {
                $scope.feed = $scope.channels.filter(function (channel) {
                    return $scope.followingChannels.indexOf(channel.id) != -1;
                });
            }

            $scope.loadFollowingChannels = function () {
                var dataString = localStorage.getItem("followingChannels");
                if (dataString)
                    $scope.followingChannels = JSON.parse(dataString);
            }

            $scope.saveFollowingChannels = function () {
                var jsonString = JSON.stringify($scope.followingChannels);
                localStorage.setItem("followingChannels", jsonString);
            }

            var getMessages = function (path, hubname) {
                var hub = null;
                hub = new Hub(hubname, {
                    listeners: {
                        'recieveMessage': function (message) {
                            var index = $scope.channels.map(function (channel) {
                                return channel.id;
                            }).indexOf(message.channelId);
                            
                            $scope.channels[index].messages.push(message);
                            $rootScope.$apply();
                        }
                    },
                    rootPath: path,

                    errorHandler: function (error) {
                        console.error(error);
                    },
                    stateChanged: function (state) {
                        switch (state.newState) {
                            case $.signalR.connectionState.connecting:
                                console.log("Connecting");
                                break;
                            case $.signalR.connectionState.connected:
                                console.log("Connected");
                                break;
                            case $.signalR.connectionState.reconnecting:
                                console.log("Reconnecting");
                                break;
                            case $.signalR.connectionState.disconnected:
                                console.log("Disconnected");
                                break;
                        }
                    }
                });
            };

            var getChannels = function () {
                channelsApi.getChannels()
                .then(function (data) {
                    if (data != null)
                        $scope.channels = data;
                });
            };

            $scope.go = function (url) {
                $location.path(url);
            };

            getChannels();
            $scope.loadFollowingChannels();
            getMessages("http://dummyapi.kodalagom.se/signalr", "chatHub");
        }
    ]);