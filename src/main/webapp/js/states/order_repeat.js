/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.order_repeat", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.carcass_repeat_add', {
                'url': '/:orderHeadId/:carcassDetailId/carcass_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/carcass_addition.html',
                'controller': 'CarcassRepeatAdditionController'
            });
            $stateProvider.state('admin.panel_repeat_add', {
                'url': '/:orderHeadId/:panelDetailId/panel_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/panel_addition.html',
                'controller': 'PanelRepeatAdditionController'
            });
            $stateProvider.state('admin.shutter_repeat_add', {
                'url': '/:orderHeadId/:shutterDetailId/shutter_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/shutter_addition.html',
                'controller': 'ShutterRepeatAdditionController'
            });
            $stateProvider.state('admin.drawer_repeat_add', {
                'url': '/:orderHeadId/:drawerDetailId/drawer_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/drawer_addition.html',
                'controller': 'DrawerRepeatAdditionController'
            });
            $stateProvider.state('admin.filler_repeat_add', {
                'url': '/:orderHeadId/:fillerDetailId/filler_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/filler_addition.html',
                'controller': 'FillerRepeatAdditionController'
            });
            $stateProvider.state('admin.pelmet_repeat_add', {
                'url': '/:orderHeadId/:pelmetDetailId/pelmet_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/pelmet_addition.html',
                'controller': 'PelmetRepeatAdditionController'
            });
            $stateProvider.state('admin.cornice_repeat_add', {
                'url': '/:orderHeadId/:corniceDetailId/cornice_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/cornice_addition.html',
                'controller': 'CorniceRepeatAdditionController'
            });
            $stateProvider.state('admin.handle_repeat_add', {
                'url': '/:orderHeadId/:handleDetailId/handle_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/handle_addition.html',
                'controller': 'HandleRepeatAdditionController'
            });
            $stateProvider.state('admin.hardware_repeat_add', {
                'url': '/:orderHeadId/:hardwareDetailId/hardware_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/hardware_addition.html',
                'controller': 'HardwareRepeatAdditionController'
            });
            $stateProvider.state('admin.other_hardware_repeat_add', {
                'url': '/:orderHeadId/:dealerSkuId/panel_addition',
                'templateUrl': templateRoot + '/masters/order_details_repeat_addition/other_hardware_addition.html',
                'controller': 'DealerSkuRepeatAdditionController'
            });
        })
        .controller('CarcassRepeatAdditionController', function (SegmentService, RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, StandardCarcassPriceService, CarcassSubtypeService, SectionProfileService, StandardCarcassDimensionService, ColorService, RawMaterialService, KitchenComponentService, CarcassOrderDetailsService, $scope, $stateParams, $state) {
            console.log("Inside carcass repeat addition");
            console.log("Carcass Detail Id :%O", $stateParams.carcassDetailId);
            if ($stateParams.carcassDetailId === undefined) {
                $scope.editableCarcassDetail = {};
            } else {
                $scope.editableCarcassDetail = {};
                CarcassOrderDetailsService.get({
                    'id': $stateParams.carcassDetailId
                }, function (carcassOrderDetailObject) {
                    console.log("Carcass Order Detail Object in Repeat:%O", carcassOrderDetailObject);
                    console.log("STandard Carcass Price Id :" + carcassOrderDetailObject.stdCarcassPriceId);
                    if (carcassOrderDetailObject.stdCarcassPriceId !== null) {
                        carcassOrderDetailObject.stdCarcassPriceId = carcassOrderDetailObject.stdCarcassPriceId.toString();
                    }

                    if (carcassOrderDetailObject.sectionProfileId !== null) {
                        carcassOrderDetailObject.sectionProfileId = carcassOrderDetailObject.sectionProfileId.toString();
                    }
                    carcassOrderDetailObject.id = '';
                    carcassOrderDetailObject.productCode = '';
                    if (carcassOrderDetailObject.sideMaterial === '0') {
                        console.log("Side Material 0");
                        carcassOrderDetailObject.sideMaterial = '';
                    }
                    if (carcassOrderDetailObject.sideFinish === '0') {
                        console.log("Side Finish 0");
                        carcassOrderDetailObject.sideFinish = '';
                    }
                    //////To Fetch Kitchen Component//////
                    KitchenComponentService.findByComponentCode({
                        'componentCode': carcassOrderDetailObject.component
                    }, function (kcObject) {
                        $scope.carcassName = kcObject.component;
                        $scope.carcassComponent = kcObject.componentCode;
                    });
                    /////To Fetch Internal Color/////////
                    ColorService.get({
                        'id': carcassOrderDetailObject.intColorId
                    }, function (intColorObject) {
                        carcassOrderDetailObject.intColorCode = intColorObject.colorCode;
                        carcassOrderDetailObject.intColorId = intColorObject.id;
                        $scope.intColorName = intColorObject.colorName;
                    });
                    /////To Fetch Left Color/////////
                    if (carcassOrderDetailObject.leftColorId !== null) {
                        ColorService.get({
                            'id': carcassOrderDetailObject.leftColorId
                        }, function (leftColorObject) {
                            carcassOrderDetailObject.leftColorCode = leftColorObject.colorCode;
                            carcassOrderDetailObject.leftColorId = leftColorObject.id;
                            $scope.leftColorName = leftColorObject.colorName;
                        });
                    }
                    /////To Fetch Right Color/////////
                    if (carcassOrderDetailObject.rightColorId !== null) {
                        ColorService.get({
                            'id': carcassOrderDetailObject.rightColorId
                        }, function (rightColorObject) {
                            carcassOrderDetailObject.rightColorCode = rightColorObject.colorCode;
                            carcassOrderDetailObject.rightColorId = rightColorObject.id;
                            $scope.rightColorName = rightColorObject.colorName;
                        });
                    }
                    /////To Fetch Back Color/////////
                    if (carcassOrderDetailObject.backColorId !== null) {
                        ColorService.get({
                            'id': carcassOrderDetailObject.backColorId
                        }, function (backColorObject) {
                            carcassOrderDetailObject.backColorCode = backColorObject.colorCode;
                            carcassOrderDetailObject.backColorId = backColorObject.id;
                            $scope.backColorName = backColorObject.colorName;
                        });
                    }
                    /////To Fetch Top Color/////////
                    if (carcassOrderDetailObject.topColorId !== null) {
                        ColorService.get({
                            'id': carcassOrderDetailObject.topColorId
                        }, function (topColorObject) {
                            carcassOrderDetailObject.topColorCode = topColorObject.colorCode;
                            carcassOrderDetailObject.topColorId = topColorObject.id;
                            $scope.topColorName = topColorObject.colorName;
                        });
                    }
                    /////To Fetch Bottom Color/////////
                    if (carcassOrderDetailObject.bottomColorId !== null) {
                        ColorService.get({
                            'id': carcassOrderDetailObject.bottomColorId
                        }, function (bottomColorObject) {
                            carcassOrderDetailObject.bottomColorCode = bottomColorObject.colorCode;
                            carcassOrderDetailObject.bottomColorId = bottomColorObject.id;
                            $scope.bottomColorName = bottomColorObject.colorName;
                        });
                    }
                    if (carcassOrderDetailObject.grainDirection === "NO_GRAIN") {
                        carcassOrderDetailObject.grainDirection = "";
                    }

                    if (carcassOrderDetailObject.sectionProfileId === null) {
                        console.log("Section Profile Id is NUll");
                        carcassOrderDetailObject.sectionProfileId = '';
                    }

                    if (carcassOrderDetailObject.sideMatching === 'NSM') {
                        carcassOrderDetailObject.sideMatching = '';
                    }

                    if (carcassOrderDetailObject.sideSelection === 'NSS') {
                        carcassOrderDetailObject.sideSelection = '';
                    }

                    $scope.editableCarcassDetail = carcassOrderDetailObject;
                });
            }
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (party) {
                    $scope.party = party;
                });
                SegmentService.findBySegment({
                    'segment': orderHeadObject.segment
                }, function (segment) {
                    $scope.segment = segment;
                });
                var a = new Date(orderHeadObject.poDate);
                var factDespDate = moment(a).add(12, 'days');
                var date = new Date(factDespDate);
                $scope.factDespDate = date;
            });
            $scope.showCarcassSelectionWidget = false;
            $scope.closeWidget = function () {
                $scope.showCarcassSelectionWidget = false;
                $scope.showCarcassColorSelectionWidget = false;
                $scope.showCarcassSidesColorSelectionWidget = false;
                $scope.preCarcass = {};
                $scope.preInternalCarcassColor = {};
                $scope.preSideCarcassColor = {};
            };
            $scope.openCarcass = function () {
                KitchenComponentService.findByCategory({
                    'category': 'CARCASS '
                }, function (carcassList) {
                    $scope.carcaseList1 = carcassList;
                });
                $scope.showCarcassSelectionWidget = true;
            };
            $scope.editableCarcassDetail = {};
            RawMaterialService.findAllList(function (rmList) {
                $scope.rawMaterialsList = rmList;
            });
            $scope.selectCarcase = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.carcassName = kcObject.component;
                    $scope.carcassComponent = kcObject.componentCode;
                });
            };
            //////////Make Color Null if Side Matching changed//////////
            $scope.$watch('editableCarcassDetail.sideMatching', function (sideMatchingOption) {
//                $scope.editableCarcassDetail.sideSelection = "";
                $scope.$watch('editableCarcassDetail.sideSelection', function (sideSelectionOption) {
                    console.log("Side Matching Option :" + sideMatchingOption);
                    if (sideSelectionOption === "LSM") {
                        $scope.editableCarcassDetail.rightColorCode = null;
                        $scope.editableCarcassDetail.rightColorId = null;
                        $scope.rightColorName = "";
                        $scope.editableCarcassDetail.topColorCode = null;
                        $scope.editableCarcassDetail.topColorId = null;
                        $scope.topColorName = "";
                        $scope.editableCarcassDetail.bottomColorCode = null;
                        $scope.editableCarcassDetail.bottomColorId = null;
                        $scope.bottomColorName = "";
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";

                    } else if (sideSelectionOption === "RSM") {
                        $scope.editableCarcassDetail.leftColorCode = null;
                        $scope.editableCarcassDetail.leftColorId = null;
                        $scope.leftColorName = "";
                        $scope.editableCarcassDetail.topColorCode = null;
                        $scope.editableCarcassDetail.topColorId = null;
                        $scope.topColorName = "";
                        $scope.editableCarcassDetail.bottomColorCode = null;
                        $scope.editableCarcassDetail.bottomColorId = null;
                        $scope.bottomColorName = "";
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";
                    } else if (sideSelectionOption === "TSM") {
                        $scope.editableCarcassDetail.leftColorCode = null;
                        $scope.editableCarcassDetail.leftColorId = null;
                        $scope.leftColorName = "";
                        $scope.editableCarcassDetail.rightColorCode = null;
                        $scope.editableCarcassDetail.rightColorId = null;
                        $scope.rightColorName = "";
                        $scope.editableCarcassDetail.bottomColorCode = null;
                        $scope.editableCarcassDetail.bottomColorId = null;
                        $scope.bottomColorName = "";
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";
                    } else if (sideSelectionOption === "BSM") {
                        $scope.editableCarcassDetail.leftColorCode = null;
                        $scope.editableCarcassDetail.leftColorId = null;
                        $scope.leftColorName = "";
                        $scope.editableCarcassDetail.rightColorCode = null;
                        $scope.editableCarcassDetail.rightColorId = null;
                        $scope.rightColorName = "";
                        $scope.editableCarcassDetail.topColorCode = null;
                        $scope.editableCarcassDetail.topColorId = null;
                        $scope.topColorName = "";
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";
                    } else if (sideSelectionOption === "LRSM") {
                        $scope.editableCarcassDetail.topColorCode = null;
                        $scope.editableCarcassDetail.topColorId = null;
                        $scope.topColorName = "";
                        $scope.editableCarcassDetail.bottomColorCode = null;
                        $scope.editableCarcassDetail.bottomColorId = null;
                        $scope.bottomColorName = "";
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";
                    } else if (sideSelectionOption === "LRTSM") {
                        $scope.editableCarcassDetail.bottomColorCode = null;
                        $scope.editableCarcassDetail.bottomColorId = null;
                        $scope.bottomColorName = "";
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";
                    } else if (sideSelectionOption === "LRBSM") {
                        $scope.editableCarcassDetail.topColorCode = null;
                        $scope.editableCarcassDetail.topColorId = null;
                        $scope.topColorName = "";
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";
                    } else if (sideSelectionOption === "ASM") {
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";
                    } else if (sideSelectionOption === "FSM") {
                        console.log("Full Side Matching Keeping Everythiong as it is");
                    } else {
                        console.log("No Side Selection");
                        $scope.editableCarcassDetail.leftColorCode = null;
                        $scope.editableCarcassDetail.leftColorId = null;
                        $scope.leftColorName = "";
                        $scope.editableCarcassDetail.rightColorCode = null;
                        $scope.editableCarcassDetail.rightColorId = null;
                        $scope.rightColorName = "";
                        $scope.editableCarcassDetail.topColorCode = null;
                        $scope.editableCarcassDetail.topColorId = null;
                        $scope.topColorName = "";
                        $scope.editableCarcassDetail.bottomColorCode = null;
                        $scope.editableCarcassDetail.bottomColorId = null;
                        $scope.bottomColorName = "";
                        $scope.editableCarcassDetail.backColorCode = null;
                        $scope.editableCarcassDetail.backColorId = null;
                        $scope.backColorName = "";
                    }

                    if (sideMatchingOption === "NSM") {
                        $scope.editableCarcassDetail.sideSelection = "NSS";
                    }
                    ;
                });
            });
            $scope.selectPreCarcass = function (componentId) {
                KitchenComponentService.get({
                    'id': componentId
                }, function (carcassComponent) {
                    $scope.preCarcass = carcassComponent;
                });
            };
            $scope.wcLengthList = [];
            $scope.wcWidthList = [];
            $scope.wcDepthList = [];
            $scope.bcLengthList = [];
            $scope.bcWidthList = [];
            $scope.bcDepthList = [];
            $scope.tuLengthList = [];
            $scope.tuWidthList = [];
            $scope.tuDepthList = [];
            $scope.bbLengthList = [];
            $scope.bbWidthList = [];
            $scope.bbDepthList = [];
            ////////Wall Carcass////////
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'HEIGHT',
                'carcassCategory': "WC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.wcLengthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'WIDTH',
                'carcassCategory': "WC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.wcWidthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'DEPTH',
                'carcassCategory': "WC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.wcDepthList.push(std.stdValue);
                });
            });
            ////////BASE Carcass////////
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'HEIGHT',
                'carcassCategory': "BC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bcLengthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'WIDTH',
                'carcassCategory': "BC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bcWidthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'DEPTH',
                'carcassCategory': "BC"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bcDepthList.push(std.stdValue);
                });
            });
            ////////Tall Unit Carcass////////
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'HEIGHT',
                'carcassCategory': "TU"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.tuLengthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'WIDTH',
                'carcassCategory': "TU"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.tuWidthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'DEPTH',
                'carcassCategory': "TU"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.tuDepthList.push(std.stdValue);
                });
            });
            ////////Base Blind Carcass////////
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'HEIGHT',
                'carcassCategory': "BB"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bbLengthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'WIDTH',
                'carcassCategory': "BB"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bbWidthList.push(std.stdValue);
                });
            });
            StandardCarcassDimensionService.findByCarcassCategoryDimensionAttribute({
                'dimensionAttribute': 'DEPTH',
                'carcassCategory': "BB"
            }, function (stdLength) {
                angular.forEach(stdLength, function (std) {
                    $scope.bbDepthList.push(std.stdValue);
                });
            });
            $scope.carcassGrainDirection = false;
            $scope.carcassLeftColor = false;
            $scope.carcassRightColor = false;
            $scope.carcassBackColor = false;
            $scope.carcassTopColor = false;
            $scope.carcassBottomColor = false;
            $scope.showSideMatching = false;
            $scope.OSM = false;
            $scope.OSM = false;
            $scope.BSM = false;
            $scope.TSM = false;
            $scope.ASM = false;
            $scope.FSM = false;
            ////////////////Carcass Form Functionality//////////////////////////////
            $scope.carcassStdList;
