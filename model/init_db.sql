--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE if exists students;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE ingredients(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(40) NOT NULL,
    amount INT NOT NULL,
    measurement_unit VARCHAR(40) NOT NULL,
    recipe_id INT NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE recipe(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    title VARCHAR(40) NOT NULL,
    image VARCHAR(40) NOT NULL,
    description VARCHAR(40) NULL,
    servings INT NOT NULL,
    notes VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);

