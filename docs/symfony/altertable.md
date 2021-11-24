## Alter Table

quand je dois modifier une table en changeant une valeur nullable a non nullable `TOUJOURS` penser a d'abord inititier la valeur.

ex: 
````
        $this->addSql('UPDATE product SET price = 0 WHERE price IS NULL');
        $this->addSql('ALTER TABLE product CHANGE price price INT NOT NULL';
        $this->addSql('UPDATE product SET price = price * 100');
````