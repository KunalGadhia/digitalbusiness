/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.max_kitchen_mrp", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_max_kitchen_mrp', {
                'url': '/max_kitchen_mrp_master?offset',
                'templateUrl': templateRoot + '/masters/max_kitchen_mrp/list.html',
                'controller': 'MaxKitchenMrpListController'
            });
            $stateProvider.state('admin.masters_max_kitchen_mrp.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/max_kitchen_mrp/form.html',
                'controller': 'MaxKitchenMrpAddController'
            });
            $stateProvider.state('admin.masters_max_kitchen_mrp.edit', {
                'url': '/:maxKitchenMrpId/edit',
                'templateUrl': templateRoot + '/masters/max_kitchen_mrp/form.html',
                'controller': 'MaxKitchenMrpEditController'
            });
            $stateProvider.state('admin.masters_max_kitchen_mrp.delete', {
                'url': '/:maxKitchenMrpId/delete',
                'templateUrl': templateRoot + '/masters/max_kitchen_mrp/delete.html',
                'controller': 'MaxkitchenMrpDeleteController'
            });
            $stateProvider.state('admin.masters_max_kitchen_mrp.photo', {
                'url': '/:maxKitchenMrpId/photo',
                'templateUrl': templateRoot + '/masters/max_kitchen_mrp/photo.html',
                'controller': 'MaxKitchenMrpPhotoController'
            });
        }).controller('MaxKitchenMrpPhotoController', function (MaxKitchenMrpService, restRoot, FileUploader, $scope, $stateParams, $state) {
            $scope.enableSaveButton = true;
            MaxKitchenMrpService.get({
                'id': $stateParams.maxKitchenMrpId
            }, function (maxKitchenMrp) {
                $scope.maxKitchenMrpObject = maxKitchenMrp;
            });
            $scope.goBack = function () {
                $state.go('admin.masters_max_kitchen_mrp', null, {'reload': true});
            };
            var uploader = $scope.fileUploader = new FileUploader({
                url: restRoot + '/max_kitchen_mrp/' + $stateParams.maxKitchenMrpId + '/attachment',
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
                    $state.go('admin.masters_max_kitchen_mrp.photo', {
                        'maxKitchenId': $stateParams.maxKitchenMrpId
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

        .controller('MaxKitchenMrpListController', function (MaxKitchenMrpService, $window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentOffset = 0;
            $scope.mainMaxKitchenMrpArray = [];
            $scope.nextMaxKitchenMrps = MaxKitchenMrpService.query({
                'offset': $scope.nextOffset
            });

            MaxKitchenMrpService.query({
                'offset': $scope.currentOffset
            }, function (maxKitchenMrpList) {
                angular.forEach(maxKitchenMrpList, function (maxKitchenMrpObject) {
                    $scope.mainMaxKitchenMrpArray.push(maxKitchenMrpObject);
                });
            });

            $scope.maxKitchenMrpCall = function (offset) {
                console.log("Offset :%O", offset);
                MaxKitchenMrpService.query({
                    'offset': $scope.currentOffset
                }, function (maxKitchenMrpList) {
                    angular.forEach(maxKitchenMrpList, function (maxKitchenMrpObject) {
                        $scope.mainMaxKitchenMrpArray.push(maxKitchenMrpObject);
                    });
                });
            };
            $scope.enterIntoArray = function (maxKitchenMrp) {
                $scope.mainMaxKitchenMrpArray.push(maxKitchenMrp);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.maxKitchenMrpCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('MaxKitchenMrpAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                editableDealerSku.createdBy = $scope.userObject.id;
//                DealerSkuService.save(editableDealerSku, function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('MaxKitchenMrpEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                -editableDealerSku.$save(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('MaxKitchenMrpDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableDealerSku = DealerSkuService.get({
//                'id': $stateParams.dealerSkuId
//            });
//            $scope.deleteDealerSku = function (dealerSku) {
//                dealerSku.$delete(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        });