//            $scope.carcassSubTypeList = CarcassSubtypeService.findByParentType({
//                'parentType': 'WC'
//            }, function (carcassSubTypeList) {
//                console.log("CSTL :%O", carcassSubTypeList);
//            });
            console.log("Carcass SUb Type List :%O", $scope.carcassSubTypeList);
            $scope.$watch('carcassName', function (carcassName) {
                $scope.typeLike;
                if (carcassName === "Wall Carcass") {
                    console.log("WC");
                    $scope.carcassSubTypeList = CarcassSubtypeService.findByParentType({
                        'parentType': 'WC'
                    }, function (carcassSubTypeList) {
                        console.log("CSTL :%O", carcassSubTypeList);
                    });
                    $scope.typeLike = "Wall";
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = true;
                    $scope.ASM = true;
                    $scope.FSM = true;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = true;
//                    $scope.carcassBottomColor = true;
                    SectionProfileService.findByCarassType({
                        'carcassType': "WALL_CARCASS"
                    }, function (spList) {
                        console.log("SP List %O", spList);
                        $scope.sectionProfileList = spList;
                    });
                    $scope.$watch('editableCarcassDetail.shelf', function (shelfValue) {
                        if (shelfValue === true) {
                            StandardCarcassPriceService.findCarcassWithShelf({
                                'carcassType': $scope.typeLike
                            }, function (stdList) {
                                $scope.carcassStdList = stdList;
                            });
                        } else {
                            StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                                'carcassType': $scope.typeLike
                            }, function (stdList) {
                                $scope.carcassStdList = stdList;
                            });
                        }
                    });
                } else if (carcassName === "Base Carcass") {
                    $scope.carcassSubTypeList = CarcassSubtypeService.findByParentType({
                        'parentType': 'BC'
                    }, function (carcassSubTypeList) {
                        console.log("CSTL :%O", carcassSubTypeList);
                    });
                    $scope.typeLike = "Base";
//                    $scope.editableCarcassDetail.shelf = 1;
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = false;
                    $scope.ASM = false;
                    $scope.FSM = true;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                    SectionProfileService.findByCarassType({
                        'carcassType': "BASE_CARCASS"
                    }, function (spList) {
                        console.log("SP List %O", spList);
                        $scope.sectionProfileList = spList;
                    });
                    $scope.tempArray = [];
                    $scope.$watch('editableCarcassDetail.shelf', function (shelfValue) {
                        if (shelfValue === true) {
                            StandardCarcassPriceService.findCarcassWithShelf({
                                'carcassType': $scope.typeLike
                            }, function (stdList) {
                                angular.forEach(stdList, function (singleObject) {
                                    $scope.tempArray.push(singleObject);
                                });
                                StandardCarcassPriceService.findCarcassWithShelf({
                                    'carcassType': 'Sink'
                                }, function (stdSinkList) {
                                    angular.forEach(stdSinkList, function (singleSinkObject) {
                                        $scope.tempArray.push(singleSinkObject);
                                    });
                                });
                                $scope.carcassStdList = $scope.tempArray;
                            });
                        } else {
                            StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                                'carcassType': $scope.typeLike
                            }, function (stdList) {
                                angular.forEach(stdList, function (singleObject) {
                                    $scope.tempArray.push(singleObject);
                                });
                                StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                                    'carcassType': 'Sink'
                                }, function (stdSinkList) {
                                    angular.forEach(stdSinkList, function (singleSinkObject) {
                                        $scope.tempArray.push(singleSinkObject);
                                    });
                                });
                                $scope.carcassStdList = $scope.tempArray;
                            });
                        }
                    });
                } else if (carcassName === "Tall Carcass") {
                    $scope.carcassSubTypeList = CarcassSubtypeService.findByParentType({
                        'parentType': 'TU'
                    }, function (carcassSubTypeList) {
                        console.log("CSTL :%O", carcassSubTypeList);
                    });
                    $scope.typeLike = "Tall";
//                    $scope.editableCarcassDetail.shelf = 5;
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = true;
                    $scope.ASM = true;
                    $scope.FSM = true;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                    SectionProfileService.findByCarassType({
                        'carcassType': "TALL_UNIT"
                    }, function (spList) {
                        console.log("SP List %O", spList);
                        $scope.sectionProfileList = spList;
                    });
                    $scope.$watch('editableCarcassDetail.shelf', function (shelfValue) {
                        if (shelfValue === true) {
                            StandardCarcassPriceService.findCarcassWithShelf({
                                'carcassType': $scope.typeLike
                            }, function (stdList) {
                                $scope.carcassStdList = stdList;
                            });
                        } else {
                            StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                                'carcassType': $scope.typeLike
                            }, function (stdList) {
                                $scope.carcassStdList = stdList;
                            });
                        }
                    });
                } else if (carcassName === "Base-Blind Carcass") {
                    $scope.typeLike = "Base B";
                    $scope.showSideMatching = false;
//                    $scope.carcassLeftColor = false;
//                    $scope.carcassRightColor = false;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                    StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                        'carcassType': $scope.typeLike
                    }, function (stdList) {
                        $scope.carcassStdList = stdList;
                    });
                } else if (carcassName === "Sink Carcase") {
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = false;
                    $scope.ASM = false;
                    $scope.FSM = false;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                } else if (carcassName === "Microwave Carcase") {
                    $scope.showSideMatching = true;
                    $scope.OSM = true;
                    $scope.BSM = true;
                    $scope.TSM = false;
                    $scope.ASM = false;
                    $scope.FSM = false;
//                    $scope.carcassLeftColor = true;
//                    $scope.carcassRightColor = true;
//                    $scope.carcassBackColor = false;
//                    $scope.carcassTopColor = false;
//                    $scope.carcassBottomColor = false;
                }
                $scope.$watch('editableCarcassDetail.sideMatching', function (sideMatching) {
                    console.log("Side Matching :%O", sideMatching);
                    $scope.showOSM = false;
                    $scope.showBSM = false;
                    $scope.showTSM = false;
                    $scope.showOSMTop = false;
                    $scope.showOSMBottom = false;
                    $scope.showASM = false;
                    $scope.showFSM = false;
                    console.log("Carcass Name :%O", $scope.carcassName);
                    if ($scope.carcassName === "Base Carcass" || $scope.carcassName === "Sink Carcass" || $scope.carcassName === "Microwave Carcass") {
                        if (sideMatching === "O") {
                            $scope.showOSM = true;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
                        } else if (sideMatching === "B") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = true;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        } else if (sideMatching === "T") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = true;
                            $scope.showASM = false;
                            $scope.showFSM = false;
                        } else if (sideMatching === "A") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = true;
                            $scope.showFSM = false;
                        } else if (sideMatching === "F") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = true;
                        } else {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
//                        $scope.showASM = false;
//                        $scope.editableCarcassDetail.leftColorId = "NULL";
//                        $scope.editableCarcassDetail.rightColorId = "NULL";
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        }
                    } else {
                        if (sideMatching === "O") {
                            $scope.showOSM = true;
                            $scope.showOSMTop = true;
                            $scope.showOSMBottom = true;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
                        } else if (sideMatching === "B") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = true;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        } else if (sideMatching === "T") {
                            $scope.showOSM = false;
                            $scope.showOSMTop = false;
                            $scope.showOSMBottom = false;
                            $scope.showBSM = false;
                            $scope.showTSM = true;
                            $scope.showASM = false;
                            $scope.showFSM = false;
                        } else if (sideMatching === "A") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = true;
                            $scope.showFSM = false;
                        } else if (sideMatching === "F") {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = true;
                        } else {
                            $scope.showOSM = false;
                            $scope.showBSM = false;
                            $scope.showTSM = false;
                            $scope.showASM = false;
                            $scope.showFSM = false;
//                        $scope.editableCarcassDetail.leftColorId = "NULL";
//                        $scope.editableCarcassDetail.rightColorId = "NULL";
//                        $scope.editableCarcassDetail.topColorId = "NULL";
//                        $scope.editableCarcassDetail.bottomColorId = "NULL";
                        }
                    }

                });
                OrderHeadService.get({
                    'id': $stateParams.orderHeadId
                }, function (orderHeadObject) {
                    PartyService.get({
                        'id': orderHeadObject.billingPartyId
                    }, function (partyObject) {
                        $scope.editableCarcassDetail.rateContractId = partyObject.rateContractId;
                    });
                });
                $scope.$watch('editableCarcassDetail.sideSelection', function (selectedSide) {
                    console.log("Selected Side :%O", selectedSide);
                    if (selectedSide === "LSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "RSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "TSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "BSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = true;
                    } else if (selectedSide === "LRSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "LRTSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = false;
                    } else if (selectedSide === "LRBSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = true;
                    } else if (selectedSide === "ASM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = true;
                    } else if (selectedSide === "FSM") {
                        $scope.carcassGrainDirection = true;
                        $scope.carcassLeftColor = true;
                        $scope.carcassRightColor = true;
                        $scope.carcassBackColor = true;
                        $scope.carcassTopColor = true;
                        $scope.carcassBottomColor = true;
                    } else {
                        $scope.carcassGrainDirection = false;
                        $scope.carcassLeftColor = false;
                        $scope.carcassRightColor = false;
                        $scope.carcassBackColor = false;
                        $scope.carcassTopColor = false;
                        $scope.carcassBottomColor = false;
                    }
                });
                $scope.$watch('editableCarcassDetail.shelf', function (shelfValue) {
                    console.log("Carcass Name :%O", $scope.carcassName);
                    if (shelfValue === true) {
//                        console.log("Type Like Default :%O", $scope.typeLike);
                        StandardCarcassPriceService.findCarcassWithShelfByCT({
                            'carcassType': $scope.typeLike
                        }, function (stdListRefined) {
                            $scope.carcassStdList = stdListRefined;
                        });
//                        $scope.editableCarcassDetail.shelf = '1';
                        if ($scope.carcassName === "Wall Carcass") {
                            $scope.editableCarcassDetail.shelfCount = 1;
                        } else if ($scope.carcassName === "Base Carcass") {
                            $scope.editableCarcassDetail.shelfCount = 1;
                        } else if ($scope.carcassName === "Tall Carcass") {
                            $scope.editableCarcassDetail.shelfCount = 5;
                        }
                    } else if (shelfValue === false) {
                        console.log("Type Like :%O", $scope.typeLike);
                        if ($scope.typeLike === "Base") {
//                            $scope.tempArray = [];
                            StandardCarcassPriceService.findSinkCarcassWithoutShelfByCT({
                                'carcassType': 'Sink'
                            }, function (stdList) {
                                $scope.carcassStdList = stdList;
                            });

                            $scope.editableCarcassDetail.shelfCount = 0;
                        } else {
                            StandardCarcassPriceService.findCarcassWithoutShelfByCT({
                                'carcassType': $scope.typeLike
                            }, function (stdListRefined) {
                                $scope.carcassStdList = stdListRefined;
                            });
                            $scope.editableCarcassDetail.shelfCount = 0;
                        }
                    }
                });
            });
//            $scope.sectionProfileList = SectionProfileService.query();
            $scope.$watch('editableCarcassDetail.sectionProfileId', function (sectionProfileId) {
                console.log("Section Profile Object :%O", sectionProfileId);
                SectionProfileService.get({
                    'id': sectionProfileId
                }, function (sectionProfileObject) {
                    $scope.editableCarcassDetail.sectionProfilePrice = sectionProfileObject.price;
                    $scope.editableCarcassDetail.sectionDirection = sectionProfileObject.direction;
                });
            });
            $scope.$watch('editableCarcassDetail.stdCarcassPriceId', function (stdCarcassId) {
                console.log("Std Carcass Id :%O", stdCarcassId);
                StandardCarcassPriceService.get({
                    'id': stdCarcassId
                }, function (stdCarcassObject) {
                    $scope.editableCarcassDetail.shelfCount = stdCarcassObject.shelf;
                    $scope.editableCarcassDetail.length = stdCarcassObject.length;
                    $scope.editableCarcassDetail.width = stdCarcassObject.width;
                    $scope.editableCarcassDetail.depth = stdCarcassObject.depth;
                });
            });
            $scope.$watch('editableCarcassDetail.material', function (material) {
                console.log("Material Object :%O", material);
                RawMaterialService.findByMaterialCode({
                    'materialCode': material
                }, function (rmObject) {
                    $scope.editableCarcassDetail.backPanelPrice = rmObject.backPanelPrice;
                });
//                $scope.editableCarcassDetail.stdMaterialObject = material;
                $scope.intColorName = "";
                $scope.editableCarcassDetail.intColorId = "";
                ColorConstraintService.findByComponentMaterialCode({
                    'component': 'CARCASE',
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.sortedColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.sortedColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.sortedColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.sortedColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.sortedColorList1 = [];
                    }
                });
            });
            $scope.$watch('editableCarcassDetail.sideMaterial', function (sideMaterial) {
                console.log("Side Material :%O", sideMaterial);
                RawMaterialService.findByMaterialCode({
                    'materialCode': sideMaterial
                }, function (materialObject) {
                    FinishPriceService.findCarcassFinishByMaterialId({
                        'materialId': materialObject.id
                    }, function (finishList) {
                        $scope.finishesList = finishList;
                    });
                });
            });
            $scope.$watch('editableCarcassDetail.sideFinish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.completeColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.completeColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.completeColors1 = [];
                    } else if (response.status === 404) {
                        $scope.completeColors1 = [];
                    } else if (response.status === 400) {
                        $scope.completeColors1 = [];
                    }
                });
            });

