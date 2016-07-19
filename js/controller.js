app.controller('EegCtrl', function($base64, $scope, $state, $stateParams, sessionsService){

	//Helper function to re-render inputs
	$scope.renderInputs = function() {
		setTimeout(function(){componentHandler.upgradeDom()});
	};	

	//Get session token
	$scope.connect = function(){
		var authorize = sessionsService.authorize($scope.eeg.creds.username, $scope.eeg.creds.password);
		authorize.then(function(obj){
			var parseXml,
				xmlSessionDoc;

			//Ensure response is OK
			if(obj.statusText === 'OK' && obj.data) {
				//Ensure xml parsing is available
				if (typeof window.DOMParser != "undefined"){
					parseXml = function(xmlStr) {
						return (new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
					}
					xmlSessionDoc = parseXml(obj.data);
				} else {
					console.log("ERROR: please use a modern browser.");
					$scope.eeg.error = true;
				}

				if (xmlSessionDoc){
					var sessionTokenElement = xmlSessionDoc.getElementsByTagName('sessionId')[0];
					
					//Check for sessionId element
					if(sessionTokenElement){
						$scope.eeg.creds.sessionToken = sessionTokenElement.innerHTML;
						$scope.eeg.creds.authorized = true;
						$scope.eeg.creds.authroizedText = "Authorized";
					} else {
						console.log("ERROR: invalid credentials.");
						$scope.eeg.error = true;
					}					
				}
			} else {
				console.log("ERROR: unsuccessful request.");
				$scope.eeg.error = true;
			}
		},
			function(err){
				console.log("ERROR");
				console.log(err);
				$scope.eeg.error = true;
			}
		);
	};

	$scope.getRegList = function() {
		$scope.eeg.results = {};
		var getRegs = sessionsService.getRegistrants($scope.eeg.creds.sessionToken, $scope.eeg.creds.eventId, $scope.eeg.creds.mobileSecret);
		getRegs.then(function(obj){
			console.log(obj);
			if(obj.statusText === 'OK' && obj.data){
				var parseXml,
					xmlDoc;
				//Ensure xml parsing is available
				if (typeof window.DOMParser != "undefined"){
					parseXml = function(xmlStr) {
						return (new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
					}
					xmlDoc = parseXml(obj.data);
				} else {
					console.log("ERROR: please use a modern browser.");
					$scope.eeg.error = true;
				}

				if(xmlDoc){
					var registrationEl = xmlDoc.getElementsByTagName('result');
					console.log(registrationEl);
					$scope.eeg.sessionNumbers = sessionElements.length;					
					if(sessionElements.length > 0){
						$scope.eeg.success = true;
						$scope.parseResults(sessionElements);
					} else {
						console.log("ERROR: no sessions");
						$scope.eeg.error = true;
					}

				} else {
					console.log("ERROR: no response.");
					$scope.eeg.error = true;
				}
			} else {
				console.log("ERROR: unsuccessful request.");
				$scope.eeg.error = true;
			}

		},
			function(err){
				console.log("ERROR");
				console.log(err);
				$scope.eeg.error = true;
			}
		);
	};	
	
	$scope.eeg = {};
	$scope.eeg.creds = {};
	$scope.eeg.creds.username = '';
	$scope.eeg.creds.password = '';
	$scope.eeg.creds.mobileSecret = '';
	$scope.eeg.creds.eventId = '';
	$scope.eeg.creds.authorized = false;
	$scope.eeg.creds.url = 'https://login.salesforce.com/services/Soap/c/24.0/';
	$scope.eeg.creds.sessionToken = '';
	$scope.eeg.creds.authroizedText = "Authorize";

	$scope.eeg.results = {};	
	$scope.eeg.tableData = [];
	$scope.eeg.success = false;
	$scope.eeg.error = false;
	$scope.eeg.sessionNumbers = 0;

	//Import url paramaters if they exist
	if($stateParams.u){
		$scope.eeg.creds.username = $stateParams.u;
	}
	if($stateParams.p){
		$scope.eeg.creds.password = $stateParams.p;
	}
	if($stateParams.e){
		$scope.eeg.creds.eventId = $stateParams.e;
	}
	if($stateParams.m){
		$scope.eeg.creds.mobileSecret = $stateParams.m;
	}


	$scope.renderInputs();

});

app.controller('RegistrantsCtrl', function($scope, $state){

});

//Passbook Settings Element
app.directive('settings', function() {
	return {
		restrict: 'E',
		templateUrl: './js/templates/settings.html',
		link: function($scope){
			$scope.renderInputs();
		}
	}
});

app.directive('person', function() {
	return {
		restrict: 'E',
		templateUrl: './js/templates/person.html'
	}
});