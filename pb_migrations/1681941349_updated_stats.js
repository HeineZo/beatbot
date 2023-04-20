migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y19izth4ad3de21")

  collection.options = {
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes,\n    JSON_GROUP_ARRAY(utilisateurs.pseudo) as \"Pseudos\"\nFROM alertes, artistes, utilisateurs\nWHERE alertes.artiste = artistes.id\nAND alertes.utilisateur = utilisateurs.id\nGROUP BY artistes.nom\nORDER BY nbAlertes DESC"
  }

  // remove
  collection.schema.removeField("2ey35nxt")

  // remove
  collection.schema.removeField("8bvqx5t7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cgsyzpvl",
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
    "id": "gfye19gm",
    "name": "Pseudos",
    "type": "json",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("y19izth4ad3de21")

  collection.options = {
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    artistes.nom,\n    count(alertes.id) as nbAlertes,\n    utilisateurs.pseudo\nFROM alertes, artistes, utilisateurs\nWHERE alertes.artiste = artistes.id\nAND alertes.utilisateur = utilisateurs.id\nGROUP BY artistes.nom\nORDER BY nbAlertes DESC"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2ey35nxt",
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

  // remove
  collection.schema.removeField("cgsyzpvl")

  // remove
  collection.schema.removeField("gfye19gm")

  return dao.saveCollection(collection)
})
