import { Router } from 'express';
import auth from '../middleware/authMiddleware.js';
import { createDebt, getDebts, updateDebt, deleteDebt, payDebt, exportDebts, summaryDebts } from '../controllers/debtController.js';

const router = Router();

router.use(auth);

/**
 * @swagger
 * /debts:
 *   post:
 *     summary: Crear una nueva deuda
 *     tags: [Debts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 250
 *               description:
 *                 type: string
 *                 example: "Cena en restaurante"
 *     responses:
 *       201:
 *         description: Deuda creada
 */
router.post('/', createDebt);


/**
 * @swagger
 * /debts:
 *   get:
 *     summary: Listar deudas del usuario autenticado
 *     tags: [Debts]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, paid]
 *         description: Filtrar deudas por estado
 *     responses:
 *       200:
 *         description: Lista de deudas
 */
router.get('/', getDebts);

/**
 * @swagger
 * /debts/{id}:
 *   put:
 *     summary: Editar una deuda (solo si está pendiente)
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la deuda a editar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 300.5
 *               description:
 *                 type: string
 *                 example: "Descripción actualizada"
 *     responses:
 *       200:
 *         description: Deuda actualizada
 *       400:
 *         description: Validación inválida (p.ej. monto inválido o deuda pagada)
 *       404:
 *         description: Deuda no encontrada
 */
router.put('/:id', updateDebt);

/**
 * @swagger
 * /debts/{id}:
 *   delete:
 *     summary: Eliminar una deuda del usuario
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la deuda a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deuda eliminada correctamente
 *       400:
 *         description: Error en eliminación
 *       404:
 *         description: Deuda no encontrada
 */
router.delete('/:id', deleteDebt);

/**
 * @swagger
 * /debts/{id}/pay:
 *   patch:
 *     summary: Marcar una deuda como pagada
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la deuda a marcar como pagada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deuda marcada como pagada
 *       400:
 *         description: La deuda ya estaba pagada o error de validación
 *       404:
 *         description: Deuda no encontrada
 */
router.patch('/:id/pay', payDebt);

/**
 * @swagger
 * /debts/export:
 *   get:
 *     summary: Exportar deudas del usuario en JSON o CSV
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *         description: Formato de exportación (json por defecto)
 *     responses:
 *       200:
 *         description: Archivo o JSON con las deudas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *           text/csv:
 *             schema:
 *               type: string
 */
router.get('/export', exportDebts);

/**
 * @swagger
 * /debts/summary:
 *   get:
 *     summary: Resumen de deudas (total pendientes y total pagadas)
 *     tags: [Debts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resumen de deudas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_pendientes:
 *                   type: number
 *                   example: 1500.00
 *                 total_pagadas:
 *                   type: number
 *                   example: 800.00
 */
router.get('/summary', summaryDebts);

export default router;
