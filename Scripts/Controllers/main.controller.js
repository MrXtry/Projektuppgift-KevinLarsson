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
        function ($scope, $location, $route, channelsApi, Hub, $rootScope, $timeout) {
            $scope.$route = $route;
            $scope.channels = [];
            //var path = "http://dummyapi.kodalagom.se/signalr";
            $scope.hub = null;
            $scope.hubFunction = function (path, hubname){
                $scope.hub = new Hub(hubname, {
                    listeners: {
                        'recieveMessage': function (message) {
                            console.log(message);
                        }
                    },
                    rootPath: path,

                    errorHandler: function (error) {
                        console.error(error);
                    },

                    stateChanged: function (state) {
                        switch (state.newState) {
                            case $.signalR.connectionState.connecting:
                                //your code here
                                break;
                            case $.signalR.connectionState.connected:
                                //your code here
                                break;
                            case $.signalR.connectionState.reconnecting:
                                //your code here
                                break;
                            case $.signalR.connectionState.disconnected:
                                //your code here
                                break;
                        }
                    }
                });
            }

            //$scope.chatDataHub = channelsHub('http://dummyapi.kodalagom.se', 'chatHub');

            //$scope.chatDataHub.on('recieveMessage', function (data) {
            //    console.log(data);
            //    data.forEach(function (dataItem) {
            //        console.log(dataItem);
            //    });
            //});


            $scope.subscribedChannels = [];

            $scope.loadSubscribedChannels = function () {
                var dataString = localStorage.getItem("subscribedChannels");
                if (dataString)
                    $scope.subscribedChannels = JSON.parse(dataString);
            }

            $scope.saveSubscribedChannels = function () {
                var jsonString = JSON.stringify($scope.subscribedChannels);
                localStorage.setItem("subscribedChannels", jsonString);
            }

            //var poll = function () {
            //    $timeout(function () {
            //        channelsApi.getChannels()
            //            .then(function (data) {
            //                if (data != null)
            //                    $scope.channels = data;
            //            });
            //        poll();
            //    }, 1000);
            //};

            channelsApi.getChannels()
                .then(function (data) {
                    if (data != null)
                        $scope.channels = data;
                });

            $scope.go = function (url) {
                $location.path(url);
            };

            $scope.loadSubscribedChannels();
            $scope.hubFunction("http://dummyapi.kodalagom.se/signalr", "chatHub");
            //poll();
        }
    ]);