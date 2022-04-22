import * as mung from 'express-mung';
import axios from 'axios';

export const telegram = mung.json((body, req, res) => {
  const headers = req.headers;
  const status = res.statusCode;
  if (status == 200 || status == 201 || status == 204) {
    const data = {
      Agent: headers['user-agent'],
      Headers: headers,
      Body: req.body,
      Response: body,
    };
    axios.get(`${process.env.TELEGRAM_URL}${JSON.stringify(data, null, 2)}`);
  }
});
