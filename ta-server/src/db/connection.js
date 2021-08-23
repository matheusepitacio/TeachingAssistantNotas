"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Pool } = require('pg');
const { user, database, password } = require('../../secrets.json');
const pool = new Pool({ user, database, password });
exports.default = pool;