//            $scope.completeColors1 = ColorService.findAllList();
            $scope.showCarcassColorSelectionWidget = false;
            $scope.showCarcassSidesColorSelectionWidget = false;
            $scope.openInternalCarcassColorWidget = function () {
                $scope.showCarcassColorSelectionWidget = true;
            };
            $scope.openSidesCarcassColorWidget = function (sideName) {
                $scope.sideName = sideName;
                console.log("Side Name :%O", $scope.sideName);
                $scope.showCarcassSidesColorSelectionWidget = true;
            };
            $scope.selectInternalCarcassColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableCarcassDetail.intColorCode = colorCode;
                $scope.editableCarcassDetail.intColorId = colorId;
                $scope.intColorName = colorName;
            };
            $scope.selectPreInternalCarcassColor = function (colorId) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preInternalCarcassColor = colorObject;
                });
            };
            $scope.selectSideCarcassColor = function (colorId, colorName, colorCode) {
                console.log("Getting Side Name in Select ?? :%O", $scope.sideName);
                var side = $scope.sideName;
                if (side === "Left") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.leftColorCode = colorCode;
                    $scope.editableCarcassDetail.leftColorId = colorId;
                    $scope.leftColorName = colorName;
                } else if (side === "Right") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.rightColorCode = colorCode;
                    $scope.editableCarcassDetail.rightColorId = colorId;
                    $scope.rightColorName = colorName;
                } else if (side === "Back") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.backColorCode = colorCode;
                    $scope.editableCarcassDetail.backColorId = colorId;
                    $scope.backColorName = colorName;
                } else if (side === "Top") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.topColorCode = colorCode;
                    $scope.editableCarcassDetail.topColorId = colorId;
                    $scope.topColorName = colorName;
                } else if (side === "Bottom") {
                    $scope.closeWidget();
                    $scope.editableCarcassDetail.bottomColorCode = colorCode;
                    $scope.editableCarcassDetail.bottomColorId = colorId;
                    $scope.bottomColorName = colorName;
                }
            };
            $scope.selectPreSideCarcassColor = function (colorId) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preSideCarcassColor = colorObject;
                });
            };
            function closestValue(num, arr) {
                var curr = arr[0];
                var diff = Math.abs(num - curr);
                for (var val = 0; val < arr.length; val++) {
                    var newdiff = Math.abs(num - arr[val]);
                    if (newdiff < diff) {
                        diff = newdiff;
                        curr = arr[val];
                    }
                }
                return curr;
            }
            ////////////Standard Carcass Validation////////////////
            $scope.validateCarcass = function (orderDetail) {
                console.log("Order Detail :%O", orderDetail);
                orderDetail.component = $scope.carcassComponent;
                var len;
                var wid;
                var dep;
                var l;
                var w;
                var d;
                var nonStandard;
                var lengthGreaterThan100 = function (inputNo) {
                    console.log("Length Greater Than 1000");
                    l = inputNo.toString().slice(0, 3);
                    console.log(" L :%O", l);
                };
                var widthGreaterThan100 = function (inputNo) {
                    w = inputNo.toString().slice(0, 3);
                };
                var depthGreaterThan100 = function (inputNo) {
                    d = inputNo.toString().slice(0, 3);
                };
                if (orderDetail.component === "WC") {
                    console.log("Wall Carcass ");
                    len = closestValue(orderDetail.length, $scope.wcLengthList);
                    wid = closestValue(orderDetail.width, $scope.wcWidthList);
                    dep = closestValue(orderDetail.depth, $scope.wcDepthList);
                    console.log("WC L:%O", len);
                    console.log("WC W:%O", wid);
                    console.log("WC D:%O", dep);
                    if (len < 1000) {
                        l = len.toString().slice(0, 2);
                    } else {
                        lengthGreaterThan100(len);
                    }
                    if (wid < 1000) {
                        w = wid.toString().slice(0, 2);
                    } else {
                        widthGreaterThan100(wid);
                    }
                    if (dep < 1000) {
                        d = dep.toString().slice(0, 2);
                    } else {
                        depthGreaterThan100(dep);
                    }

                } else if (orderDetail.component === "BC") {
                    console.log("Base Carcass");
                    len = closestValue(orderDetail.length, $scope.bcLengthList);
                    wid = closestValue(orderDetail.width, $scope.bcWidthList);
                    dep = closestValue(orderDetail.depth, $scope.bcDepthList);
                    console.log("WC L:%O", len);
                    console.log("WC W:%O", wid);
                    console.log("WC D:%O", dep);
                    if (len < 1000) {
                        l = len.toString().slice(0, 2);
                    } else {
                        lengthGreaterThan100(len);
                    }
                    if (wid < 1000) {
                        w = wid.toString().slice(0, 2);
                    } else {
                        widthGreaterThan100(wid);
                    }
                    if (dep < 1000) {
                        d = dep.toString().slice(0, 2);
                    } else {
                        depthGreaterThan100(dep);
                    }

                } else if (orderDetail.component === "TU") {
                    console.log("Tall Unit");
                    len = closestValue(orderDetail.length, $scope.tuLengthList);
                    wid = closestValue(orderDetail.width, $scope.tuWidthList);
                    dep = closestValue(orderDetail.depth, $scope.tuDepthList);
                    console.log("WC L:%O", len);
                    console.log("WC W:%O", wid);
                    console.log("WC D:%O", dep);
                    if (len < 1000) {
                        l = len.toString().slice(0, 2);
                    } else {
                        lengthGreaterThan100(len);
                    }
                    if (wid < 1000) {
                        w = wid.toString().slice(0, 2);
                    } else {
                        widthGreaterThan100(wid);
                    }
                    if (dep < 1000) {
                        d = dep.toString().slice(0, 2);
                    } else {
                        depthGreaterThan100(dep);
                    }
                } else if (orderDetail.component === "BB") {
                    console.log("Base Blind :%O", orderDetail);
                    len = closestValue(orderDetail.length, $scope.bbLengthList);
                    wid = closestValue(orderDetail.width, $scope.bbWidthList);
                    dep = closestValue(orderDetail.depth, $scope.bbDepthList);
                    console.log("WC L:%O", len);
                    console.log("WC W:%O", wid);
                    console.log("WC D:%O", dep);
                    if (len < 1000) {
                        l = len.toString().slice(0, 2);
                    } else {
                        lengthGreaterThan100(len);
                    }
                    if (wid < 1000) {
                        w = wid.toString().slice(0, 2);
                    } else {
                        widthGreaterThan100(wid);
                    }
                    if (dep < 1000) {
                        d = dep.toString().slice(0, 2);
                    } else {
                        depthGreaterThan100(dep);
                    }
                }
                ;
                if (orderDetail.length !== len) {
                    nonStandard = true;
                } else if (orderDetail.width !== wid) {
                    nonStandard = true;
                } else if (orderDetail.depth !== dep) {
                    nonStandard = true;
                } else {
                    nonStandard = false;
                }

                console.log("What is LLLLL :%O", l);
                console.log("What is WWWWW :%O", w);
                console.log("What is DDDDD :%O", d);
                console.log("Non STandard :%O", nonStandard);
                orderDetail.l = l;
                orderDetail.w = w;
                orderDetail.d = d;
                orderDetail.nonStandardDimension = nonStandard;
                console.log("Side Selection :%O", orderDetail.sideSelection);
                ///////////Trial to remove standard price picking feature//////////
//                if (orderDetail.stdCarcassPriceId !== undefined) {
//                    $scope.standardCarcassObject = StandardCarcassPriceService.get({
//                        'id': orderDetail.stdCarcassPriceId
//                    }, function (stdPriceObject) {
//                        if (orderDetail.material === "PB") {
//                            orderDetail.standardPrice = stdPriceObject.pbPrice;
//                        } else if (orderDetail.material === "MF") {
//                            orderDetail.standardPrice = stdPriceObject.mdfPrice;
//                        } else if (orderDetail.material === "HF") {
//                            orderDetail.standardPrice = stdPriceObject.hdfPrice;
//                        } else if (orderDetail.material === "BW") {
//                            orderDetail.standardPrice = stdPriceObject.plyPrice;
//                        }
//                    });
//                }
                //////////////////////////////////
                console.log("Order Detail AAA:%O", orderDetail);
                if (orderDetail.sideSelection === "NSS") {
                    console.log("Regular");
                    $scope.stdMaterialObject1 = RawMaterialService.findByMaterialCode({
                        'materialCode': orderDetail.material
                    });
                    if (orderDetail.stdCarcassPriceId !== undefined) {
                        $scope.stdMaterialObject1.$promise.then(function (resolvedStdData) {
                            console.log("Resolved For Regular :%O", resolvedStdData);
                            orderDetail.stdMaterialPrice = resolvedStdData.price;
                            console.log("Final Order Detail :%O", orderDetail);
                            $scope.saveOrderDetail(orderDetail);
                        });
                    } else {
                        $scope.stdMaterialObject1.$promise.then(function (resolvedStdData) {
                            console.log("Resolved For Regular :%O", resolvedStdData);
                            orderDetail.stdMaterialPrice = resolvedStdData.price;
                            console.log("Final Order Detail :%O", orderDetail);
                            $scope.saveOrderDetail(orderDetail);
                        });
                    }
                } else if (orderDetail.sideSelection === undefined) {
                    console.log("Regular");
                    $scope.stdMaterialObject1 = RawMaterialService.findByMaterialCode({
                        'materialCode': orderDetail.material
                    });
                    if (orderDetail.stdCarcassPriceId !== undefined) {
                        $scope.stdMaterialObject1.$promise.then(function (resolvedStdData) {
                            console.log("Resolved For Regular :%O", resolvedStdData);
                            orderDetail.stdMaterialPrice = resolvedStdData.price;
                            console.log("Final Order Detail :%O", orderDetail);
                            $scope.saveOrderDetail(orderDetail);
                        });
                    } else {
                        $scope.stdMaterialObject1.$promise.then(function (resolvedStdData) {
                            console.log("Resolved For Regular :%O", resolvedStdData);
                            orderDetail.stdMaterialPrice = resolvedStdData.price;
                            console.log("Final Order Detail :%O", orderDetail);
                            $scope.saveOrderDetail(orderDetail);
                        });
                    }
                } else if (orderDetail.sideSelection !== "NSS") {
                    console.log("Non Regular");
                    console.log("Order Detail :%O", orderDetail);
                    console.log("Finish Object :%O", orderDetail.sideFinish);
                    $scope.stdMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': orderDetail.material
                    });
                    $scope.finishObject = FinishPriceService.findByFinishCode({
                        'finishCode': orderDetail.sideFinish
                    });
                    if (orderDetail.sideMatching === "") {
                        orderDetail.sideMatching = "NSM";
                    }
                    if (orderDetail.sideSelection === "") {
                        orderDetail.sideSelection = "NSS";
                    }
                    if (orderDetail.sideMaterial === "") {
                        orderDetail.sideMaterial = "0";
                    }
                    if (orderDetail.sideFinish === "") {
                        orderDetail.sideFinish = "0";
                    }
                    if (orderDetail.stdCarcassPriceId !== undefined) {
//                        $scope.standardCarcassObject.$promise.then(function (stdCarcassObject) {
                        $scope.stdMaterialObject.$promise.then(function (resolvedStdData) {
                            console.log("resolvedSTdData :%O", resolvedStdData.price);
                            $scope.finishObject.$promise.then(function (resolvedFinishData) {
                                console.log("resolved FInish Data :%O", resolvedFinishData.price);
                            orderDetail.stdMaterialPrice = resolvedStdData.price;
                                orderDetail.finishPrice = resolvedFinishData.price;
                            console.log("This is Order Detail :%O", orderDetail);
                            $scope.saveOrderDetail(orderDetail);
                            });
                        });
//                        });
                    } else {
                        $scope.stdMaterialObject.$promise.then(function (resolvedStdData) {
                            console.log("resolvedSTdData :%O", resolvedStdData.price);
                            $scope.finishObject.$promise.then(function (resolvedFinishData) {
                                console.log("resolved FInish Data :%O", resolvedFinishData.price);
                                orderDetail.stdMaterialPrice = resolvedStdData.price;
                                orderDetail.finishPrice = resolvedFinishData.price;
                                console.log("This is Order Detail :%O", orderDetail);
                                $scope.saveOrderDetail(orderDetail);
                            });
                        });
                    }
                }
            };
            //////////////Save Functions for All Components/////////////
            $scope.saveOrderDetail = function (orderDetail) {
                console.log("Save Order Detail :%O", orderDetail);
                orderDetail.component = $scope.carcassComponent;
                var l1;
                var w1;
                var d1;
                orderDetail.orderHeadId = $stateParams.orderHeadId;
//                ////////Process Length////////////

                if (orderDetail.length < 1000) {
                    l1 = 0 + orderDetail.length.toString();
                } else {
                    l1 = orderDetail.length.toString();
                }
                if (orderDetail.width < 1000) {
                    w1 = 0 + orderDetail.width.toString();
                } else {
                    w1 = orderDetail.width.toString();
                }
                if (orderDetail.depth <= 0) {
                    d1 = "000";
                } else {
                    d1 = orderDetail.depth.toString();
                }

                var totalArea = 0;
                var basicArea = 0;
                var basicSqMt = 0;
                var extraArea = 0;
                var extraSqMt = 0;
                var shelfArea = 0;
                var shelfSqMt = 0;
                var backArea = 0;
                var backSqMt = 0;
                var profileArea = 0;
                if (orderDetail.nonStandardDimension === false) {
                    console.log("Standard Dimesion");
                    if (orderDetail.sideMatching === "O") {
                        console.log("OSM Carcass");
                        if (orderDetail.sideSelection === "LSM" || orderDetail.sideSelection === "RSM") {
                            if (orderDetail.sideSelection === "LSM") {
                                orderDetail.sideVisibility = "L";
                            } else if (orderDetail.sideSelection === "RSM") {
                                orderDetail.sideVisibility = "R";
                            }
                            console.log("Order Detail Side Visibility OSM LR :%O", orderDetail.sideVisibility);
                            var p1 = (orderDetail.depth * orderDetail.length);
                            var p2 = (2 * (orderDetail.width * orderDetail.depth));
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2;
                            extraArea = p1;
                            backArea = p3;
                            shelfArea = (orderDetail.width * orderDetail.depth);
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            shelfSqMt = shelfArea / 1000000;
                            backSqMt = backArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                            console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                            if (orderDetail.shelf === true) {
                                if (orderDetail.sectionProfileId === undefined) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === null) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === "") {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                }
                            } else {
                                if (orderDetail.sectionProfileId === undefined) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === null) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === "") {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                }
                            }
                            orderDetail.productCode = productCode;
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            console.log("Profile Area :%O", profileArea);
                            if (orderDetail.sectionProfilePrice !== undefined) {
//                                console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            ///////////Hardware Price///////////////////
                            if (orderDetail.component === "WC") {
                                var hardwarePrice = 172;
                            } else if (orderDetail.component === "BC") {
                                var hardwarePrice = 263;
                            } else if (orderDetail.component === "TU") {
                                var hardwarePrice = 367;
                            }
                            ////////////////////////////////////////////                            
                            if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                                var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                                var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                            } else {
                                var shelfPrice = 0;
                            }
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            console.log("Back Price :%O", backAreaPrice);
                            console.log("Profile Price :%O", profilePrice);
                            console.log("Shelf Price :%O", shelfPrice);
                            console.log("Hardware Price :%O", hardwarePrice);
                            orderDetail.profilePrice = profilePrice;
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice + hardwarePrice));
                            orderDetail.unitPrice = finalPrice;
                            console.log("Total Area OSM Left/Right :%O", totalArea);
                            console.log("Total Area OSM Left/Right Price:%O", orderDetail.unitPrice);
                        } else if (orderDetail.sideSelection === "TSM" || orderDetail.sideSelection === "BSM") {
                            if (orderDetail.sideSelection === "TSM") {
                                orderDetail.sideVisibility = "T";
                            } else if (orderDetail.sideSelection === "BSM") {
                                orderDetail.sideVisibility = "B";
                            }
                            console.log("Order Detail Side Visibility OSM TB :%O", orderDetail.sideVisibility);
                            var p1 = (2 * (orderDetail.depth * orderDetail.length));
                            var p2 = (orderDetail.width * orderDetail.depth);
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2;
                            extraArea = p2;
                            backArea = p3;
                            shelfArea = (orderDetail.width * orderDetail.depth);
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            backSqMt = backArea / 1000000;
                            shelfSqMt = shelfArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                            console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                            if (orderDetail.shelf === true) {
                                console.log("Section Profile Id :%O", orderDetail.sectionProfileId);
                                if (orderDetail.sectionProfileId === undefined) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === null) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === "") {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                }
                            } else {
                                if (orderDetail.sectionProfileId === undefined) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === null) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === "") {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                }
                            }
                            orderDetail.productCode = productCode;
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            console.log("Profile Area :%O", profileArea);
                            if (orderDetail.sectionProfilePrice !== undefined) {
                                console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            ///////////Hardware Price///////////////////
                            if (orderDetail.component === "WC") {
                                var hardwarePrice = 172;
                            } else if (orderDetail.component === "BC") {
                                var hardwarePrice = 263;
                            } else if (orderDetail.component === "TU") {
                                var hardwarePrice = 367;
                            }
                            ////////////////////////////////////////////
                            if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                                console.log("Shelf Count :%O", orderDetail.shelfCount);
                                var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                                var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                            } else {
                                var shelfPrice = 0;
                            }
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            console.log("Profile Price :%O", profilePrice);
                            console.log("Shelf :%O", shelfPrice);
                            console.log("Back Area Price :%O", backAreaPrice);
                            console.log("Hardware Price :%O", hardwarePrice);
                            orderDetail.profilePrice = profilePrice;
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice + hardwarePrice));
                            orderDetail.unitPrice = finalPrice;
                            console.log("Total ARea OSM TOP/Bottom :%O", totalArea);
                            console.log("Total Area OSM Top/Bottom Price:%O", orderDetail.unitPrice);
                        }
                    } else if (orderDetail.sideMatching === "B") {
                        orderDetail.sideVisibility = "Z";
                        console.log("Order Detail Side Visibility BSM :%O", orderDetail.sideVisibility);
                        console.log("Both Matching Carcass");
                        var p1 = (2 * (orderDetail.width * orderDetail.depth));
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        basicArea = p1;
                        extraArea = p3;
                        backArea = p2;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Back Panel Price :%O", backAreaPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + backAreaPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("Total Area BSM Left & Right", totalArea);
                        console.log("Total Price BSM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "T") {
                        console.log("Three Side Matching");
                        if (orderDetail.sideSelection === "LRTSM") {
                            orderDetail.sideVisibility = "Y";
                        } else if (orderDetail.sideSelection === "LRBSM") {
                            orderDetail.sideVisibility = "W";
                        }
                        console.log("Order Detail Side Visibility TSM :%O", orderDetail.sideVisibility);
                        var p1 = (orderDetail.width * orderDetail.depth);
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        var p4 = (orderDetail.width * orderDetail.depth);
                        basicArea = p1;
                        extraArea = p3 + p4;
                        backArea = p2;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Back Panel Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("Three Side Matching Area :%O", totalArea);
                        console.log("Total Price TSM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "A") {
                        console.log("All Side Matching");
                        orderDetail.sideVisibility = "A";
                        console.log("Side Visibility All Side :" + orderDetail.sideVisibility);
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1;
                        extraArea = p2 + p3;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.backPanelPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
//                        var backAreaPrice = ()
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("SHelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("All Side Matching Area :%O", totalArea);
                        console.log("Total Price ASM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "F") {
                        console.log("Full Side Matching");
                        orderDetail.sideVisibility = "F";
                        console.log("Side Visibility Full Side :" + orderDetail.sideVisibility);
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        var basicAreaPrice = basicSqMt * orderDetail.finishPrice;
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("Baisc Area Price :%O", basicAreaPrice);
                        console.log("Profile Baisc Price :%O", profilePrice);
                        console.log("SHelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + profilePrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("FInal Price Full SIde Matching:%O", orderDetail.unitPrice);
                    } else {
                        ///////////XXXXXXXXXXXXXXXXXXXXXX//////////////////
                        console.log("Regular");
                        //////////////New//////////////////////////
                        orderDetail.sideVisibility = "X";
                        console.log("NST No Side Matching :" + orderDetail.sideVisibility);
                        console.log("Order Details :%O", orderDetail);
                        var p1 = (2 * (orderDetail.depth * orderDetail.length));
                        var p2 = (2 * (orderDetail.width * orderDetail.depth));
                        var p3 = (orderDetail.width * orderDetail.length);
                        basicArea = p1 + p2;
                        backArea = p3;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt;
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
                        orderDetail.productCode = productCode;
                        console.log("Std Material Price :%O", orderDetail.stdMaterialPrice);
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        console.log("Area Price :%O", basicAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("Back Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = ((profilePrice + basicAreaPrice + backAreaPrice + shelfPrice + hardwarePrice) * orderDetail.quantity);
                        orderDetail.unitPrice = finalPrice;
                        console.log("Total Area Regular :%O", totalArea);
                        console.log("Total Price Regular :%O", orderDetail.unitPrice);
                        //////////////New Ends/////////////////////
                    }

                } else if (orderDetail.nonStandardDimension === true) {
                    console.log("Non Standard Dimesion");
                    if (orderDetail.sideMatching === "O") {
                        console.log("OSM Carcass");
                        if (orderDetail.sideSelection === "LSM" || orderDetail.sideSelection === "RSM") {
                            if (orderDetail.sideSelection === "LSM") {
                                orderDetail.sideVisibility = "L";
                            } else if (orderDetail.sideSelection === "RSM") {
                                orderDetail.sideVisibility = "R";
                            }
                            console.log("Order Detail NST Side Visibility OSM LR :%O", orderDetail.sideVisibility);
                            var p1 = (orderDetail.depth * orderDetail.length);
                            var p2 = (2 * (orderDetail.width * orderDetail.depth));
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2;
                            extraArea = p1;
                            backArea = p3;
                            shelfArea = (orderDetail.width * orderDetail.depth);
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            backSqMt = backArea / 1000000;
                            shelfSqMt = shelfArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                            console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                            if (orderDetail.shelf === true) {
                                if (orderDetail.sectionProfileId === undefined) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === null) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === "") {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                }
                            } else {
                                if (orderDetail.sectionProfileId === undefined) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === null) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === "") {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                }
                            }
//                            var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                            orderDetail.productCode = productCode;
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            if (orderDetail.sectionProfilePrice !== undefined) {
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            ///////////Hardware Price///////////////////
                            if (orderDetail.component === "WC") {
                                var hardwarePrice = 172;
                            } else if (orderDetail.component === "BC") {
                                var hardwarePrice = 263;
                            } else if (orderDetail.component === "TU") {
                                var hardwarePrice = 367;
                            }
                            ////////////////////////////////////////////
                            if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                                var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                                var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                            } else {
                                var shelfPrice = 0;
                            }
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            console.log("Back Panel Price :%O", backAreaPrice);
                            console.log("Profile Price :%O", profilePrice);
                            console.log("Shelf Price :%O", shelfPrice);
                            console.log("Hardware Price :%O", hardwarePrice);
                            orderDetail.profilePrice = profilePrice;
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                            orderDetail.unitPrice = finalPrice;
                            console.log("Total Area OSM Left/Right :%O", totalArea);
                            console.log("Total Area OSM Left/Right Price:%O", orderDetail.unitPrice);
                        } else if (orderDetail.sideSelection === "TSM" || orderDetail.sideSelection === "BSM") {
                            if (orderDetail.sideSelection === "TSM") {
                                orderDetail.sideVisibility = "T";
                            } else if (orderDetail.sideSelection === "BSM") {
                                orderDetail.sideVisibility = "B";
                            }
                            console.log("Order Detail NST Side Visibility OSM TB :%O", orderDetail.sideVisibility);
                            var p1 = (2 * (orderDetail.depth * orderDetail.length));
                            var p2 = (orderDetail.width * orderDetail.depth);
                            var p3 = (orderDetail.width * orderDetail.length);
                            basicArea = p1 + p2;
                            extraArea = p2;
                            backArea = p3;
                            shelfArea = (orderDetail.width * orderDetail.depth);
                            basicSqMt = basicArea / 1000000;
                            extraSqMt = extraArea / 1000000;
                            backSqMt = backArea / 1000000;
                            shelfSqMt = shelfArea / 1000000;
                            totalArea = basicSqMt + extraSqMt;
                            var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                            var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                            var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                            console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                            if (orderDetail.shelf === true) {
                                if (orderDetail.sectionProfileId === undefined) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === null) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === "") {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                } else {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                                }
                            } else {
                                if (orderDetail.sectionProfileId === undefined) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === null) {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else if (orderDetail.sectionProfileId === "") {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                } else {
                                    var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "O" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                                }
                            }
                            orderDetail.productCode = productCode;
                            if (orderDetail.sectionDirection === 'HORIZONTAL') {
                                profileArea = orderDetail.width / 1000;
                            } else if (orderDetail.sectionDirection === 'VERTICAL') {
                                profileArea = orderDetail.length / 1000;
                            } else {

                            }
                            if (orderDetail.sectionProfilePrice !== undefined) {
                                var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                            } else {
                                var profilePrice = 0;
                            }
                            ///////////Hardware Price///////////////////
                            if (orderDetail.component === "WC") {
                                var hardwarePrice = 172;
                            } else if (orderDetail.component === "BC") {
                                var hardwarePrice = 263;
                            } else if (orderDetail.component === "TU") {
                                var hardwarePrice = 367;
                            }
                            ////////////////////////////////////////////
                            if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                                var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                                var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                            } else {
                                var shelfPrice = 0;
                            }
                            console.log("B Price :%O", basicAreaPrice);
                            console.log("E Price :%O", extraAreaPrice);
                            console.log("Back Area Price :%O", backAreaPrice);
                            console.log("Shelf Price :%O", shelfPrice);
                            console.log("Profile Price :%O", profilePrice);
                            console.log("Hardware Price :%O", hardwarePrice);
                            orderDetail.profilePrice = profilePrice;
                            var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                            orderDetail.unitPrice = finalPrice;
                            console.log("Total ARea OSM TOP/Bottom :%O", totalArea);
                            console.log("Total Area OSM Top/Bottom Price:%O", orderDetail.unitPrice);
                        }
                    } else if (orderDetail.sideMatching === "B") {
                        console.log("Both Matching Carcass");
                        orderDetail.sideVisibility = "Z";
                        console.log("NST Both Side Carcass SV:" + orderDetail.sideVisibility);
                        var p1 = (2 * (orderDetail.width * orderDetail.depth));
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        basicArea = p1;
                        extraArea = p3;
                        backArea = p2;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "B" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Back Panel Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Area Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("Total Area BSM Left & Right", totalArea);
                        console.log("Total Price BSM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "T") {
                        console.log("Three Side Matching");
                        if (orderDetail.sideSelection === "LRTSM") {
                            orderDetail.sideVisibility = "Y";
                        } else if (orderDetail.sideSelection === "LRBSM") {
                            orderDetail.sideVisibility = "W";
                        }
                        console.log("Order Detail NST Side Visibility TSM :%O", orderDetail.sideVisibility);
                        var p1 = (orderDetail.width * orderDetail.depth);
                        var p2 = (orderDetail.width * orderDetail.length);
                        var p3 = (2 * (orderDetail.depth * orderDetail.length));
                        var p4 = (orderDetail.width * orderDetail.depth);
                        basicArea = p1;
                        extraArea = p3 + p4;
                        backArea = p2;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        backSqMt = backArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "T" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Back Area Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + backAreaPrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("Three Side Matching Area :%O", totalArea);
                        console.log("Total Price TSM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "A") {
                        console.log("All Side Matching");
                        orderDetail.sideVisibility = "A";
                        console.log("NST All Side Carcass SV:" + orderDetail.sideVisibility);
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1;
                        extraArea = p2 + p3;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        extraSqMt = extraArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt + extraSqMt;
                        var basicAreaPrice = (basicSqMt * orderDetail.backPanelPrice);
                        var extraAreaPrice = (extraSqMt * orderDetail.finishPrice);
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
//                        var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "18" + orderDetail.material + "A" + orderDetail.sideFinish + "-" + l1 + "" + w1 + "18" + d1;
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("E Price :%O", extraAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + extraAreaPrice + profilePrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("All Side Matching Area :%O", totalArea);
                        console.log("Total Price ASM :%O", orderDetail.unitPrice);
                    } else if (orderDetail.sideMatching === "F") {
                        console.log("Full Side Matching");
                        orderDetail.sideVisibility = "F";
                        console.log("NST Full Side Carcass SV:" + orderDetail.sideVisibility);
                        var p1 = (orderDetail.width * orderDetail.length);
                        var p2 = (2 * (orderDetail.depth * orderDetail.length));
                        var p3 = (2 * (orderDetail.width * orderDetail.depth));
                        basicArea = p1 + p2 + p3;
                        basicSqMt = basicArea / 1000000;
                        var basicAreaPrice = basicSqMt * orderDetail.finishPrice;
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "S-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "F" + orderDetail.sideFinish + "X-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
                        orderDetail.productCode = productCode;
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("Baisc Area Price :%O", basicAreaPrice);
                        console.log("Profile Baisc Price :%O", profilePrice);
                        console.log("SHelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = (orderDetail.quantity * (basicAreaPrice + profilePrice + shelfPrice + hardwarePrice));
                        orderDetail.unitPrice = finalPrice;
                        console.log("FInal Price Full SIde Matching:%O", orderDetail.unitPrice);
                    } else {
                        console.log("Regular");
                        orderDetail.sideVisibility = "X";
                        console.log("NST No Side Matching :" + orderDetail.sideVisibility);
                        console.log("Order Details :%O", orderDetail);
                        var p1 = (2 * (orderDetail.depth * orderDetail.length));
                        var p2 = (2 * (orderDetail.width * orderDetail.depth));
                        var p3 = (orderDetail.width * orderDetail.length);
                        basicArea = p1 + p2;
                        backArea = p3;
                        shelfArea = (orderDetail.width * orderDetail.depth);
                        basicSqMt = basicArea / 1000000;
                        backSqMt = backArea / 1000000;
                        shelfSqMt = shelfArea / 1000000;
                        totalArea = basicSqMt;
                        console.log("Section Profile Id :" + orderDetail.sectionProfileId);
                        if (orderDetail.shelf === true) {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXS-" + l1 + "" + w1 + "18" + d1;
                            }
                        } else {
                            if (orderDetail.sectionProfileId === undefined) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === null) {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                            } else if (orderDetail.sectionProfileId === "") {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "X" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                            } else {
                                var productCode = orderDetail.component + "" + orderDetail.carcassSubType + "" + orderDetail.sectionProfileId + "" + orderDetail.sideVisibility + "18" + orderDetail.material + "XXXXX-" + l1 + "" + w1 + "18" + d1;
                            }
                        }
                        orderDetail.productCode = productCode;
                        console.log("Std Material Price :%O", orderDetail.stdMaterialPrice);
                        var basicAreaPrice = (basicSqMt * orderDetail.stdMaterialPrice);
                        var backAreaPrice = (backSqMt * orderDetail.backPanelPrice);
                        console.log("Area Price :%O", basicAreaPrice);
                        if (orderDetail.sectionDirection === 'HORIZONTAL') {
                            profileArea = orderDetail.width / 1000;
                        } else if (orderDetail.sectionDirection === 'VERTICAL') {
                            profileArea = orderDetail.length / 1000;
                        } else {

                        }
                        console.log("Profile Area :%O", profileArea);
                        if (orderDetail.sectionProfilePrice !== undefined) {
                            console.log("Profile Basic Price :%O", orderDetail.sectionProfilePrice);
                            var profilePrice = profileArea * orderDetail.sectionProfilePrice;
                        } else {
                            var profilePrice = 0;
                        }
                        ///////////Hardware Price///////////////////
                        if (orderDetail.component === "WC") {
                            var hardwarePrice = 172;
                        } else if (orderDetail.component === "BC") {
                            var hardwarePrice = 263;
                        } else if (orderDetail.component === "TU") {
                            var hardwarePrice = 367;
                        }
                        ////////////////////////////////////////////
                        if (orderDetail.shelfCount !== 0 && orderDetail.shelfCount !== undefined) {
                            console.log("Shelf Count :%O", orderDetail.shelfCount);
                            var finalShArea = (orderDetail.shelfCount * shelfSqMt);
                            var shelfPrice = finalShArea * orderDetail.stdMaterialPrice;
                        } else {
                            var shelfPrice = 0;
                        }
                        console.log("B Price :%O", basicAreaPrice);
                        console.log("Back Price :%O", backAreaPrice);
                        console.log("Profile Price :%O", profilePrice);
                        console.log("Shelf Price :%O", shelfPrice);
                        console.log("Hardware Price :%O", hardwarePrice);
                        orderDetail.profilePrice = profilePrice;
                        var finalPrice = ((profilePrice + basicAreaPrice + backAreaPrice + shelfPrice + hardwarePrice) * orderDetail.quantity);
                        orderDetail.unitPrice = finalPrice;
                        console.log("Total Area Regular :%O", totalArea);
                        console.log("Total Price Regular :%O", orderDetail.unitPrice);
                    }
                } else {
                    alert("Some Exception Happening, Please try again.");
                }
                console.log("Main Order Detail :%O", orderDetail);
                $scope.applyCarcassDiscount = function (orderDetail) {
                    RateContractDetailService.findByCarcassMaterialThickness({
                        'material': orderDetail.material,
                        'thickness': 18,
                        'rateContractId': orderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        if (orderDetail.sectionProfileId === '') {
                            orderDetail.sectionProfileId = null;
                        }

                        orderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((orderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        console.log("Order Head :%O", $scope.orderHead);
                        if ($scope.orderHead.orderSubType === "D") {
                            console.log("Display Order");
                            var preliminaryDealerPrice = (orderDetail.unitPrice - discountPrice);
                            var displayDiscountPrice = ((preliminaryDealerPrice / 100) * orderDetail.displayDiscount);
                            orderDetail.price = (preliminaryDealerPrice - displayDiscountPrice);
                            CarcassOrderDetailsService.save(orderDetail, function (carcassOrderDetail) {
                                console.log("Getting Carcass Order Detail Id :%O", carcassOrderDetail);
                                console.log("Saved Successfully");
                                $scope.editableCarcassDetail = "";
                                $scope.carcassName = "";
                                $scope.intColorName = "";
                                $scope.leftColorName = "";
                                $scope.rightColorName = "";
                                $scope.backColorName = "";
                                $scope.topColorName = "";
                                $scope.bottomColorName = "";
                                $state.go('admin.masters_order_details.carcass_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'carcassDetailId': carcassOrderDetail.id
                                }, {'reload': true});
                            });
                        } else {
                            if (orderDetail.grainDirection === '') {
                                orderDetail.grainDirection = null;
                            }
                            orderDetail.price = (orderDetail.unitPrice - discountPrice);
                            CarcassOrderDetailsService.save(orderDetail, function (carcassOrderDetail) {
                                console.log("Carcass Order Detail :%O", carcassOrderDetail);
                                console.log("Saved Successfully");
                                $scope.editableCarcassDetail = "";
                                $scope.carcassName = "";
                                $scope.intColorName = "";
                                $scope.leftColorName = "";
                                $scope.rightColorName = "";
                                $scope.backColorName = "";
                                $scope.topColorName = "";
                                $scope.bottomColorName = "";
                                $state.go('admin.masters_order_details.carcass_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'carcassDetailId': carcassOrderDetail.id
                                }, {'reload': true});
                            });
                        }
                    });
                };
                console.log("FInal Save :%O", orderDetail);
                $scope.applyCarcassDiscount(orderDetail);
            };
        })
        .controller('PanelRepeatAdditionController', function (PanelMaterialThicknessService, RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, PanelOrderDetailsService, $scope, $stateParams, $state) {
            console.log("Inside Panel Addition");
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
            });
            if ($stateParams.panelDetailId === undefined) {
                $scope.editablePanelDetail = {};
            } else {
                $scope.editablePanelDetail = {};
                PanelOrderDetailsService.get({
                    'id': $stateParams.panelDetailId
                }, function (panelOrderDetailObject) {
                    console.log("Panel Order Detail Object :%O", panelOrderDetailObject);
                    panelOrderDetailObject.id = '';
                    panelOrderDetailObject.productCode = '';
                    panelOrderDetailObject.component = panelOrderDetailObject.component.toString();
                    panelOrderDetailObject.thickness = panelOrderDetailObject.thickness.toString();
                    ColorService.get({
                        'id': panelOrderDetailObject.colorId
                    }, function (colorObject) {
                        panelOrderDetailObject.colorCode = colorObject.colorCode;
                        panelOrderDetailObject.colorId = colorObject.id;
                        $scope.panelColorName = colorObject.colorName;
                    });
                    $scope.editablePanelDetail = panelOrderDetailObject;
                });
            }

            ////////////Panel Form Functionality///////////////////
            KitchenComponentService.findByCategory({
                'category': 'PANEL '
            }, function (panelList) {
                console.log("Panel List :%O", panelList);
                $scope.panelList1 = panelList;
            });
            RawMaterialService.findAllList(function (rmList) {
                $scope.rawMaterialsList = rmList;
            });
            $scope.openPanel = function () {
                KitchenComponentService.findByCategory({
                    'category': 'PANEL '
                }, function (panelList) {
                    console.log("Panel List :%O", panelList);
                    $scope.panelList1 = panelList;
                });
            };
            $scope.closeWidget = function () {
                $scope.showPanelColorSelectionWidget = false;
                $scope.prePanelColor = {};
            };
            $scope.showPanelColorSelectionWidget = false;
            $scope.openPanelColorWidget = function () {
                $scope.showPanelColorSelectionWidget = true;
            };
            $scope.selectPanelColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editablePanelDetail.colorCode = colorCode;
                $scope.editablePanelDetail.colorId = colorId;
                $scope.panelColorName = colorName;
            };
            $scope.selectPrePanelColor = function (colorId) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.prePanelColor = colorObject;
                });
            };
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editablePanelDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editablePanelDetail.material', function (material) {
                console.log("Material :%O", material);
                $scope.panelColorName = "";
                $scope.editablePanelDetail.colorId = "";
                $scope.editablePanelDetail.thickness = "";
                ColorConstraintService.findByComponentMaterialCode({
                    'component': 'CARCASE',
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.sortedColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.sortedColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.sortedColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.sortedColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.sortedColorList1 = [];
                    }
                });
                PanelMaterialThicknessService.findByMaterial({
                    'material': material
                }, function (panelThicknessObject) {
                    console.log("Panel Thickness Object :%O", panelThicknessObject);
                    $scope.panelThicknessList = panelThicknessObject;
                });
            });
            $scope.$watch('editablePanelDetail.thickness', function (thickness) {
                console.log("Material :%O", $scope.editablePanelDetail.material);
                console.log("Thickness :%O", thickness);
                var material = $scope.editablePanelDetail.material;
                PanelMaterialThicknessService.findByMaterialAndThickness({
                    'material': material,
                    'thickness': thickness
                }, function (panelThicknessPrice) {
                    $scope.editablePanelDetail.materialPrice = panelThicknessPrice.price;
                    console.log("Price :%O", $scope.editablePanelDetail.materialPrice);
                });
            });
            ///////////////////////////////////////////////////////////////////
            $scope.savePanelDetails = function (panelOrderDetail) {
//                panelOrderDetail.component = $scope.panelComponent;
                $scope.applyPanelDiscount = function (panelOrderDetail) {
                    RateContractDetailService.findByPanelMaterialThickness({
                        'material': panelOrderDetail.material,
                        'thickness': panelOrderDetail.thickness,
                        'rateContractId': panelOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        panelOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((panelOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        $scope.orderHead.orderSubType = "";
                        if ($scope.orderHead.orderSubType === "D") {
                            console.log("Display Order");
                            var preliminaryDealerPrice = (panelOrderDetail.unitPrice - discountPrice);
                            var displayDiscountPrice = ((preliminaryDealerPrice / 100) * panelOrderDetail.displayDiscount);
                            panelOrderDetail.price = (preliminaryDealerPrice - displayDiscountPrice);
                            console.log("Panle Order Detail Save Object :%O", panelOrderDetail);
                            PanelOrderDetailsService.save(panelOrderDetail, function (panelOrderDetail) {
                                console.log("Saved Successfully");
                                $scope.editablePanelDetail = "";
                                $scope.panelName = "";
                                $state.go('admin.masters_order_details.panel_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'panelDetailId': panelOrderDetail.id
                                }, {'reload': true});
                            });
                        } else {
                            panelOrderDetail.price = (panelOrderDetail.unitPrice - discountPrice);
                            console.log("Panle Order Detail Save Object :%O", panelOrderDetail);
                            PanelOrderDetailsService.save(panelOrderDetail, function (panelOrderDetail) {
                                console.log("Saved Successfully");
                                $scope.editablePanelDetail = "";
                                $scope.panelName = "";
                                $state.go('admin.masters_order_details.panel_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'panelDetailId': panelOrderDetail.id
                                }, {'reload': true});
                            });
                        }
                    });
                };
                panelOrderDetail.depth = '0';
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (panelOrderDetail.length < 1000) {
                    if (panelOrderDetail.length < 100) {
                        lengthLessThan100(panelOrderDetail.length);
                    } else {
                        l1 = 0 + panelOrderDetail.length.toString();
                    }
                } else {
                    l1 = panelOrderDetail.length.toString();
                }
                if (panelOrderDetail.width < 1000) {
                    if (panelOrderDetail.width < 100) {
                        widthLessThan100(panelOrderDetail.width);
                    } else {
                        w1 = 0 + panelOrderDetail.width.toString();
                    }
                } else {
                    w1 = panelOrderDetail.width.toString();
                }

                var productCode = panelOrderDetail.component + "" + Math.round(panelOrderDetail.thickness) + "" + panelOrderDetail.material + "XXXX-" + l1 + "" + w1 + "" + Math.round(panelOrderDetail.thickness) + "000";
                panelOrderDetail.productCode = productCode;
                panelOrderDetail.orderHeadId = $stateParams.orderHeadId;
                var basicArea = (panelOrderDetail.width * panelOrderDetail.length);
                var basicAreaSqMt = basicArea / 1000000;
                panelOrderDetail.unitPrice = (panelOrderDetail.quantity * (basicAreaSqMt * panelOrderDetail.materialPrice));
                console.log("Panel Details :%O", panelOrderDetail);
                $scope.applyPanelDiscount(panelOrderDetail);
            };
        })
        .controller('ShutterRepeatAdditionController', function (ShutterComponentMappingService, ShutterOrderDetailsService, HandlePriceService, ShutterFinishPriceService, ShutterHandleMappingService, RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, PanelOrderDetailsService, $scope, $stateParams, $state) {
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
            });
            if ($stateParams.shutterDetailId === undefined) {
                $scope.editableShutterDetail = {};
            } else {
                $scope.editableShutterDetail = {};
                ShutterOrderDetailsService.get({
                    'id': $stateParams.shutterDetailId
                }, function (shutterOrderDetailObject) {
                    console.log("Shutter Order Detail Object :%O", shutterOrderDetailObject);
                    shutterOrderDetailObject.id = '';
                    shutterOrderDetailObject.productCode = '';
                    shutterOrderDetailObject.finishCategory = shutterOrderDetailObject.shutterFinishCategory;
                    shutterOrderDetailObject.thickness = shutterOrderDetailObject.thickness.toString();
//                    $scope.editableShutterDetail.handleLength = shutterOrderDetailObject.handleLength.toString();
//                    $scope.editableShutterDetail.handleFinish = shutterOrderDetailObject.handleFinish;
                    ColorService.get({
                        'id': shutterOrderDetailObject.colorId
                    }, function (shutterColorobject) {
                        shutterOrderDetailObject.colorCode = shutterColorobject.colorCode;
                        shutterOrderDetailObject.colorId = shutterColorobject.id;
                        $scope.shutterColorName = shutterColorobject.colorName;
                    });
                    if (shutterOrderDetailObject.intColorId !== null) {
                        ColorService.get({
                            'id': shutterOrderDetailObject.intColorId
                        }, function (shutterInternalColorobject) {
                            shutterOrderDetailObject.intColorCode = shutterInternalColorobject.colorCode;
                            shutterOrderDetailObject.intColorId = shutterInternalColorobject.id;
                            $scope.shutterInternalColorName = shutterInternalColorobject.colorName;
                        });
                    }
                    if (shutterOrderDetailObject.handle !== null) {
                        KitchenComponentService.findByComponentCode({
                            'componentCode': shutterOrderDetailObject.handle
                        }, function (kitchenComponentObject) {
                            console.log("KC Object in Shutter  :%O", kitchenComponentObject);
                            $scope.shutterHandleName = kitchenComponentObject.component;
                            $scope.shutterHandleComponent = kitchenComponentObject.componentCode;
                            $scope.editableShutterDetail.handle = kitchenComponentObject.componentCode;
                        });
                    }
                    $scope.$watch('shutterHandleName', function (handleName) {
                        console.log("Handle Name:%O", handleName);
                        $("#shutterHandleLength").attr({
                            'required': required
                        });
                    });
                    if (shutterOrderDetailObject.grain === "NO_GRAIN") {
                        shutterOrderDetailObject.grain = '';
                    }
                    if (shutterOrderDetailObject.hingePosition === "NO_HINGE") {
                        shutterOrderDetailObject.hingePosition = '';
                    }
                    if (shutterOrderDetailObject.glass === "NO_GLASS") {
                        shutterOrderDetailObject.glass = '';
                    }
                    KitchenComponentService.findByComponentCode({
                        'componentCode': shutterOrderDetailObject.component
                    }, function (kitchenComponentObject) {
                        console.log("KC Object in Shutter  :%O", kitchenComponentObject);
                        $scope.shutterName = kitchenComponentObject.component;
                        $scope.shutterComponent = kitchenComponentObject.componentCode;
                    });
//                    ColorService.get({
//                        'id': shutterOrderDetailObject.colorId
//                    }, function (colorObject) {
//                        shutterOrderDetailObject.colorCode = colorObject.colorCode;
//                        shutterOrderDetailObject.colorId = colorObject.id;
//                        $scope.panelColorName = colorObject.colorName;
//                    });
                    $scope.editableShutterDetail = shutterOrderDetailObject;
                });
            }
            ///////////////////////Shutter Form Functionality//////////////////
            $scope.closeWidget = function () {
                $scope.showShutterColorSelectionWidget = false;
                $scope.showShutterHandleSelectionWidget = false;
                $scope.showShutterInternalColorSelectionWidget = false;
                $scope.showShutterSelectionWidget = false;
                $scope.preShutter = {};
                $scope.preShutterColor = {};
                $scope.preInternalShutterColor = {};
                $scope.preShutterHandle = {};
            };
            $scope.showShutterColorSelectionWidget = false;
            $scope.showShutterHandleSelectionWidget = false;
            $scope.showShutterInternalColorSelectionWidget = false;
            $scope.editableShutterDetail.bsm = false;
            $scope.shutterModelSelection = false;
            $scope.shutterGlassWidget = false;
            $scope.openShutter = function () {
                console.log("Getting Shutter FInish :%O", $scope.editableShutterDetail.finish);
                $scope.shutterList1 = [];
                ShutterComponentMappingService.findByFinishCode({
                    'finishCode': $scope.editableShutterDetail.finish
                }, function (componentList) {
                    console.log("Component List :%O", componentList);
                    angular.forEach(componentList.shutters, function (componentId) {
                        KitchenComponentService.get({
                            'id': componentId
                        }, function (shutterObject) {
                            $scope.shutterList1.push(shutterObject);
                        });
                    });
                });
                $scope.showShutterSelectionWidget = true;
            };
            $scope.openShutterColorWidget = function () {
                $scope.showShutterColorSelectionWidget = true;
            };
            $scope.openInternalShutterColorWidget = function () {
                $scope.showShutterInternalColorSelectionWidget = true;
            };
            $scope.selectInternalShutterColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableShutterDetail.intColorCode = colorCode;
                $scope.editableShutterDetail.intColorId = colorId;
                console.log("Int COlor :%O", $scope.editableShutterDetail.intColorId);
                $scope.shutterInternalColorName = colorName;
            };
            $scope.selectPreInternalShutterColor = function (colorId, colorName, colorCode) {
                console.log("Color ID :%O", colorId);
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    console.log("Color Object :%O", colorObject);
                    $scope.preInternalShutterColor = colorObject;
                });
            };
            $scope.shutterHandleList1 = [];
            $scope.openShutterHandle = function () {
                console.log("Finish in Handle Selection :%O", $scope.editableShutterDetail.finish);
                console.log("Shutter COmponent :%O", $scope.shutterComponent);
                if ($scope.shutterComponent !== undefined && $scope.shutterComponent !== '') {
//                if ($scope.editableShutterDetail.shutterComponent !== '' && $scope.editableShutterDetail.shutterComponent !== undefined) {
                    console.log("Component Available");
                    ShutterHandleMappingService.findByShutterCode({
                        'shutterCode': $scope.shutterComponent
                    }, function (mappingList) {
                        console.log("Mapping List :%O", mappingList);
                        angular.forEach(mappingList.handles, function (kitchenComponentId) {
                            KitchenComponentService.get({
                                'id': kitchenComponentId
                            }, function (kcObject) {
                                $scope.shutterHandleList1.push(kcObject);
                            });
                        });
                    });
                } else {
                    ShutterHandleMappingService.findByFinishCode({
                        'finishCode': $scope.editableShutterDetail.finish
                    }, function (mappingList) {
                        console.log("Mapping List :%O", mappingList);
                        angular.forEach(mappingList.handles, function (kitchenComponentId) {
                            KitchenComponentService.get({
                                'id': kitchenComponentId
                            }, function (kcObject) {
                                console.log("KC Object :%O", kcObject);
                                $scope.shutterHandleList1.push(kcObject);
                                console.log("Shutter Handloe List :%O", $scope.shutterHandleList1);
                            });
                        });
                    });
                }

                $scope.showShutterHandleSelectionWidget = true;
            };
            $scope.selectShutter = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.shutterName = kcObject.component;
                    $scope.shutterComponent = kcObject.componentCode;
                });
            };
            $scope.selectPreShutter = function (componentId) {
                KitchenComponentService.get({
                    'id': componentId
                }, function (shutterComponent) {
                    $scope.preShutter = shutterComponent;
                });
            };
            $scope.selectPreShutterHandle = function (componentId) {
                KitchenComponentService.get({
                    'id': componentId
                }, function (shutterHandleComponent) {
                    $scope.preShutterHandle = shutterHandleComponent;
                });
            };
            $scope.selectShutterHandle = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $("#shutterHandleLength").attr('required', true);
                    $scope.shutterHandleName = kcObject.component;
                    $scope.shutterHandleComponent = kcObject.componentCode;
                    $scope.editableShutterDetail.handle = kcObject.componentCode;
                });
            };
            $scope.selectShutterColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableShutterDetail.colorCode = colorCode;
                $scope.editableShutterDetail.colorId = colorId;
                $scope.shutterColorName = colorName;
            };
            $scope.selectPreShutterColor = function (colorId, colorName, colorCode) {
                console.log("Color ID :%O", colorId);
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    console.log("Color Object :%O", colorObject);
                    $scope.preShutterColor = colorObject;
                });
            };
            $scope.shutterFinishList = [];
            $scope.$watch('editableShutterDetail.finishCategory', function (finishCategory) {
                console.log("Finish Category :%O", finishCategory);
                $scope.shutterFinishList = [];
                ShutterFinishPriceService.findUniqueFinishWithCategory({
                    'finishCategory': finishCategory
                }, function (finishList) {
                    console.log("Finish List :%O", finishList);
                    angular.forEach(finishList, function (finishCode) {
                        FinishPriceService.findByFinishCode({
                            'finishCode': finishCode
                        }, function (finishObject) {
                            $scope.shutterFinishList.push(finishObject);
                        });
                    });
                    console.log("Shutter Finish List :%O", $scope.shutterFinishList);
                });

            });
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editableShutterDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editableShutterDetail.material', function (material) {
                console.log("Side Material :%O", material);
                $scope.shutterInternalColorName = "";
                $scope.editableShutterDetail.intColorId = "";
                ColorConstraintService.findByComponentMaterialCode({
                    'component': 'CARCASE',
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.shutterInternalColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.shutterInternalColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.shutterInternalColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.shutterInternalColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.shutterInternalColorList1 = [];
                    }
                });
            });
            $scope.$watch('editableShutterDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                $scope.editableShutterDetail.thickness = '';
                if (finishName === "XXW") {
                    console.log("AL Finish");
                    $scope.alFinish = true;
                    $scope.hideVentilition = true;
                } else if (finishName === "XXX") {
                    console.log("AL Finish");
                    $scope.alFinish = true;
                    $scope.hideVentilition = true;
                } else if (finishName === "XXY") {
                    console.log("AL Finish");
                    $scope.alFinish = true;
                    $scope.hideVentilition = true;
                } else if (finishName === "XXZ") {
                    console.log("AL Finish");
                    $scope.alFinish = true;
                    $scope.hideVentilition = true;
                } else if (finishName === "XAA") {
                    console.log("AL Finish");
                    $scope.alFinish = true;
                    $scope.hideVentilition = true;
                } else {
                    console.log("Normal Finish");
                    $scope.alFinish = false;
                    $scope.hideVentilition = false;
                }
                $scope.shutterHandleList1 = [];
                $scope.shutterHandleName = '';
                $scope.editableShutterDetail.handleLength = '';
                $scope.editableShutterDetail.shutterHandleType = '';
                $scope.editableShutterDetail.handleFinish = '';
                $scope.editableShutterDetail.handleLength = '';
                $scope.editableShutterDetail.handlePrice = '';
                $scope.editableShutterDetail.handle = '';
                $scope.shutterFinishCode = finishName;
                ShutterFinishPriceService.findByFinish({
                    'finish': finishName
                }, function (shutterFinishThicknessList) {
                    $scope.shutterThicknessList = shutterFinishThicknessList;
                });
                FinishPriceService.findByFinishCode({
                    'finishCode': finishName
                }, function (finishObject) {
                    console.log("Finish Object :%O", finishObject);
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (shutterMaterialObject) {
                        console.log("Shutter Material :%O", shutterMaterialObject);
                        $scope.shutterMaterialObject = shutterMaterialObject;
                        $scope.editableShutterDetail.material = shutterMaterialObject.materialCode;
                    });
                    if (finishObject.category === "PU" || finishObject.category === "MEMBRANE") {
                        $scope.showShutterBsm = true;
                    } else {
                        $scope.showShutterBsm = false;
                    }
                    if (finishObject.category === "MEMBRANE") {
                        console.log("Membrane Shutter");
                        if ($scope.editableShutterDetail.material === "MF") {
                            $("#shutterLength").attr({
                                'min': 50,
                                'max': 2400
                            });
                            $("#shutterWidth").attr({
                                'min': 50,
                                'max': 1100
                            });
                        } else {
                            $("#shutterLength").attr({
                                'min': 50,
                                'max': 2400
                            });
                            $("#shutterWidth").attr({
                                'min': 50,
                                'max': 1100
                            });
                        }

                        $scope.shutterModelSelection = true;
                        $scope.shutterGlassWidget = true;
                    } else if (finishObject.category === "PU") {
                        $("#shutterLength").attr({
                            'min': 50,
                            'max': 2400
                        });
                        $("#shutterWidth").attr({
                            'min': 50,
                            'max': 1100
                        });
                        $scope.shutterModelSelection = false;
                        $scope.shutterGlassWidget = true;
                        $scope.showGlassStep = false;
                        $scope.editableShutterDetail.component = '';
                        $scope.shutterName = '';
                    } else {

                        if (finishName === "XXH") {
                            $("#shutterLength").attr({
                                'min': 50,
                                'max': 2400
                            });
                            $("#shutterWidth").attr({
                                'min': 50,
                                'max': 1100
                            });
                            $scope.shutterModelSelection = false;
                            $scope.shutterGlassWidget = true;
                            $scope.showGlassStep = false;
                            $scope.editableShutterDetail.component = '';
                            $scope.shutterName = '';
                        } else if (finishName === "XXG") {
                            $("#shutterLength").attr({
                                'min': 50,
                                'max': 2400
                            });
                            $("#shutterWidth").attr({
                                'min': 50,
                                'max': 1100
                            });
                            $scope.shutterModelSelection = false;
                            $scope.shutterGlassWidget = true;
                            $scope.showGlassStep = false;
                            $scope.editableShutterDetail.component = '';
                            $scope.shutterName = '';
                        } else {
                            $("#shutterLength").attr({
                                'min': 50,
                                'max': 2400
                            });
                            $("#shutterWidth").attr({
                                'min': 50,
                                'max': 1100
                            });
                            $scope.shutterModelSelection = false;
                            $scope.shutterGlassWidget = false;
                            $scope.showGlassStep = false;
                            $scope.editableShutterDetail.component = '';
                            $scope.shutterName = '';
                        }
                    }
                });
                $scope.showGlassStep = false;
                $scope.$watch('editableShutterDetail.glass', function (glassType) {
                    console.log("Glass Type :%O", glassType);
                    if (glassType === "REGULAR_GLASS") {
                        $scope.showGlassStep = true;
                        $scope.hideVentilition = true;
                    } else if (glassType === "MESH_GLASS") {
                        $scope.showGlassStep = false;
                        $scope.hideVentilition = true;
                    } else if (glassType === undefined) {
                        $scope.showGlassStep = false;
                    } else if (glassType === '') {
                        $scope.showGlassStep = false;
                        $scope.hideVentilition = false;
                    }
                });
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.shutterColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.shutterColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.shutterColors1 = [];
                    } else if (response.status === 404) {
                        $scope.shutterColors1 = [];
                    } else if (response.status === 400) {
                        $scope.shutterColors1 = [];
                    }
                });
            });
            $scope.$watch('editableShutterDetail.thickness', function (thickness) {
                ShutterFinishPriceService.findByFinishThickness({
                    'finish': $scope.shutterFinishCode,
                    'thickness': thickness
                }, function (ShutterFinishPrice) {
                    console.log("Shutter Finish Price :%O", ShutterFinishPrice);
                    $scope.editableShutterDetail.stdOneSidePrice = ShutterFinishPrice.oneSidePrice;
                    $scope.editableShutterDetail.stdBothSidePrice = ShutterFinishPrice.bothSidePrice;
                });
            });
            $scope.$watch('shutterHandleName', function (handle) {
                console.log("Handle :%O", handle);
                console.log("Handle Component :%O", $scope.shutterHandleComponent);
                $scope.showShutterCD1 = false;
                $scope.showShutterCD2 = false;
                if ($scope.shutterHandleComponent === "HANDEP01") {
                    $scope.showShutterCD2 = true;
                    $scope.showShutterCD1 = false;
                    $scope.shutterHandlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.shutterHandleComponent
                    }, function (shutterHandlePriceList) {
                        console.log("Handle Price List :%O", shutterHandlePriceList);
                        angular.forEach(shutterHandlePriceList, function (hplObject) {
                            $scope.shutterHandlePriceList.push(hplObject);
                        });
                    });
                } else {
                    $scope.showShutterCD2 = false;
                    $scope.showShutterCD1 = true;
                    $scope.shutterHandlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.shutterHandleComponent
                    }, function (shutterHandlePriceList) {
                        console.log("Handle Price List :%O", shutterHandlePriceList);
                        angular.forEach(shutterHandlePriceList, function (hplObject) {
                            $scope.shutterHandlePriceList.push(hplObject);
                        });
                    });
                }
            });
            $scope.$watch('editableShutterDetail.handleLength', function (cd) {
                console.log("CD :%O", cd);
                angular.forEach($scope.shutterHandlePriceList, function (handlePriceObject) {
                    console.log("Handle Price Object :%O", handlePriceObject.cd);
                    if (handlePriceObject.cd.toString() === cd.toString()) {
                        $scope.mainShutterHandleObject = handlePriceObject;
                        console.log("Got the Object :%O", $scope.mainShutterHandleObject);
                        $scope.editableShutterDetail.handleFinish = $scope.mainShutterHandleObject.finish;
                        $scope.editableShutterDetail.handlePrice = $scope.mainShutterHandleObject.price;
                    } else {
                        console.log("Not My COncern ");
                    }
                });
            });
            $scope.$watch('editableShutterDetail.shutterHandleType', function (handleType) {
                HandlePriceService.get({
                    'id': handleType
                }, function (handlePriceObject) {
                    $scope.editableShutterDetail.handleFinish = handlePriceObject.finish;
                    $scope.editableShutterDetail.handlePrice = handlePriceObject.price;
                });
            });
            $scope.showStraightener = false;
            $scope.editableShutterDetail.straightener = '0';
            $scope.$watch('editableShutterDetail.length', function (length) {
                console.log("Length CHanged :%O", length);
                if (length >= 1800) {
                    console.log("Length > 1800");
                    $scope.showStraightener = true;
                } else {
                    console.log("Length < 1800");
                    $scope.showStraightener = false;
                }
            });

            ///////////////////////////////////////////////////////////////////
            $scope.saveShutterDetails = function (shutterOrderDetail) {
                $scope.applyShutterDiscount = function (shutterOrderDetail, handlePrice, jaliPrice, straightenerPrice) {
                    console.log("Handle Price :%O", handlePrice);
                    console.log("Jali Price :%O", jaliPrice);
                    console.log("Straightener Price :%O", straightenerPrice);

                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': shutterOrderDetail.finish,
                        'material': shutterOrderDetail.material,
                        'thickness': shutterOrderDetail.thickness,
                        'rateContractId': shutterOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        shutterOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((shutterOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        if ($scope.orderHead.orderSubType === "D") {
                            console.log("Display Order");
                            var preliminaryDealerPrice = (shutterOrderDetail.unitPrice - discountPrice);
                            var displayDiscountPrice = ((preliminaryDealerPrice / 100) * shutterOrderDetail.displayDiscount);
                            shutterOrderDetail.price = (preliminaryDealerPrice - displayDiscountPrice);
                            console.log("Shutter Order Detail Save Object :%O", shutterOrderDetail);
                            ShutterOrderDetailsService.save(shutterOrderDetail, function (shutterOrderDetail) {
                                $scope.editableShutterDetail = "";
                                $scope.shutterName = "";
                                $scope.shutterColorName = "";
                                $scope.shutterHandleName = "";
//                                $state.go('admin.masters_order_details', {
//                                    'orderHeadId': $stateParams.orderHeadId
//                                }, {'reload': true});
                                $state.go('admin.masters_order_details.shutter_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'shutterDetailId': shutterOrderDetail.id
                                }, {'reload': true});
                            });
                        } else {
                            console.log("Discount Price :%O", discountPrice);
                            if (shutterOrderDetail.glass === '') {
                                shutterOrderDetail.glass = 'NO_GLASS';
                            }
                            shutterOrderDetail.price = ((shutterOrderDetail.unitPrice - discountPrice) + handlePrice + jaliPrice + straightenerPrice);
                            ShutterOrderDetailsService.save(shutterOrderDetail, function (shutterOrderDetail) {
                                $scope.editableShutterDetail = "";
                                $scope.shutterName = "";
                                $scope.shutterColorName = "";
                                $scope.shutterHandleName = "";
//                                $state.go('admin.masters_order_details', {
//                                    'orderHeadId': $stateParams.orderHeadId
//                                }, {'reload': true});
                                $state.go('admin.masters_order_details.shutter_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'shutterDetailId': shutterOrderDetail.id
                                }, {'reload': true});
                            });
                        }
                    });
                };
                if (shutterOrderDetail.handle === "") {
                    shutterOrderDetail.handle = null;
                    shutterOrderDetail.handleFinish = null;
                    shutterOrderDetail.handleLength = null;
                }
                shutterOrderDetail.orderHeadId = $stateParams.orderHeadId;
                shutterOrderDetail.component = $scope.shutterComponent;
                shutterOrderDetail.depth = '0';
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (shutterOrderDetail.length < 1000) {
                    if (shutterOrderDetail.length < 100) {
                        lengthLessThan100(shutterOrderDetail.length);
                    } else {
                        l1 = 0 + shutterOrderDetail.length.toString();
                    }
                } else {
                    l1 = shutterOrderDetail.length.toString();
                }
                if (shutterOrderDetail.width < 1000) {
                    if (shutterOrderDetail.width < 100) {
                        widthLessThan100(shutterOrderDetail.width);
                    } else {
                        w1 = 0 + shutterOrderDetail.width.toString();
                    }
                } else {
                    w1 = shutterOrderDetail.width.toString();
                }
                if (shutterOrderDetail.component !== undefined) {
                    console.log("Shutter Order Detail Glass :%O", shutterOrderDetail.glass);
                    console.log("Shutter Order Detail:%O", shutterOrderDetail);
                    if (shutterOrderDetail.glass !== "NO_GLASS") {
                        if (shutterOrderDetail.glass === undefined) {
                            console.log("Without Glass");
                            console.log("11111111111111111111111");
                            if (shutterOrderDetail.bsm === true) {
                                console.log("Without Glass with BSM");
                                if (shutterOrderDetail.hingePosition !== undefined) {
                                    shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                                } else if (shutterOrderDetail.hingePosition === undefined) {
                                    shutterOrderDetail.hingeCd = "X";
                                }
                                if (shutterOrderDetail.jali === true) {
                                    shutterOrderDetail.glassCd = "V";
                                } else if (shutterOrderDetail.jali === false) {
                                    shutterOrderDetail.glassCd = "X";
                                } else if (shutterOrderDetail.jali === undefined) {
                                    shutterOrderDetail.glassCd = "X";
                                }
                                if (shutterOrderDetail.handle !== null) {
                                    shutterOrderDetail.handleCd = "H";
                                } else {
                                    shutterOrderDetail.handleCd = "X";
                                }
                                var productCode = shutterOrderDetail.component + "" + shutterOrderDetail.hingeCd + "B" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            } else {
                                console.log("Without Glass without BSM");
                                if (shutterOrderDetail.hingePosition !== undefined) {
                                    shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                                } else if (shutterOrderDetail.hingePosition === undefined) {
                                    shutterOrderDetail.hingeCd = "X";
                                }
                                if (shutterOrderDetail.jali === true) {
                                    shutterOrderDetail.glassCd = "V";
                                } else if (shutterOrderDetail.jali === false) {
                                    shutterOrderDetail.glassCd = "X";
                                } else if (shutterOrderDetail.jali === undefined) {
                                    shutterOrderDetail.glassCd = "X";
                                }
                                if (shutterOrderDetail.handle !== null) {
                                    shutterOrderDetail.handleCd = "H";
                                } else {
                                    shutterOrderDetail.handleCd = "X";
                                }
                                var productCode = shutterOrderDetail.component + "" + shutterOrderDetail.hingeCd + "X" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            }
                        } else if (shutterOrderDetail.glass === '') {
                            console.log("Without Glass");
                            console.log("33333333333333333333");
                            shutterOrderDetail.glass = "NO_GLASS";
                            if (shutterOrderDetail.bsm === true) {
                                console.log("Without Glass with BSM");
                                if (shutterOrderDetail.hingePosition !== undefined) {
                                    shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                                } else if (shutterOrderDetail.hingePosition === undefined) {
                                    shutterOrderDetail.hingeCd = "X";
                                }
                                if (shutterOrderDetail.jali === true) {
                                    shutterOrderDetail.glassCd = "V";
                                } else if (shutterOrderDetail.jali === false) {
                                    shutterOrderDetail.glassCd = "X";
                                } else if (shutterOrderDetail.jali === undefined) {
                                    shutterOrderDetail.glassCd = "X";
                                } else if (shutterOrderDetail.jali === "") {
                                    shutterOrderDetail.glassCd = "X";
                                } else if (shutterOrderDetail.jali === null) {
                                    shutterOrderDetail.glassCd = "X";
                                }
                                if (shutterOrderDetail.handle !== null) {
                                    shutterOrderDetail.handleCd = "H";
                                } else {
                                    shutterOrderDetail.handleCd = "X";
                                }
                                var productCode = shutterOrderDetail.component + "" + shutterOrderDetail.hingeCd + "B" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            } else {
                                console.log("Without Glass without BSM");
                                console.log("Without Glass without BSM Jali :%O", shutterOrderDetail.jali);
                                if (shutterOrderDetail.hingePosition !== undefined) {
                                    shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                                } else if (shutterOrderDetail.hingePosition === undefined) {
                                    shutterOrderDetail.hingeCd = "X";
                                }
                                if (shutterOrderDetail.jali === true) {
                                    shutterOrderDetail.glassCd = "V";
                                } else if (shutterOrderDetail.jali === false) {
                                    shutterOrderDetail.glassCd = "X";
                                } else if (shutterOrderDetail.jali === undefined) {
                                    shutterOrderDetail.glassCd = "X";
                                } else if (shutterOrderDetail.jali === "") {
                                    shutterOrderDetail.glassCd = "X";
                                } else if (shutterOrderDetail.jali === null) {
                                    shutterOrderDetail.glassCd = "X";
                                }
                                if (shutterOrderDetail.handle !== null) {
                                    shutterOrderDetail.handleCd = "H";
                                } else {
                                    shutterOrderDetail.handleCd = "X";
                                }
                                var productCode = shutterOrderDetail.component + "" + shutterOrderDetail.hingeCd + "X" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            }
                        } else {
                            console.log("With Glass");
                            console.log("22222222222222222222");
                            if (shutterOrderDetail.bsm === true) {
                                console.log("Glass with BSM");
                                if (shutterOrderDetail.hingePosition !== undefined) {
                                    shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                                } else if (shutterOrderDetail.hingePosition === undefined) {
                                    shutterOrderDetail.hingeCd = "X";
                                }
                                if (shutterOrderDetail.glass === "REGULAR_GLASS") {
                                    shutterOrderDetail.glassCd = "G";
                                } else if (shutterOrderDetail.glass === "MESH_GLASS") {
                                    shutterOrderDetail.glassCd = "M";
                                }
                                if (shutterOrderDetail.handle !== null) {
                                    shutterOrderDetail.handleCd = "H";
                                } else {
                                    shutterOrderDetail.handleCd = "X";
                                }
                                var productCode = shutterOrderDetail.component + "" + shutterOrderDetail.hingeCd + "B" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            } else {
                                console.log("Glass without BSM");
                                if (shutterOrderDetail.hingePosition !== undefined) {
                                    shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                                } else if (shutterOrderDetail.hingePosition === undefined) {
                                    shutterOrderDetail.hingeCd = "X";
                                }
                                if (shutterOrderDetail.glass === "REGULAR_GLASS") {
                                    shutterOrderDetail.glassCd = "G";
                                } else if (shutterOrderDetail.glass === "MESH_GLASS") {
                                    shutterOrderDetail.glassCd = "M";
                                }
                                if (shutterOrderDetail.handle !== null) {
                                    shutterOrderDetail.handleCd = "H";
                                } else {
                                    shutterOrderDetail.handleCd = "X";
                                }
                                var productCode = shutterOrderDetail.component + "" + shutterOrderDetail.hingeCd + "X" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                            }
                        }
                    }

                } else if (shutterOrderDetail.material === undefined) {
                    if (shutterOrderDetail.hingePosition !== undefined) {
                        shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                    } else if (shutterOrderDetail.hingePosition === undefined) {
                        shutterOrderDetail.hingeCd = "X";
                    }
                    if (shutterOrderDetail.handle !== null) {
                        shutterOrderDetail.handleCd = "H";
                    } else {
                        shutterOrderDetail.handleCd = "X";
                    }
                    shutterOrderDetail.glassCd = "X";
                    var productCode = "SHUTT" + shutterOrderDetail.hingeCd + "XX" + Math.round(shutterOrderDetail.thickness) + "XX" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                } else {
                    if (shutterOrderDetail.glass === undefined) {
                        console.log("W/O Glass");
                        if (shutterOrderDetail.bsm === true) {
                            console.log("With BSM");
                            if (shutterOrderDetail.hingePosition !== undefined) {
                                shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                            } else if (shutterOrderDetail.hingePosition === undefined) {
                                shutterOrderDetail.hingeCd = "X";
                            }
                            if (shutterOrderDetail.jali === true) {
                                shutterOrderDetail.glassCd = "V";
                            } else if (shutterOrderDetail.jali === false) {
                                shutterOrderDetail.glassCd = "X";
                            } else if (shutterOrderDetail.jali === undefined) {
                                shutterOrderDetail.glassCd = "X";
                            }
                            if (shutterOrderDetail.handle !== null) {
                                shutterOrderDetail.handleCd = "H";
                            } else {
                                shutterOrderDetail.handleCd = "X";
                            }
                            var productCode = "SHUTT" + shutterOrderDetail.hingeCd + "B" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                        } else {
                            console.log("Without BSM");
                            if (shutterOrderDetail.hingePosition !== undefined) {
                                shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                            } else if (shutterOrderDetail.hingePosition === undefined) {
                                shutterOrderDetail.hingeCd = "X";
                            }
                            if (shutterOrderDetail.jali === true) {
                                shutterOrderDetail.glassCd = "V";
                            } else if (shutterOrderDetail.jali === false) {
                                shutterOrderDetail.glassCd = "X";
                            } else if (shutterOrderDetail.jali === undefined) {
                                shutterOrderDetail.glassCd = "X";
                            }
                            if (shutterOrderDetail.handle !== null) {
                                shutterOrderDetail.handleCd = "H";
                            } else {
                                shutterOrderDetail.handleCd = "X";
                            }
                            var productCode = "SHUTT" + shutterOrderDetail.hingeCd + "X" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                        }
                    } else if (shutterOrderDetail.glass === '') {
                        console.log("W/O Glass");
                        if (shutterOrderDetail.bsm === true) {
                            console.log("With BSM");
                            if (shutterOrderDetail.hingePosition !== undefined) {
                                shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                            } else if (shutterOrderDetail.hingePosition === undefined) {
                                shutterOrderDetail.hingeCd = "X";
                            }
                            if (shutterOrderDetail.jali === true) {
                                shutterOrderDetail.glassCd = "V";
                            } else if (shutterOrderDetail.jali === false) {
                                shutterOrderDetail.glassCd = "X";
                            } else if (shutterOrderDetail.jali === undefined) {
                                shutterOrderDetail.glassCd = "X";
                            }
                            if (shutterOrderDetail.handle !== null) {
                                shutterOrderDetail.handleCd = "H";
                            } else {
                                shutterOrderDetail.handleCd = "X";
                            }
                            var productCode = "SHUTT" + shutterOrderDetail.hingeCd + "B" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                        } else {
                            console.log("Without BSM 1");
                            console.log("Hinge position :%O", shutterOrderDetail.hingePosition);

                            if (shutterOrderDetail.hingePosition !== undefined) {
                                shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                            } else if (shutterOrderDetail.hingePosition === undefined) {
                                shutterOrderDetail.hingeCd = "X";
                            } else if (shutterOrderDetail.hingePosition === '') {
                                shutterOrderDetail.hingeCd = "X";
                            }
                            if (shutterOrderDetail.jali === true) {
                                shutterOrderDetail.glassCd = "V";
                            } else if (shutterOrderDetail.jali === false) {
                                shutterOrderDetail.glassCd = "X";
                            } else if (shutterOrderDetail.jali === undefined) {
                                shutterOrderDetail.glassCd = "X";
                            } else if (shutterOrderDetail.jali === null) {
                                shutterOrderDetail.glassCd = "X";
                            }
                            if (shutterOrderDetail.handle !== null) {
                                shutterOrderDetail.handleCd = "H";
                            } else {
                                shutterOrderDetail.handleCd = "X";
                            }
                            console.log("Product Code is Getting Generated from here :%O", shutterOrderDetail);
                            var productCode = "SHUTT" + shutterOrderDetail.hingeCd + "X" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                        }
                    } else {
                        console.log("Glass");
                        if (shutterOrderDetail.bsm === true) {
                            console.log("With BSM");
                            if (shutterOrderDetail.hingePosition !== undefined) {
                                shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                            } else if (shutterOrderDetail.hingePosition === undefined) {
                                shutterOrderDetail.hingeCd = "X";
                            }
                            if (shutterOrderDetail.glass === "REGULAR_GLASS") {
                                shutterOrderDetail.glassCd = "G";
                            } else if (shutterOrderDetail.glass === "MESH_GLASS") {
                                shutterOrderDetail.glassCd = "M";
                            }
                            if (shutterOrderDetail.handle !== null) {
                                shutterOrderDetail.handleCd = "H";
                            } else {
                                shutterOrderDetail.handleCd = "X";
                            }
                            var productCode = "SHUTT" + shutterOrderDetail.hingeCd + "B" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                        } else {
                            console.log("Without BSM");
                            if (shutterOrderDetail.hingePosition !== undefined) {
                                shutterOrderDetail.hingeCd = shutterOrderDetail.hingePosition;
                            } else if (shutterOrderDetail.hingePosition === undefined) {
                                shutterOrderDetail.hingeCd = "X";
                            }
                            if (shutterOrderDetail.glass === "REGULAR_GLASS") {
                                shutterOrderDetail.glassCd = "G";
                            } else if (shutterOrderDetail.glass === "MESH_GLASS") {
                                shutterOrderDetail.glassCd = "M";
                            }
                            if (shutterOrderDetail.handle !== null) {
                                shutterOrderDetail.handleCd = "H";
                            } else {
                                shutterOrderDetail.handleCd = "X";
                            }
                            var productCode = "SHUTT" + shutterOrderDetail.hingeCd + "X" + shutterOrderDetail.glassCd + "" + Math.round(shutterOrderDetail.thickness) + "" + shutterOrderDetail.material + "" + shutterOrderDetail.handleCd + "" + shutterOrderDetail.finish + "-" + l1 + "" + w1 + "" + Math.round(shutterOrderDetail.thickness) + "000";
                        }
                    }
                }
                var shutterArea = (shutterOrderDetail.length * shutterOrderDetail.width);
                var shutterAreaSqMt = (shutterArea / 1000000);
                var shutterRunningMeter = ((2 * shutterOrderDetail.length) + (2 * shutterOrderDetail.width));
                var shutterMt = (shutterRunningMeter / 1000);
                console.log("Shutter Area Sq Mt :%O", shutterAreaSqMt);
                console.log("Shutter Running Mt :%O", shutterMt);
                if (shutterOrderDetail.grain === "") {
                    shutterOrderDetail.grain = "NO_GRAIN";
                }
                if (shutterOrderDetail.hingePosition === "") {
                    shutterOrderDetail.hingePosition = "NO_HINGE";
                }
                if (shutterOrderDetail.handle === "HANDEP01") {
                    var meterLength = (shutterOrderDetail.handleLength / 1000);
                    shutterOrderDetail.handleMainPrice = (meterLength * shutterOrderDetail.handlePrice);
                } else {
                    shutterOrderDetail.handleMainPrice = shutterOrderDetail.handlePrice;
                }

                if (shutterOrderDetail.handle === undefined) {
                    shutterOrderDetail.handleMainPrice = 0;
                }
                if (shutterOrderDetail.handle === null) {
                    shutterOrderDetail.handleMainPrice = 0;
                }
                if (shutterOrderDetail.jali === true) {
                    shutterOrderDetail.jaliPrice = 206;
                } else {
                    shutterOrderDetail.jaliPrice = 0;
                }

                if (shutterOrderDetail.straightener === '1') {
                    shutterOrderDetail.straightenerPrice = 945;
                    console.log("1 Straightener");
                } else if (shutterOrderDetail.straightener === '2') {
                    shutterOrderDetail.straightenerPrice = 1890;
                    console.log("2 Straightener");
                } else {
                    console.log("No Straightener");
                    shutterOrderDetail.straightenerPrice = 0;
                }
                console.log("Jali Price :%O", shutterOrderDetail.jaliPrice);
                console.log("Handle Price :%O", shutterOrderDetail.handleMainPrice);
                console.log("Shtraightener Price :%O", shutterOrderDetail.straightenerPrice);
                if (shutterOrderDetail.finish === "XXW") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice)));
                } else if (shutterOrderDetail.finish === "XXX") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice)));
                } else if (shutterOrderDetail.finish === "XXY") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice)));
                } else if (shutterOrderDetail.finish === "XXZ") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice)));
                } else if (shutterOrderDetail.finish === "XAA") {
                    shutterOrderDetail.material = "AL";
                    shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * ((shutterMt * shutterOrderDetail.stdOneSidePrice) + 168));
                } else {
                    console.log("Else Loop Non Al");
                    if (shutterOrderDetail.bsm === true) {
                        console.log("Both Side");
                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * (shutterAreaSqMt * shutterOrderDetail.stdBothSidePrice));
                    } else if (shutterOrderDetail.bsm === false) {
                        console.log("One Side");
                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * (shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice));
                    } else if (shutterOrderDetail.bsm === undefined) {
                        shutterOrderDetail.unitPrice = (shutterOrderDetail.quantity * (shutterAreaSqMt * shutterOrderDetail.stdOneSidePrice));
                    }
                }

                shutterOrderDetail.productCode = productCode;
                var handlePrice = (shutterOrderDetail.quantity * shutterOrderDetail.handleMainPrice);
                var jaliPrice = (shutterOrderDetail.quantity * shutterOrderDetail.jaliPrice);
                var straightenerPrice = (shutterOrderDetail.quantity * shutterOrderDetail.straightenerPrice);

                console.log("Shutter Save Object :%O", shutterOrderDetail);
                $scope.applyShutterDiscount(shutterOrderDetail, handlePrice, jaliPrice, straightenerPrice);
            };
        })
        .controller('DrawerRepeatAdditionController', function (RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, PanelOrderDetailsService, $scope, $stateParams, $state) {

        })
        .controller('FillerRepeatAdditionController', function (FillerFinishPriceService, RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, FillerOrderDetailsService, $scope, $stateParams, $state) {
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
            });
            if ($stateParams.fillerDetailId === undefined) {
                $scope.editableFillerDetail = {};
            } else {
                $scope.editableFillerDetail = {};
                FillerOrderDetailsService.get({
                    'id': $stateParams.fillerDetailId
                }, function (fillerOrderDetailObject) {
                    console.log("Filler Order Detail Object :%O", fillerOrderDetailObject);
                    fillerOrderDetailObject.id = '';
                    fillerOrderDetailObject.productCode = '';
                    fillerOrderDetailObject.thickness = fillerOrderDetailObject.thickness.toString();
                    if (fillerOrderDetailObject.grain === 'NO_GRAIN') {
                        fillerOrderDetailObject.grain = '';
                    }
                    ColorService.get({
                        'id': fillerOrderDetailObject.colorId
                    }, function (colorObject) {
                        fillerOrderDetailObject.colorCode = colorObject.colorCode;
                        fillerOrderDetailObject.colorId = colorObject.id;
                        $scope.fillerColorName = colorObject.colorName;
                    });
                    if (fillerOrderDetailObject.intColorId !== null) {
                        ColorService.get({
                            'id': fillerOrderDetailObject.intColorId
                        }, function (fillerInternalColorobject) {
                            fillerOrderDetailObject.intColorCode = fillerInternalColorobject.colorCode;
                            fillerOrderDetailObject.intColorId = fillerInternalColorobject.id;
                            $scope.fillerInternalColorName = fillerInternalColorobject.colorName;
                        });
                    }
                    $scope.editableFillerDetail = fillerOrderDetailObject;
                });
            }
            //////////////////////Filler Form Functionality////////////////////
            KitchenComponentService.findByCategory({
                'category': 'FILLER'
            }, function (fillerList) {
                $scope.fillerList1 = fillerList;
            });
            $scope.closeWidget = function () {
                $scope.showFillerSelectionWidget = false;
                $scope.showFillerColorSelectionWidget = false;
                $scope.showFillerInternalColorSelectionWidget = false;
                $scope.preFillerColor = {};
                $scope.preInternalFillerColor = {};
            };
            $scope.showFillerColorSelectionWidget = false;
            $scope.editableFillerDetail.bsm = false;
            $scope.showFillerInternalColorSelectionWidget = false;
            $scope.openFillerColorWidget = function () {
                $scope.showFillerColorSelectionWidget = true;
            };
            $scope.openInternalFillerColorWidget = function () {
                $scope.showFillerInternalColorSelectionWidget = true;
            };
            $scope.selectFillerColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableFillerDetail.colorCode = colorCode;
                $scope.editableFillerDetail.colorId = colorId;
                $scope.fillerColorName = colorName;
            };
            $scope.selectPreFillerColor = function (colorId) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preFillerColor = colorObject;
                });
            };
            $scope.selectInternalFillerColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableFillerDetail.intColorCode = colorCode;
                $scope.editableFillerDetail.intColorId = colorId;
                $scope.fillerInternalColorName = colorName;
            };
            $scope.selectPreInternalFillerColor = function (colorId) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preInternalFillerColor = colorObject;
                });
            };
            $scope.fillerFinishList = [];
