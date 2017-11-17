(function (){
    var app = angular.module('starter', ['ionic', 'starter.contactstore']);
           app.config(function($stateProvider, $urlRouterProvider){ 
               $stateProvider.state('details', {
                   url:'/details/:id',
                   templateUrl:'templates/details.html'
               });
               $stateProvider.state('home', {
                   url:'/home',
                   templateUrl:'templates/home.html'
               });
               $stateProvider.state('list', {
                   url:'/list',
                   templateUrl:'templates/list.html'
               });
               $stateProvider.state('edit', {
                   url:'/edit/:id',
                   controller:'EditCtrl',
                   templateUrl:'templates/edit.html'
               });
               $stateProvider.state('create', {
                   url:'/create',
                   controller:'CreateCtrl',
                   templateUrl:'templates/edit.html'
               });  
     $urlRouterProvider.otherwise('/home');
           });
            
    app.controller('listCtrl', function($scope, ContactStore, $timeout, $http){
        $scope.contactos = ContactStore.list();
        $scope.newcontactos = ContactStore.list();
        $scope.doRefresh = function (){
            $timeout( function() {
                $scope.$broadcast('scroll.refreshComplete');
             }, 500)
        }; 
      $scope.$broadcast('scroll.infiniteScrollComplete');
        $scope.remove = function(id){
          ContactStore.remove(id);  
    };
           });
    app.controller('DetailsCtrl', function($scope, $state, ContactStore){
        $scope.id = $state.params.id;
        $scope.contacto = ContactStore.get($scope.id);
        });
    
    app.controller('EditCtrl', function($scope, $state, ContactStore){
        $scope.id = $state.params.id;
        $scope.contacto = angular.copy(ContactStore.get($scope.id));
        $scope.save = function(){
            ContactStore.update($scope.contacto);
            $state.go('list');
        };
     });

    app.controller('CreateCtrl', function($scope, $state, ContactStore){
        $scope.contacto = {id: new Date().getTime().toString(), name:'', observations:'', email:'', identification:'', phonePrimary:'', address:'', type:'', fax:'', mobile:'', phoneSecondary:''};
        $scope.save = function(){
            ContactStore.create($scope.contacto);
            $state.go('list');
        };
     });
        app.run(function($ionicPlatform) {
          $ionicPlatform.ready(function() {
            if(window.cordova && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);
            }
            if(window.StatusBar) {
              StatusBar.styleDefault();
            }
            });
        });
}());
