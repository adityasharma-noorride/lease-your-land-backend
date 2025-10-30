const express = require('express');
const router = express.Router();
const landFormController = require('../../controllers/landForm.controller');
const auth = require('../../middlewares/auth');
const parseFile = require('../../middlewares/parseFile')

router.post(
  '/submit',
  landFormController.submitLandForm
);

router.get(
  '/',
  // auth(),
  landFormController.getAllLandForms
);

router.get(
  '/:id',
  // auth(),
  landFormController.getLandFormById
);

router.patch(
  '/:id/status',
  // auth(),
  landFormController.updateLandFormStatus
);

router.get(
  '/:id/document',
  // auth(),
  landFormController.getDocument
);

module.exports = router;