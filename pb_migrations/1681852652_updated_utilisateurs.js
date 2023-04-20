migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp")

  // remove
  collection.schema.removeField("igxj141v")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
