const env  = require('./env');

const express = require('express');
const bodyParser = require('body-parser');
const indexRouter = require('./api/routes/index');
const cors = require('cors');
const eurekaHelper = require('../src/api/helper/eureka-helper');
const port = process.env.PORT || 3001;

const { Tracer, ExplicitContext, BatchRecorder, jsonEncoder } = require("zipkin");
const { HttpLogger } = require("zipkin-transport-http");
const zipkinMiddleware = require("zipkin-instrumentation-express").expressMiddleware;

const ZIPKIN_ENDPOINT = process.env.ZIPKIN_ENDPOINT || "http://localhost:9411";

// Get ourselves a zipkin tracer
const tracer = new Tracer({
  ctxImpl: new ExplicitContext(),
  recorder: new BatchRecorder({
    logger: new HttpLogger({
      endpoint: `${ZIPKIN_ENDPOINT}/api/v2/spans`,
      jsonEncoder: jsonEncoder.JSON_V2,
    }),
  }),
  localServiceName: "identity",
});


// Initialize our app
const app = express();
app.use(cors());
app.get('/customer', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});
app.get('/provider', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});


app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// app.use(cors());
app.use(
  express.urlencoded({
    extended: false
  })
);


app.use('/', indexRouter);
app.use(zipkinMiddleware({ tracer }));
app.listen(port, () => {
  console.log(`IMS service listening at http://localhost:${port}`);
});
eurekaHelper.registerWithEureka('identity', port);

module.exports = app;