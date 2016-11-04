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
            $scope.newFollowing = {}

            $scope.addChannel = function () {
                channelsApi.addChannel($scope.newChannel)
                    .then(function (data) {
                        $scope.channels.push(data);
                        console.log($scope.channels);
                        $scope.newChannel = {};
                    });
            }

            $scope.follow = function (id) {
                $scope.followingChannels.push(id);

                $scope.saveFollowingChannels();
            };

            $scope.unfollow = function (id) {
                var index = $scope.followingChannels.indexOf(id);
                $scope.followingChannels.splice(index, 1);

                $scope.getFeed();
                $scope.saveFollowingChannels();
            }

            $scope.getFeed();

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