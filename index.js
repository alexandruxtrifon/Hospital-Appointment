const {Client} = require('pg')
const express = require('express');
const cors = require('cors');
const { DateTime } = require("luxon");

//const currentDateISO = new Date().toISOString();
//const currentDateLocal = new Date().toLocaleDateString();
//const currentDate = currentDateISO.split('T')[0];

const currentDate = DateTime.now().toFormat('MM-dd-yyyy')

console.log(currentDate);
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

app.get('/api/get-appointments/today', (req, res) => {
    //client.connect();
    client.query(
        `SELECT
        P.nume,
        P.varsta,
        P.telefon,
        PR.codprogramare,
        PR.prioritate,
        PR.statusprogramare,
        PR.dataprogramare,
        PR.oraprogramare
        FROM Pacient AS P
        JOIN Programare AS PR ON P.codpacient = PR.codpacient
        WHERE dataprogramare = $1`, [currentDate], (err, result) =>{
            if(err){
                console.error('Error fetching Appointments by date', err);
                res.status(500).json({success: false, error: 'Internal Server Error'});
                return;
            }
            res.send(result.rows);  
        });
    //client.end(); 
});

app.get('/api/get-appointments/:calendar', (req, res) => {
    const calendar = req.params.calendar;
    //client.connect();

    client.query(
        `SELECT
        P.nume,
        P.varsta,
        P.telefon,
        PR.codprogramare,
        PR.prioritate,
        PR.statusprogramare,
        PR.dataprogramare,
        PR.oraprogramare
        FROM Pacient AS P
        JOIN Programare AS PR ON P.codpacient = PR.codpacient
        WHERE dataprogramare = $1`,
    [calendar], (err, result) => {
        if(err){
            console.error('Error fetching Appointments by date', err);
            res.status(500).json({success: false, error: 'Internal Server Error'});
            return;
        }
        //res.status(200).json({success: true, message: 'Fetched Appointments by date'})
        res.send(result.rows);
    });
    //client.end();
});

app.get('/api/get-appointment-data', (req,res)=>{
   //client.connect();
   const sqlQuery= `SELECT
        P.nume,
        P.varsta,
        P.telefon,
        PR.codprogramare,
        PR.prioritate,
        PR.statusprogramare,
        PR.dataprogramare,
        PR.oraprogramare
        FROM Pacient AS P
        JOIN Programare AS PR ON P.codpacient = PR.codpacient`;
        
    client.query(sqlQuery, (err, result) => {
        if(!err) {
            res.json(result.rows);
        } else {
            console.log(err.message);
            res.status(500).send('Internal Server Error');
        }
        //client.end();
    });
});

app.get('/api/get-patient-name', (req, res) => {
    //client.connect();
    client.query('SELECT Nume FROM Pacient', (err, result) => {
        if(!err){
            const names = result.rows.map((row) => row.Nume);
            //res.send(names);
            //res.json(patientData);
            res.send(result.rows);
        } else {
            console.error('Error fetching patient names:', err);
            res.status(500).send('Internal Server Error');
        }
    //client.end();
    });
});

app.get('/api/get-patient-data', (req, res) => {
    //client.connect();
    client.query('SELECT Nume, Varsta, Telefon FROM Pacient', (err, result) => {
        if(!err){
            const names = result.rows.map((row) => row.Nume);
            //res.send(names);
            //res.json(patientData);
            res.send(result.rows);
        } else {
            console.error('Error fetching patient data:', err);
            res.status(500).send('Internal Server Error');
        }
    //client.end();
    });
});

app.get('/api/get-patient-age', (req, res) => {
    //client.connect();
    client.query('SELECT Varsta FROM Pacient', (err, result) => {
        if(!err){
            const names = result.rows.map((row) => row.Varsta);
            //res.send(names);
            //res.json(patientData);
            res.send(result.rows);
        } else {
            console.error('Error fetching patient age:', err);
            res.status(500).send('Internal Server Error');
        }
    //client.end();
    });
});

app.get('/api/get-patient-phone', (req, res) => {
    //client.connect();
    client.query('SELECT Telefon FROM Pacient', (err, result) => {
        if(!err){
            const names = result.rows.map((row) => row.Telefon);
            //res.send(names);
            //res.json(patientData);
            res.send(result.rows);
        } else {
            console.error('Error fetching patient phone number:', err);
            res.status(500).send('Internal Server Error');
        }
    //client.end();
    });
});

