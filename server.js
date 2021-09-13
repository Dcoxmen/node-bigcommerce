const expressHbs = require('express-handlebars')
const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Handlebars Helpers
const {
    truncate,
    stripTags
} = require('./helpers/hbs')


app.engine('handlebars', expressHbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags
    },
    defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.set('views', 'views')

const productsRoutes = require('./routes/products')
const indexRoutes = require('./routes/index')


 app.use(indexRoutes)
app.use('/products', productsRoutes)







app.listen(4000, () => console.log('Express Server Now Running On localhost:4000'))