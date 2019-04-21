import express = require('express');
import * as util from './helpers';

const app = express();

// These are the types of routes we need to manage:
// https://npmdoc.dev/express/4.16.4
// http://npmdoc.dev/express/4.16
// http://npmdoc.dev/express/4
// http://npmdoc.dev/express/latest
// http://npmdoc.dev/express
// http://npmdoc.dev/@google-cloud/storage/latest
// http://npmdoc.dev/@google-cloud/storage

app.get('/packages/*', async (req, res) => {
  try {
    // tslint:disable-next-line prefer-const
    let { name, version } = util.extractFromRoute(req.path);
    if (!version) {
      version = 'latest';
    }
    // TODO: right now this is just doing route parsing, and sending
    // the response back.  Just a little scaffolding.
    res.json({ name, version });
  } catch (e) {
    console.error(e);
    res.sendStatus(500).end();
  }
});

const port = process.env.PORT || 8080;
const server = app.listen(port, () =>
  console.log(`generator service started on ${port}`)
);

export { server };
