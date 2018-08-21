/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.max_wardrobe_mrp", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_max_wardrobe_mrp', {
                'url': '/max_wardrobe_mrp_master?offset',
                'templateUrl': templateRoot + '/masters/max_wardrobe_mrp/list.html',
                'controller': 'MaxWardrobeMrpListController'
            });
            $stateProvider.state('admin.masters_max_wardrobe_mrp.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/max_wardrobe_mrp/form.html',
                'controller': 'MaxWardrobeMrpAddController'
            });
            $stateProvider.state('admin.masters_max_wardrobe_mrp.edit', {
                'url': '/:maxWardrobeMrpId/edit',
                'templateUrl': templateRoot + '/masters/max_wardrobe_mrp/form.html',
                'controller': 'MaxWardrobeMrpEditController'
            });
            $stateProvider.state('admin.masters_max_wardrobe_mrp.delete', {
                'url': '/:maxWardrobeMrpId/delete',
                'templateUrl': templateRoot + '/masters/max_wardrobe_mrp/delete.html',
                'controller': 'MaxWardrobeMrpDeleteController'
            });
            $stateProvider.state('admin.masters_max_wardrobe_mrp.photo', {
                'url': '/:maxWardrobeMrpId/photo',
                'templateUrl': templateRoot + '/masters/max_wardrobe_mrp/photo.html',
                'controller': 'MaxWardrobeMrpPhotoController'
            });
        })
        .controller('MaxWardrobeMrpPhotoController', function (MaxWardrobeMrpService, restRoot, FileUploader, $scope, $stateParams, $state) {
            $scope.enableSaveButton = true;
            MaxWardrobeMrpService.get({
                'id': $stateParams.maxWardrobeMrpId
            }, function (maxWardrobeMrp) {
                $scope.maxWardrobeMrpObject = maxWardrobeMrp;
            });
            $scope.goBack = function () {
                $state.go('admin.masters_max_wardrobe_mrp', null, {'reload': true});
            };
            var uploader = $scope.fileUploader = new FileUploader({
                url: restRoot + '/max_wardrobe_mrp/' + $stateParams.maxWardrobeMrpId + '/attachment',
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
                    $state.go('admin.masters_max_wardrobe_mrp.photo', {
                        'maxWardrobeMrpId': $stateParams.maxWardrobeMrpId
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
        .controller('MaxWardrobeMrpListController', function (MaxWardrobeMrpService, $window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentOffset = 0;
            $scope.mainMaxWardrobeMrpArray = [];
            $scope.nextMaxWardrobeMrps = MaxWardrobeMrpService.query({
                'offset': $scope.nextOffset
            });

            MaxWardrobeMrpService.query({
                'offset': $scope.currentOffset
            }, function (maxWardrobeMrpList) {
                angular.forEach(maxWardrobeMrpList, function (maxWardrobeMrpObject) {
                    $scope.mainMaxWardrobeMrpArray.push(maxWardrobeMrpObject);
                });
            });
            $scope.maxWardrobeMrpCall = function (offset) {
                console.log("Offset :%O", offset);
                MaxWardrobeMrpService.query({
                    'offset': $scope.currentOffset
                }, function (maxWardrobeMrpList) {
                    angular.forEach(maxWardrobeMrpList, function (maxWardrobeMrpObject) {
                        $scope.mainMaxWardrobeMrpArray.push(maxWardrobeMrpObject);
                    });
                });
            };
            $scope.enterIntoArray = function (maxWardrobeMrp) {
                $scope.mainMaxWardrobeMrpArray.push(maxWardrobeMrp);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.maxWardrobeMrpCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('MaxWardrobeMrpAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                editableDealerSku.createdBy = $scope.userObject.id;
//                DealerSkuService.save(editableDealerSku, function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('MaxWardrobeMrpEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                -editableDealerSku.$save(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('MaxWardrobeMrpDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableDealerSku = DealerSkuService.get({
//                'id': $stateParams.dealerSkuId
//            });
//            $scope.deleteDealerSku = function (dealerSku) {
//                dealerSku.$delete(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        });


