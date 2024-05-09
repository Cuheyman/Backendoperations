// middlewares/permissions.js

function requireAdminRole(req, res, next) {
    // Check if the user is authenticated and has an 'admin' role
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    // Otherwise, deny access
    return res.status(403).json({ message: 'Access denied. Admins only.' });
}

module.exports = { requireAdminRole };
