/*
********************************************************************************
*  _Main.メニューリスト_照会.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  メニューリスト照会
*  [変更履歴]
*  Rev.1.0 2014/12/31 HJ.Kong 初版
********************************************************************************
*/

declare
    @currUserId$ varchar(30) = '10'
;/*★PGEND★*/

-- メニューリスト照会
select
    menu.id as id
    ,menu.name as nm
from tm_menu menu
where
    menu.delfg = '0'
    and menu.kind = '3'
    and menu.step = '3'
    and dbo.wCheckAuth(@currUserId$, menu.authidlist) = '1'
order by (select CAST(umenu.disporder as INT) from tm_menu umenu where umenu.id = menu.upperid), CAST(menu.disporder as INT)
;