//            $scope.shutterFinishList = FinishPriceService.findAllList();
            FillerFinishPriceService.findUniqueFinish(function (finishList) {
                console.log("Finish List :%O", finishList);
                angular.forEach(finishList, function (finishCode) {
                    FinishPriceService.findByFinishCode({
                        'finishCode': finishCode
                    }, function (finishObject) {
                        $scope.fillerFinishList.push(finishObject);
                    });
                });
                console.log("Filler Finish List :%O", $scope.fillerFinishList);
            });
            $scope.$watch('editableFillerDetail.material', function (material) {
                console.log("Side Material :%O", material);
                $scope.fillerInternalColorName = "";
                $scope.editableFillerDetail.intColorId = "";
                ColorConstraintService.findByComponentMaterialCode({
                    'material': 'CARCASE',
                    'materialCode': material
                }, function (sortedColor) {
                    console.log("Sorted COlor :%O", sortedColor);
                    $scope.fillerInternalColorList1 = [];
                    angular.forEach(sortedColor.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.fillerInternalColorList1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.fillerInternalColorList1 = [];
                    } else if (response.status === 404) {
                        $scope.fillerInternalColorList1 = [];
                    } else if (response.status === 400) {
                        $scope.fillerInternalColorList1 = [];
                    }
                });
            });
            $scope.showFillerBsm = false;
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editableFillerDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editableFillerDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
//                $scope.editableFillerDetail.thickness = '';
                $scope.fillerColorName = '';
                $scope.fillerFinishCode = finishName;
                FillerFinishPriceService.findByFinish({
                    'finish': finishName
                }, function (fillerFinishThicknessList) {
                    $scope.fillerThicknessList = fillerFinishThicknessList;
                });
                FinishPriceService.findByFinishCode({
                    'finishCode': finishName
                }, function (finishObject) {
                    console.log("Finish Object :%O", finishObject);
                    RawMaterialService.get({
                        'id': finishObject.materialId
                    }, function (rmObject) {
                        $scope.editableFillerDetail.material = rmObject.materialCode;
                    });
//                    $scope.editableFillerDetail.finishPrice = finishObject.price;
                    if (finishObject.category === "PU" || finishObject.category === "MEMBRANE") {
                        $scope.showFillerBsm = true;
                    } else {
                        $scope.showFillerBsm = false;
                    }
                });
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.fillerColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.fillerColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.fillerColors1 = [];
                    } else if (response.status === 404) {
                        $scope.fillerColors1 = [];
                    } else if (response.status === 400) {
                        $scope.fillerColors1 = [];
                    }
                });
            });
            $scope.$watch('editableFillerDetail.thickness', function (thickness) {
                console.log("Thickness :%O", thickness);
                if (thickness === '8') {
                    $scope.showFillerBsm = false;
                } else {
                    $scope.showFillerBsm = true;
                }
                FillerFinishPriceService.findByFinishThickness({
                    'finish': $scope.fillerFinishCode,
                    'thickness': thickness
                }, function (fillerFinishPrice) {
                    console.log("Filler Finish Price :%O", fillerFinishPrice);
                    $scope.editableFillerDetail.stdOneSidePrice = fillerFinishPrice.oneSidePrice;
                    $scope.editableFillerDetail.stdBothSidePrice = fillerFinishPrice.bothSidePrice;
                });
            });
            ///////////////////////////////////////////////////////////////////
            $scope.saveFillerDetails = function (fillerOrderDetail) {
                fillerOrderDetail.orderHeadId = $stateParams.orderHeadId;
                if (fillerOrderDetail.grain === '') {
                    fillerOrderDetail.grain = "NO_GRAIN";
                }
                ;
//                fillerOrderDetail.component = $scope.fillerComponent;
                fillerOrderDetail.depth = '0';
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                $scope.applyFillerDiscount = function (fillerOrderDetail) {
                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': fillerOrderDetail.finish,
                        'material': fillerOrderDetail.material,
                        'thickness': fillerOrderDetail.thickness,
                        'rateContractId': fillerOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        fillerOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((fillerOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        if ($scope.orderHead.orderSubType === "D") {
                            console.log("Display Order");
                            var preliminaryDealerPrice = (fillerOrderDetail.unitPrice - discountPrice);
                            var displayDiscountPrice = ((preliminaryDealerPrice / 100) * fillerOrderDetail.displayDiscount);
                            fillerOrderDetail.price = (preliminaryDealerPrice - displayDiscountPrice);
                            console.log("Filler Order Detail Save Object :%O", fillerOrderDetail);
                            FillerOrderDetailsService.save(fillerOrderDetail, function (fillerOrderDetail) {
                                console.log("Saved Successfully");
                                $scope.editablePanelDetail = "";
                                $scope.fillerColorName = "";
//                                $state.go('admin.masters_order_details', {
//                                    'orderHeadId': $stateParams.orderHeadId
//                                }, {'reload': true});
                                $state.go('admin.masters_order_details.filler_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'fillerDetailId': fillerOrderDetail.id
                                }, {'reload': true});

                            });
                        } else {
                            fillerOrderDetail.price = (fillerOrderDetail.unitPrice - discountPrice);
                            FillerOrderDetailsService.save(fillerOrderDetail, function (fillerOrderDetail) {
                                console.log("Saved Successfully");
                                $scope.editablePanelDetail = "";
                                $scope.fillerColorName = "";
//                                $state.go('admin.masters_order_details', {
//                                    'orderHeadId': $stateParams.orderHeadId
//                                }, {'reload': true});
                                $state.go('admin.masters_order_details.filler_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'fillerDetailId': fillerOrderDetail.id
                                }, {'reload': true});
                            });
                        }
                    });
                };
                if (fillerOrderDetail.length < 1000) {
                    if (fillerOrderDetail.length < 100) {
                        lengthLessThan100(fillerOrderDetail.length);
                    } else {
                        l1 = 0 + fillerOrderDetail.length.toString();
                    }
                } else {
                    l1 = fillerOrderDetail.length.toString();
                }
                if (fillerOrderDetail.width < 1000) {
                    if (fillerOrderDetail.width < 100) {
                        widthLessThan100(fillerOrderDetail.width);
                    } else {
                        w1 = 0 + fillerOrderDetail.width.toString();
                    }
                } else {
                    w1 = fillerOrderDetail.width.toString();
                }

                var fillerArea = (fillerOrderDetail.width * fillerOrderDetail.length);
                var fillerAreaSqMt = fillerArea / 1000000;
                console.log("Filler ARea :%O", fillerAreaSqMt);
                console.log("Fille Order Detail :%O", fillerOrderDetail);
                if (fillerOrderDetail.bsm === true) {
                    console.log("Both SIde Colored");
                    fillerOrderDetail.unitPrice = (fillerOrderDetail.quantity * (fillerAreaSqMt * fillerOrderDetail.stdBothSidePrice));
                } else if (fillerOrderDetail.bsm === false) {
                    console.log("Single Side");
                    fillerOrderDetail.unitPrice = (fillerOrderDetail.quantity * (fillerAreaSqMt * fillerOrderDetail.stdOneSidePrice));
                } else {
                    console.log("Regular");
                    fillerOrderDetail.unitPrice = (fillerOrderDetail.quantity * (fillerAreaSqMt * fillerOrderDetail.stdOneSidePrice));
                }
                console.log("FInal Price :" + fillerOrderDetail.price);
