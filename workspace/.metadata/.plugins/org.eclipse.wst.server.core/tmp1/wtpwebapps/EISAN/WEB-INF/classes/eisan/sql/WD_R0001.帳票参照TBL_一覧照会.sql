/*
********************************************************************************
*  _D_000011.帳票用テーブル情報_照会.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  帳票用テーブル情報照会
*  [変更履歴]
*  Rev.1.0 2014/12/31 HJ.Kong 初版
********************************************************************************
*/

declare
    @currUserId$ varchar(50) = 'we'
;/*★PGEND★*/

-- 帳票用テーブル情報照会
select
    tbl.tblname as tblname
	,tbl.tbldispname as tbldispname
	,tbl.disporder as tbldisporder
	,col.colname as colname
    ,col.coldispname as coldispname
	,col.disporder as coldisporder
    ,col.datatype as datatype
from tm_reporttblinfo tbl
    left join tm_reportcolinfo col
	on tbl.tblname = col.tblname 
where
    dbo.wCheckAuth(@currUserId$, tbl.authidlist) = '1'
	and dbo.wCheckAuth(@currUserId$, col.authidlist) = '1'
order by CAST(tbl.disporder as INT), CAST(col.disporder as INT)
;
