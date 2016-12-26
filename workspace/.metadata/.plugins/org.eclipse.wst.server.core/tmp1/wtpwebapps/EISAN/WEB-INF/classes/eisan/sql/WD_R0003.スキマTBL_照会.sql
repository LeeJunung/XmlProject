SELECT 
    tblname as tblName
    ,tbldispname as tblDispName
FROM 
    tm_reporttblinfo
ORDER BY 
    CAST(disporder as INT)