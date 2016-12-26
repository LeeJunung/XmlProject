/*
********************************************************************************
*  COMMON.get_codeList.sql
*  Copyright(C) SmartERP by WE
********************************************************************************
*/

declare
    @group$ varchar(30) = 'TEST'
    ,@kind$ varchar(50) = 'radiogroup'
;/*★PGEND★*/

-- メニューリスト照会
select
    code as code
    ,name as data
	,detail as detail
from tm_code
where
    delfg = '0'
    and grp = @group$
    and kind = @kind$
    and delfg = '0'
order by disporder
;