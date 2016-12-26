DECLARE
	@tblName$ varchar(500) = 'D売上';
/*★PGEND★*/

SELECT 
    COLUMN_NAME AS colName
FROM 
    INFORMATION_SCHEMA.COLUMNS
WHERE 
    NOT EXISTS 
    (SELECT * FROM tm_reportcolinfo WHERE TABLE_NAME = tblName and COLUMN_NAME = colName)
    AND TABLE_NAME = @tblName$
ORDER BY 
    ORDINAL_POSITION