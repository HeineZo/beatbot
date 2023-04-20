migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cjt30m3yurhcwhe")

  // remove
  collection.schema.removeField("ppbqveeb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cjt30m3yurhcwhe")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ppbqveeb",
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
