const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let admin = null;

    try {
      admin = await prisma.adminUser.findUnique({
        where: { email: cleanEmail },
      });
    } catch (dbErr) {
      console.warn('Prisma admin lookup warning (falling back to built-in check):', dbErr.message);
    }

    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      const token = jwt.sign(
        { id: admin.id, email: admin.email, role: admin.role },
        process.env.JWT_SECRET || 'utsav_decor_super_secret_jwt_key_2026_festive',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return res.json({
        success: true,
        message: 'Logged in successfully',
        token,
        admin: {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      });
    }

    // Default built-in credentials fallback for instant cloud/serverless verification
    if (cleanEmail === 'admin@utsavdecor.com' && password === 'admin123') {
      const fallbackAdmin = {
        id: 'utsav-super-admin-root',
        email: 'admin@utsavdecor.com',
        name: 'Utsav Admin',
        role: 'SUPER_ADMIN',
      };

      const token = jwt.sign(
        fallbackAdmin,
        process.env.JWT_SECRET || 'utsav_decor_super_secret_jwt_key_2026_festive',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      return res.json({
        success: true,
        message: 'Logged in successfully',
        token,
        admin: fallbackAdmin,
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Server error during login: ' + error.message });
  }
};

exports.getMe = async (req, res) => {
  return res.json({
    success: true,
    admin: req.admin,
  });
};
