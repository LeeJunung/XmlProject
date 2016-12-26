DECLARE
	@tblName$ varchar(500) = 'TEST',
/*★PGEND★*/

DELETE
    tm_reporttblinfo
WHERE
    tblname = @tblName$
