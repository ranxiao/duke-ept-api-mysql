// Update with your config settings.
module.exports = {
  development: {
    client: "mysql",
    connection: {
      host: "eptmysql.mysql.database.azure.com",
      user: "zt45@eptmysql",
      password: "mysqlTEST1!",
      database: "eptmysql",
      port: 3306,
      // encrypt: true,
    },
    pool: { min: 0, max: 7 },
  },
  staging: {
    client: "mysql",
    connection: {
      host: "eptmysql.mysql.database.azure.com",
      user: "zt45@eptmysql",
      password: "mysqlTEST1!",
      database: "eptmysql",
      port: 3306,
      // encrypt: true,
    },
    pool: { min: 0, max: 7 },
  },
  production: {
    client: "postgres",
    connection: {
      host: "vcm-20066.vm.duke.edu",
      user: "ept",
      password: "ept!45@DB",
      database: "eptpsql",
      // port: 3306,
      // encrypt: true,
    },
    pool: { min: 0, max: 7 },
  },
};
