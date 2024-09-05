class MyQueries:

    # Selects
    SELECT_FUNCIONARIO = """
    SELECT
        C.NOME AS EMPRESA_NOME,
        F.NOME AS FUNCIONARIO_NOME,
        A.CONTADOR,
        CASE WHEN A.CONTADOR % 2 = 1 THEN 'LIGADO' ELSE 'DESLIGADO' END AS ESTADO,
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
        FUNCIONARIOS F ON A.ID_FUNCIONARIO = F.ID;

    """
    
    # Inserts
    INSERT_APONTAMENTOS = """
    INSERT INTO APONTAMENTOS (
        ID_EMPRESA, 
        ID_FUNCIONARIO, 
        ID_EVENTO,
        DATA_APONTAMENTO, 
        HORA_APONTAMENTO, 
        LATITUDE, 
        LONGITUDE, 
        DESCRICAO
    )
    VALUES (%s, %s, %s, CURDATE(), CURTIME(), %s, %s, %s);
    
    """
