CREATE TABLE Pacient(nume VARCHAR(30) NOT NULL,
					Varsta SMALLINT(3) NOT NULL,
					Telefon VARCHAR(15) NOT NULL,
					CodPacient SERIAL PRIMARY KEY
					);
CREATE TABLE Programare(CodProgramare SERIAL PRIMARY KEY,
						CodPacient INT REFERENCES Pacient(CodPacient),
						Prioritate ENUM('Ridicata', 'Medie', 'Scazuta').
						StatusProgramare ENUM('Programat', 'Preluat', 'Incheiata', 'Anulata')
						);
CREATE TABLE Config(CodConfig SERIAL PRIMARY KEY,
				   DurataProgramare INT DEFAULT 30
				   );						