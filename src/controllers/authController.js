import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Registro
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validaciones
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) return res.status(400).json({ error: 'Email inválido' });
    if (password.length < 6) return res.status(400).json({ error: 'Contraseña muy corta' });

    // Verificar si ya existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ error: 'Usuario ya existe' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create(email, hashed);

    res.status(201).json({ id: user.id, email: user.email });
  } catch {
    res.status(500).json({ error: 'Error registrando usuario' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Credenciales incorrectas' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Error en login' });
  }
};
