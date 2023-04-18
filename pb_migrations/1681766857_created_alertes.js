migrate((db) => {
  const collection = new Collection({
    "id": "v8oah3w0r3miuvs",
    "created": "2023-04-17 21:27:37.742Z",
    "updated": "2023-04-17 21:27:37.742Z",
    "name": "alertes",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0k1eyq3t",
        "name": "utilisateur",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "1es2a43b5hxt1cp",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      },
      {
        "system": false,
        "id": "xsut2jgg",
        "name": "artiste",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "cjt30m3yurhcwhe",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": []
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("v8oah3w0r3miuvs");

  return dao.deleteCollection(collection);
})
