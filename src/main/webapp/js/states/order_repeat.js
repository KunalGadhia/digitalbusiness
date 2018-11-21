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
//            $stateProvider.state('admin.masters_color.add', {
//                'url': '/add',
//                'templateUrl': templateRoot + '/masters/color/form.html',
//                'controller': 'ColorAddController'
//            });
//            $stateProvider.state('admin.masters_color.edit', {
//                'url': '/:colorId/edit',
//                'templateUrl': templateRoot + '/masters/color/form.html',
//                'controller': 'ColorEditController'
//            });
//            $stateProvider.state('admin.masters_color.delete', {
//                'url': '/:colorId/delete',
//                'templateUrl': templateRoot + '/masters/color/delete.html',
//                'controller': 'ColorDeleteController'
//            });
//            $stateProvider.state('admin.masters_color.photo', {
//                'url': '/:colorId/photo',
//                'templateUrl': templateRoot + '/masters/color/photo.html',
//                'controller': 'ColorPhotoController'
//            });
//            $stateProvider.state('admin.masters_color.view', {
//                'url': '/:colorId/view',
//                'templateUrl': templateRoot + '/masters/color/view.html',
//                'controller': 'ColorViewController'
//            });
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
                    carcassOrderDetailObject.stdCarcassPriceId = carcassOrderDetailObject.stdCarcassPriceId.toString();

                    if (carcassOrderDetailObject.sectionProfileId !== null) {
                        carcassOrderDetailObject.sectionProfileId = carcassOrderDetailObject.sectionProfileId.toString();
                    }
                    carcassOrderDetailObject.id = '';
                    carcassOrderDetailObject.productCode = '';
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
                    
                    if(carcassOrderDetailObject.sideMatching === 'NSM'){
                        carcassOrderDetailObject.sideMatching = '';
                    }
                    
                    if(carcassOrderDetailObject.sideSelection === 'NSS'){
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
                    $scope.stdMaterialObject = RawMaterialService.findByMaterialCode({
                        'materialCode': orderDetail.material
                    });
                    $scope.finishObject = FinishPriceService.findByFinishCode({
                        'finishCode': orderDetail.sideFinish
                    });
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
        });
