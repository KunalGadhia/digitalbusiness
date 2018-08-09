//var digitalbusiness = angular.module("digitalbusiness", [
angular.module("digitalbusiness", [
    //    include libraries
    'ui.router',
    'ngResource',
    'angularFileUpload',
    'googlechart',
//    'safedeals.map',
    'ngAnimate',
    'angular.filter',
    //'ngFileSaver',
    //  include filter
    'digitalbusiness.filters',
    //  include constants
    'digitalbusiness.constants',
    // include directives
//    'angularjs-dropdown-multiselect',
    //'safedeals.services.scroll',
    // include services
//    'safedeals.services.branch',
    'digitalbusiness.services.user',
    'digitalbusiness.services.employee',
    'digitalbusiness.services.notification',
    'digitalbusiness.services.party',
    'digitalbusiness.services.segment',
    'digitalbusiness.services.sale_type',
    'digitalbusiness.services.order_head',
    'digitalbusiness.services.department',
    'digitalbusiness.services.reason',
    'digitalbusiness.services.kitchen_component',
    'digitalbusiness.services.raw_material',
    'digitalbusiness.services.order_details_service',
    'digitalbusiness.services.standard_carcass_dimension',
    'digitalbusiness.services.color',
    'digitalbusiness.services.standard_carcass_price',
    'digitalbusiness.services.carcass_order_details_service',
    'digitalbusiness.services.color_constraint',
    'digitalbusiness.services.finish_price_service',
    'digitalbusiness.services.section_profile',
    'digitalbusiness.services.carcass_subtype',
    'digitalbusiness.services.panel_material_thickness',
    'digitalbusiness.services.panel_order_details_service',
    'digitalbusiness.services.filler_order_details_service',
    'digitalbusiness.services.pelmet_order_details_service',
    'digitalbusiness.services.cornice_order_details_service',
    'digitalbusiness.services.handle_price',
    'digitalbusiness.services.handle_order_details_service',
    'digitalbusiness.services.shutter_order_details_service',
    'digitalbusiness.services.shutter_finish_price',
    'digitalbusiness.services.drawer_order_details_service',
    'digitalbusiness.services.shutter_handle_mapping_service',
    'digitalbusiness.services.filler_finish_price',
    'digitalbusiness.services.drawer_handle_mapping_service',
    'digitalbusiness.services.rate_contract',
    'digitalbusiness.services.rate_contract_detail',
    'digitalbusiness.services.hardware_price',
    'digitalbusiness.services.hardware_order_details_service',
    'digitalbusiness.services.max_kitchen',
    'digitalbusiness.services.max_kitchen_order_details_service',
    'digitalbusiness.services.max_wardrobe',
    'digitalbusiness.services.max_wardrobe_order_details_service',
    'digitalbusiness.services.shutter_component_mapping_service',
    'digitalbusiness.services.drawer_component_mapping_service',
    //New Offerings V2
    'digitalbusiness.services.max_beds',
    'digitalbusiness.services.ultima_wardrobe_order_details_service',
    'digitalbusiness.services.infinity_wardrobe_order_details_service',
    'digitalbusiness.services.infinity_wardrobe',
    'digitalbusiness.services.ultima_wardrobe',
    'digitalbusiness.services.infinity_wardrobe_mrp',
    'digitalbusiness.services.max_wardrobe_mrp',
    'digitalbusiness.services.max_kitchen_mrp',
    'digitalbusiness.services.order_head_mrp',
    'digitalbusiness.services.infinity_wardrobe_mrp_order_details_service',
    'digitalbusiness.services.max_wardrobe_mrp_order_details_service',
    'digitalbusiness.services.max_kitchen_mrp_order_details_service',
    //ERP INTEGRATION SERVICE
    'digitalbusiness.services.erp_integration',

//    // directive services
//    'safedeals.services.bank_addition',
    // include controllers and states
    'digitalbusiness.states',
    'digitalbusiness.states.admin',
    'digitalbusiness.states.employee',
    'digitalbusiness.states.notification',
    'digitalbusiness.states.party',
    'digitalbusiness.states.segment',
    'digitalbusiness.states.sale_type',
    'digitalbusiness.states.order',
    'digitalbusiness.states.department',
    'digitalbusiness.states.reason',
    'digitalbusiness.states.kitchen_component',
    'digitalbusiness.states.raw_material',
    'digitalbusiness.states.standard_carcass_dimesnion',
    'digitalbusiness.states.masters_color',
    'digitalbusiness.states.standard_carcass_price',
    'digitalbusiness.states.color_constraint',
    'digitalbusiness.states.finish_price',
    'digitalbusiness.states.masters_section_profile',
    'digitalbusiness.states.carcass_subtype',
    'digitalbusiness.states.panel_material_thickness',
    'digitalbusiness.states.handle_price',
    'digitalbusiness.states.shutter_finish_price',
    'digitalbusiness.states.user',
    'digitalbusiness.states.shutter_handle_mapping',
    'digitalbusiness.states.filler_finish_price',
    'digitalbusiness.states.drawer_handle_mapping',
    'digitalbusiness.states.masters_rate_contract',
    'digitalbusiness.states.approved_order_report',
    'digitalbusiness.states.hardware',
    'digitalbusiness.states.shutter_component_mapping',
    'digitalbusiness.states.drawer_component_mapping',
    'digitalbusiness.states.unapproved_order_report',
    'digitalbusiness.states.party_order_report',
    'digitalbusiness.states.order_report',
    'digitalbusiness.states.order_mrp',

    'digitalbusiness.states.auth'

])

        .run(['$state', '$rootScope', 'AuthFactory', '$location', 'UserService', function ($state, $rootScope, AuthFactory, $location, UserService) {
                AuthFactory.registerUserChangeHandler(function (currentUser) {
                    $rootScope.currentUser = currentUser;
                });

                AuthFactory.refresh().then(function (currentUser) {
                }, function (reason) {
                    $location.path("login");
                });
//                //CORS Added///////
//                digitalbusiness.config(['$httpProvider', function ($httpProvider) {
//
//                        $httpProvider.defaults.useXDomain = true;
//
//                        delete $httpProvider.defaults.headers.common['X-Requested-With'];
//
//                    }
//
//                ]);
//                // Added all header request and response.
//                digitalbusiness.all('/*', function (request, response, next) {
//                    response.header("Access-Control-Allow-Origin", "*");
//                    response.header("Access-Control-Allow-Headers", "X-Requested-With");
//                    response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
//                    next();
//                });
            }]);
////CORS Added///////
//digitalbusiness.config(['$httpProvider', function ($httpProvider) {
//
//        $httpProvider.defaults.useXDomain = true;
//
//        delete $httpProvider.defaults.headers.common['X-Requested-With'];
//
//    }
//
//]);
//// Added all header request and response.
//digitalbusiness.all('/*', function (request, response, next) {
//    console.log("Getting Into CORS");
//    response.header("Access-Control-Allow-Origin", "*");
//    response.header("Access-Control-Allow-Headers", "X-Requested-With");
//    response.header("Access-Control-Allow-Methods", "GET, POST", "PUT", "DELETE");
//    next();
//});
