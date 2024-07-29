import express, { json } from 'express';
import morgan from 'morgan';

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(json());

import indexRouter from './router/index';
import gameRouter from './Router/game';

app.use('/', indexRouter);
app.use('/api/game', gameRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
