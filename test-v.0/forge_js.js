window.addEventListener("load",function(){
	/*
	
			IMPORTANT : Ne pas passer par l'api de calin pour ce test (on a un fichier 
			ifc en local pour le test, donc : 
			=> aller se renseigner sur le site de forge pour savoir comment marche leur commande à distance
				(https://developer.api.autodesk.com/modelderivative/v2/viewers/viewer3D.min.js?v=v6.0)
			=> se recentrer sur l'obtention du token depuis forge
			=> faire une connection (avec tester2@4Dcollab.fr; Qwerty2019,)
			=> faire une session pour pouvoir afficher le modèle dans le viexer (avec le token)
	
	*/
	var ForgeViewer;
	var logButton = document.getElementById("register");
	
	logButton.addEventListener("click", function() {
		document.getElementById("").value = ;
		console.log("coucou");
	});
	
	// Logique de l'api de calin pour pouvoir afficher un modèle dans le viewer autodesk forge.
	
	//post token => pour cette version je le met ne dur dans le fichier app.config.js
	//post api/session/create/{name}
	//get api/model/samplesList => keep a encodedModelUrn
	//post api/model/{encodedModelUrn}
	//post api/session/save
	//post api/session/close

	function forgeLaunchViewer(urn) {
		var options = {
			env: 'AutodeskProduction',
			getAccessToken: forgeGetToken
		};
		var documentId = 'urn:' + urn;
		console.log('URN : ' + urn);
		Autodesk.Viewing.Initializer(options, function onInitialized() {
			ForgeViewer = new Autodesk.Viewing.ViewingApplication('forgeViewer');
			ForgeViewer.registerViewer(ForgeViewer.k3D, Autodesk.Viewing.Private.GuiViewer3D);
			ForgeViewer.loadDocument(documentId, forgeOnDocumentLoadSuccess, forgeOnDocumentLoadFailure);
		});
	}

	function forgeOnDocumentLoadSuccess(doc) {
		// We could still make use of Document.getSubItemsWithProperties()
		// However, when using a ViewingApplication, we have access to the **bubble** attribute,
		// which references the root node of a graph that wraps each object from the Manifest JSON.
		var viewables = ForgeViewer.bubble.search({ 'type': 'geometry' });
		if (viewables.length === 0) {
			console.error('Document contains no viewables.');
			return;
		}

		// Choose any of the avialble viewables
		ForgeViewer.selectItem(viewables[0].data, forgeOnItemLoadSuccess, forgeOnItemLoadFail);
	}

	function forgeOnDocumentLoadFailure(viewerErrorCode) {
		console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
		$('#forgeViewer').html('Document has not been translated yet');
	}

	function forgeOnItemLoadSuccess(viewer, item) {
		// item loaded, any custom action?
	}

	function forgeOnItemLoadFail(errorCode) {
		console.error('onItemLoadFail() - errorCode:' + errorCode);
	}
});