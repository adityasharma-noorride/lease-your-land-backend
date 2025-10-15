const formidable = require('formidable');

const parseFile = (req, res, next) => {
  if (req.headers['content-type'].startsWith('multipart/form-data')) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: 'Failed to parse file' });
      }

      req.fields = fields; // Assign fields to req.parsedFields
      req.files = files; // Assign files to req.parsedFiles

      next();
    });
  } else {
    next();
  }
};

module.exports = parseFile;