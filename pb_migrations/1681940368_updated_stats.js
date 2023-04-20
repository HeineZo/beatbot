migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y19izth4ad3de21")

  collection.options = {
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes,\n    utilisateurs.pseudo\nFROM alertes, artistes, utilisateurs\nWHERE alertes.artiste = artistes.id\nAND alertes.utilisateur = utilisateurs.id\nGROUP BY artistes.nom\nORDER BY nbAlertes"
  }

  // remove
  collection.schema.removeField("a2c9tb9f")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lamxtokn",
    "name": "nbAlertes",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8bvqx5t7",
    "name": "pseudo",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y19izth4ad3de21")

  collection.options = {
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes\nFROM alertes, artistes\nWHERE alertes.artiste = artistes.id\nGROUP BY artistes.nom\nORDER BY nbAlertes"
  }

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

  // remove
  collection.schema.removeField("lamxtokn")

  // remove
  collection.schema.removeField("8bvqx5t7")

  return dao.saveCollection(collection)
})
