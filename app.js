const express = require('express');
const path = require('path')


//Routes for each sectors' stacks
const stackRoutes = require('./routes/api/stacks');
const stackRoutes1 = require('./routes/api/sector1/stacks');
const stackRoutes2 = require('./routes/api/sector2/stacks');
const stackRoutes3 = require('./routes/api/sector3/stacks');
const stackRoutes4 = require('./routes/api/sector4/stacks');
const stackRoutes5 = require('./routes/api/sector5/stacks');
const stackRoutes6 = require('./routes/api/sector6/stacks');
const stackRoutes7 = require('./routes/api/sector7/stacks');
const stackRoutes8 = require('./routes/api/sector8/stacks');
const stackRoutes9 = require('./routes/api/sector9/stacks');
const stackRoutes10 = require('./routes/api/sector10/stacks');
const stackRoutes11 = require('./routes/api/sector11/stacks');
const stackRoutes12 = require('./routes/api/sector12/stacks');
const stackRoutes13 = require('./routes/api/sector13/stacks');
const stackRoutes14 = require('./routes/api/sector14/stacks');
const stackRoutes15 = require('./routes/api/sector15/stacks');

//Routes for each sectors' panels
const panelRoutes = require('./routes/api/panels');
const panelRoutes1 = require('./routes/api/sector1/panels');
const panelRoutes2 = require('./routes/api/sector2/panels');
const panelRoutes3 = require('./routes/api/sector3/panels');
const panelRoutes4 = require('./routes/api/sector4/panels');
const panelRoutes5 = require('./routes/api/sector5/panels');
const panelRoutes6 = require('./routes/api/sector6/panels');
const panelRoutes7 = require('./routes/api/sector7/panels');
const panelRoutes8 = require('./routes/api/sector8/panels');
const panelRoutes9 = require('./routes/api/sector9/panels');
const panelRoutes10 = require('./routes/api/sector10/panels');
const panelRoutes11 = require('./routes/api/sector11/panels');
const panelRoutes12 = require('./routes/api/sector12/panels');
const panelRoutes13 = require('./routes/api/sector13/panels');
const panelRoutes14 = require('./routes/api/sector14/panels');
const panelRoutes15 = require('./routes/api/sector15/panels');

//Routes for each sectors' corners
const cornerRoutes = require('./routes/api/corners');
const cornerRoutes1 = require('./routes/api/sector1/corners');
const cornerRoutes2 = require('./routes/api/sector2/corners');
const cornerRoutes3 = require('./routes/api/sector3/corners');
const cornerRoutes4 = require('./routes/api/sector4/corners');
const cornerRoutes5 = require('./routes/api/sector5/corners');
const cornerRoutes6 = require('./routes/api/sector6/corners');
const cornerRoutes7 = require('./routes/api/sector7/corners');
const cornerRoutes8 = require('./routes/api/sector8/corners');
const cornerRoutes9 = require('./routes/api/sector9/corners');
const cornerRoutes10 = require('./routes/api/sector10/corners');
const cornerRoutes11 = require('./routes/api/sector11/corners');
const cornerRoutes12 = require('./routes/api/sector12/corners');
const cornerRoutes13 = require('./routes/api/sector13/corners');
const cornerRoutes14 = require('./routes/api/sector14/corners');
const cornerRoutes15 = require('./routes/api/sector15/corners');

//Routes for prototypes' sectors and yards
const sectorRoutes = require('./routes/api/sectors');
const yardRoutes = require('./routes/api/yards');


const connectDB = require('./config/db');
const { body } = require('express-validator');
const app = express();
// app.use(bodyParser.urlencoded({extended: true}))
// app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

//Connect Database
connectDB();



app.set('port', process.env.PORT || 3000);


//Allows for CRUD calls for Yards, Sectors, Stacks, Panels, and Corners
app.use(stackRoutes);
app.use(panelRoutes);
app.use(cornerRoutes);
app.use(sectorRoutes);
app.use(yardRoutes);

//Stack routes for each sector
app.use(stackRoutes1);
app.use(stackRoutes2);
app.use(stackRoutes3);
app.use(stackRoutes4);
app.use(stackRoutes5);
app.use(stackRoutes6);
app.use(stackRoutes7);
app.use(stackRoutes8);
app.use(stackRoutes9);
app.use(stackRoutes10);
app.use(stackRoutes11);
app.use(stackRoutes12);
app.use(stackRoutes13);
app.use(stackRoutes14);
app.use(stackRoutes15);

//Panel routes for each sector
app.use(panelRoutes1);
app.use(panelRoutes2);
app.use(panelRoutes3);
app.use(panelRoutes4);
app.use(panelRoutes5);
app.use(panelRoutes6);
app.use(panelRoutes7);
app.use(panelRoutes8);
app.use(panelRoutes9);
app.use(panelRoutes10);
app.use(panelRoutes11);
app.use(panelRoutes12);
app.use(panelRoutes13);
app.use(panelRoutes14);
app.use(panelRoutes15);

//Corner routes for each sector
app.use(cornerRoutes1);
app.use(cornerRoutes2);
app.use(cornerRoutes3);
app.use(cornerRoutes4);
app.use(cornerRoutes5);
app.use(cornerRoutes6);
app.use(cornerRoutes7);
app.use(cornerRoutes8);
app.use(cornerRoutes9);
app.use(cornerRoutes10);
app.use(cornerRoutes11);
app.use(cornerRoutes12);
app.use(cornerRoutes13);
app.use(cornerRoutes14);
app.use(cornerRoutes15);


app.get('/', (req, res, next) => {
  res.render('public/index.html');
});

app.use((req, res, next) => {
  res.status(404);
  res.send('404')
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500);
  res.send('500');
});

app.listen(app.get('port'), () => {
  console.log(
    'Express started on http://localhost:' +
      app.get('port') +
      '; press Ctrl-C to terminate.'
  );
});

