// Update with your config settings.
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "eptmysql.mysql.database.azure.com",
      user: "zt45@eptmysql",
      password: "mysqlTEST1!",
      database: "eptmysql",
      // port: 3306,
      // encrypt: true,
    },
    pool: { min: 0, max: 7 },
  },
};
// // Update with your config settings.
// module.exports = {
//   development: {
//     client: "mysql",
//     connection: {
//       host: "mysql5037.site4now.net",
//       user: "a71b63_user",
//       password: "@X7xJPMG2KSuFRP",
//       database: "db_a71b63_user",
//     },
//     pool: { min: 0, max: 7 },
//   },
// };
