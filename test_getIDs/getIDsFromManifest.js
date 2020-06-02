var manifest = `{
    "urn": "dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdF9jb2xsYWJfdjQvUHJvamVjdDEuaWZj",
    "derivatives": [
        {
            "hasThumbnail": "true",
            "children": [
                {
                    "guid": "0f98e500-7abe-412d-b1a4-2feed9d2832f",
                    "type": "geometry",
                    "role": "3d",
                    "name": "Project1.ifc",
                    "status": "success",
                    "hasThumbnail": "true",
                    "progress": "complete",
                    "viewableID": "Project1.ifc",
                    "useAsDefault": true,
                    "children": [
                        {
                            "guid": "5fa45b8b-654c-40be-b85c-d1c0b273411f",
                            "type": "view",
                            "role": "3d",
                            "name": "Default",
                            "status": "success",
                            "camera": [
                                -5113.89453125,
                                4546.49365234375,
                                14198.802734375,
                                -5113.89453125,
                                4546.49365234375,
                                2853.30517578125,
                                0,
                                1,
                                0,
                                1,
                                0.785398006439209,
                                1,
                                0
                            ],
                            "useAsDefault": true,
                            "hasThumbnail": "true",
                            "children": [
                                {
                                    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdF9jb2xsYWJfdjQvUHJvamVjdDEuaWZj/output/0/0_100.png",
                                    "role": "thumbnail",
                                    "mime": "image/png",
                                    "guid": "ad16943a-4c0a-4646-a973-5fca0a67841d",
                                    "type": "resource",
                                    "resolution": [
                                        100,
                                        100
                                    ]
                                },
                                {
                                    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdF9jb2xsYWJfdjQvUHJvamVjdDEuaWZj/output/0/0_200.png",
                                    "role": "thumbnail",
                                    "mime": "image/png",
                                    "guid": "d4b589cf-768d-45ec-bf08-4b9f678a9c4d",
                                    "type": "resource",
                                    "resolution": [
                                        200,
                                        200
                                    ]
                                },
                                {
                                    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdF9jb2xsYWJfdjQvUHJvamVjdDEuaWZj/output/0/0_400.png",
                                    "role": "thumbnail",
                                    "mime": "image/png",
                                    "guid": "f9b81df4-7efe-404d-9ad2-6bbfa7ae372f",
                                    "type": "resource",
                                    "resolution": [
                                        400,
                                        400
                                    ]
                                }
                            ]
                        },
                        {
                            "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdF9jb2xsYWJfdjQvUHJvamVjdDEuaWZj/output/0/0.svf",
                            "role": "graphics",
                            "mime": "application/autodesk-svf",
                            "guid": "c3cc708e-18c8-40b3-bf14-e8a487827a57",
                            "type": "resource"
                        }
                    ]
                },
                {
                    "urn": "urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGVzdF9jb2xsYWJfdjQvUHJvamVjdDEuaWZj/output/0/properties.db",
                    "role": "Autodesk.CloudPlatform.PropertyDatabase",
                    "mime": "application/autodesk-db",
                    "guid": "8245ae25-4ede-4797-9c73-0d559bc29124",
                    "type": "resource",
                    "status": "success"
                }
            ],
            "name": "Project1.ifc",
            "progress": "complete",
            "outputType": "svf",
            "status": "success"
        }
    ],
    "hasThumbnail": "true",
    "progress": "complete",
    "type": "manifest",
    "region": "US",
    "version": "1.0",
    "status": "success"
}`

manifest = JSON.parse(manifest);

var derivatives = manifest.derivatives;

getGUIDs(derivatives);

//affiche dans la console tous les guids présents dans le json
//fonction récursive prenant en paramètre un tableau d'objets
function getGUIDs (tab) {
	var i = 0;
	while (tab[i]!=undefined) {
		if (tab[i].guid!=undefined) {
			console.log(tab[i].guid);
		}
		if (tab[i].children!=undefined) {
			getGUIDs(tab[i].children);
		}
		i++;
	}
}