//                fillerOrderDetail.price = finalPrice;

//                var productCode = fillerOrderDetail.component + "-18" + fillerOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                if (fillerOrderDetail.bsm === true) {
                    var productCode = fillerOrderDetail.component + "B" + fillerOrderDetail.thickness + "" + fillerOrderDetail.material + "" + fillerOrderDetail.finish + "-" + l1 + "" + w1 + "" + fillerOrderDetail.thickness + "000";
                } else {
                    var productCode = fillerOrderDetail.component + "" + fillerOrderDetail.thickness + "" + fillerOrderDetail.material + "X" + fillerOrderDetail.finish + "-" + l1 + "" + w1 + "" + fillerOrderDetail.thickness + "000";
                }
                fillerOrderDetail.productCode = productCode;
                console.log("Filler Save Object :%O", fillerOrderDetail);
                $scope.applyFillerDiscount(fillerOrderDetail);
//                FillerOrderDetailsService.save(fillerOrderDetail, function () {
//                    console.log("Saved Successfully");
//                    $scope.editablePanelDetail = "";
//                    $scope.fillerColorName = "";
//                    $state.go('admin.masters_order_details', {
//                        'orderHeadId': $stateParams.orderHeadId
//                    }, {'reload': true});
//                });
//                /////////////////////
//                OrderDetailsService.save(fillerOrderDetail, function () {
//                    $scope.editableFillerDetail = "";
//                    $scope.fillerName = "";
//                    $scope.refreshList();
//                });
            };
        })
        .controller('PelmetRepeatAdditionController', function (PanelMaterialThicknessService, FillerFinishPriceService, PelmetOrderDetailsService, RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, PanelOrderDetailsService, $scope, $stateParams, $state) {
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
            });
            if ($stateParams.pelmetDetailId === undefined) {
                $scope.editablePelmetDetail = {};
            } else {
                $scope.editablePelmetDetail = {};
                PelmetOrderDetailsService.get({
                    'id': $stateParams.pelmetDetailId
                }, function (pelmetOrderDetailObject) {
                    console.log("pelmet Order Detail Object :%O", pelmetOrderDetailObject);
                    pelmetOrderDetailObject.id = '';
                    pelmetOrderDetailObject.productCode = '';
                    pelmetOrderDetailObject.thickness = pelmetOrderDetailObject.thickness.toString();
                    ColorService.get({
                        'id': pelmetOrderDetailObject.colorId
                    }, function (colorObject) {
                        pelmetOrderDetailObject.colorCode = colorObject.colorCode;
                        pelmetOrderDetailObject.colorId = colorObject.id;
                        $scope.pelmetColorName = colorObject.colorName;
                    });
                    KitchenComponentService.findByComponentCode({
                        'componentCode': pelmetOrderDetailObject.component
                    }, function (kcObject) {
                        $scope.pelmetName = kcObject.component;
                        $scope.pelmetComponent = kcObject.componentCode;
                    });
                    $scope.editablePelmetDetail = pelmetOrderDetailObject;
                });
            }
            $scope.closeWidget = function () {
                $scope.showPelmetSelectionWidget = false;
                $scope.showPelmetColorSelectionWidget = false;
                $scope.prePelmetColor = {};
                $scope.prePelmet = {};
            };
            $scope.openPelmet = function () {
                KitchenComponentService.findByCategory({
                    'category': 'PELMET'
                }, function (pelmetList) {
                    $scope.pelmetList1 = pelmetList;
                });
                $scope.showPelmetSelectionWidget = true;
            };
            //////////////Pelmet//////////////
            $scope.editablePelmetDetail = {};
            $scope.selectPelmet = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.pelmetName = kcObject.component;
                    $scope.pelmetComponent = kcObject.componentCode;
                });
            };
            $scope.selectPrePelmet = function (componentId) {
                KitchenComponentService.get({
                    'id': componentId
                }, function (pelmetComponent) {
                    $scope.prePelmet = pelmetComponent;
                });
            };
            ////////////Pelmet Ends///////////////
            /////////////////Pelmet Form Functionality/////////////////////////
            $scope.showPelmetColorSelectionWidget = false;
            $scope.openPelmetColorWidget = function () {
                $scope.showPelmetColorSelectionWidget = true;
            };
            $scope.selectPelmetColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editablePelmetDetail.colorCode = colorCode;
                $scope.editablePelmetDetail.colorId = colorId;
                $scope.pelmetColorName = colorName;
            };
            $scope.selectPrePelmetColor = function (colorId) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.prePelmetColor = colorObject;
                });
            };
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editablePelmetDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editablePelmetDetail.material', function (material) {
                console.log("Side Material :%O", material);
                RawMaterialService.findByMaterialCode({
                    'materialCode': material
                }, function (materialObject) {
                    console.log("Material Object :%O", materialObject);
                    FinishPriceService.findCarcassFinishByMaterialId({
                        'materialId': materialObject.id
                    }, function (finishList) {
                        console.log("FInish List :%O", finishList);
                        $scope.pelmetFinishList = finishList;
                    });
                });
                PanelMaterialThicknessService.findByMaterial({
                    'material': material
                }, function (pelmetThicknessObject) {
                    console.log("Pelmet Thickness Object :%O", pelmetThicknessObject);
                    $scope.pelmetThicknessList = pelmetThicknessObject;
                });
            });
            $scope.hidePelmetGlossy = false;
            $scope.$watch('pelmetComponent', function (pelmetComponent) {
                if (pelmetComponent === "PEL-PL1X") {
                    $scope.hidePelmetGlossy = true;
                } else {
                    $scope.hidePelmetGlossy = false;
                }
            });
