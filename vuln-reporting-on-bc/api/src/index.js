const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

// enable files upload
app.use(fileUpload({
  createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

//start app 
const port = process.env.PORT || 3003;

app.listen(port, () =>
  console.log(`App is listening on port ${port}.`)
);

// invoke endpoint
const placeholder = require('./routes/v1/placeholder');
const users = require('./routes/v1/users');
const query = require('./routes/v1/query');
const invoke = require('./routes/v1/invoke');

app.use('/', placeholder)
app.use('/api/', placeholder)
app.use('/api/v1/users', users);
app.use('/api/v1/query', query);
app.use('/api/v1/invoke', invoke);
