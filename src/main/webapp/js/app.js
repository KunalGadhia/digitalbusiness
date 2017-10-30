angular.module("digitalbusiness", [
    //    include libraries
    'ui.router',
    'ngResource',
    'angularFileUpload',
    'googlechart',
//    'safedeals.map',
    'ngAnimate',
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

//    // directive services
//    'safedeals.services.bank_addition',
    // include controllers and states
    'digitalbusiness.states',
    'digitalbusiness.states.admin',
    'digitalbusiness.states.employee',
    'digitalbusiness.states.party',

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
