/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.manufacturer", []);
angular.module("digitalbusiness.services.manufacturer")
        .factory('ManufacturerService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/manufacturer/:id', {'id': '@id'}, {

                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/manufacturer/find_all_list',
                    'isArray': true
                },
                'findByManufacturerCode': {
                    'method': 'GET',
                    'url': restRoot + '/manufacturer/find/manufacturer_code',
                    'params': {
                        'manufacturerCode': '@manufacturerCode'
                    },
                    'isArray': false
                },
                'findByCreator': {
                    'method': 'GET',
                    'url': restRoot + '/manufacturer/find/creator',
                    'params': {
                        'offset': '@offset',
                        'userId': '@userId'
                    },
                    'isArray': true
                },
                'findByManufacturerNameLike': {
                    'method': 'GET',
                    'url': restRoot + '/manufacturer/find/manufacturer_like',
                    'params': {
                        'manufacturerName': '@manufacturerName'
                    },
                    'isArray': true
                }
            });
        });
