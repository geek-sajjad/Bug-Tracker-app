const Joi = require('joi');
const issueSchema = Joi.object({
  name: Joi.string().min(5).max(90).required(),
  projectId: Joi.number().min(1).required(),
  description: Joi.string().min(10).max(500),
  status: Joi.string().valid('OPEN', 'CLOASE', 'IN_PROGRESS'),
});
module.exports = issueSchema;