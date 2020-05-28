// le token et l'urn permettent l'affichage 
// dans le viewer de la ressource correspondante (à l'urn demandé)
var token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJzY29wZSI6WyJkYXRhOnJlYWQiLCJkYXRhOndyaXRlIiwiZGF0YTpjcmVhdGUiLCJidWNrZXQ6cmVhZCIsImJ1Y2tldDpjcmVhdGUiXSwiY2xpZW50X2lkIjoiVVVVNk9hbmFaUGJNdHgyS0VkUzFJQXVjS0d4RjVqTXkiLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvand0ZXhwNjAiLCJqdGkiOiJFTHUzZzdVM2pGaUJpT2NuMDZlQmx6S1VTam1qVDBtVzdtZUUweUZNNjZ4Zk9VZXVkbWpab0g3SFdPa2NmTE1JIiwiZXhwIjoxNTkwNjc2Nzg1fQ.PMMMVBuoGuMxgZvHR4ik59FNMdbSTj4lT9IH8Gc0YiI';
var urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdF9jb2xsYWJfdjQvUHJvamVjdDEuaWZj'

function getToken (CLIENT_ID, CLIENT_SECRET) {
  var ForgeSDK = require('forge-apis')

  // autoRefresh est à true si on veut que ACCESS_TOKEN 
  // se rafraichisse automatiquement, false sinon 
  var autoRefresh = true;

  var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(CLIENT_ID, CLIENT_SECRET, [
      'data:read', 'data:write'
    ]

    )
}

// options nécessaires pour le viewer forge
var initOptions = {
  documentId: urn,
  env: 'AutodeskProduction',
  getAccessToken: function(onGetAccessToken) {
    return token
  }
}

// typically getAccessToken would look like below
// where /api/forge/token is a REST endpoint
// on your own server that return a valid forge token
//
//getAccessToken: function(onGetAccessToken) {
//  $.get('/api/forge/token', function(token) {
//    onGetAccessToken(token.access_token)
//  })
//}

/////////////////////////////////////////////////////////////////
// Document Loaded Handler
//
/////////////////////////////////////////////////////////////////
function onDocumentLoaded (doc) {

  var rootItem = doc.getRootItem()

  // Grab all geometry items
  var geometryItems =
    Autodesk.Viewing.Document.getSubItemsWithProperties(
      rootItem, { 'type': 'geometry' }, true)

  // Pick the first item by default
  var selectedItem = geometryItems[0]

  var domContainer = document.getElementById('viewer')

  // UI-less Version: viewer without controls and commands
  //var viewer = new Autodesk.Viewing.Viewer3D(domContainer)

  // GUI Version: viewer with controls
  var viewer = new Autodesk.Viewing.Private.GuiViewer3D(domContainer)

  viewer.initialize()

  viewer.loadModel(doc.getViewablePath(selectedItem))

viewer.impl.setSelectionColor(new THREE.Color(1,0,0));
viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, ()=>viewer.select(1))
}

/////////////////////////////////////////////////////////////////
// Environment Initialized Handler
//
/////////////////////////////////////////////////////////////////
function onEnvInitialized () {

  Autodesk.Viewing.Document.load(
    initOptions.documentId,
    function(doc) {
      onDocumentLoaded (doc)
    },
    function (errCode){
      onLoadError (errCode)
    })
}

/////////////////////////////////////////////////////////////////
// Error Handler
//
/////////////////////////////////////////////////////////////////
function onLoadError (errCode) {

  console.log('Error loading document: ' + errCode)
}

/////////////////////////////////////////////////////////////////
// Bootstraping
//
/////////////////////////////////////////////////////////////////
Autodesk.Viewing.Initializer(
  initOptions,
  function() {
    onEnvInitialized ()
  }
)