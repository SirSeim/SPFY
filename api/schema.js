var Joi = require('joi'); // eslint-disable-line

var schema = {
    newUser: Joi.object().keys({
        username: Joi.string().required().trim(),
        password: Joi.string().required().min(8).trim()
    }).unknown(false),

    login: Joi.object().keys({
        username: Joi.string().required().trim(),
        password: Joi.string().required().trim()
    }).unknown(false),

    changeCurrentUserPassword: Joi.object().keys({
        password: Joi.string().required().trim(),
        newPassword: Joi.string().required().min(8).trim()
    }).unknown(false),

    notification: Joi.object().keys({
        type: Joi.string().trim(),
        comment: Joi.string().required().trim(),
        link: Joi.string().trim(),
        checked: Joi.boolean()
    }).unknown(false)
};

module.exports = schema;
