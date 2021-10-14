const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async (req, res) => {
  try{
    const categoryDataAll = await Category.findAll({
      include: [Product],
    });
    res.json(categoryDataAll);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const categoryDataOne = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [Product],
    });
    if (!categoryDataOne) {
      res.status(404).json({ message: 'No category data with this id' });
      return;
    }
    res.status(200).json(categoryDataOne);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCatData => res.json(dbCatData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updateCategory);
  } catch (err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteCateogry = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!deleteCateogry) {
      console.error(message)
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.status(200).json(deleteCateogry);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;