const pool = require('../config/db');

class UserRepository {
    async create (data){
        const {name , email} = data;
        const query = 'INSERT INTO users (name,email) VALUES ($1,$2) RETURNING *';
        const result = await pool.query(query, [name, email]);
        return result.rows[0];
    }
    async findById(id){
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
    async findAll(){
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);
        return result.rows;
    }

    async update(id, data){
        const {name, email} = data;
        const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
        const result = await pool.query(query, [name, email, id]);
        return result.rows[0];
    }

    async delete(id){
        const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = new UserRepository();