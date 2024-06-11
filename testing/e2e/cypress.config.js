const { defineConfig } = require("cypress");
 

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on("task", {
        async connectDB(query){
          const client = new Client({
            user: process.env.USERNAME,
            password:  process.env.PASSWORD,
            host:  process.env.HOST,
            database:  process.env.DATABASE,
            ssl:  process.env.SSL,
            port:  process.env.PORT
          })

          const clientDB = new pg.Pool(dbConfig)
          //return thw result from sql
          return clientDB.query(sql)
          // await client.connect()
          // const res = await client.query(query)
          // await client.end()
          // return res.rows;
        }
      })
    },
  },
});
