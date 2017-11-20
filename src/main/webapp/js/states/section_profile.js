/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.states.masters_section_profile", [])
        .config(function ($stateProvider, templateRoot) {
            $stateProvider.state('admin.masters_section_profile', {
                'url': '/section_profile_master?offset',
                'templateUrl': templateRoot + '/masters/section_profile/list.html',
                'controller': 'SectionProfileListController'
            });
            $stateProvider.state('admin.masters_section_profile.add', {
                'url': '/add',
                'templateUrl': templateRoot + '/masters/section_profile/form.html',
                'controller': 'SectionProfileAddController'
            });
            $stateProvider.state('admin.masters_section_profile.edit', {
                'url': '/:sectionProfileId/edit',
                'templateUrl': templateRoot + '/masters/section_profile/form.html',
                'controller': 'SectionProfileEditController'
            });
            $stateProvider.state('admin.masters_section_profile.delete', {
                'url': '/:sectionProfileId/delete',
                'templateUrl': templateRoot + '/masters/section_profile/delete.html',
                'controller': 'SectionProfileDeleteController'
            });            
        })        
        .controller('SectionProfileListController', function (SectionProfileService, $scope, $stateParams, $state, paginationLimit) {
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

            $scope.nextSectionProfiles = SectionProfileService.query({
                'offset': $scope.nextOffset
            });
            $scope.mainArray = [];
            $scope.sectionProfiles = SectionProfileService.query({
                'offset': $scope.currentOffset
            }, function (s) {
//                angular.forEach(s, function (singleObject) {
//                    var restCall = "./rest/color/" + singleObject.id + "/attachment";
//                    singleObject.imagePath = restCall;
//                    console.log("What si this :%O", singleObject);
////                    $scope.mainArray.push(singleObject);
//                });

            });

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
        .controller('SectionProfileAddController', function (SectionProfileService, $scope, $stateParams, $state, paginationLimit) {

            $scope.editableSectionProfile = {};

            $scope.saveSectionProfile = function (sectionProfile) {
                console.log("C :", sectionProfile);
                SectionProfileService.save(sectionProfile, function (savedData) {
                    console.log("Saved Data :%O", savedData);
                    $state.go('admin.masters_section_profile', null, {'reload': true});
                });
            };

            $scope.$watch('editableSectionProfile.name', function (sectionProfile) {
                console.log("Name :" + sectionProfile);
                SectionProfileService.findByName({'name': sectionProfile}).$promise.catch(function (response) {
                    if (response.status === 500) {
                        $scope.editableSectionProfile.repeatName = false;
                    } else if (response.status === 404) {
                        $scope.editableSectionProfile.repeatName = false;
                    } else if (response.status === 400) {
                        $scope.editableSectionProfile.repeatName = false;
                    }
                }).then(function (sectionProfile) {
                    if (sectionProfile.name !== null) {
                        $scope.editableSectionProfile.repeatName = true;
                    }
                    ;
                });
            });           
        })
        .controller('SectionProfileEditController', function (SectionProfileService, $scope, $stateParams, $state, paginationLimit) {
            console.log("Inside SP :%O", $stateParams.sectionProfileId);
            SectionProfileService.get({'id': $stateParams.sectionProfileId});
            SectionProfileService.get({
                'id': $stateParams.sectionProfileId
            }, function (sectionProfileData) {
//                segmentData.empMobileNumber = parseInt(segmentData.empMobileNumber);
                $scope.editableSectionProfile = sectionProfileData;
            });

            $scope.saveSectionProfile = function (sectionProfile) {
                sectionProfile.$save(function () {
                    $state.go('admin.masters_section_profile',null, {'reload': true});
                });
//               
            };
        })
        .controller('SectionProfileDeleteController', function (SectionProfileService, $scope, $stateParams, $state, paginationLimit) {
            $scope.editableSectionProfile = SectionProfileService.get({'id': $stateParams.sectionProfileId});
            $scope.deleteSectionProfile = function (sectionProfile) {
                sectionProfile.$delete(function () {
                    $state.go('admin.masters_section_profile', null, {'reload': true});
                });
            };
        });


