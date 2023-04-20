migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v8oah3w0r3miuvs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "k2li8on1",
    "name": "from",
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
  const collection = dao.findCollectionByNameOrId("v8oah3w0r3miuvs")

  // remove
  collection.schema.removeField("k2li8on1")

  return dao.saveCollection(collection)
})
