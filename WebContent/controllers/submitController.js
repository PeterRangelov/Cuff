cuff.controller('submitController', ['$scope', 'SubmissionService', 'DropdownService', '$http', '$location', '$httpParamSerializerJQLike', function($scope, SubmissionService, DropdownService, $http, $location, $httpParamSerializerJQLike) {
	$scope.Math = window.Math;
	$scope.isProcessing = false;
	
	$scope.contributor = SubmissionService.getContributor();
	$scope.subject = SubmissionService.getSubject();
	$scope.physicalAppearance = SubmissionService.getPhysicalAppearance();
	$scope.judgments = SubmissionService.getJudgments();
	$scope.warrants = SubmissionService.getWarrants();
	$scope.criminalHistory = SubmissionService.getCriminalHistory();
	
	$scope.isError=false;
	$scope.errorCode;
	$scope.errorCodeText;
	$scope.errorDetails;
	
	
	console.log(SubmissionService.getContributor());

	$scope.previousStep = function() {
		console.log('Going back')
		$location.path('criminal_history')
	}
	
	$scope.nextStep = function(isValid) {
		console.log('Validating form. Valid? '+isValid)
		if (isValid) {
			
		}
	}

	

	$scope.submit = function() {
		// if (isValid) {
			console.log('Submitting to WS')
			
			$scope.isProcessing = true;
			var contributor = SubmissionService.getContributor();
			var subject = SubmissionService.getSubject();
			var physicalAppearance = SubmissionService.getPhysicalAppearance();
			var warrants = SubmissionService.getWarrants();
			var judgments = SubmissionService.getJudgments();
			var criminalHistory = SubmissionService.getCriminalHistory();
			
			console.log(contributor)
			console.log(subject)
			console.log(physicalAppearance)
			console.log(warrants)

			// issue POST request
			$http({
				  method: 'POST',
				  url: '/rest/submit',
				  data: $httpParamSerializerJQLike({
					  testInput: "TESTING!",
					  contributor: JSON.stringify(contributor),
					  subject: JSON.stringify(subject),
					  physical_appearance: JSON.stringify(physicalAppearance),
					  warrants: JSON.stringify(warrants),
					  judgments: JSON.stringify(judgments),
					  criminal_history: JSON.stringify(criminalHistory)
				  })
				})
				.then(
			       function(response){
			         console.log(response.data);
			         $location.path('confirmation');
			       }, 
			       function(response){
			         console.log(response);
			         $scope.isError=true;
			         $scope.errorCode = response.status
			         $scope.errorCodeText = response.statusText
			         $scope.errorDetails=response.data;
			         $scope.isProcessing = false;
			    });
			
//			console.log(contributor)
//			console.log(subject)
//			console.log(physicalAppearance)
//			console.log(judgments)
//			console.log(warrants)
//			console.log(criminalHistory)
		// }
	}

	
}]);