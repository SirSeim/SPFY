var Joi = require('joi'); // eslint-disable-line

var schema = {
    newUser: Joi.object().keys({
        username: Joi.string().required().trim(),
        password: Joi.string().required().min(8).trim()
    }).unknown(false),

    login: Joi.object().keys({
        username: Joi.string().required().trim(),
        password: Joi.string().required().trim()
    }).unknown(false)
};

module.exports = schema;
