const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb').MongoClient;

const url='mongodb://localhost:27017'
const port=5000;
const app = express();
app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
    mongodb.connect(url, { useNewUrlParser: true }, (error, db) => {
        if (error) 
            console.log('Unable to connect to database!')
        const dbo = db.db('users_data')
        dbo.collection('users').find().toArray( (err, results) =>{
            console.log(results)
            res.send(results)
          })
    })
});

app.post('/api', (req, res) => {    
    mongodb.connect(url, { useNewUrlParser: true }, (error, db) => {
        if (error) 
            console.log('Unable to connect to database!')

        const dbo = db.db('users_data')
        dbo.collection('users').insertOne({user: req.body.user,age: req.body.age },(err,res)=>{
            if (err) 
                console.log('Unable to insert!')
            console.log('inserted record')  
		}) 
	});
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));