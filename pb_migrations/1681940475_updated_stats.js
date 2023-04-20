migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y19izth4ad3de21")

  collection.options = {
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes,\n    utilisateurs.pseudo\nFROM alertes, artistes, utilisateurs\nWHERE alertes.artiste = artistes.id\nAND alertes.utilisateur = utilisateurs.id\nGROUP BY artistes.nom\n"
  }

  // remove
  collection.schema.removeField("lamxtokn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mgapwusi",
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
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes,\n    utilisateurs.pseudo\nFROM alertes, artistes, utilisateurs\nWHERE alertes.artiste = artistes.id\nAND alertes.utilisateur = utilisateurs.id\nGROUP BY artistes.nom\nORDER BY nbAlertes"
  }

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

  // remove
  collection.schema.removeField("mgapwusi")

  return dao.saveCollection(collection)
})
