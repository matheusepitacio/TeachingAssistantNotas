const {Pool} = require('pg')

const {user, database, password} = require('../../secrets.json')

const pool = new Pool({ user ,database, password})

export default pool;
