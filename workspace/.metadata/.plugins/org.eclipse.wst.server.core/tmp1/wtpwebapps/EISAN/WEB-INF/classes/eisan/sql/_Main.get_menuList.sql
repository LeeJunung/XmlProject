/*
********************************************************************************
*  _Main.get_menuList.sql
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
    id as menuId
	,name as menuName
    ,kind as menuKind
    ,step as menuStep
	,upperid as menuUpperId
	,disporder as menuDispOrder
    ,url as menuUrl
	,authidlist as menuAuthIdList
from tm_menu
where
    delfg = '0'
    and dbo.wCheckAuth(@currUserId$, authidlist) = '1'
order by step, disporder
;