//            $scope.showFillerBsm = false;
            $scope.$watch('editablePelmetDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                $scope.editablePelmetDetail.thickness = '';
                $scope.pelmetColorName = '';
//                FinishPriceService.findByFinishCode({
//                    'finishCode': finishName
//                }, function (finishObject) {
//                    console.log("Finish Object :%O", finishObject);
//                    $scope.editablePelmetDetail.finishPrice = finishObject.price;
//                });
                $scope.pelmetFinishCode = finishName;
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.pelmetColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.pelmetColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.pelmetColors1 = [];
                    } else if (response.status === 404) {
                        $scope.pelmetColors1 = [];
                    } else if (response.status === 400) {
                        $scope.pelmetColors1 = [];
                    }
                });
            });
            $scope.$watch('editablePelmetDetail.thickness', function (pelmetThickness) {
                console.log("Pelmet THickness");
                FillerFinishPriceService.findByFinishThickness({
                    'finish': $scope.pelmetFinishCode,
                    'thickness': pelmetThickness
                }, function (sfpObject) {
                    console.log("SHutter Finis Price Object :%O", sfpObject);
                    $scope.editablePelmetDetail.finishPrice = sfpObject.oneSidePrice;
                });
            });
            ///////////////////////////////////////////////////////////////////
            $scope.savePelmetDetails = function (pelmetOrderDetail) {
                pelmetOrderDetail.orderHeadId = $stateParams.orderHeadId;
                pelmetOrderDetail.component = $scope.pelmetComponent;
                pelmetOrderDetail.depth = '0';
                $scope.applyPelmetDiscount = function (pelmetOrderDetail) {
                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': pelmetOrderDetail.finish,
                        'material': pelmetOrderDetail.material,
                        'thickness': pelmetOrderDetail.thickness,
                        'rateContractId': pelmetOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        pelmetOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((pelmetOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        if ($scope.orderHead.orderSubType === "D") {
                            console.log("Display Order");
                            var preliminaryDealerPrice = (pelmetOrderDetail.unitPrice - discountPrice);
                            var displayDiscountPrice = ((preliminaryDealerPrice / 100) * pelmetOrderDetail.displayDiscount);
                            pelmetOrderDetail.price = (preliminaryDealerPrice - displayDiscountPrice);
                            console.log("Pelmet Order Detail Save Object :%O", pelmetOrderDetail);
                            PelmetOrderDetailsService.save(pelmetOrderDetail, function (pelmetOrderDetails) {
                                console.log("Saved Successfully");
                                $scope.editablePelmetDetail = "";
                                $scope.pelmetColorName = "";
                                $state.go('admin.masters_order_details.pelmet_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'pelmetDetailId': pelmetOrderDetails.id
                                }, {'reload': true});
                            });
                        } else {
                            pelmetOrderDetail.price = (pelmetOrderDetail.unitPrice - discountPrice);
                            PelmetOrderDetailsService.save(pelmetOrderDetail, function (pelmetOrderDetails) {
                                console.log("Saved Successfully");
                                $scope.editablePelmetDetail = "";
                                $scope.pelmetColorName = "";
                                $state.go('admin.masters_order_details.pelmet_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'pelmetDetailId': pelmetOrderDetails.id
                                }, {'reload': true});
                            });
                        }
                    });
                };
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (pelmetOrderDetail.length < 1000) {
                    if (pelmetOrderDetail.length < 100) {
                        lengthLessThan100(pelmetOrderDetail.length);
                    } else {
                        l1 = 0 + pelmetOrderDetail.length.toString();
                    }
                } else {
                    l1 = pelmetOrderDetail.length.toString();
                }
                if (pelmetOrderDetail.width < 1000) {
                    if (pelmetOrderDetail.width < 100) {
                        widthLessThan100(pelmetOrderDetail.width);
                    } else {
                        w1 = 0 + pelmetOrderDetail.width.toString();
                    }
                } else {
                    w1 = pelmetOrderDetail.width.toString();
                }
                var pelmetArea = (pelmetOrderDetail.width * pelmetOrderDetail.length);
                var pelmetAreaSqMt = pelmetArea / 1000000;
                console.log("Pelmet Area :%O", pelmetAreaSqMt);
                pelmetOrderDetail.unitPrice = (pelmetOrderDetail.quantity * (pelmetAreaSqMt * pelmetOrderDetail.finishPrice));
                console.log("Pelmet Price :%O", pelmetOrderDetail.price);
                var productCode = pelmetOrderDetail.component + "" + pelmetOrderDetail.thickness + "" + pelmetOrderDetail.material + "X" + pelmetOrderDetail.finish + "-" + l1 + "" + w1 + "" + pelmetOrderDetail.thickness + "000";
                pelmetOrderDetail.productCode = productCode;
                console.log("Pelmet Save Object :%O", pelmetOrderDetail);
                $scope.applyPelmetDiscount(pelmetOrderDetail);

            };
        })
        .controller('CorniceRepeatAdditionController', function (FillerFinishPriceService, PanelMaterialThicknessService, CorniceOrderDetailsService, RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, PanelOrderDetailsService, $scope, $stateParams, $state) {
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
            });
            if ($stateParams.corniceDetailId === undefined) {
                $scope.editableCorniceDetail = {};
            } else {
                $scope.editableCorniceDetail = {};
                CorniceOrderDetailsService.get({
                    'id': $stateParams.corniceDetailId
                }, function (corniceOrderDetailObject) {
                    console.log("Cornice Order Detail Object :%O", corniceOrderDetailObject);
                    corniceOrderDetailObject.id = '';
                    corniceOrderDetailObject.productCode = '';
                    corniceOrderDetailObject.thickness = corniceOrderDetailObject.thickness.toString();
                    ColorService.get({
                        'id': corniceOrderDetailObject.colorId
                    }, function (colorObject) {
                        corniceOrderDetailObject.colorCode = colorObject.colorCode;
                        corniceOrderDetailObject.colorId = colorObject.id;
                        $scope.corniceColorName = colorObject.colorName;
                    });
                    KitchenComponentService.findByComponentCode({
                        'componentCode': corniceOrderDetailObject.component
                    }, function (kcObject) {
                        $scope.corniceName = kcObject.component;
                        $scope.corniceComponent = kcObject.componentCode;
                    });
                    $scope.editableCorniceDetail = corniceOrderDetailObject;
                });
            }
            $scope.closeWidget = function () {
                $scope.showCorniceSelectionWidget = false;
                $scope.showCorniceColorSelectionWidget = false;
                $scope.preCorniceColor = {};
                $scope.preCornice = {};
            };
            /////////////////////////////////////////////////
            $scope.openCornice = function () {
                KitchenComponentService.findByCategory({
                    'category': 'CORNICE'
                }, function (corniceList) {
                    $scope.corniceList1 = corniceList;
                });
                $scope.showCorniceSelectionWidget = true;
            };
            //////////////Cornice//////////////
            $scope.editableCorniceDetail = {};
            $scope.selectCornice = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.corniceName = kcObject.component;
                    $scope.corniceComponent = kcObject.componentCode;
                });
            };
            $scope.selectPreCornice = function (componentId) {
                KitchenComponentService.get({
                    'id': componentId
                }, function (corniceComponent) {
                    $scope.preCornice = corniceComponent;
                });
            };
            ////////////Cornice Ends///////////////
            ///////////////////Cornice Form Functionality//////////////////////
            $scope.showCorniceColorSelectionWidget = false;
            $scope.openCorniceColorWidget = function () {
                $scope.showCorniceColorSelectionWidget = true;
            };
            $scope.selectCorniceColor = function (colorId, colorName, colorCode) {
                console.log(colorId);
                $scope.closeWidget();
                $scope.editableCorniceDetail.colorCode = colorCode;
                $scope.editableCorniceDetail.colorId = colorId;
                $scope.corniceColorName = colorName;
            };
            $scope.selectPreCorniceColor = function (colorId) {
                ColorService.get({
                    'id': colorId
                }, function (colorObject) {
                    $scope.preCorniceColor = colorObject;
                });
            };
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                PartyService.get({
                    'id': orderHeadObject.billingPartyId
                }, function (partyObject) {
                    $scope.editableCorniceDetail.rateContractId = partyObject.rateContractId;
                });
            });
            $scope.$watch('editableCorniceDetail.material', function (material) {
                console.log("Side Material :%O", material);
                RawMaterialService.findByMaterialCode({
                    'materialCode': material
                }, function (materialObject) {
                    console.log("Material Object :%O", materialObject);
                    FinishPriceService.findCarcassFinishByMaterialId({
                        'materialId': materialObject.id
                    }, function (finishList) {
                        console.log("FInish List :%O", finishList);
                        $scope.corniceFinishList = finishList;
                    });
                });
                PanelMaterialThicknessService.findByMaterial({
                    'material': material
                }, function (corniceThicknessObject) {
                    console.log("Cornice Thickness Object :%O", corniceThicknessObject);
                    $scope.corniceThicknessList = corniceThicknessObject;
                });
            });
