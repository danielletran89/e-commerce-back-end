const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
  try{
    const tagsDataAll = await Tag.findAll({
      include:[
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
    res.json(tagsDataAll);
  }catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagsDataOne = await Tag.findOne({
        where: {
          id: req.params.id
        },
        include: {
          model: Product,
          through: ProductTag,
        },
    });
    if (!tagsDataOne) {
      res.status(404).json({ message: 'No tag data with this id' });
      return;
    }
    res.status(200).json(tagsDataOne);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateTag) {
      res.status(404).json({ message: 'No tag data with this id' });
      return;
    }
    res.status(200).json(updateTag);
  } catch (err){
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'No tag data with this id' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;