const {Pool} = require('pg')

const {user, database} = require('../../secrets.json')

const pool = new Pool({ user,database})

export default pool;
