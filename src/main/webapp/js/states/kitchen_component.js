/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.kitchen_component", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_kitchen_component', {
                'url': '/kitchen_component_master?offset',
                'templateUrl': templateRoot + '/masters/kitchen_component/list.html',
                'controller': 'KitchenComponentListController'
            });
            $stateProvider.state('admin.masters_kitchen_component.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/kitchen_component/form.html',
                'controller': 'KitchenComponentAddController'
            });
            $stateProvider.state('admin.masters_kitchen_component.edit', {
                'url': '/:kitchenComponentId/edit',
                'templateUrl': templateRoot + '/masters/kitchen_component/form.html',
                'controller': 'KitchenComponentEditController'
            });
            $stateProvider.state('admin.masters_kitchen_component.delete', {
                'url': '/:kitchenComponentId/delete',
                'templateUrl': templateRoot + '/masters/kitchen_component/delete.html',
                'controller': 'KitchenComponentDeleteController'
            });
            $stateProvider.state('admin.masters_kitchen_component.photo', {
                'url': '/:kitchenComponentId/photo',
                'templateUrl': templateRoot + '/masters/kitchen_component/photo.html',
                'controller': 'KitchenComponentPhotoController'
            });
            $stateProvider.state('admin.masters_kitchen_component.view', {
                'url': '/:kitchenComponentId/view',
                'templateUrl': templateRoot + '/masters/kitchen_component/view.html',
                'controller': 'KitchenComponentViewController'
            });
        })
        .controller('KitchenComponentViewController', function ($scope, $stateParams, $state) {
            $scope.kitchenComponent = {};
            $scope.kitchenComponent.id = $stateParams.kitchenComponentId;
            $scope.goBack = function () {
                $state.go('admin.masters_kitchen_component', {}, {'reload': true});
            };
        })
        .controller('KitchenComponentPhotoController', function (KitchenComponentService, restRoot, FileUploader, $scope, $stateParams, $state) {
            $scope.enableSaveButton = true;
            KitchenComponentService.get({
                'id': $stateParams.kitchenComponentId
            }, function (kitchenComponent) {
                $scope.kitchenComponentObject = kitchenComponent;
            });
            $scope.goBack = function () {
                $state.go('admin.masters_kitchen_component.edit', {
                    'kitchenComponentId': $stateParams.kitchenComponentId
                }, {'reload': true});
            };
            var uploader = $scope.fileUploader = new FileUploader({
                url: restRoot + '/kitchen_component/' + $stateParams.kitchenComponentId + '/attachment',
                autoUpload: true,
                alias: 'attachment'
            });
            uploader.onBeforeUploadItem = function (item) {
                $scope.uploadInProgress = true;
                $scope.uploadSuccess = false;
                console.log("before upload item:", item);
                console.log("uploader", uploader);
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {
                $scope.uploadFailed = true;
                $scope.uploadInProgress = false;
                $scope.uploadSuccess = false;
//                    $state.go('.', {}, {'reload': true});
                console.log("upload error");
//                $scope.refreshRawMarketPrice();
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                if (status === 200) {
                    $state.go('admin.masters_kitchen_component.photo', {
                        'kitchenComponentId': $stateParams.kitchenComponentId
                    }, {'reload': true});
                    $scope.uploadInProgress = false;
                    $scope.uploadFailed = false;
                    $scope.uploadSuccess = true;
                    $scope.enableSaveButton = false;
                } else if (status === 500)
                {
                    $scope.uploadInProgress = false;
                    $scope.uploadFailed = false;
//                    $scope.uploadWarning = true;
                } else {
                    $scope.uploadInProgress = false;
                    $scope.uploadFailed = true;
                }

                console.log("upload completion", response);
            };

        })
        .controller('KitchenComponentListController', function (KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextKitchenComponents = KitchenComponentService.query({
                'offset': $scope.nextOffset
            });
            $scope.mainArray = [];
            $scope.kitchenComponents = KitchenComponentService.query({
                'offset': $scope.currentOffset
            }, function (s) {
//                angular.forEach(s, function (singleObject) {
//                    var restCall = "./rest/kitchen_component/" + singleObject.id + "/attachment";
//                    singleObject.imagePath = restCall;
//                    $scope.mainArray.push(singleObject);
//                });

            });
            console.log("THis is Main Array :%O", $scope.mainArray);

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
        .controller('KitchenComponentAddController', function (KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableKitchenComponent = {};

            $scope.saveKitchenComponent = function (kitchenComponent) {
                console.log("KC :", kitchenComponent);
                KitchenComponentService.save(kitchenComponent, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_kitchen_component.photo', {
                        'kitchenComponentId': savedData.id
                    }, {'reload': true});
                });
            };

            $scope.$watch('editableKitchenComponent.component', function (component) {
                console.log("Name :" + component);
                KitchenComponentService.findByComponent({'component': component}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableKitchenComponent.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableKitchenComponent.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableKitchenComponent.repeatName = false;
                    }
                }).then(function (kitchenComponent) {
                    if (kitchenComponent.component !== null) {
                        $scope.editableKitchenComponent.repeatName = true;
                    }
                    ;
                });
            });
            $scope.$watch('editableKitchenComponent.componentCode', function (componentCode) {
                console.log("Name :" + componentCode);
                KitchenComponentService.findByComponentCode({'componentCode': componentCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableKitchenComponent.repeatCode = false;
                    } else if (response.status === 404) {
                        $scope.editableKitchenComponent.repeatCode = false;
                    } else if (response.status === 400) {
                        $scope.editableKitchenComponent.repeatCode = false;
                    }
                }).then(function (kitchenComponent) {
                    console.log("Kitchen COmponent :%O", kitchenComponent);
                    if (kitchenComponent.componentCode !== null) {
                        $scope.editableKitchenComponent.repeatCode = true;
                    }
                    ;
                });
            });
        })
        .controller('KitchenComponentEditController', function (KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
            console.log("Inside Kitchen COmponent :%O", $stateParams.kitchenComponentId);
            KitchenComponentService.get({'id': $stateParams.kitchenComponentId});
            KitchenComponentService.get({
                'id': $stateParams.kitchenComponentId
            }, function (kitchenComponentData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableKitchenComponent = kitchenComponentData;
            });

            $scope.saveKitchenComponent = function (component) {
                component.$save(function () {
                    $state.go('admin.masters_kitchen_component.photo', {
                        'kitchenComponentId': component.id
                    }, {'reload': true});
                });
//               
            };
        })
        .controller('KitchenComponentDeleteController', function (KitchenComponentService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableKitchenComponent = KitchenComponentService.get({'id': $stateParams.kitchenComponentId});
            $scope.deleteKitchenComponent = function (kitchenComponent) {
                kitchenComponent.$delete(function () {
                    $state.go('admin.masters_kitchen_component', null, {'reload': true});
                });
            };
        });


