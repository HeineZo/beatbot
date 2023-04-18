migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cjt30m3yurhcwhe")

  collection.name = "artistes"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cjt30m3yurhcwhe")

  collection.name = "artists"

  return dao.saveCollection(collection)
})
