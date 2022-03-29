const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const prisma = require('../../../utils/prisma');
const validate = require('../../../middlewares/validator');
const validationSchema = require('../../../validators/index');
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: req.decoded.userId,
      },
    });
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.json({ error: error.name });
  }
});
router.post('/',validate(validationSchema.createProject), async (req, res, next) => {
  console.log("creating project");
  try {
    const { name ,status} = req.body;
    const decoded = req.decoded;
    const project = await prisma.project.create({
      data: {
        name: name,
        status: status,
        owner: {
          connect: {
            id: decoded.userId,
          },
        },
      },
    });
    res.status(201).json(project);
  } catch (error) {
    console.log(error);
    res.json({ error: error.name });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id;
    const project = await prisma.project.findUnique({
      where: {
        id: id,
      },
    });
    res.json(project);
  } catch (error) {
    console.log(error);
    res.json({ error: error.name });
  }
});

module.exports = router;
