import Debt from '../models/Debt.js';
import { setCache, getCache } from '../config/redisCache.js';
import { Parser } from 'json2csv';

// Crear deuda
export const createDebt = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const userId = req.user.id;

    if (amount <= 0) return res.status(400).json({ error: 'Monto debe ser mayor a 0' });

    const debt = await Debt.create(userId, amount, description);
    res.status(201).json(debt);
  } catch {
    res.status(400).json({ error: 'Error creando deuda' });
  }
};

// Obtener deudas con cache y filtro
export const getDebts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    const cacheKey = `debts_${userId}_${status || 'all'}`;
    const cached = getCache(cacheKey);
    if (cached) return res.json(cached);

    const debts = await Debt.findByUser(userId, status);
    setCache(cacheKey, debts, 60);

    res.json(debts);
  } catch {
    res.status(500).json({ error: 'Error obteniendo deudas' });
  }
};

// Actualizar deuda
export const updateDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description } = req.body;
    const userId = req.user.id;

    if (amount <= 0) return res.status(400).json({ error: 'Monto inválido' });

    const debt = await Debt.findById(id, userId);
    if (!debt) return res.status(404).json({ error: 'No encontrada' });
    if (debt.status === 'paid') return res.status(400).json({ error: 'No se puede modificar pagada' });

    const updated = await Debt.update(id, amount, description);
    res.json(updated);
  } catch {
    res.status(400).json({ error: 'Error actualizando deuda' });
  }
};

// Eliminar deuda
export const deleteDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    await Debt.delete(id, userId);
    res.json({ message: 'Deuda eliminada' });
  } catch {
    res.status(400).json({ error: 'Error eliminando deuda' });
  }
};

// Pagar deuda
export const payDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const debt = await Debt.findById(id, userId);
    if (!debt) return res.status(404).json({ error: 'No encontrada' });
    if (debt.status === 'paid') return res.status(400).json({ error: 'Ya estaba pagada' });

    const paid = await Debt.pay(id, userId);
    res.json(paid);
  } catch {
    res.status(400).json({ error: 'Error pagando deuda' });
  }
};

// Exportar deudas
export const exportDebts = async (req, res) => {
  try {
    const userId = req.user.id;
    const { format } = req.query;

    const debts = await Debt.findByUser(userId);

    if (format === 'csv') {
      const parser = new Parser();
      const csv = parser.parse(debts);
      res.header('Content-Type', 'text/csv');
      res.attachment('deudas.csv');
      return res.send(csv);
    }

    res.json(debts);
  } catch {
    res.status(500).json({ error: 'Error exportando deudas' });
  }
};

// Resumen de deudas
export const summaryDebts = async (req, res) => {
  try {
    const userId = req.user.id;
    const summary = await Debt.summary(userId);
    res.json(summary);
  } catch {
    res.status(500).json({ error: 'Error obteniendo resumen' });
  }
};
