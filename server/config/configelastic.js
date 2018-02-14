const elasticsearch = require('elasticsearch')
const esClient = new elasticsearch.Client({
  host: 'localhost:9200',
  deadTimeout: 0,
  keepAlive: false
})

module.exports = {

    getClient: function () {
        return esClient
      },
      close: function () {
        esClient.close()
      }

}