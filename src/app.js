const express = require('express'); 
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 8080;     

const staticPath = path.join(__dirname, "../public");
const templates = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials'); 
 
app.use(express.static(staticPath));

app.set('view engine', 'hbs');
app.set('views', templates); 
hbs.registerPartials(partialsPath); 

app.get('/', (req, res) => {
  res.render('home', { title: 'weather app 1.0'});
});   

app.get('*', (req, res) => {
  res.render('404error', { title: 'Page Not Found!!', message: 'Sorry, Page Not Found!!' });
}); 


app.listen(port, () => {  
  console.log(`Connect to port ${port}`);
});

