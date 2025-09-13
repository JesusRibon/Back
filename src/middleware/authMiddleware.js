import jwt from 'jsonwebtoken';

// Middleware para proteger rutas con JWT
export default function auth(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // añadimos el user al request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
}
