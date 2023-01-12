const Joi = require('joi');
const {StatusCodes} = require('http-status-codes')

const addBlogSchema = Joi.object({
    title: Joi.string()
        .max(255)
        .trim()
        .required(),
    description: Joi.string()
        .min(10)
        .trim(),
    author: Joi.string(),
    state: Joi.string(),
    tags: Joi.array()
        .items(Joi.string()),
    body: Joi.string()
        .required()
});

const updateBlogSchema = Joi.object({
    title: Joi.string()
        .max(255)
        .trim(),
    description: Joi.string()
        .min(10)
        .trim(),
    author: Joi.string(),
    state: Joi.string(),
    tags: Joi.array()
        .items(Joi.string()),
    body: Joi.string()
});


const addUserSchema = Joi.object({
    firstname: Joi.string()
        .max(255)
        .trim()
        .required(),
    lastname: Joi.string()
        .max(255)
        .required()
        .trim(),
    password: Joi.string()
        .min(7)
        .trim()
        .required(),
    email: Joi.string()
        .email()
        .required()
});


async function addBlogValidationMW (req, res, next) {
    const blogPayLoad = req.body

    try {
        await addBlogSchema.validateAsync(blogPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: StatusCodes.BAD_REQUEST
        })
    }
};

async function updateBlogValidationMW (req, res, next) {
    const blogPayLoad = req.body

    try {
        await updateBlogSchema.validateAsync(blogPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: StatusCodes.BAD_REQUEST
        })
    }
};

async function addUserValidationMW (req, res, next) {
    const blogPayLoad = req.body

    try {
        await addUserSchema.validateAsync(blogPayLoad)
        next()
    } catch (error) {
        next({
            message: error.details[0].message,
            status: StatusCodes.BAD_REQUEST
        })
    }
};

module.exports = {
    addBlogValidationMW,
    updateBlogValidationMW,
    addUserValidationMW
}
