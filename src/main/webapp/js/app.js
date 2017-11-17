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

//    // directive services
//    'safedeals.services.bank_addition',
    // include controllers and states
    'digitalbusiness.states',
    'digitalbusiness.states.admin',
    'digitalbusiness.states.employee',
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

    'digitalbusiness.states.auth'

])

        .run(['$state', '$rootScope', 'AuthFactory', '$location', 'UserService', function ($state, $rootScope, AuthFactory, $location, UserService) {
                console.log("Auth Factory :%O", AuthFactory);
//                UserService.login({
//                    'username': "guest",
//                    'password': "guest"
//                }, function () {
//                    console.log("Coming Here to log in as a guest??");
//                    $state.go("corporate_site.home", {reload: 'true'});                    
//                }, function () {
//                    $rootScope.error = "Login Failed. Invalid Credentials.";
//                });
//                $state.go("corporate_site.home", {reload: 'true'});

//For tracking state changes during runtime.. outputs the statename as a state change is triggered
//            $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
//                console.log("Switching To: ", toState.name);
//            });
                AuthFactory.registerUserChangeHandler(function (currentUser) {
                    console.log("What is Current User :%O", currentUser);
                    $rootScope.currentUser = currentUser;
                });

                AuthFactory.refresh().then(function (currentUser) {
                    console.log("Current User is", currentUser);
                }, function (reason) {
//                console.log("Reason :%O", reason);
//                User is not Logged in
                    $location.path("login");
//                    UserService.login({
//                        'username': 'guest',
//                        'password': 'guest'
//                    }, function () {
//                        console.log("Log in as a guest");
//                        $state.go("main.intro.intro_tagline", {reload: 'true'});
//                    }, function () {
//                        $rootScope.error = "Login Failed. Invalid Credentials.";
//                    });
                    //$state.go("main.intro.intro_tagline", {reload: 'true'});
                    //$state.go("corporate_site.home", {reload: 'true'});
                });
//            $state.go('admin.masters');
            }]);
