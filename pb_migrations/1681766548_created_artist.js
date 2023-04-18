migrate((db) => {
  const collection = new Collection({
    "id": "cjt30m3yurhcwhe",
    "created": "2023-04-17 21:22:28.410Z",
    "updated": "2023-04-17 21:22:28.410Z",
    "name": "artist",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ppbqveeb",
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
  const collection = dao.findCollectionByNameOrId("cjt30m3yurhcwhe");

  return dao.deleteCollection(collection);
})
