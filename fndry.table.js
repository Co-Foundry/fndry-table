/*!
 * angular-table 0.0.1
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
            $scope.data = [];

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

            this.setData = function(data)
            {
                switch (typeof(data)) {
                    case 'string':
                        $scope.data = angular.fromJson(data);
                        break;
                    case 'object':
                    case 'array':
                        $scope.data = data;
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
                    $scope.data.splice(index+1, 0, n);
                } else {
                    $scope.data.push(n);
                }
            }

            $scope.deleteRow = function(index){
                $scope.data.splice(index, 1);
            }

            $scope.export = function(){
                return angular.toJson($scope.data);
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
            template: '<table class="table table-stripped">' +
            '   <thead>' +
            '       <tr>' +
            '           <th ng-repeat="(key, value) in headers" class="ft-{{key}}">{{value}}</th>' +
            '           <th>Options</th>' +
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '       <tr ng-repeat="record in data">' +
            '           <td ng-repeat="(key, value) in record" class="ft-{{key}}"><input ng-model="record[key]" class="form-control" label="{{key}}" ></td>' +
        '               <td><button ng-click="insertRow($index)" class="btn btn-info btn-sm">Insert</button> <button ng-click="deleteRow($index)" class="btn btn-danger btn-sm">Delete</button></td>' +
            '       </tr>' +
            '   </tbody>' +
            '</table>' +
            '<button ng-click="insertRow()" class="btn btn-info">Insert Row</button> ' +
            '<button ng-click="saveJsonToInput()" class="btn btn-success">Save</button>',
            link: {
                pre: function preLink(scope, element, attrs, ctrl) {
                    var options = angular.merge({ftHeader: [], ftData: [], ftEditable: true, ftSaveToElementId: null}, attrs);
                    if (options.ftHeader) {
                        ctrl.setHeaders(options.ftHeader);
                    }
                    if (options.ftData) {
                        ctrl.setData(options.ftData);
                    }
                    if (options.ftEditable) {
                        ctrl.editable = true;
                    }
                    if (options.ftSaveToElementId) {
                        ctrl.setSaveToElementId(options.ftSaveToElementId);
                    }
                }
            }
        };
    });
}());