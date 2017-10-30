/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.employee", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_employee', {
                'url': '/employee_master?offset',
                'templateUrl': templateRoot + '/masters/employee/list.html',
                'controller': 'EmployeeListController'
            });
            $stateProvider.state('admin.masters_employee.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/employee/form.html',
                'controller': 'EmployeeAddController'
            });
            $stateProvider.state('admin.masters_employee.edit', {
                'url': '/:employeeId/edit',
                'templateUrl': templateRoot + '/masters/employee/form.html',
                'controller': 'EmployeeEditController'
            });
            $stateProvider.state('admin.masters_employee.delete', {
                'url': '/:employeeId/delete',
                'templateUrl': templateRoot + '/masters/employee/delete.html',
                'controller': 'EmployeeDeleteController'
            });
        })

        .controller('EmployeeListController', function (EmployeeService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextEmployees = EmployeeService.query({
                'offset': $scope.nextOffset
            });

            $scope.employees = EmployeeService.query({
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
        .controller('EmployeeAddController', function (EmployeeService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableEmployee = {};



            $scope.saveEmployee = function (employee) {
                console.log("user", employee);
                EmployeeService.save(employee, function () {
                    $state.go('admin.masters_employee', null, {'reload': true});
                });
            };

            $scope.$watch('editableEmployee.empName', function (name) {
                console.log("Name :" + name);
                EmployeeService.findByName({'name': name}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableEmployee.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableEmployee.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableEmployee.repeatName = false;
                    }
                }).then(function (employee) {
                    if (employee.username !== null) {
                        $scope.editableEmployee.repeatName = true;
                    }
                    ;
                });
            });
        })
        .controller('EmployeeEditController', function (EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            EmployeeService.get({'id': $stateParams.employeeId});
            EmployeeService.get({
                'id': $stateParams.employeeId
            }, function (employeeData) {
                employeeData.empMobileNumber = parseInt(employeeData.empMobileNumber);
                $scope.editableEmployee = employeeData;
            });
            $scope.saveEmployee = function (employee) {
                employee.$save(function () {
                    $state.go('admin.masters_employee', null, {'reload': true});
                });
            };
        })
        .controller('EmployeeDeleteController', function (EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableEmployee = EmployeeService.get({'id': $stateParams.employeeId});
            console.log("are we here?");
            $scope.deleteEmployee = function (employee) {
                console.log("Employee :%O", employee);
                employee.$delete(function () {
                    $state.go('admin.masters_employee', null, {'reload': true});
                });
            };
        });


