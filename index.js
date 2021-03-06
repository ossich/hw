const express = require('express')
const exphbs = require('express-handlebars')

const homeRoutes = require('./routs/home')
const pingRoutes = require('./routs/ping')

const path = require('path')
const app = express()


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'    
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views','views')


// hbs.renderView(path.join(__dirname, '.views'))
// app.use(express.static('public'))
// hbs.registerPartials(path.join(__dirname, "../", "./views/partials"));

app.use(express.static(path.join(__dirname , "../" , "./public", "../views/partials")));
app.use(express.urlencoded({extended:true}))

app.use('/home',homeRoutes)
app.use('/ping',pingRoutes)


// redirect 2 home:
const targetBaseUrl = '/home';
function handleRedirect(req, res) {
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
}
app.get('*', handleRedirect);
// -----

// app.get('/',(req,res)=>{
//     res.render('home')
// })

// app.get('/ping',(req,res)=>{
//     res.render('ping')
// })

// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','index.hbs'))
// })

// app.get('/ping',(req,res)=>{
//     res.sendFile(path.join(__dirname,'views','ping.html'))
// })

app.listen(3000,()=>{
    console.log('Server is running.')
})

