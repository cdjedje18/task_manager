const Validator = require('validatorjs');

const validateData = async (data, rules) => {

    let validationErrors = []
    let validationPasses = true

    if (Array.isArray(data)) {
        for (let item of data) {
            const validation = new Validator(item, rules, null);
            // console.log(validation.passes(), validation.fails(), validation.errors.errors)
            validationErrors.push(validation.errors.errors)
            if (validation.fails()) {
                validationPasses = false
            }
        }
    } else {
        const validation = new Validator(data, rules, null);
        // console.log(validation.passes(), validation.fails(), validation.errors.errors)
        validationErrors.push(validation.errors.errors)
        if (validation.fails()) {
            validationPasses = false
        }
    }

    return { validationPasses, validationErrors }
};


module.exports = validateData;