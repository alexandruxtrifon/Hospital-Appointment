DROP TABLE Pacient CASCADE;
DROP TABLE Programare;
DROP TABLE Config;
CREATE TABLE Pacient(Nume VARCHAR(30),
					Varsta SMALLINT,
					Telefon VARCHAR(15),
					CodPacient SERIAL PRIMARY KEY
					);
-- Prioritate AS ENUM ('Ridicata', 'Medie', 'Scazuta');
-- StatusProgramare ENUM('Programat', 'Preluat', 'Incheiata', 'Anulata')

CREATE TABLE Programare(CodProgramare SERIAL PRIMARY KEY,
						CodPacient INT REFERENCES Pacient(CodPacient),
						Prioritate SMALLINT CHECK(Prioritate IN (1,2,3)),
						StatusProgramare SMALLINT CHECK(StatusProgramare IN(1,2,3,4)),
						DataProgramare date,
						OraProgramare time
						);
SET datestyle = 'European';
CREATE TABLE Config(DurataProgramare INT DEFAULT 30);
						
--INSERT INTO Pacient (Nume, Varsta, Telefon) VALUES('John Doe', 30, '07289347');
INSERT INTO Pacient (Nume, Varsta, Telefon)
VALUES
    ('Pacient 1', 35, '0724598370'),
    ('Pacient 2', 45, '0734987789'),
    ('Pacient 3', 28, '0734879668');
INSERT INTO Programare (CodPacient, Prioritate, StatusProgramare, DataProgramare, OraProgramare)
VALUES
    (1, 1, 1, '20/10/2023', '08:00'),
    (2, 2, 1, '21/10/2023', '09:00'),
    (3, 3, 1, '20/10/2023', '08:30');
--INSERT INTO Programare(1,2,4);
SELECT * FROM Pacient;
SELECT Nume FROM Pacient;
SELECT * FROM Programare;
SELECT * FROM Config;