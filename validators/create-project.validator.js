const Joi = require('joi');
const createProjectSchema = Joi.object({
  name: Joi.string().required().max(100),
  status: Joi.string().valid('OPEN', 'CLOASE')
});
module.exports = createProjectSchema;