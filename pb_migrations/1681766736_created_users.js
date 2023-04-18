migrate((db) => {
  const collection = new Collection({
    "id": "1es2a43b5hxt1cp",
    "created": "2023-04-17 21:25:36.977Z",
    "updated": "2023-04-17 21:25:36.977Z",
    "name": "users",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "igxj141v",
        "name": "nbAlerte",
        "type": "number",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null
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
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp");

  return dao.deleteCollection(collection);
})
