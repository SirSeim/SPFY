var Joi = require('joi');

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
    }).unknown(false),

    updateNotification: Joi.object().keys({
        type: Joi.string().trim(),
        comment: Joi.string().trim(),
        link: Joi.string().trim(),
        checked: Joi.boolean()
    }).unknown(false),

    createDropIn: Joi.object().keys({
        date: Joi.string().isoDate().required()
    }).unknown(false),

    addActivitiesToDropIn: Joi.object().keys({
        activities: Joi.array().items(Joi.object().keys({
            id: Joi.number().integer().required(),
            room: Joi.string(),
            comments: Joi.string(),
            startTime: Joi.string(),
            endTime: Joi.string()
        }).required()).required()
    }).unknown(false),

    removeActivitiesFromDropin: Joi.object().keys({
        activities: Joi.array().items(Joi.number().integer().required()).required()
    }).unknown(false),

    addCheckinForDropin: Joi.object().keys({
        clients: Joi.array().items(Joi.number().integer().required()).required()
    }).unknown(false),

    addEnrollmentToDropinActivity: Joi.object().keys({
        clients: Joi.array().items(Joi.number().integer().required()).required()
    }).unknown(false),

    removeCheckinForDropin: Joi.object().keys({
        clients: Joi.array().items(Joi.number().integer().required()).required()
    }).unknown(false),

    removeEnrollmentToDropinActivity: Joi.object().keys({
        clients: Joi.array().items(Joi.number().integer().required()).required()
    }).unknown(false)
};

module.exports = schema;
