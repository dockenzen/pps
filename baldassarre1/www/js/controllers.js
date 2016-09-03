angular.module('starter.controllers', [])

.controller('PaisesCtrl', function($scope) {  
$http.get('https://restcountries.eu/rest/v1/region/americas')
  .then(function(respuesta) {       

         $scope.listadoPaises = respuesta.data;
         console.log(respuesta.data);

    },function (error) {
         $scope.listadoPaises= [];
        console.log( error);
        
   });
})
.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats, $timeout,$http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.misMensajes = [];
  var VariableFireBase = new Firebase('https://primerfirebase-a52b4.firebaseio.com/');
  


 VariableFireBase.on('child_added', function (snapshot) 
  {
    $timeout(function(){
            var message = snapshot.val();
            $scope.misMensajes.push(message);
            console.log($scope.misMensajes);
    });
    
  });

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});



