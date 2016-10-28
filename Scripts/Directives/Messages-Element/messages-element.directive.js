/// <reference path="../../angular.js" />

angular.module("mainModule")
    .directive("messagesElement", [
        function () {
            return {
                restrict: "E",

                templateUrl: "Scripts/Directives/Messages-Element/Messages-Element.html"
            }
        }
    ]);