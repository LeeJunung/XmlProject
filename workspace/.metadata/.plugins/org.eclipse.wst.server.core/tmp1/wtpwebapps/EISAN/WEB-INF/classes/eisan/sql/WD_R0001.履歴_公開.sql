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
    @seq$ varchar(50) = ''
    ,@menuId$ varchar(50) = ''
;/*★PGEND★*/

update tm_reporthistory
set relfg = case when seq = @seq$ then '1' else '0' end
where id = @menuId$