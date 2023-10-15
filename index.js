const {Client} = require('pg')
const express = require('express');
const cors = require('cors');

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "0512",
    database: "hospital_appointment"
});

const app = express();
const port = 3000;
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});
client.connect();

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

app.get('/api/get-appointments', (req, res) => {
    //client.connect();

    client.query('SELECT * FROM Programare', (err, result) => {
        if(!err) {
            res.send(result.rows);
        } else{
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
        //client.end();
    });
});

app.get('/api/get-patient-names', (req, res) => {
    //client.connect();
    client.query('SELECT Nume FROM Pacient', (err, result) => {
        if(!err){
            //const names = result.rows.map((row) => row.Nume);
            //res.send(names);
            res.send(result.rows);
        } //else {
          //  console.log(err.message);
          //  res.status(500).send('Internal Server Error');
        //}
    //client.end();
    });
});

app.post('/api/save-patient', (req, res) => {
    const patientData = req.body;
    //client.connect();
    const insertQuery = 'INSERT INTO Pacient(nume, varsta, telefon) VALUES($1, $2, $3)';
    const values = [patientData.nume, patientData.varsta, patientData.telefon];
    client.query(insertQuery, values, (err, result) => {
        if(!err) {
            console.log('Patient data inserted successfully');
            res.json({ message: 'Datele pacientului au fost introduse cu succes'});

        } else {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        }
        //client.end();
    })
})

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



//client.query(`Select Nume from Pacient`, (err, res)=>{
//    if(!err){
//        console.log(res.rows);
//    } else{
//       console.log(err.message);
//   }
 //  client.end;
//})
