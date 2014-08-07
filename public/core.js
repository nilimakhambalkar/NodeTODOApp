var todo = angular.module('todoApp',[]);

todo.controller('todoAppController',function($scope,$http){

	$scope.formData = [];

	

	$scope.createTodo = function(){
		console.log("$scope.formData : "+$scope.formData.text);
		$http.post('/api/todos',$scope.formData)
		.success(function(data){
			$scope.formData = [];
			$scope.todos = data;
			for (var i = $scope.todos.length - 1; i >= 0; i--) {
				
				console.log($scope.todos[i].text);
			};
			
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	$scope.deleteTodo = function(){
		$http.delete('/api/todos/'+id)
		.success(function(data){
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};
})