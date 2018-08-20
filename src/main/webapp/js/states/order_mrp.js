/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.order_mrp", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_order_mrp', {
                'url': '/order_mrp',
                'templateUrl': templateRoot + '/masters/mrp/order_mrp_head.html',
                'controller': 'OrderMrpHeadController'
            });
            $stateProvider.state('admin.masters_order_mrp_details', {
                'url': '/:orderHeadId/order_mrp_details',
                'templateUrl': templateRoot + '/masters/mrp/order_mrp_details.html',
                'controller': 'OrderMrpDetailsController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.dealer_sku_delete', {
                'url': '/:dealerSkuId/dealer_sku_delete',
                'templateUrl': templateRoot + '/masters/mrp/dealer_sku_delete.html',
                'controller': 'SkuOrderMrpDetailsDeleteController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.infinity_wardrobe_mrp_delete', {
                'url': '/:infinityWardrobeDetailId/infinity_wardrobe_mrp_delete',
                'templateUrl': templateRoot + '/masters/mrp/infinity_wardrobe_mrp_delete.html',
                'controller': 'InfinityWardrobeOrderMrpDetailsDeleteController'
            });
            $stateProvider.state('admin.masters_order_mrp_details.max_wardrobe_mrp_delete', {
                'url': '/:maxWardrobeDetailId/max_wardrobe_mrp_delete',
                'templateUrl': templateRoot + '/masters/mrp/max_wardrobe_mrp_delete.html',
                'controller': 'MaxWardrobeOrderMrpDetailsDeleteController'
            });
        })

        .controller('OrderMrpHeadController', function (OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableOrderHeadMrp = {};
            $scope.user = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.user.username
            }, function (userObject) {
                $scope.editableOrderHeadMrp.orderInitiatedBy = userObject.id;
            });
            $scope.saveOrderHeadMrp = function (orderHeadMrp) {
                console.log("OrderHeadMrp :%O", orderHeadMrp);
                OrderHeadMrpService.save(orderHeadMrp, function (orderH) {
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': orderH.id
                    }, {'reload': true});
                });
            };

        })
        .controller('OrderMrpDetailsController', function (DealerSkuOrderDetailsService, UserService, $rootScope, ManufacturerCategoryService, ManufacturerService, DealerSkuService, MaxKitchenMrpOrderDetailsService, MaxWardrobeMrpOrderDetailsService, InfinityWardrobeMrpOrderDetailsService, MaxKitchenMrpService, MaxWardrobeMrpService, InfinityWardrobeMrpService, OrderHeadMrpService, RateContractService, EmployeeService, PartyService, $scope, $stateParams, $state, paginationLimit) {
            OrderHeadMrpService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderMrpHead = orderHeadObject;
                var a = new Date(orderHeadObject.poDate);
                var factDespDate = moment(a).add(12, 'days');
                var date = new Date(factDespDate);
                $scope.factDespDate = date;
            });
            $scope.showInfinityWardrobeMrp = false;
            $scope.showMaxWardrobeMrp = false;
            $scope.showMaxKitchenMrp = false;
            $scope.showDealerComponents = false;
            $scope.selectParentView = function (view) {
                if (view === "INFINITY_WARDROBE") {
                    $scope.showInfinityWardrobeMrp = true;
                    $scope.showMaxWardrobeMrp = false;
                    $scope.showMaxKitchenMrp = false;
                    $scope.showDealerComponents = false;
                } else if (view === "MAX_WARDROBE") {
                    $scope.showInfinityWardrobeMrp = false;
                    $scope.showMaxWardrobeMrp = true;
                    $scope.showMaxKitchenMrp = false;
                    $scope.showDealerComponents = false;
                } else if (view === "MAX_KITCHEN") {
                    $scope.showInfinityWardrobeMrp = false;
                    $scope.showMaxWardrobeMrp = false;
                    $scope.showMaxKitchenMrp = true;
                    $scope.showDealerComponents = false;
                } else if (view === "DEALER_COMPONENTS") {
                    $scope.showInfinityWardrobeMrp = false;
                    $scope.showMaxWardrobeMrp = false;
                    $scope.showMaxKitchenMrp = false;
                    $scope.showDealerComponents = true;
                }
            };
            /////////////////Infinity Wardrobe Funtionality ///////////////////
            $scope.editableInfinityWardrobeDetailMrp = {};
            $scope.editableInfinityWardrobeDetailMrp.carcass = "Supertuff HDF";
            $scope.$watch('editableInfinityWardrobeDetailMrp.category', function (category) {

                $scope.InfinityWardrobeWidthList = InfinityWardrobeMrpService.findDistinctWidth({
                    'category': category
                });
                $scope.InfinityWardrobeDepthList = InfinityWardrobeMrpService.findDistinctDepth({
                    'category': category
                });
                $scope.InfinityWardrobeHeightList = InfinityWardrobeMrpService.findDistinctHeight({
                    'category': category
                });
            });
            $scope.$watch('editableInfinityWardrobeDetailMrp.height', function (height) {
                InfinityWardrobeMrpService.findByCategoryDimensions({
                    'category': $scope.editableInfinityWardrobeDetailMrp.category,
                    'width': $scope.editableInfinityWardrobeDetailMrp.width,
                    'depth': $scope.editableInfinityWardrobeDetailMrp.depth,
                    'height': height
                }, function (infinityWardrobeComponentList) {
                    console.log("Infinity Wardrobe List :%O", infinityWardrobeComponentList);
                    $scope.infinityWardrobeMrpComponentList = infinityWardrobeComponentList;
                });
            });
            $scope.$watch('editableInfinityWardrobeDetailMrp.componentId', function (componentId) {
                $scope.infinityWardrobeMrpObject = InfinityWardrobeMrpService.get({
                    'id': componentId
                }, function (infinityWardrobeMrpObject) {                    
                    $scope.editableInfinityWardrobeDetailMrp.carcassPrice = infinityWardrobeMrpObject.carcassPrice;
                    $scope.editableInfinityWardrobeDetailMrp.productCode = infinityWardrobeMrpObject.productCode;
                    $scope.editableInfinityWardrobeDetailMrp.description = infinityWardrobeMrpObject.description;
                });
            });
            $scope.$watch('editableInfinityWardrobeDetailMrp.shutterCategory', function (shutterCategory) {
                if (shutterCategory === "P1") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price1;
                } else if (shutterCategory === "P2") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price2;
                } else if (shutterCategory === "P3") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price3;
                } else if (shutterCategory === "P4") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price4;
                } else if (shutterCategory === "P5") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price5;
                } else if (shutterCategory === "P6") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price6;
                } else if (shutterCategory === "P7") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price7;
                } else if (shutterCategory === "P8") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price8;
                } else if (shutterCategory === "P9") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price9;
                } else if (shutterCategory === "P10") {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = $scope.infinityWardrobeMrpObject.price10;
                } else {
                    $scope.editableInfinityWardrobeDetailMrp.shutterPrice = 0;
                }
            });
            $scope.$watch('editableInfinityWardrobeDetailMrp.handleCategory', function (handleCategory) {
                if (handleCategory === "H1") {
                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh1;
                } else if (handleCategory === "H2") {
                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh2;
                } else if (handleCategory === "H3") {
                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh3;
                } else if (handleCategory === "H4") {
                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh4;
                } else if (handleCategory === "H5") {
                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = $scope.infinityWardrobeMrpObject.priceh5;
                } else {
                    $scope.editableInfinityWardrobeDetailMrp.handlePrice = 0;
                }
            });
            $scope.$watch('editableInfinityWardrobeDetailMrp.hingesCode', function (hingeCode) {
                if (hingeCode === "HS") {
                    $scope.editableInfinityWardrobeDetailMrp.hinges = "Soft Close Hinges";
                    $scope.editableInfinityWardrobeDetailMrp.hingesPrice = $scope.infinityWardrobeMrpObject.softCloseHinges;
                } else if (hingeCode === "HB") {
                    $scope.editableInfinityWardrobeDetailMrp.hinges = "Blum Soft Close Hinges";
                    $scope.editableInfinityWardrobeDetailMrp.hingesPrice = $scope.infinityWardrobeMrpObject.blumSoftClose;
                } else if (hingeCode === "HD") {
                    $scope.editableInfinityWardrobeDetailMrp.hinges = "155 Degree Hinges";
                    $scope.editableInfinityWardrobeDetailMrp.hingesPrice = $scope.infinityWardrobeMrpObject.degree155;
                } else {
                    $scope.editableInfinityWardrobeDetailMrp.hingesPrice = 0;
                }
            });
            $scope.saveInfinityWardrobeMrpDetails = function (editableInfinityWardrobeDetailMrp) {
                editableInfinityWardrobeDetailMrp.orderHeadId = $stateParams.orderHeadId;
                editableInfinityWardrobeDetailMrp.price = (editableInfinityWardrobeDetailMrp.carcassPrice + editableInfinityWardrobeDetailMrp.shutterPrice + editableInfinityWardrobeDetailMrp.hingesPrice + editableInfinityWardrobeDetailMrp.handlePrice);
                console.log("Infinity MRP Save :%O", editableInfinityWardrobeDetailMrp);
                InfinityWardrobeMrpOrderDetailsService.save(editableInfinityWardrobeDetailMrp, function () {
                    console.log("Saved Successfully");
                    $scope.editableInfinityWardrobeDetailMrp = "";
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
            };
            /////////////////Infinity Wardrobe Funtionality Ends///////////////////
            /////////////////Max Wardrobe Funtionality ///////////////////
            $scope.editableMaxWardrobeDetailMrp = {};
            $scope.editableMaxWardrobeDetailMrp.carcass = "Supertuff HDF";
            $scope.$watch('editableMaxWardrobeDetailMrp.category', function (category) {
                console.log("Cateogry :" + category);
//                MaxWardrobeMrpService.findByCategory({
//                    'category': category
//                }, function (maxWardrobeComponentList) {
//                    $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
//                });
                $scope.maxWardrobeWidthList = MaxWardrobeMrpService.findDistinctWidth({
                    'category': category
                });
                $scope.maxWardrobeDepthList = MaxWardrobeMrpService.findDistinctDepth({
                    'category': category
                });
                $scope.maxWardrobeHeightList = MaxWardrobeMrpService.findDistinctHeight({
                    'category': category
                });
            });
            $scope.$watch('editableMaxWardrobeDetailMrp.height', function (height) {
                MaxWardrobeMrpService.findByCategoryDimensions({
                    'category': $scope.editableMaxWardrobeDetailMrp.category,
                    'width': $scope.editableMaxWardrobeDetailMrp.width,
                    'depth': $scope.editableMaxWardrobeDetailMrp.depth,
                    'height': height
                }, function (maxWardrobeComponentList) {
                    console.log("Max Wardrobe List :%O", maxWardrobeComponentList);
                    $scope.maxWardrobeMrpComponentList = maxWardrobeComponentList;
                });
            });
            $scope.$watch('editableMaxWardrobeDetailMrp.componentId', function (componentId) {
                $scope.maxWardrobeMrpObject = MaxWardrobeMrpService.get({
                    'id': componentId
                }, function (maxWardrobeMrpObject) {
//                    $scope.editableMaxWardrobeDetailMrp.width = maxWardrobeMrpObject.width;
//                    $scope.editableMaxWardrobeDetailMrp.depth = maxWardrobeMrpObject.depth;
//                    $scope.editableMaxWardrobeDetailMrp.height = maxWardrobeMrpObject.height;
                    $scope.editableMaxWardrobeDetailMrp.carcassPrice = maxWardrobeMrpObject.carcassPrice;
                    $scope.editableMaxWardrobeDetailMrp.productCode = maxWardrobeMrpObject.productCode;
                    $scope.editableMaxWardrobeDetailMrp.description = maxWardrobeMrpObject.description;
                });
            });
            $scope.$watch('editableMaxWardrobeDetailMrp.shutterCategory', function (shutterCategory) {
                if (shutterCategory === "P1") {
                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = $scope.maxWardrobeMrpObject.price1;
                } else if (shutterCategory === "P2") {
                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = $scope.maxWardrobeMrpObject.price2;
                } else if (shutterCategory === "P3") {
                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = $scope.maxWardrobeMrpObject.price3;
                } else if (shutterCategory === "P4") {
                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = $scope.maxWardrobeMrpObject.price4;
                } else {
                    $scope.editableMaxWardrobeDetailMrp.shutterPrice = 0;
                }
            });
            $scope.$watch('editableMaxWardrobeDetailMrp.handleCategory', function (handleCategory) {
                if (handleCategory === "H1") {
                    $scope.editableMaxWardrobeDetailMrp.handlePrice = $scope.maxWardrobeMrpObject.priceh1;
                } else if (handleCategory === "H2") {
                    $scope.editableMaxWardrobeDetailMrp.handlePrice = $scope.maxWardrobeMrpObject.priceh2;
                } else if (handleCategory === "H3") {
                    $scope.editableMaxWardrobeDetailMrp.handlePrice = $scope.maxWardrobeMrpObject.priceh3;
                } else if (handleCategory === "H4") {
                    $scope.editableMaxWardrobeDetailMrp.handlePrice = $scope.maxWardrobeMrpObject.priceh4;
                } else {
                    $scope.editableMaxWardrobeDetailMrp.handlePrice = 0;
                }
            });
            $scope.$watch('editableMaxWardrobeDetailMrp.hingesCode', function (hingeCode) {
                if (hingeCode === "HS") {
                    $scope.editableMaxWardrobeDetailMrp.hinges = "Soft Close Hinges";
                    $scope.editableMaxWardrobeDetailMrp.hingesPrice = $scope.maxWardrobeMrpObject.softCloseHinges;
                } else {
                    $scope.editableMaxWardrobeDetailMrp.hingesPrice = 0;
                }
            });
            $scope.saveMaxWardrobeMrpDetails = function (editableMaxWardrobeDetailMrp) {
                editableMaxWardrobeDetailMrp.orderHeadId = $stateParams.orderHeadId;
                editableMaxWardrobeDetailMrp.price = (editableMaxWardrobeDetailMrp.carcassPrice + editableMaxWardrobeDetailMrp.shutterPrice + editableMaxWardrobeDetailMrp.hingesPrice + editableMaxWardrobeDetailMrp.handlePrice);
                console.log("Max MRP Save :%O", editableMaxWardrobeDetailMrp);
                MaxWardrobeMrpOrderDetailsService.save(editableMaxWardrobeDetailMrp, function () {
                    console.log("Saved Successfully");
                    $scope.editableMaxWardrobeDetailMrp = "";
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });
            };
            /////////////////Max Wardrobe Funtionality Ends///////////////////
            /////////////////Dealer Component Offering Starts/////////////////
            $scope.editableDealerComponent = {};
            $scope.currentUser = $rootScope.currentUser;
            UserService.findByUsername({
                'username': $scope.currentUser.username
            }, function (userObject) {
                $scope.userObject = userObject;
                if (userObject.role === "ROLE_ADMIN") {
                    $scope.adminBackButton = true;
                    $scope.dealerBackButton = false;
                } else if (userObject.role === "ROLE_DEALER") {
                    $scope.adminBackButton = false;
                    $scope.dealerBackButton = true;
                }
            });
            $scope.manufacturerList = ManufacturerService.findAllList();

            $scope.$watch('editableDealerComponent.manufacturer', function (manufacturerCode) {
                $scope.editableDealerComponent.manufacturerCode = manufacturerCode;
                console.log("Manufacturer Code :%O", manufacturerCode);
                $scope.manufacturerCategoryList = ManufacturerCategoryService.findByManufacturerCode({
                    'manufacturerCode': manufacturerCode
                });
            });

            $scope.$watch('editableDealerComponent.manufacturerCategory', function (manufacturerCategory) {
                console.log("Manufacturer Category :%O", manufacturerCategory);
                $scope.dealerSkuList = DealerSkuService.findByManufacturerAndManufacturerCategoryByUser({
                    'manufacturer': $scope.editableDealerComponent.manufacturerCode,
                    'manufacturerCategory': manufacturerCategory,
                    'createdBy': $scope.userObject.id
                });
            });

            $scope.$watch('editableDealerComponent.product', function (dealerSkuId) {
                console.log("Dealer SKU Id :%O", dealerSkuId);
                DealerSkuService.get({
                    'id': dealerSkuId
                }, function (dealerSkuObject) {
                    $scope.editableDealerComponent.manufacturerCategoryCode = dealerSkuObject.manufacturerCategoryCode;
                    $scope.editableDealerComponent.moduleCode = dealerSkuObject.productCode;
                    $scope.editableDealerComponent.description = dealerSkuObject.productDescription + " & Color / Finish : (" + dealerSkuObject.color + ")";
                    $scope.editableDealerComponent.color = dealerSkuObject.color;
                    $scope.editableDealerComponent.width = dealerSkuObject.width;
                    $scope.editableDealerComponent.depth = dealerSkuObject.depth;
                    $scope.editableDealerComponent.height = dealerSkuObject.height;
                    $scope.editableDealerComponent.unitPrice = dealerSkuObject.price;
                    $scope.editableDealerComponent.orderFor = "DEALER_SKU";
                    $scope.editableDealerComponent.orderHeadId = $stateParams.orderHeadId;
                });
            });
            $scope.saveDealerComponents = function (editableDealerComponent) {
                editableDealerComponent.price = (editableDealerComponent.unitPrice * editableDealerComponent.quantity);
                editableDealerComponent.productCode = editableDealerComponent.manufacturer + "" + editableDealerComponent.manufacturerCategory + "" + editableDealerComponent.moduleCode;
                console.log("Editable Dealer Component :%O", editableDealerComponent);
                DealerSkuOrderDetailsService.save(editableDealerComponent, function () {
                    $state.go('admin.masters_order_mrp_details', {
                        'orderHeadId': $stateParams.orderHeadId
                    }, {'reload': true});
                });

            };
            /////////////////Dealer Component Offering Endss/////////////////
            /////////////////Listing/////////////////////////////////////////
            $scope.infinityWardrobeMrpOrders = InfinityWardrobeMrpOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            });
            $scope.maxWardrobeMrpOrders = MaxWardrobeMrpOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            });
            $scope.dealerSkuMrpOrders = DealerSkuOrderDetailsService.findByOrderHeadId({
                'orderHeadId': $stateParams.orderHeadId
            }, function (dealerSkuMrpOrdersList) {
                console.log("Dealer SKU MRP Order List :%O", dealerSkuMrpOrdersList);
            });

            /////////////////////////////////////////////////////////////////
        })
        .controller('SkuOrderMrpDetailsDeleteController', function (DealerSkuOrderDetailsService, OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableDealerComponent = DealerSkuOrderDetailsService.get({
                'id': $stateParams.dealerSkuId
            });
            $scope.deleteDealerSku = function (dealerSku) {
                dealerSku.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {'orderHeadId': dealerSku.orderHeadId}, {'reload': true});
                });
            };
        })
        .controller('InfinityWardrobeOrderMrpDetailsDeleteController', function (MaxWardrobeMrpService, InfinityWardrobeMrpOrderDetailsService, DealerSkuOrderDetailsService, OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableInfinityWardrobeDetailMrp = InfinityWardrobeMrpOrderDetailsService.get({
                'id': $stateParams.infinityWardrobeDetailId
            });
            $scope.deleteInfinityWardrobeMrp = function (infinityWardrobeMrp) {
                infinityWardrobeMrp.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {'orderHeadId': infinityWardrobeMrp.orderHeadId}, {'reload': true});
                });
            };
        })
        .controller('MaxWardrobeOrderMrpDetailsDeleteController', function (MaxWardrobeMrpOrderDetailsService, InfinityWardrobeMrpService, DealerSkuOrderDetailsService, OrderHeadMrpService, $rootScope, UserService, PartyService, EmployeeService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableMaxWardrobeDetailMrp = MaxWardrobeMrpOrderDetailsService.get({
                'id': $stateParams.maxWardrobeDetailId
            });
            $scope.deleteMaxWardrobeMrp = function (maxWardrobeMrp) {
                maxWardrobeMrp.$delete(function () {
                    $state.go('admin.masters_order_mrp_details', {'orderHeadId': maxWardrobeMrp.orderHeadId}, {'reload': true});
                });
            };
        });
 