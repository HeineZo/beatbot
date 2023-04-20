migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y19izth4ad3de21")

  collection.options = {
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes\nFROM alertes, artistes\nWHERE alertes.artiste = artistes.id\nGROUP BY artistes.nom\nORDER BY nbAlertes"
  }

  // remove
  collection.schema.removeField("q6fnjsff")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a2c9tb9f",
    "name": "nbAlertes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y19izth4ad3de21")

  collection.options = {
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes\nFROM alertes, artistes\nWHERE alertes.artiste = artistes.id\nGROUP BY artistes.nom"
  }

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("a2c9tb9f")

  return dao.saveCollection(collection)
})
