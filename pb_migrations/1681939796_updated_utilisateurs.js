migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp")

  collection.indexes = [
    "CREATE INDEX `idx_RG94TLN` ON `utilisateurs` (`idUtilisateur`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1es2a43b5hxt1cp")

  collection.indexes = []

  return dao.saveCollection(collection)
})
