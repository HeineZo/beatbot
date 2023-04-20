migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "a4udlymc",
    "name": "idUtilisateur",
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
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp")

  // remove
  collection.schema.removeField("a4udlymc")

  return dao.saveCollection(collection)
})
