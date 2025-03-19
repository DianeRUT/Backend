import { productSchema, orderSchema, orderStatusSchema, paymentStatusSchema } from "../utils/validationSchemas.js";

export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(e => e.message)
    });
  }
  next();
};

export const validateOrder = (req, res, next) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details.map(e => e.message)
    });
  }
  next();
};

export const validateOrderStatus = (req, res, next) => {
    const { error } = orderStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(e => e.message)
      });
    }
    next();
  };
  
  export const validatePaymentStatus = (req, res, next) => {
    const { error } = paymentStatusSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: 'Validation error',
        details: error.details.map(e => e.message)
      });
    }
    next();
  };