migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v8oah3w0r3miuvs")

  collection.indexes = [
    "CREATE INDEX `idx_E70RHnD` ON `alertes` (\n  `artiste`,\n  `utilisateur`\n)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v8oah3w0r3miuvs")

  collection.indexes = []

  return dao.saveCollection(collection)
})
