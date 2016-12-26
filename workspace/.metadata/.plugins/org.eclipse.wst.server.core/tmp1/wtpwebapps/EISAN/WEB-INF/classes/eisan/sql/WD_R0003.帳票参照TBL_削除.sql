DECLARE
	@tblName$ varchar(500) = 'TEST',
	@colName$ varchar(500) = 'TEST'
;
/*★PGEND★*/

DELETE
    tm_reportcolinfo
WHERE
    tblname = @tblName$
    and colname = @colName$
