const express = require('express');
const router = express.Router();
const validate = require('../../../middlewares/validator');
const validationSchema = require('../../../validators/index');
const prisma = require('../../../utils/prisma');

router.post('/', validate(validationSchema.issue), async (req, res, next) => {
  const userId = req.decoded.userId;
  const { projectId, name, description,status } = req.body;
  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId,
        id: projectId,
      },
    });
    if (projects.length === 0) {
      return res.status(404).json({ message: 'project not found.' });
    }
    const issue = await prisma.issue.create({
      data: {
        name: name,
        projectId: projectId,
        description: description,
        status: status
      },
    });
    res.status(200).json(issue);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server internal error' });
  }
});

module.exports = router;
