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
    ,@menuNm$ varchar(50)= ''
;/*★PGEND★*/

select
    id as menuId
    ,name as menuNm
    ,upperid as upperId
    ,(select name from tm_menu uview where uview.id = tm_menu.upperid) as upperNm
    ,right(disporder, 4) as disporder
    ,authidlist as authList
    ,step as menuStep
from 
    tm_menu
where 
	delfg = '1'
    and kind = '3'
    and step = '2'
    and name like (case when @menuNm$ = '' then name else @menuNm$ end)
order by CAST(disporder as INT) 
;
