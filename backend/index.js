import {app} from './app.js';
app.listen(process.env.PORT||3001,'0.0.0.0',()=>console.log(`PieceFans API: port ${process.env.PORT||3001}`));