//            $scope.showFillerBsm = false;
            $scope.$watch('editableCorniceDetail.finish', function (finishName) {
                console.log("FInish Name :%O", finishName);
                $scope.editableCorniceDetail.thickness = '';
                $scope.corniceColorName = '';
                $scope.corniceFinishCode = finishName;
                ColorConstraintService.findByFinishCode({
                    'finishCode': finishName
                }, function (sortedColorObject) {
                    console.log("Sorted COlor :%O", sortedColorObject);
                    $scope.corniceColors1 = [];
                    angular.forEach(sortedColorObject.colors, function (colorId) {
                        ColorService.get({
                            'id': colorId
                        }, function (colorObject) {
                            $scope.corniceColors1.push(colorObject);
                        });
                    });
                }).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.corniceColors1 = [];
                    } else if (response.status === 404) {
                        $scope.corniceColors1 = [];
                    } else if (response.status === 400) {
                        $scope.corniceColors1 = [];
                    }
                });
            });
            $scope.hideCorniceGlossy = false;
            $scope.$watch('corniceComponent', function (corniceComponent) {
                if (corniceComponent === "COR-CR1X") {
                    $scope.hideCorniceGlossy = true;
                } else if (corniceComponent === "COR-CR4X") {
                    $scope.hideCorniceGlossy = true;
                } else {
                    $scope.hideCorniceGlossy = false;
                }
            });
            $scope.$watch('editableCorniceDetail.thickness', function (corniceThickness) {
                console.log("Pelmet THickness");
                FillerFinishPriceService.findByFinishThickness({
                    'finish': $scope.corniceFinishCode,
                    'thickness': corniceThickness
                }, function (sfpObject) {
                    console.log("SHutter Finis Price Object :%O", sfpObject);
                    $scope.editableCorniceDetail.finishPrice = sfpObject.oneSidePrice;
                });
            });
            ///////////////////////////////////////////////////////////////////
            $scope.saveCorniceDetails = function (corniceOrderDetail) {
                corniceOrderDetail.orderHeadId = $stateParams.orderHeadId;
                corniceOrderDetail.component = $scope.corniceComponent;
                corniceOrderDetail.depth = '0';
                $scope.applyCorniceDiscount = function (corniceOrderDetail) {
                    RateContractDetailService.findByShutterFinishMaterialThickness({
                        'finish': corniceOrderDetail.finish,
                        'material': corniceOrderDetail.material,
                        'thickness': corniceOrderDetail.thickness,
                        'rateContractId': corniceOrderDetail.rateContractId
                    }, function (rateContractDetailObject) {
                        corniceOrderDetail.discountPer = rateContractDetailObject.discountPer;
                        var discountPrice = ((corniceOrderDetail.unitPrice / 100) * rateContractDetailObject.discountPer);
                        if ($scope.orderHead.orderSubType === "D") {
                            console.log("Display Order");
                            var preliminaryDealerPrice = (corniceOrderDetail.unitPrice - discountPrice);
                            var displayDiscountPrice = ((preliminaryDealerPrice / 100) * corniceOrderDetail.displayDiscount);
                            corniceOrderDetail.price = (preliminaryDealerPrice - displayDiscountPrice);
                            console.log("Cornice Order Detail Save Object :%O", corniceOrderDetail);
                            CorniceOrderDetailsService.save(corniceOrderDetail, function (corniceOrderDetails) {
                                console.log("Saved Successfully");
                                $scope.editableCorniceDetail = "";
                                $scope.corniceColorName = "";
//                                $state.go('admin.masters_order_details', {
//                                    'orderHeadId': $stateParams.orderHeadId
//                                }, {'reload': true});
                                $state.go('admin.masters_order_details.cornice_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'corniceDetailId': corniceOrderDetails.id
                                }, {'reload': true});
                            });
                        } else {
                            corniceOrderDetail.price = (corniceOrderDetail.unitPrice - discountPrice);
                            CorniceOrderDetailsService.save(corniceOrderDetail, function (corniceOrderDetails) {
                                console.log("Saved Successfully");
                                $scope.editableCorniceDetail = "";
                                $scope.corniceColorName = "";
//                                $state.go('admin.masters_order_details', {
//                                    'orderHeadId': $stateParams.orderHeadId
//                                }, {'reload': true});
                                $state.go('admin.masters_order_details.cornice_modal', {
                                    'orderHeadId': $stateParams.orderHeadId,
                                    'corniceDetailId': corniceOrderDetails.id
                                }, {'reload': true});
                            });
                        }
                    });
                };
                var l1;
                var w1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                var widthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    w1 = genNum;
                };
                if (corniceOrderDetail.length < 1000) {
                    if (corniceOrderDetail.length < 100) {
                        lengthLessThan100(corniceOrderDetail.length);
                    } else {
                        l1 = 0 + corniceOrderDetail.length.toString();
                    }
                } else {
                    l1 = corniceOrderDetail.length.toString();
                }
                if (corniceOrderDetail.width < 1000) {
                    if (corniceOrderDetail.width < 100) {
                        widthLessThan100(corniceOrderDetail.width);
                    } else {
                        w1 = 0 + corniceOrderDetail.width.toString();
                    }
                } else {
                    w1 = corniceOrderDetail.width.toString();
                }
                var corniceArea = (corniceOrderDetail.length * corniceOrderDetail.width);
                var corniceAreaSqMt = corniceArea / 1000000;
                console.log("Total ARea :%O", corniceAreaSqMt);
                console.log("Std Price :%O", corniceOrderDetail.finishPrice);
