/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.masters_color", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_color', {
                'url': '/color_master?offset',
                'templateUrl': templateRoot + '/masters/color/list.html',
                'controller': 'ColorListController'
            });
            $stateProvider.state('admin.masters_color.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/color/form.html',
                'controller': 'ColorAddController'
            });
            $stateProvider.state('admin.masters_color.edit', {
                'url': '/:colorId/edit',
                'templateUrl': templateRoot + '/masters/color/form.html',
                'controller': 'ColorEditController'
            });
            $stateProvider.state('admin.masters_color.delete', {
                'url': '/:colorId/delete',
                'templateUrl': templateRoot + '/masters/color/delete.html',
                'controller': 'ColorDeleteController'
            });
            $stateProvider.state('admin.masters_color.photo', {
                'url': '/:colorId/photo',
                'templateUrl': templateRoot + '/masters/color/photo.html',
                'controller': 'ColorPhotoController'
            });
            $stateProvider.state('admin.masters_color.view', {
                'url': '/:colorId/view',
                'templateUrl': templateRoot + '/masters/color/view.html',
                'controller': 'ColorViewController'
            });
        })
        .controller('ColorViewController', function ($scope, $stateParams, $state) {
            $scope.color = {};
            $scope.color.id = $stateParams.colorId;
            $scope.goBack = function () {
                $state.go('admin.masters_color', {}, {'reload': true});
            };
        })
        .controller('ColorPhotoController', function (ColorService, restRoot, FileUploader, $scope, $stateParams, $state) {
            console.log("$stateparam :%O", $stateParams);
            $scope.enableSaveButton = true;
            ColorService.get({
                'id': $stateParams.colorId
            }, function (color) {
                $scope.colorObject = color;
                console.log("COlor Object :%O", $scope.colorObject);
            });
            $scope.goBack = function () {
                $state.go('admin.masters_color.edit', {
                    'colorId': $stateParams.colorId
                }, {'reload': true});
            };
            var uploader = $scope.fileUploader = new FileUploader({
                url: restRoot + '/color/' + $stateParams.colorId + '/attachment',
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
                    console.log("Upload Successful");
                    $state.go('admin.masters_color.photo', {
                        'colorId': $stateParams.colorId
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
        .controller('ColorListController', function (ColorService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextColors = ColorService.query({
                'offset': $scope.nextOffset
            });
            $scope.mainArray = [];
            $scope.colors = ColorService.query({
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
        .controller('ColorAddController', function (ColorService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableColor = {};

            $scope.saveColor = function (color) {
                console.log("C :", color);
                ColorService.save(color, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_color.photo', {
                        'colorId': savedData.id
                    }, {'reload': true});
                });
            };

            $scope.$watch('editableColor.colorName', function (color) {
                console.log("Name :" + color);
                ColorService.findByColor({'color': color}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableColor.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableColor.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableColor.repeatName = false;
                    }
                }).then(function (color) {
                    if (color.colorName !== null) {
                        $scope.editableColor.repeatName = true;
                    }
                    ;
                });
            });
            $scope.$watch('editableColor.colorCode', function (colorCode) {
                console.log("Name :" + colorCode);
                ColorService.findByColorCode({'colorCode': colorCode}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableColor.repeatCode = false;
                    } else if (response.status === 404) {
                        $scope.editableColor.repeatCode = false;
                    } else if (response.status === 400) {
                        $scope.editableColor.repeatCode = false;
                    }
                }).then(function (color) {
                    console.log("Color :%O", color);
                    if (color.colorCode !== null) {
                        $scope.editableColor.repeatCode = true;
                    }
                    ;
                });
            });
        })
        .controller('ColorEditController', function (ColorService, $scope, $stateParams, $state, paginationLimit) {
            console.log("Inside Color :%O", $stateParams.colorId);
            ColorService.get({'id': $stateParams.colorId});
            ColorService.get({
                'id': $stateParams.colorId
            }, function (colorData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableColor = colorData;
            });

            $scope.saveColor = function (color) {
                color.$save(function () {
                    $state.go('admin.masters_color.photo', {
                        'colorId': color.id
                    }, {'reload': true});
                });
//               
            };
        })
        .controller('ColorDeleteController', function (ColorService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableColor = ColorService.get({'id': $stateParams.colorId});
            $scope.deleteColor = function (color) {
                color.$delete(function () {
                    $state.go('admin.masters_color', null, {'reload': true});
                });
            };
        });


