'use strict';
angular.module('myApp', []).
  controller('MainCtrl',['$scope','$http','$location',
    function($scope,$http){
        $scope.p1score = 0;
        $scope.p2score = 0;
        $http.get('http://localhost:3000/newgame')
        .then(function success(response){
            $scope.svr = response.data;
            var data = angular.fromJson(response.data);
            if(data.active_player == 1){
                $scope.p1style='background-color:red';
                $scope.p1active=1;
                $scope.p2active=0;
            }else{
                $scope.p2style='background-color: red';
                $scope.p2active=1;
                $scope.p1active=0;
            }
            
        },function fail(response){
            console.log('failed connect to server.....');
        });
        $scope.click = function(data){
            var postParam = {json:data};
            $http.post('http://localhost:3000/click',postParam)
            .then(function success(response){
              var data = angular.fromJson(response.data);
              $scope.svr = response.data;
              if(data.foundWin == 1){
                if(data.active_player == 1){
                    var curScore = $scope.p1score;
                    curScore += 1;
                    $scope.p1score = curScore;
                }else if(data.active_player == 2){
                    var curScore = $scope.p2score;
                    curScore += 1;
                    $scope.p2score = curScore;                  
                }
              }
            },function fail(response){
                
            })
        }
        
        
    }]);