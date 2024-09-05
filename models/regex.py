class MyRegExQueries:

    # Selects
    SELECT_USER_AGENT = """
    SELECT
        A.USER_AGENT
    FROM
        APONTAMENTOS A
    WHERE A.USER_AGENT REGEXP ''    
    ORDER BY
        A.DATA_APONTAMENTO DESC,
        A.HORA_APONTAMENTO DESC
    LIMIT 1;    
    """
