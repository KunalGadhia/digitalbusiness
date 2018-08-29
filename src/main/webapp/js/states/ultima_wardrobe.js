/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.ultima_wardrobe", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_ultima_wardrobe', {
                'url': '/ultima_wardrobe_master?offset',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/list.html',
                'controller': 'UltimaWardrobeListController'
            });
            $stateProvider.state('admin.masters_ultima_wardrobe.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/form.html',
                'controller': 'UltimaWardrobeAddController'
            });
            $stateProvider.state('admin.masters_ultima_wardrobe.edit', {
                'url': '/:ultimaWardrobeId/edit',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/form.html',
                'controller': 'UltimnaWardrobeEditController'
            });
            $stateProvider.state('admin.masters_ultima_wardrobe.delete', {
                'url': '/:ultimaWardrobeId/delete',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/delete.html',
                'controller': 'UltimaWardrobeDeleteController'
            });
            $stateProvider.state('admin.masters_ultima_wardrobe.photo', {
                'url': '/:ultimaWardrobeId/photo',
                'templateUrl': templateRoot + '/masters/ultima_wardrobe/photo.html',
                'controller': 'UltimaWardrobePhotoController'
            });
        })
        .controller('UltimaWardrobePhotoController', function (UltimaWardrobeService, restRoot, FileUploader, $scope, $stateParams, $state) {
            $scope.enableSaveButton = true;
            UltimaWardrobeService.get({
                'id': $stateParams.ultimaWardrobeId
            }, function (ultimaWardrobe) {
                $scope.ultimaWardrobeObject = ultimaWardrobe;
            });
            $scope.goBack = function () {
                $state.go('admin.masters_ultima_wardrobe', null, {'reload': true});
            };
            var uploader = $scope.fileUploader = new FileUploader({
                url: restRoot + '/ultima_wardrobe/' + $stateParams.ultimaWardrobeId + '/attachment',
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
                    $state.go('admin.masters_ultima_wardrobe.photo', {
                        'ultimaWardrobeId': $stateParams.ultimaWardrobeId
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
        .controller('UltimaWardrobeListController', function (UltimaWardrobeService, $window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {
            $scope.currentOffset = 0;
            $scope.mainUltimaWardrobeArray = [];
            $scope.nextUltimaWardrobes = UltimaWardrobeService.query({
                'offset': $scope.nextOffset
            });

            UltimaWardrobeService.query({
                'offset': $scope.currentOffset
            }, function (ultimaWardrobeList) {
                angular.forEach(ultimaWardrobeList, function (ultimaWardrobeObject) {
                    $scope.mainUltimaWardrobeArray.push(ultimaWardrobeObject);
                });
            });
            $scope.ultimaWardrobeCall = function (offset) {
                console.log("Offset :%O", offset);
                UltimaWardrobeService.query({
                    'offset': $scope.currentOffset
                }, function (ultimaWardrobeList) {
                    angular.forEach(ultimaWardrobeList, function (ultimaWardrobeObject) {

                        $scope.mainUltimaWardrobeArray.push(ultimaWardrobeObject);
                    });
                });
            };
            $scope.enterIntoArray = function (ultimaWardrobe) {
                $scope.mainUltimaWardrobeArray.push(ultimaWardrobe);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.ultimaWardrobeCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('UltimaWardrobeAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                editableDealerSku.createdBy = $scope.userObject.id;
//                DealerSkuService.save(editableDealerSku, function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('UltimnaWardrobeEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                -editableDealerSku.$save(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('UltimaWardrobeDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableDealerSku = DealerSkuService.get({
//                'id': $stateParams.dealerSkuId
//            });
//            $scope.deleteDealerSku = function (dealerSku) {
//                dealerSku.$delete(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        });


