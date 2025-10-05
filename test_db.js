const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://theharshasanikommu_db_user:zp7kuQwXnd25oYaF@cluster0.8h2clfg.mongodb.net/careerchoice?retryWrites=true&w=majority')
  .then(() => {
    console.log('✅ MongoDB Atlas Connected Successfully');
    return mongoose.connection.db.admin().listDatabases();
  })
  .then(dbs => {
    console.log('📊 Available databases:');
    dbs.databases.forEach(db => console.log('  -', db.name));
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  });