//        .controller('ColorPhotoController', function (ColorService, restRoot, FileUploader, $scope, $stateParams, $state) {
//            console.log("$stateparam :%O", $stateParams);
//            $scope.enableSaveButton = true;
//            ColorService.get({
//                'id': $stateParams.colorId
//            }, function (color) {
//                $scope.colorObject = color;
//                console.log("COlor Object :%O", $scope.colorObject);
//            });
//            $scope.goBack = function () {
//                $state.go('admin.masters_color.edit', {
//                    'colorId': $stateParams.colorId
//                }, {'reload': true});
//            };
//            var uploader = $scope.fileUploader = new FileUploader({
//                url: restRoot + '/color/' + $stateParams.colorId + '/attachment',
//                autoUpload: true,
//                alias: 'attachment'
//            });
//            uploader.onBeforeUploadItem = function (item) {
//                $scope.uploadInProgress = true;
//                $scope.uploadSuccess = false;
//                console.log("before upload item:", item);
//                console.log("uploader", uploader);
//            };
//            uploader.onErrorItem = function (fileItem, response, status, headers) {
//                $scope.uploadFailed = true;
//                $scope.uploadInProgress = false;
//                $scope.uploadSuccess = false;
////                    $state.go('.', {}, {'reload': true});
//                console.log("upload error");
////                $scope.refreshRawMarketPrice();
//            };
//            uploader.onCompleteItem = function (fileItem, response, status, headers) {
//                if (status === 200) {
//                    console.log("Upload Successful");
//                    $state.go('admin.masters_color.photo', {
//                        'colorId': $stateParams.colorId
//                    }, {'reload': true});
//                    $scope.uploadInProgress = false;
//                    $scope.uploadFailed = false;
//                    $scope.uploadSuccess = true;
//                    $scope.enableSaveButton = false;
//                } else if (status === 500)
//                {
//                    $scope.uploadInProgress = false;
//                    $scope.uploadFailed = false;
////                    $scope.uploadWarning = true;
//                } else {
//                    $scope.uploadInProgress = false;
//                    $scope.uploadFailed = true;
//                }
//
//                console.log("upload completion", response);
//            };
//
//        })
//        .controller('ColorListController', function (ColorService, $q, $scope, $stateParams, $state, paginationLimit) {
//            if (
//                    $stateParams.offset === undefined ||
//                    isNaN($stateParams.offset) ||
//                    new Number($stateParams.offset) < 0)
//            {
//                $scope.currentOffset = 0;
//            } else {
//                $scope.currentOffset = new Number($stateParams.offset);
//            }
//
//            $scope.nextOffset = $scope.currentOffset + 10;
//
//            $scope.nextColors = ColorService.query({
//                'offset': $scope.nextOffset
//            });
//            $scope.mainArray = [];
//            $scope.colors = ColorService.query({
//                'offset': $scope.currentOffset
//            }, function (s) {
//            });
//
//            $scope.nextPage = function () {
//                $scope.currentOffset += paginationLimit;
//                $state.go(".", {'offset': $scope.currentOffset}, {'reload': true});
//            };
//            $scope.previousPage = function () {
//                if ($scope.currentOffset <= 0) {
//                    return;
//                }
//                $scope.currentOffset -= paginationLimit;
//                $state.go(".", {'offset': $scope.currentOffset}, {'reload': true});
//            };
//            $scope.$watch('colorCategory', function (colorCategory) {
//                console.log("Color Category :%O", colorCategory);
//                if (colorCategory === '') {
//                    $scope.colors = ColorService.query({
//                        'offset': $scope.currentOffset
//                    }, function (s) {
//                    });
//                } else {
//                    ColorService.findByColorCategory({
//                        'colorCategory': colorCategory
//                    }, function (colorList) {
//                        $scope.colors = colorList;
//                    });
//                }
//            });
//        })
//        .controller('ColorAddController', function (ColorService, $scope, $stateParams, $state, paginationLimit) {
//
//            $scope.editableColor = {};
//
//            $scope.saveColor = function (color) {
//                console.log("C :", color);
//                ColorService.save(color, function (savedData) {
//                    console.log("Saved Data :%O", savedData);
//                    $state.go('admin.masters_color.photo', {
//                        'colorId': savedData.id
//                    }, {'reload': true});
//                });
//            };
//
//            $scope.$watch('editableColor.colorName', function (color) {
//                console.log("Name :" + color);
//                ColorService.findByColor({'color': color}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editableColor.repeatName = false;
//                    } else if (response.status === 404) {
//                        $scope.editableColor.repeatName = false;
//                    } else if (response.status === 400) {
//                        $scope.editableColor.repeatName = false;
//                    }
//                }).then(function (color) {
//                    if (color.colorName !== null) {
//                        $scope.editableColor.repeatName = true;
//                    }
//                    ;
//                });
//            });
//            $scope.$watch('editableColor.colorCode', function (colorCode) {
//                console.log("Name :" + colorCode);
//                ColorService.findByColorCode({'colorCode': colorCode}).$promise.catch(function (response) {
//                    if (response.status === 500) {
//                        $scope.editableColor.repeatCode = false;
//                    } else if (response.status === 404) {
//                        $scope.editableColor.repeatCode = false;
//                    } else if (response.status === 400) {
//                        $scope.editableColor.repeatCode = false;
//                    }
//                }).then(function (color) {
//                    console.log("Color :%O", color);
//                    if (color.colorCode !== null) {
//                        $scope.editableColor.repeatCode = true;
//                    }
//                    ;
//                });
//            });
//        })
//        .controller('ColorEditController', function (ColorService, $scope, $stateParams, $state, paginationLimit) {
//            console.log("Inside Color :%O", $stateParams.colorId);
//            ColorService.get({'id': $stateParams.colorId});
//            ColorService.get({
//                'id': $stateParams.colorId
//            }, function (colorData) {
////                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
//                $scope.editableColor = colorData;
//            });
//
//            $scope.saveColor = function (color) {
//                color.$save(function () {
//                    $state.go('admin.masters_color.photo', {
//                        'colorId': color.id
//                    }, {'reload': true});
//                });
////               
//            };
//        })
//        .controller('ColorDeleteController', function (ColorService, $scope, $stateParams, $state, paginationLimit) {
//            $scope.editableColor = ColorService.get({'id': $stateParams.colorId});
//            $scope.deleteColor = function (color) {
//                color.$delete(function () {
//                    $state.go('admin.masters_color', null, {'reload': true});
//                });
//            };
//        });
//
//
