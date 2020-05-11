import Express from 'express';

import routes from './routes';

const app = Express();

app.use(routes);

app.listen(4001);
