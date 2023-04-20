migrate((db) => {
  const collection = new Collection({
    "id": "y19izth4ad3de21",
    "created": "2023-04-19 18:30:16.221Z",
    "updated": "2023-04-19 18:30:16.221Z",
    "name": "stats",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cnnudphj",
        "name": "nom",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "q6fnjsff",
        "name": "nbAlertes",
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
    "options": {
      "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes\nFROM alertes, artistes\nWHERE alertes.artiste = artistes.id\nGROUP BY artistes.nom"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("y19izth4ad3de21");

  return dao.deleteCollection(collection);
})
