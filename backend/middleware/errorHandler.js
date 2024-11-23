exports.handleError = (res, error) => {
    console.error('Error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        status: 'error',
        message: Object.values(error.errors).map(err => err.message)
      });
    }
  
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Duplicate field value entered'
      });
    }
  
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  };