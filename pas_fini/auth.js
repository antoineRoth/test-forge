var ForgeViewer;

window.addEventListener("load", function () {
	var xmlHttp = null;
	xmlHttp = new XMLHttpRequest();

	xmlHttp.open("POST",
	'https://developer.api.autodesk.com/authentication/v1/authenticate',
	false);

	var options = {
		client_id : CLIENT_ID,
		client_secret : CLIENT_SECRET,
		grant_type : client_credentials,
		scope : "data:read, data:write"
	}

	xmlHttp.send(options);
	return xmlHttp.responseText;
})