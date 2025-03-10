## Banco de dados

### Descrição
Este documento descreve a estrutura e operações do banco de dados **MySQL**.

___

### Squema
Diagrama referente ao [Banco de dados](../../../db.sql)

![EER Diagram - MySQL Workbench](eer-diagram.svg)

___

### SQL (Base)

- [Data Definition Language (DDL)](#data-definition-language-ddl)
  - [Create](#create)
  - [Alter](#alter)
  - [Trigger](#trigger)
  - [Index](#index)
- [Data Control Language (DCL)](#data-control-language-dcl)
  - [Grant](#grant)
- [Data Manipulation Language (DML)](#data-manipulation-language-dml)
  - [Insert](#insert)
- [Data Query Language (DQL)](#data-query-language-dql)
  - [Select](#select)

___

#### Data Definition Language (DDL)

##### Create

```
CREATE USER 'root'@'127.0.0.1' IDENTIFIED BY 'root-password';  
CREATE USER 'root'@'::1' IDENTIFIED BY 'root-password';  
FLUSH PRIVILEGES;  

CREATE SCHEMA PONTUAL;  
USE PONTUAL;  

CREATE TABLE EMPRESAS (  
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,  
    LOGIN  VARCHAR(32),  
    SENHA VARCHAR(32),  
    NOME VARCHAR(60),  
    CNPJ_CPF VARCHAR(14),  
    CEP VARCHAR(10),  
    NUMERO INTEGER,  
    COMPLEMENTO VARCHAR(32),  
    ATIVO BOOLEAN  
);

CREATE TABLE FUNCIONARIOS (  
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,  
    ID_EMPRESA INTEGER,   
    LOGIN  VARCHAR(32),  
    SENHA VARCHAR(32),  
    NOME VARCHAR(60),  
    CNPJ_CPF VARCHAR(14),  
    CEP VARCHAR(10),  
    NUMERO INTEGER,  
    ENTRADA TIME,  
    INTERVALO_SAIDA TIME,  
    INTERVALO_RETORNO TIME,  
    SAIDA TIME,  
    HOME_OFFICE BOOLEAN,  
    ENTRADA_FLEXIVEL BOOLEAN,  
    ALMOCO_FLEXIVEL BOOLEAN,  
    HORA_EXTRA BOOLEAN,  
    ESCALA_ESPECIAL BOOLEAN,  
    LOCAL_EXATO BOOLEAN,  
    DATA_CADASTRO DATETIME,  
    ATIVO BOOLEAN  
);

CREATE TABLE EVENTOS (  
    ID INT AUTO_INCREMENT PRIMARY KEY,  
    NOME VARCHAR(32),  
    MENSAGEM VARCHAR(32),  
    HORARIO TIME,  
    ATIVO BOOLEAN  
);

CREATE TABLE APONTAMENTOS (  
    ID INTEGER PRIMARY KEY AUTO_INCREMENT,  
    ID_EMPRESA INTEGER,  
    ID_FUNCIONARIO INTEGER,  
    ID_EVENTO INTEGER,  
    CONTADOR INTEGER,  
    DATA_APONTAMENTO DATE,  
    HORA_APONTAMENTO TIME,  
    LATITUDE DECIMAL(10, 6),  
    LONGITUDE DECIMAL(10, 6),  
    DESCRICAO VARCHAR(60),  
    USER_AGENT TEXT,  
    IP_ADDRESS VARCHAR(45)  
);
```

##### Alter
```
ALTER TABLE FUNCIONARIOS  
ADD CONSTRAINT fk_funcionarios_id_empresas   
FOREIGN KEY (ID_EMPRESA)  
REFERENCES EMPRESAS (ID);

ALTER TABLE APONTAMENTOS  
ADD CONSTRAINT fk_apontamentos_id_empresas   
FOREIGN KEY (ID_EMPRESA)  
REFERENCES EMPRESAS (ID);

ALTER TABLE APONTAMENTOS  
ADD CONSTRAINT fk_apontamentos_id_funcionarios   
FOREIGN KEY (ID_FUNCIONARIO)  
REFERENCES FUNCIONARIOS (ID);
```

##### Trigger
```
DELIMITER //  
CREATE TRIGGER TRG_APONTAMENTOS_CONTADOR  
BEFORE INSERT ON APONTAMENTOS  
FOR EACH ROW  
BEGIN  
    SET @max_contador = (SELECT MAX(CONTADOR) FROM APONTAMENTOS WHERE ID_FUNCIONARIO = NEW.ID_FUNCIONARIO AND ID_EVENTO = NEW.ID_EVENTO);  
    IF @max_contador IS NULL THEN  
        SET NEW.CONTADOR = 1;  
    ELSE  
        SET NEW.CONTADOR = @max_contador + 1;  
    END IF;  
END;  
//  
DELIMITER ;
```

##### Index

```
CREATE UNIQUE INDEX IDX_APONTAMENTOS ON APONTAMENTOS (ID_EMPRESA, ID_FUNCIONARIO, CONTADOR);
```

#### Data Control Language (DCL)
##### Grant

```
GRANT ALL PRIVILEGES ON *.* TO 'PONTUAL_ADMIN'@'localhost' WITH GRANT OPTION;  
GRANT ALL PRIVILEGES ON *.* TO 'PONTUAL_ADMIN'@'%' WITH GRANT OPTION;  

FLUSH PRIVILEGES;  

GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1';  
GRANT ALL PRIVILEGES ON *.* TO 'root'@'::1';  

GRANT SELECT, INSERT, UPDATE, DELETE ON PONTUAL.EMPRESAS TO 'PONTUAL_ADMIN'@'localhost';  
GRANT SELECT, INSERT, UPDATE, DELETE ON PONTUAL.FUNCIONARIOS TO 'PONTUAL_ADMIN'@'localhost';  
GRANT SELECT, INSERT, UPDATE, DELETE ON PONTUAL.APONTAMENTOS TO 'PONTUAL_ADMIN'@'localhost';  

FLUSH PRIVILEGES;
```

#### Data Manipulation Language (DML)
##### Insert
```
INSERT INTO EMPRESAS (LOGIN, SENHA, NOME, CNPJ_CPF, CEP, NUMERO, COMPLEMENTO, ATIVO)  
VALUES  
    ('admin@debug.com', 'qwerty123', 'Empresa - Debug', '12345678901', '12345', 1, 'Complement', TRUE),  
    ('admin@real.com', 'qwerty123', 'Empresa - Real', '98765432101', '54321', 2, 'Other', TRUE);
```

#### Data Query Language (DQL)
##### Select

```
SELECT  
    E.NOME AS EMPRESA_NOME,  
    F.NOME AS FUNCIONARIO_NOME,      
    A.CONTADOR,  
    A.DATA_APONTAMENTO,  
    A.HORA_APONTAMENTO,  
    A.LATITUDE,  
    A.LONGITUDE,  
    A.DESCRICAO  
FROM  
    APONTAMENTOS A  
JOIN  
    EMPRESAS C ON A.ID_EMPRESA = C.ID  
JOIN  
    FUNCIONARIOS F ON A.ID_FUNCIONARIO = F.ID  
JOIN  
    EVENTOS E ON A.ID_EVENTO = E.ID;
```

___

### SQL (Query)
Arquivo contendo as [queries de interação](../../../models/queries.py)
