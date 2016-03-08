/*!
 * angular-table 0.0.0
 * Greg Gunner, http://www.co-foundry.co.za/
 * License: MIT
 */
(function () {
    'use strict';
    angular.module('fndry.table', []).controller('TableCtrl', [
        '$scope',
        '$element',
        '$timeout',
        function controller($scope, $element, $timeout) {

            var editable = false;
            var saveToElementId = null;

            $scope.headers = {};
            $scope.body = [];

            this.setHeaders = function(data)
            {
                switch (typeof(data)) {
                    case 'string':
                        $scope.headers = angular.fromJson(data);
                        break;
                    case 'object':
                    case 'array':
                        $scope.headers = data;
                        break;
                }
            }

            this.setBody = function(data)
            {
                switch (typeof(data)) {
                    case 'string':
                        $scope.body = angular.fromJson(data);
                        break;
                    case 'object':
                    case 'array':
                        $scope.body = data;
                        break;
                }
            }

            this.setSaveToElementId = function(id){
                saveToElementId = id;
            }

            $scope.insertRow = function(index) {
                var n = {};
                angular.forEach($scope.headers, function(key, value){
                    n[key] = ''
                })
                //Object.assign(n, $scope.headers);
                if (index != undefined) {
                    $scope.body.splice(index+1, 0, n);
                } else {
                    $scope.body.push(n);
                }
            }

            $scope.deleteRow = function(index){
                $scope.body.splice(index, 1);
            }

            $scope.export = function(){
                return angular.toJson($scope.body);
            }

            $scope.saveJsonToInput = function(){
                console.log(saveToElementId);
                if (saveToElementId != null) {
                    document.getElementById(saveToElementId).value = $scope.export();
                }
            }

        }
    ]).directive('fndryTable', function() {
        return {
            restrict: 'AE',
            controller: 'TableCtrl',
            template: '<table>' +
            '   <thead>' +
            '       <tr>' +
            '           <th ng-repeat="(key, value) in headers" class="ft-{{key}}">{{value}}</th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '       <tr ng-repeat="row in body">' +
            '           <td ng-repeat="(key, value) in row" class="ft-{{key}}"><input ng-model="row[key]" ></td>' +
        '               <td><button ng-click="insertRow($index)">Insert</button> <button ng-click="deleteRow($index)">Delete</button></td>' +
            '       </tr>' +
            '   </tbody>' +
            '</table>' +
            '<button ng-click="insertRow()">Insert Row</button>' +
            '<button ng-click="saveJsonToInput()">Save</button>' +
            '{{body | json}}',
            link: {
                pre: function preLink(scope, element, attrs, ctrl) {
                    var options = angular.merge({ftHeader: [], ftBody: [], ftEditable: true, ftSaveToElementId: null}, attrs);
                    if (options.ftHeader) {
                        ctrl.setHeaders(options.ftHeader);
                    }
                    if (options.ftBody) {
                        ctrl.setBody(options.ftBody);
                    }
                    if (options.ftEditable) {
                        ctrl.editable = true;
                    }
                    if (options.ftBody) {
                        ctrl.setSaveToElementId(options.ftSaveToElementId);
                    }
                }
            }
        };
    });
}());