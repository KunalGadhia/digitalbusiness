/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module("digitalbusiness.services.segment", []);
angular.module("digitalbusiness.services.segment")
        .factory('SegmentService', function ($resource, restRoot, contextPath) {
            return $resource(restRoot + '/segment/:id', {'id': '@id'}, {
                
                'findBySegmentLike': {
                    'method': 'GET',
                    'url': restRoot + '/segment/find/segment_like',
                    'params': {
                        'segment': '@segment'
                    },
                    'isArray': true
                },
                'findAllList': {
                    'method': 'GET',
                    'url': restRoot + '/segment/find_all_list',                    
                    'isArray': true
                },
                'findBySegment': {
                    'method': 'GET',
                    'url': restRoot + '/segment/find/segment',
                    'params': {
                        'segment': '@segment'
                    },
                    'isArray': false
                }
            });
        });




