DECLARE
@tblName$ varchar(500) = '',
@tblDispName$ varchar(500) = '',
;/*★PGEND★*/

select TOP 1000
    tbl.tblname as tblname
	,tbl.tbldispname as tbldispname
	,tbl.disporder as tbldisporder
	,tbl.authidlist as tblauthidlist
	,upddttm
	,updid
from tm_reporttblinfo tbl
where
    dbo.wCheckAuth(@currUserId$, tbl.authidlist) = '1'
    and tbl.tblname like (CASE WHEN @tblName$ = '' THEN tbl.tblname ELSE @tblName$ END) 
    and tbl.tbldispname like (CASE WHEN @tblDispName$ = '' THEN tbl.tbldispname ELSE @tblDispName$ END) 
order by CAST(tbl.disporder as INT)