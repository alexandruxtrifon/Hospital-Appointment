const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    post: 5432,
    password: "0512",
    database: "hospital_appointment"
})

client.connect();

client.query(`Select * from Pacient`, (err, res)=>{
    if(!err){
        console.log(res.rows);
    } else{
        console.log(err.message);
    }
    client.end;
})
