import pool from '../config/db.js';

export default class User {
  constructor(id, email, password) {
    this.id = id;
    this.email = email;
    this.password = password;
  }

  // Crear un usuario
  static async create(email, hashedPassword) {
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email, password',
      [email, hashedPassword]
    );
    const row = result.rows[0];
    return new User(row.id, row.email, row.password);
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new User(row.id, row.email, row.password);
  }
}
