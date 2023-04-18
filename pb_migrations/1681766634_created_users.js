migrate((db) => {
  const collection = new Collection({
    "id": "8clsq7upz8h4xwi",
    "created": "2023-04-17 21:23:54.103Z",
    "updated": "2023-04-17 21:23:54.103Z",
    "name": "users",
    "type": "view",
    "system": false,
    "schema": [],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id FROM artist"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("8clsq7upz8h4xwi");

  return dao.deleteCollection(collection);
})
