migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp")

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
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp")

  // remove
  collection.schema.removeField("8bvqx5t7")

  return dao.saveCollection(collection)
})
