const express = require('express')
const router = express.Router()


const token ='rmw835hec1nturvs9784ffetp0rkr4u'
const clientid = '3mt7gi7jswdubvsppfapvm4x0gmsf7t'


let BigCommerce = require('node-bigcommerce')
const bigCommerce = new BigCommerce({
    clientId: clientid,
    accessToken: token,
    storeHash: "4ccc5gfp0c",
    host: `https://api.bigcommerce.com/stores/{{store_hash}}/v3`,
    responseType: "json"
    
  });



  
router.post('/', (req, res, next) => {
  let sku = req.body.sku
  bigCommerce.get(`/products?sku=${sku}`, (res , data, next)=>{
    
  })
  .then(data => {

    let productid = data.map(data => (

      { 
       productid: data.id
      
    }));
    let custom_fields = data.map(data => ({  custom_fields: productid.custom_fields }));
    var request = require("request");

    var options = {
      method: 'GET',
      url: 'https://api.bigcommerce.com/stores/4ccc5gfp0c/v3/catalog/products/753/custom-fields',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'x-auth-token': 'rmw835hec1nturvs9784ffetp0rkr4u'
      }
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    
      console.log(body);
    });

    
    let result = data.map(data => (
      { 
       productid: data.id,
       product_name: data.name,
       product_sku: data.sku,
       short_description: data.description
       
    }));

console.log(...productid)
console.log(...custom_fields)
console.log(...result)
      res.render(`products/index`, {
       productid: productid,
       result: result,
       custom_fields: custom_fields
      })
  })
  .catch((err) =>{
      console.error(err)
  })

  // let bigCommerce.get('/products')
  // .then(data => {
  //   // Catch any errors, or handle the data returned
  // });
  


})

  





 


  router.get(`/test`, (req, res, next) => {
    bigCommerce.get(productobj)
    .then(productob => {
      // res.render('datasheets/index')
      console.log(productobj)
    })
    

    });
 
  



module.exports = router