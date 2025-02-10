const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle Axios errors
  if (err.isAxiosError) {
    return res.status(err.response?.status || 500).json({
      error: 'External API Error',
      message: err.response?.data?.message || 'Error fetching external data'
    });
  }

  // Handle Sequelize errors
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      messages: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      error: 'Conflict Error',
      message: 'Resource already exists'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler; 