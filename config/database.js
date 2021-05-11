const { Sequelize } = require("sequelize");

// DB
module.exports = new Sequelize("eptmysql", "zt45@eptmysql", "mysqlTEST1!", {
  host: "eptmysql.mysql.database.azure.com",
  dialect: "mysql",
  logging: true,
});

// module.exports = new Sequelize("eptpsql", "ept", "ept!45@DB", {
//   host: "vcm-20066.vm.duke.edu",
//   dialect: "postgres",
//   port: 5432,
// });

// var conn = mysql.createConnection({
//   host: "eptmysql.mysql.database.azure.com",
//   user: "zt45@eptmysql",
//   password: {your_password},
//   database: {your_database},
//   port: 3306,
//   ssl:{ca:fs.readFileSync({ca-cert filename})}
// });
