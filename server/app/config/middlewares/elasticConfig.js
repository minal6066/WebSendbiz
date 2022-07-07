const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200' });

// client
//   .ping()
//   .then(resp => {
//    console.log('Elasticsearch server is connected')
//   })
//   .catch(err => {
//     console.log(err)
//     console.log("Elasticsearch server not responding");
//     process.exit(1);
//   });

module.exports = client;
