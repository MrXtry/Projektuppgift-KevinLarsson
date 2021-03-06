﻿/// <reference path="../angular.js" />
/// <reference path="../angular-route.js" />

angular.module("mainModule")
    .config([
        "$routeProvider",
        "$locationProvider",
        function ($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider

                .when("/", {
                    templateUrl: "Views/Home.html",
                    controller: "HomeController",
                    caseInsensitiveMatch: true,
                    activeTab: "Home"
                })
                .when("/Channels", {
                    templateUrl: "Views/Home.html",
                    controller: "HomeController",
                    caseInsensitiveMatch: true,
                    activeTab: "Channels"
                })
                .when("/Channels/:id", {
                    templateUrl: "Views/Channel.html",
                    controller: "ChannelController",
                    caseInsensitiveMatch: true,
                    activeTab: "Channels"
                })
                .when("/Followings", {
                    templateUrl: "Views/Following.html",
                    controller: "FollowingController",
                    caseInsensitiveMatch: true,
                    activeTab: "Followings"
                })
                .when("/Admin", {
                    templateUrl: "Views/Admin.html",
                    controller: "AdminController",
                    caseInsensitiveMatch: true,
                    activeTab: "Admin"
                })
            ;
        }
    ]);