app.get('/api/get-config', (req, res) => {
    //client.connect();
    client.query('SELECT durataprogramare FROM Config', (err, result) => {
        if(!err) {
            res.send(result.rows);
        } else {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        //client.end();
    });
});

app.patch('/api/patch-config', (req, res) =>{
    client.query('UPDATE Config SET durataprogramare = $1',
    [durata], (err,result) => {
        if(err){
            console.error('error updating appointment duration', err);
            res.status(500).json({success:false,error:'internal server error'});
            return;
        }
        res.status(200).json({success:true, message:'appointment duration updated successfully'});
    })
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

app.post('/api/post-appointment', (req, res) => {
    //client.connect();

    const {Nume, DataProgramare, OraProgramare, Prioritate, StatusProgramare } = req.body;

    client.query(
        `INSERT INTO Programare (CodPacient, DataProgramare, OraProgramare, Prioritate, StatusProgramare)
        VALUES (( SELECT CodPacient FROM Pacient WHERE Nume = $1), $2, $3, $4, $5)`,
        [Nume, DataProgramare, OraProgramare, Prioritate, StatusProgramare],
        (err) => {
            if (!err) {
                res.status(201).json({ message: 'Appointment added successfully' });
            } else {
                console.error('Error adding appointment:', err);
                res.status(500).json({error: 'Internal Server Error' });
            }
            //client.end();
        }
    );
});

function generateTimeSlots(duration){
    const timeSlots = [];
    const startTime = new Date();
    startTime.setHours(8, 0, 0, 0);
    const endTime = new Date();
    endTime.setHours(22, 0, 0, 0);

    while (startTime <endTime) {
        const formattedTime = startTime.toLocaleTimeString('ro-RO', {hour: '2-digit', minute: '2-digit'});
        timeSlots.push(formattedTime);
        startTime.setMinutes(startTime.getMinutes() + duration);
    }
    return timeSlots;
}

function getDuration(callback) {
    client.query('SELECT DurataProgramare FROM Config', (err, result) =>{
        if(err) {
            callback(err, null);
            return;
        }
        const duration = result.rows[0].durataprogramare;
        callback(null, duration);
    });
}

app.get('/api/time-slots',  (req, res) => {
    getDuration((err, duration) => {
        if (err) {
            res.status(500).json({error: 'Error getting duration from the database' });
        return;
        }
        const timeSlots = generateTimeSlots(duration);
        res.json(timeSlots);
    });

});

app.get('/api/time-slots/:date', (req, res) => {
    const selectedDate = req.params.date;

    getDuration((err, duration) =>{
        if(err) {
            console.error('error getting duration from the database', err);
            res.status(500).json({success: false, error: 'internal server error'});
            return;
        }

        const timeSlots = generateTimeSlots(duration);

        client.query('SELECT oraprogramare FROM Programare WHERE dataprogramare = $1 AND statusprogramare < 4',
        [selectedDate], (err, result) => {
            if (err) {
                console.error('error fetching oraprogramare from the database', err);
                res.status(500).json({success:false, error: 'internal server error'});
                return;
            } else {
                const oraprogramare = result.rows.map((row) => row.oraprogramare);

                const uncommonTimes = timeSlots.filter(timeSlot => !oraprogramare.some(apptTime => apptTime.substring(0, 5) === timeSlot));

                res.json(uncommonTimes);
            }
        });
    })
});
    /*
    const selectedDate = req.params.date;
    client.query('SELECT oraprogramare FROM Programare WHERE dataprogramare != $1',
    [selectedDate], (err, result) => {
        if (err) {
            console.error('Error fetching oraprogramare from the database', err);
            res.status(500).json({ success: false, error: 'internal server error'});
        } else {
            const oraprogramare = result.rows.map((row) => row.oraprogramare);            
            res.status(200).json({success: true, oraprogramare});
        }
    });
});*/

app.patch('/api/update-statusprogramare/1/:programareId', (req, res) => {
    const programareId = req.params.programareId;

    client.query('UPDATE Programare SET statusprogramare = 2 WHERE CodProgramare = $1',
    [programareId], (err, result) => {
        if(err){
            console.error('Error updating Status Programare:', err);
            res.status(500).json({success: false, error: 'Internal Server Error'});
            return;
        }
        res.status(200).json({success: true, message: 'Status Programare updated successfully'});
    });
});

app.patch('/api/update-statusprogramare/2/:programareId', (req, res) => {
    const programareId = req.params.programareId;

    client.query('UPDATE Programare SET statusprogramare = 3 WHERE CodProgramare = $1',
    [programareId], (err, result) => {
        if(err){
            console.error('Error updating Status Programare:', err);
            res.status(500).json({success: false, error: 'Internal Server Error'});
            return;
        }
        res.status(200).json({success: true, message: 'Status Programare updated successfully'});
    });
});

app.patch('/api/update-programare-time/:programareId', (req, res) => {
    const programareId = req.params.programareId;
    client.query('UPDATE Programare SET statusprogramare = 4 WHERE CodProgramare = $1',
    [programareId], (err, result) => {
        if(err){
            console.error('Error canceling appointment:', err);
            res.status(500).json({success: false, error: 'internal server error'});
            return;
        }
        res.status(200).json({success: true, message: 'Programare canceled successfully'});
    })
});



//client.query(`Select Nume from Pacient`, (err, res)=>{
//    if(!err){
//        console.log(res.rows);
//    } else{
//       console.log(err.message);
//   }
 //  client.end;
//})
