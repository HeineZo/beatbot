migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cjt30m3yurhcwhe")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_knyqFzS` ON `artistes` (`idArtiste`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cjt30m3yurhcwhe")

  collection.indexes = []

  // remove
  collection.schema.removeField("cnnudphj")

  return dao.saveCollection(collection)
})
