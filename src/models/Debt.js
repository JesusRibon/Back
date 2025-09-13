import pool from '../config/db.js';

export default class Debt {
  constructor(id, userId, amount, description, status, createdAt) {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }

  // Crear deuda
  static async create(userId, amount, description) {
    const result = await pool.query(
      'INSERT INTO debts (user_id, amount, description) VALUES ($1, $2, $3) RETURNING *',
      [userId, amount, description]
    );
    return new Debt(...Object.values(result.rows[0]));
  }

  // Buscar deudas por usuario (con filtro opcional)
  static async findByUser(userId, status = null) {
    let query = 'SELECT * FROM debts WHERE user_id = $1';
    let params = [userId];
    if (status) {
      query += ' AND status = $2';
      params.push(status);
    }
    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    return result.rows.map(
      (row) => new Debt(row.id, row.user_id, row.amount, row.description, row.status, row.created_at)
    );
  }

  // Buscar deuda por id
  static async findById(id, userId) {
    const result = await pool.query('SELECT * FROM debts WHERE id=$1 AND user_id=$2', [id, userId]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Debt(row.id, row.user_id, row.amount, row.description, row.status, row.created_at);
  }

  // Actualizar deuda
  static async update(id, amount, description) {
    const result = await pool.query(
      'UPDATE debts SET amount=$1, description=$2 WHERE id=$3 RETURNING *',
      [amount, description, id]
    );
    return new Debt(...Object.values(result.rows[0]));
  }

  // Marcar como pagada
  static async pay(id, userId) {
    const result = await pool.query(
      'UPDATE debts SET status=$1 WHERE id=$2 AND user_id=$3 RETURNING *',
      ['paid', id, userId]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new Debt(row.id, row.user_id, row.amount, row.description, row.status, row.created_at);
  }

  // Eliminar deuda
  static async delete(id, userId) {
    await pool.query('DELETE FROM debts WHERE id=$1 AND user_id=$2', [id, userId]);
    return true;
  }

  // Resumen de deudas
  static async summary(userId) {
    const result = await pool.query(
      `SELECT 
        SUM(CASE WHEN status='pending' THEN amount ELSE 0 END) AS total_pendientes,
        SUM(CASE WHEN status='paid' THEN amount ELSE 0 END) AS total_pagadas
      FROM debts WHERE user_id=$1`,
      [userId]
    );
    return result.rows[0];
  }
}
