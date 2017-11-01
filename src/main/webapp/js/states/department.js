/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.department", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_department', {
                'url': '/department_master?offset',
                'templateUrl': templateRoot + '/masters/department/list.html',
                'controller': 'DepartmentListController'
            });
            $stateProvider.state('admin.masters_department.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/department/form.html',
                'controller': 'DepartmentAddController'
            });
            $stateProvider.state('admin.masters_department.edit', {
                'url': '/:departmentId/edit',
                'templateUrl': templateRoot + '/masters/department/form.html',
                'controller': 'DepartmentEditController'
            });
            $stateProvider.state('admin.masters_department.delete', {
                'url': '/:departmentId/delete',
                'templateUrl': templateRoot + '/masters/department/delete.html',
                'controller': 'DepartmentDeleteController'
            });
        })

        .controller('DepartmentListController', function (DepartmentService, $scope, $stateParams, $state, paginationLimit) {
            if (
                    $stateParams.offset === undefined ||
                    isNaN($stateParams.offset) ||
                    new Number($stateParams.offset) < 0)
            {
                $scope.currentOffset = 0;
            } else {
                $scope.currentOffset = new Number($stateParams.offset);
            }

            $scope.nextOffset = $scope.currentOffset + 10;

            $scope.nextDepartment = DepartmentService.query({
                'offset': $scope.nextOffset
            });

            $scope.departments = DepartmentService.query({
                'offset': $scope.currentOffset
            }, function (s) {
            });

            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $state.go(".", {'offset': $scope.currentOffset}, {'reload': true});
            };
            $scope.previousPage = function () {
                if ($scope.currentOffset <= 0) {
                    return;
                }
                $scope.currentOffset -= paginationLimit;
                $state.go(".", {'offset': $scope.currentOffset}, {'reload': true});
            };
        })
        .controller('DepartmentAddController', function (DepartmentService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableDepartment = {};



            $scope.saveDepartment = function (department) {
                console.log("Department :", department);
                DepartmentService.save(department, function () {
                    $state.go('admin.masters_department', null, {'reload': true});
                });
            };

            $scope.$watch('editableDepartment.name', function (name) {
                console.log("Name :" + name);
                DepartmentService.findByName({'name': name}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableDepartment.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableDepartment.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableDepartment.repeatName = false;
                    }
                }).then(function (segment) {
                    if (segment.username !== null) {
                        $scope.editableDepartment.repeatName = true;
                    }
                    ;
                });
            });
        })
        .controller('DepartmentEditController', function (DepartmentService, $scope, $stateParams, $state, paginationLimit) {
            DepartmentService.get({'id': $stateParams.departmentId});
            DepartmentService.get({
                'id': $stateParams.departmentId
            }, function (departmentData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableDepartment = departmentData;
            });
            
            $scope.saveDepartment = function (department) {
                department.$save(function () {
                    $state.go('admin.masters_department', null, {'reload': true});
                });
            };
        })
        .controller('DepartmentDeleteController', function (DepartmentService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableDepartment = DepartmentService.get({'id': $stateParams.departmentId});           
            $scope.deleteDepartment = function (department) {                
                department.$delete(function () {
                    $state.go('admin.masters_department', null, {'reload': true});
                });
            };
        });


