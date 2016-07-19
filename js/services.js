app.service('sessionsService', function($http){

	this.authorize = function(username, password) {		
		var soapData = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:enterprise.soap.sforce.com"><soapenv:Body><urn:login><urn:username>'
		soapData += username + '</urn:username><urn:password>';
		soapData += password + '</urn:password></urn:login></soapenv:Body></soapenv:Envelope>';	
		var aspAction = 'js/actions/connect.asp';
		
		return $http.post(aspAction, soapData);
	};

	this.getRegistrants = function(sessionToken, eventId, mobileSecret) {

		var soapData = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:eeg="http://soap.sforce.com/schemas/class/EEG_SessionMobileWebService"><soapenv:Header><eeg:SessionHeader><eeg:sessionId>';
		soapData += sessionToken + '</eeg:sessionId></eeg:SessionHeader></soapenv:Header><soapenv:Body>';
		soapData += '<eeg:getAllRegistrations><eeg:eventId>';
		soapData += eventId + '</eeg:eventId><eeg:mobileAppSecretKey>';
		soapData += mobileSecret + '</eeg:mobileAppSecretKey></eeg:getAllRegistrations></soapenv:Body></soapenv:Envelope>';
		var aspAction = 'js/actions/getSessions.asp';

		return $http({
			method: 'POST',
			url: 'https://eeginc.my.salesforce.com/services/Soap/class/EEG_SessionMobileWebService',
			data: soapData
		});

		return $http({
			method: 'POST',
			url: aspAction,
			data: soapData,
			headers: {
				"Accept": '*/*',
				"Content-Type" : "text/xml"
			}
		});
	};
	
});