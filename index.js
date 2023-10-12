const {Client} = require('pg')
const express = require('express');
const cors = require('cors');

const client = new Client({
    host: "localhost",
    user: "postgres",
    post: 5432,
    password: "0512",
    database: "hospital_appointment"
})

const app = express();
const port = 3000;
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get('/programare', (req, res) => {
    client.connect();

    client.query('SELECT * FROM Programare', (err, result) => {
        if(!err) {
            res.send(renderProgramareTable(result.rows));
        } else{
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
        client.end();
    });
});


function renderProgramareTable(data){
    const rows = data.map(row => {
        return `
        <tr>
            <td>${row.CodProgramare}</td>
            <td>${row.CodPacient}</td>
            <td>${row.Prioritate}</td>
            <td>${row.StatusProgramare}</td>
        </tr>`;
    });

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Appointment Data</title>
        </head>
        <body>
            <h1>Appointment Data</h1>
            <table>
                <tr>
                    <th>CodProgramare</th>
                    <th>CodPacient</th>
                    <th>Prioritate</th>
                    <th>StatusProgramare</th>
                </tr>
                ${rows.join('')}
            </table>
        </body>
        </html>`;
}

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
//client.connect();

//client.query(`Select * from Pacient`, (err, res)=>{
//    if(!err){
//        console.log(res.rows);
//    } else{
//        console.log(err.message);
//    }
//    client.end;
//})
