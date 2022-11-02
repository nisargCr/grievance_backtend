const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const bodyParser = require('body-parser');
const path = require("path");

const userRoutes = require('./src/users/users.routes');
const officerRoutes = require('./src/officer/officer.routes');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

userRoutes.routesConfig(app);
officerRoutes.routesConfig(app);

app.listen(process.env.PORT, () => { 
    console.log('Server is listening at ' + process.env.IP_ADDRESS +':%s', process.env.PORT); 
});
