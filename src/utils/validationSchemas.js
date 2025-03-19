import Joi from 'joi';

export const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).required(),
  category: Joi.string().valid('men', 'women', 'sports').required(),
  type: Joi.string().valid('shoes', 'accessories').required(),
  subType: Joi.string().required(),
  brand: Joi.string().required(),
  description: Joi.string().allow(''),
  sizes: Joi.array().items(
    Joi.object({
      size: Joi.string().required(),
      stock: Joi.number().min(0).required()
    })
  ),
  colors: Joi.array().items(Joi.string()),
  sportType: Joi.string().valid(
    'running', 'basketball', 'soccer', 'tennis', 'baseball', 'golf'
  )
});

export const orderSchema = Joi.object({
  items: Joi.array().items(
    Joi.object({
      product: Joi.string().required(),
      quantity: Joi.number().min(1).required(),
      size: Joi.string().required(),
      color: Joi.string().required()
    })
  ).min(1).required(),
  shippingAddress: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
    zipCode: Joi.string().required()
  }).required(),
  paymentMethod: Joi.string().valid('card', 'paypal', 'cash_on_delivery').required()
});

export const orderStatusSchema = Joi.object({
    status: Joi.string().valid(
      'processing', 'shipped', 'delivered', 'cancelled'
    ).required()
  });
  
  export const paymentStatusSchema = Joi.object({
    status: Joi.string().valid(
      'pending', 'completed', 'failed', 'refunded'
    ).required()
  });