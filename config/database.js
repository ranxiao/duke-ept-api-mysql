const { Sequelize } = require("sequelize");

// DB
// module.exports = new Sequelize(
//   "db_a71b63_user",
//   "a71b63_user",
//   "@X7xJPMG2KSuFRP",
//   {
//     host: "mysql5037.site4now.net",
//     dialect: "mysql",
//     logging: true,
//   }
// );

module.exports = new Sequelize("eptmysql", "zt45@eptmysql", "mysqlTEST1!", {
  host: "eptmysql.mysql.database.azure.com",
  dialect: "mysql",
  port: 3306,
});

// var conn = mysql.createConnection({
//   host: "eptmysql.mysql.database.azure.com",
//   user: "zt45@eptmysql",
//   password: {your_password},
//   database: {your_database},
//   port: 3306,
//   ssl:{ca:fs.readFileSync({ca-cert filename})}
// });
