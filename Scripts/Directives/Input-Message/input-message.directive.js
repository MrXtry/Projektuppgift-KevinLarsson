/// <reference path="../../angular.js" />

angular.module("mainModule")
    .directive("inputMessage", [
        function () {
            return {
                restrict: "E",

                templateUrl: "Scripts/Directives/Input-Message/Input-Message.html"
            }
        }
    ]);