const { connect, connection } = require('mongoose');
//connects to mongo db
connect('mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
