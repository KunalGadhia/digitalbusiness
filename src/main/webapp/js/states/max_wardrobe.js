/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.max_wardrobe", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_max_wardrobe', {
                'url': '/max_wardrobe_master?offset',
                'templateUrl': templateRoot + '/masters/max_wardrobe/list.html',
                'controller': 'MaxWardrobeListController'
            });
            $stateProvider.state('admin.masters_max_wardrobe.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/max_wardrobe/form.html',
                'controller': 'MaxWardrobeAddController'
            });
            $stateProvider.state('admin.masters_max_wardrobe.edit', {
                'url': '/:maxWardrobeId/edit',
                'templateUrl': templateRoot + '/masters/max_wardrobe/form.html',
                'controller': 'MaxWardrobeEditController'
            });
            $stateProvider.state('admin.masters_max_wardrobe.delete', {
                'url': '/:maxWardrobeId/delete',
                'templateUrl': templateRoot + '/masters/max_wardrobe/delete.html',
                'controller': 'MaxWardrobeDeleteController'
            });
            $stateProvider.state('admin.masters_max_wardrobe.photo', {
                'url': '/:maxWardrobeId/photo',
                'templateUrl': templateRoot + '/masters/max_wardrobe/photo.html',
                'controller': 'MaxWardrobePhotoController'
            });
        })
        .controller('MaxWardrobePhotoController', function (MaxWardrobeService, restRoot, FileUploader, $scope, $stateParams, $state) {
            $scope.enableSaveButton = true;
            MaxWardrobeService.get({
                'id': $stateParams.maxWardrobeId
            }, function (maxWardrobe) {
                $scope.maxWardrobeObject = maxWardrobe;
            });
            $scope.goBack = function () {
                $state.go('admin.masters_max_wardrobe', null, {'reload': true});
            };
            var uploader = $scope.fileUploader = new FileUploader({
                url: restRoot + '/max_wardrobe/' + $stateParams.maxWardrobeId + '/attachment',
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
                    $state.go('admin.masters_max_wardrobe.photo', {
                        'maxWardrobeId': $stateParams.maxWardrobeId
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
        .controller('MaxWardrobeListController', function (MaxWardrobeService, $window, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $rootScope, $scope, $stateParams, $state, paginationLimit) {
            console.log("Max WD List Controller");
            $scope.currentOffset = 0;
            $scope.mainMaxWardrobeArray = [];
            $scope.nextMaxWardrobes = MaxWardrobeService.query({
                'offset': $scope.nextOffset
            });

            MaxWardrobeService.query({
                'offset': $scope.currentOffset
            }, function (maxWardrobeList) {
                angular.forEach(maxWardrobeList, function (maxWardrobeObject) {
                    $scope.mainMaxWardrobeArray.push(maxWardrobeObject);
                });
            });
            $scope.maxWardrobeCall = function (offset) {
                console.log("Offset :%O", offset);
                MaxWardrobeService.query({
                    'offset': $scope.currentOffset
                }, function (maxWardrobeList) {
                    angular.forEach(maxWardrobeList, function (maxWardrobeObject) {

                        $scope.mainMaxWardrobeArray.push(maxWardrobeObject);
                    });
                });
            };
            $scope.enterIntoArray = function (maxWardrobe) {
                $scope.mainMaxWardrobeArray.push(maxWardrobe);
            };
            $scope.nextPage = function () {
                $scope.currentOffset += paginationLimit;
                $scope.nextOffset = $scope.currentOffset + 10;
                $scope.maxWardrobeCall($scope.currentOffset);
            };

            angular.element($window).bind('scroll', function (response) {
                if (this.pageYOffset + this.innerHeight === $(document).height()) {
                    $scope.nextPage();
                }
                ;
            });
        })
        .controller('MaxWardrobeAddController', function ($rootScope, DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                editableDealerSku.createdBy = $scope.userObject.id;
//                DealerSkuService.save(editableDealerSku, function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('MaxWardrobeEditController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {

//            $scope.saveDealerSku = function (editableDealerSku) {
//                -editableDealerSku.$save(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        })
        .controller('MaxWardrobeDeleteController', function (DealerSkuService, ManufacturerService, ManufacturerCategoryService, UserService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableDealerSku = DealerSkuService.get({
//                'id': $stateParams.dealerSkuId
//            });
//            $scope.deleteDealerSku = function (dealerSku) {
//                dealerSku.$delete(function () {
//                    $state.go('admin.masters_dealer_sku', null, {'reload': true});
//                });
//            };
        });


