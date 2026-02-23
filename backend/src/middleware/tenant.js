function resolveTenant(req, res, next) {
  const tenantId = req.headers['x-tenant-id'] || req.query.tenantId;
  if (!tenantId) {
    return res.status(400).json({ message: 'tenantId is required via x-tenant-id header or query param' });
  }
  req.tenantId = tenantId;
  return next();
}

module.exports = resolveTenant;