//                pelmetOrderDetail.price = (pelmetOrderDetail.quantity * (pelmetAreaSqMt * pelmetOrderDetail.finishPrice));
                corniceOrderDetail.unitPrice = (corniceOrderDetail.quantity * (corniceAreaSqMt * corniceOrderDetail.finishPrice));
                console.log("Final Price :%O", corniceOrderDetail.price);
//                var productCode = corniceOrderDetail.component + "-18" + corniceOrderDetail.material + "-" + l1 + "" + w1 + "18000";
                var productCode = corniceOrderDetail.component + "" + corniceOrderDetail.thickness + "" + corniceOrderDetail.material + "X" + corniceOrderDetail.finish + "-" + l1 + "" + w1 + "" + corniceOrderDetail.thickness + "000";
                corniceOrderDetail.productCode = productCode;
                console.log("Cornice Final Save :%O", corniceOrderDetail);
                $scope.applyCorniceDiscount(corniceOrderDetail);
            };
        })
        .controller('HandleRepeatAdditionController', function (HandlePriceService, HandleOrderDetailsService, RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, PanelOrderDetailsService, $scope, $stateParams, $state) {
            OrderHeadService.get({
                'id': $stateParams.orderHeadId
            }, function (orderHeadObject) {
                $scope.orderHead = orderHeadObject;
            });
            //////////////////Handle Form Functionality////////////////////////
            $scope.editableHandleDetail = {};
            $scope.$watch('handleName', function (handle) {
                console.log("Handle :%O", handle);
                console.log("Handle Component :%O", $scope.handleComponent);
                $scope.showCD1 = false;
                $scope.showCD2 = false;
                if ($scope.handleComponent === "HANDEP01") {
                    $scope.showCD2 = true;
                    $scope.showCD1 = false;
                    $scope.handlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.handleComponent
                    }, function (handlePriceList) {
                        console.log("Handle Price List :%O", handlePriceList);
                        angular.forEach(handlePriceList, function (hplObject) {
                            $scope.handlePriceList.push(hplObject);
                        });
                    });
                } else {
                    $scope.showCD2 = false;
                    $scope.showCD1 = true;
                    $scope.handlePriceList = [];
                    HandlePriceService.findByKitchenComponent({
                        'kitchenComponent': $scope.handleComponent
                    }, function (handlePriceList) {
                        console.log("Handle Price List :%O", handlePriceList);
                        angular.forEach(handlePriceList, function (hplObject) {
                            $scope.handlePriceList.push(hplObject);
                        });
                    });
                }
            });
            $scope.$watch('editableHandleDetail.length', function (cd) {
                console.log("CD :%O", cd);
                angular.forEach($scope.handlePriceList, function (handlePriceObject) {
                    console.log("Handle Price Object :%O", handlePriceObject.cd);
                    if (handlePriceObject.cd.toString() === cd.toString()) {
                        $scope.mainHandleObject = handlePriceObject;
                        console.log("Got the Object :%O", $scope.mainHandleObject);
                        $scope.editableHandleDetail.finish = $scope.mainHandleObject.finish;
                        $scope.editableHandleDetail.stdPrice = $scope.mainHandleObject.price;
                    } else {
                        console.log("Not My COncern ");
                    }

                });
            });
            $scope.$watch('editableHandleDetail.handleType', function (handleType) {
                HandlePriceService.get({
                    'id': handleType
                }, function (handlePriceObject) {
                    $scope.editableHandleDetail.finish = handlePriceObject.finish;
                    $scope.editableHandleDetail.stdPrice = handlePriceObject.price;
                });
            });
            ///////////////////////////////////////////////////////////////////
            $scope.closeWidget = function () {
                $scope.showHandleSelectionWidget = false;
                $scope.preHandle = {};

            };
            $scope.openHandle = function () {
                KitchenComponentService.findByCategory({
                    'category': 'HANDLE'
                }, function (handleList) {
                    $scope.handleList1 = handleList;
                });
                $scope.showHandleSelectionWidget = true;
            };
            //////////////Handle//////////////
            $scope.editableHandleDetail = {};
            $scope.selectHandle = function (componentId) {
                $scope.closeWidget();
                KitchenComponentService.get({
                    'id': componentId
                }, function (kcObject) {
                    $scope.handleName = kcObject.component;
                    $scope.handleComponent = kcObject.componentCode;
                });
            };
            $scope.selectPreHandle = function (componentId) {
                KitchenComponentService.get({
                    'id': componentId
                }, function (handleComponent) {
                    $scope.preHandle = handleComponent;
                });
            };
            ///////////////////////////////////
            $scope.saveHandleDetails = function (handleOrderDetail) {
                handleOrderDetail.orderHeadId = $stateParams.orderHeadId;
                handleOrderDetail.component = $scope.handleComponent;
//                handleOrderDetail.depth = '0';
//                handleOrderDetail.width = '0';
//                handleOrderDetail.material = '';
                var l1;
                var lengthLessThan100 = function (inputNo) {
                    var genNum = "00" + inputNo.toString();
                    l1 = genNum;
                };
                if (handleOrderDetail.length < 1000) {
                    if (handleOrderDetail.length < 100) {
                        lengthLessThan100(handleOrderDetail.length);
                    } else {
                        l1 = 0 + handleOrderDetail.length.toString();
                    }
                } else {
                    l1 = handleOrderDetail.length.toString();
                }
                var productCode = handleOrderDetail.component + "XXXXXXXX-" + l1 + "MM";
                handleOrderDetail.productCode = productCode;
                if (handleOrderDetail.component === "HANDEP01") {
                    var meterLength = (handleOrderDetail.length / 1000);
                    handleOrderDetail.preliminaryDealerprice = (handleOrderDetail.quantity * (meterLength * handleOrderDetail.stdPrice));
                } else {
                    handleOrderDetail.preliminaryDealerprice = (handleOrderDetail.quantity * handleOrderDetail.stdPrice);
                }
                console.log("Handle Save Object :%O", handleOrderDetail);
                if ($scope.orderHead.orderSubType === "D") {
                    console.log("Display Order");
                    var displayDiscountPrice = ((handleOrderDetail.preliminaryDealerprice / 100) * handleOrderDetail.displayDiscount);
                    handleOrderDetail.price = (handleOrderDetail.preliminaryDealerprice - displayDiscountPrice);
                    console.log("Handle Order Detail Save Object :%O", handleOrderDetail);
                    HandleOrderDetailsService.save(handleOrderDetail, function (handleOrderDetails) {
                        console.log("Saved Successfully");
                        $scope.editableHandleDetail = "";
                        $scope.handleName = "";
//                        $state.go('admin.masters_order_details', {
//                            'orderHeadId': $stateParams.orderHeadId
//                        }, {'reload': true});
                        $state.go('admin.masters_order_details.handle_modal', {
                            'orderHeadId': $stateParams.orderHeadId,
                            'handleDetailId': handleOrderDetails.id
                        }, {'reload': true});
                    });
                } else {
                    handleOrderDetail.price = handleOrderDetail.preliminaryDealerprice;
                    HandleOrderDetailsService.save(handleOrderDetail, function (handleOrderDetails) {
                        console.log("Saved Successfully");
                        $scope.editableHandleDetail = "";
                        $scope.handleName = "";
//                        $state.go('admin.masters_order_details', {
//                            'orderHeadId': $stateParams.orderHeadId
//                        }, {'reload': true});
                        $state.go('admin.masters_order_details.handle_modal', {
                            'orderHeadId': $stateParams.orderHeadId,
                            'handleDetailId': handleOrderDetails.id
                        }, {'reload': true});
                    });
                }
            };
            ///////////////////End//////////////////////////////////////
        })
        .controller('HardwareRepeatAdditionController', function (RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, PanelOrderDetailsService, $scope, $stateParams, $state) {

        })
        .controller('DealerSkuRepeatAdditionController', function (RateContractDetailService, FinishPriceService, ColorConstraintService, PartyService, OrderHeadService, ColorService, RawMaterialService, KitchenComponentService, PanelOrderDetailsService, $scope, $stateParams, $state) {

        });