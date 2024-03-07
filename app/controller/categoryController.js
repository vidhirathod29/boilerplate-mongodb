const { categoryModel } = require('../helper/categoryModel');
const logger = require('../logger/logger');
exports.addCategory = async (req, res) => {
    try {
        const cat = {
            categoryName: req.body.categoryName,
        };
        const catData = await new categoryModel(cat);
        await catData.save();
        logger.info('Category added successfully.');
        res.status(201).send('Category added successfully.');
    } catch (error) {
        logger.error('Error adding category:', error.message);
        res.status(500).send('Internal Server Error');
    }};
