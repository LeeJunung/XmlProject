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
    @menuId$ varchar(30) = '10'
;/*★PGEND★*/

-- メニューリスト照会
select
    menu.id as menuId
    ,menu.name as menuName
    ,menu.upperid as menuUpperId
    ,right(menu.disporder, 4) as menuDisporder
    ,menu.authidlist as menuAuthidlist
from tm_menu menu
where
    menu.id = @menuId$
;