DECLARE
@tblName$ varchar(500) = '',
@tblDispName$ varchar(500) = '',
@colName$ varchar(500) = '',
@colDispName$ varchar(500) = '';
/*★PGEND★*/

select TOP 1000
    tbl.tblname as tblname
	,tbl.tbldispname as tbldispname
	,tbl.disporder as tbldisporder
	,col.colname as colname
    ,col.coldispname as coldispname
	,col.disporder as coldisporder
	,col.authidlist as colauthidlist
    ,col.datatype as datatype
    ,col.upddttm
	,col.updid
from tm_reporttblinfo tbl
    left join tm_reportcolinfo col
	on tbl.tblname = col.tblname 
where
    dbo.wCheckAuth(@currUserId$, tbl.authidlist) = '1'
	and dbo.wCheckAuth(@currUserId$, col.authidlist) = '1'
    and tbl.tblname like (CASE WHEN @tblName$ = '' THEN tbl.tblname ELSE @tblName$ END) 
    and col.colname like (CASE WHEN @colName$ = '' THEN col.colname ELSE @colName$ END) 
    and tbl.tbldispname like (CASE WHEN @tblDispName$ = '' THEN tbl.tbldispname ELSE @tblDispName$ END) 
    and col.coldispname like (CASE WHEN @colDispName$ = '' THEN col.coldispname ELSE @colDispName$ END) 
order by tbl.disporder, col.disporder  -- ★ToDo