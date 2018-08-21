/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.infinity_wardrobe", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_infinity_wardrobe', {
                'url': '/infinity_wardrobe_master?offset',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe/list.html',
                'controller': 'InfinityWardrobeListController'
            });
            $stateProvider.state('admin.masters_infinity_wardrobe.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe/form.html',
                'controller': 'InfinityWardrobeAddController'
            });
            $stateProvider.state('admin.masters_infinity_wardrobe.edit', {
                'url': '/:infinityWardrobeId/edit',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe/form.html',
                'controller': 'InfinityWardrobeEditController'
            });
            $stateProvider.state('admin.masters_infinity_wardrobe.delete', {
                'url': '/:infinityWardrobeId/delete',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe/delete.html',
                'controller': 'InfinityWardrobeDeleteController'
            });
            $stateProvider.state('admin.masters_infinity_wardrobe.photo', {
                'url': '/:infinityWardrobeId/photo',
                'templateUrl': templateRoot + '/masters/infinity_wardrobe/photo.html',
                'controller': 'InfinityWardrobePhotoController'
            });
        })
        .controller('InfinityWardrobePhotoController', function (InfinityWardrobeService, restRoot, FileUploader, $scope, $stateParams, $state) {
            $scope.enableSaveButton = true;
            InfinityWardrobeService.get({
                'id': $stateParams.infinityWardrobeId
            }, function (infinityWardrobe) {
                $scope.infinityWardrobeObject = infinityWardrobe;
            });
            $scope.goBack = function () {
                $state.go('admin.masters_infinity_wardrobe', null, {'reload': true});
            };
            var uploader = $scope.fileUploader = new FileUploader({
                url: restRoot + '/infinity_wardrobe/' + $stateParams.infinityWardrobeId + '/attachment',
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
                    $state.go('admin.masters_infinity_wardrobe.photo', {
                        'infinityWardrobeId': $stateParams.infinityWardrobeId
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
        .controller('InfinityWardrobeListController', function (InfinityWardrobeService, $window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentOffset = 0;
            $scope.mainInfinityWardrobeArray = [];
            $scope.nextInfinityWardrobes = InfinityWardrobeService.query({
                'offset': $scope.nextOffset
            });

            InfinityWardrobeService.query({
                'offset': $scope.currentOffset
            }, function (infinityWardrobeList) {
                angular.forEach(infinityWardrobeList, function (infinityWardrobeObject) {
                    $scope.mainInfinityWardrobeArray.push(infinityWardrobeObject);
                });
            });
            $scope.infinityWardrobeCall = function (offset) {
                console.log("Offset :%O", offset);
                InfinityWardrobeService.query({
                    'offset': $scope.currentOffset
                }, function (infinityWardrobeList) {
                    angular.forEach(infinityWardrobeList, function (infinityWardrobeObject) {

                        $scope.mainInfinityWardrobeArray.push(infinityWardrobeObject);
                    });
                });
            };
            $scope.enterIntoArray = function (infinityWardrobe) {
                $scope.mainInfinityWardrobeArray.push(infinityWardrobe);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.infinityWardrobeCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('InfinityWardrobeAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                editableDealerSku.createdBy = $scope.userObject.id;
//                DealerSkuService.save(editableDealerSku, function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('InfinityWardrobeEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                -editableDealerSku.$save(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('InfinityWardrobeDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableDealerSku = DealerSkuService.get({
//                'id': $stateParams.dealerSkuId
//            });
//            $scope.deleteDealerSku = function (dealerSku) {
//                dealerSku.$delete(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        });


