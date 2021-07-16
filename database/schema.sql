/*
 *    mysql -u root -p < schema.sql
*/
DROP DATABASE IF EXISTS pup_porters;

CREATE DATABASE pup_porters;

USE pup_porters;

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  is_caregiver BOOLEAN NOT NULL DEFAULT true,
  dog_type ENUM('small', 'medium', 'large', 'xlarge') NOT NULL,
  dog_name VARCHAR(50) NOT NULL,
  card_num VARCHAR(16) NOT NULL,
  exp_month CHAR(2) NOT NULL,
  exp_year CHAR(2) NOT NULL,
  cvv CHAR(3) NOT NULL,
  zip_code CHAR(5) NOT NULL
);

CREATE TABLE flags (
  id INT PRIMARY KEY AUTO_INCREMENT,
  caregiver_id VARCHAR(255) NOT NULL,
  remover_id VARCHAR(255),
  coords POINT NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  pile_status ENUM('available', 'claimed', 'dropped') NOT NULL DEFAULT 'available',
  FOREIGN KEY (caregiver_id) REFERENCES users(id),
  FOREIGN KEY (remover_id) REFERENCES users(id)
);

CREATE TABLE dropoffs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  place VARCHAR(50) NOT NULL,
  coords POINT NOT NULL
);

INSERT INTO dropoffs (place, coords) VALUES ('Golden Gate Park', Point(37.76941221629452, -122.46322601611328));
INSERT INTO dropoffs (place, coords) VALUES ('Buena Vista Park', Point(37.768611469310585, -122.4415111541748));
INSERT INTO dropoffs (place, coords) VALUES ('Alamo Sqaure Park', Point(37.776371218071695, -122.43482708930969));
INSERT INTO dropoffs (place, coords) VALUES ('Presidio', Point(37.79633638529349, -122.46389066029026));
INSERT INTO dropoffs (place, coords) VALUES ('Dolores Park', Point(37.75979065676546, -122.42717742919922));
INSERT INTO dropoffs (place, coords) VALUES ('Lafayette Park', Point(37.791650877460256, -122.42759585380554));
INSERT INTO dropoffs (place, coords) VALUES ('Fort Mason', Point(37.80465296925594, -122.43045885889566));
INSERT INTO dropoffs (place, coords) VALUES ('Oracle Park', Point(37.77809620209697, -122.38994855963792));
INSERT INTO dropoffs (place, coords) VALUES ('Washington Square Park', Point(37.80078155186425, -122.41024732589722));
INSERT INTO dropoffs (place, coords) VALUES ('Rincoln Dog Park', Point(37.786241459164756, -122.39007711410522));
INSERT INTO dropoffs (place, coords) VALUES ('Lands End', Point(37.78235220909234, -122.50046147244002));

-- SELECT ST_X(coords) as lat FROM dropoffs WHERE id=1;
-- SELECT ST_Y(coords) as lng FROM dropoffs WHERE id=1;

-- INSERT INTO users VALUES ('1', 'chrispak90@gmail.com', true, 'medium', 'Fiddo', '1234567890123456', '05', '25', '123', '00000');

-- INSERT INTO users VALUES ('2', 'katj@gmail.com', true, 'medium', 'FiddoJr', '1234567890123456', '06', '26', '123', '00001');

-- INSERT INTO flags (caregiver_id, coords, price) VALUES ('1', Point(37.75718, -122.48653), 5.12);

-- INSERT INTO flags (caregiver_id, coords, price) VALUES ('2', Point(37.78235, -123.5004), 3.00);

-- SELECT
--   flags.id as flag_id,
--   caregiver_id,
--   (SELECT dog_type WHERE flags.caregiver_id = users.id) as dog_type,
--   (SELECT ST_X(coords)) as lat,
--   (SELECT ST_Y(coords)) as lng,
--   price
-- FROM users INNER JOIN flags
-- WHERE pile_status = 'available';

