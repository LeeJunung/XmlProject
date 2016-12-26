/*
********************************************************************************
*  S0103.getViewInfo.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  ViewInfo
*  [変更履歴]
*  Rev.1.0 2014/12/31 Jc.Kim 初版
********************************************************************************
*/

declare
    @menuId$ varchar(50) = ''
;/*★PGEND★*/

select
	seq
    ,id
	,comment
    ,content
    ,case when relfg = '1' then '○' else (case when relfg = '2' then '△' else '' end) end as relfg
	,delfg
	,upddttm
	,updid
from 
    tm_reporthistory
where
    id = @menuId$
	and delfg = '1'
order by seq desc
;