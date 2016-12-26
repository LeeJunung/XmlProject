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
    ,@menuName$ varchar(50)  = 'テスト帳票'
    ,@menuUpperId$ varchar(50)  = '070100'
    ,@menuDisporder$ varchar(50)  = '0001'
    ,@authidlist$ varchar(1)  = '1'
    ,@currDatetime$ varchar(500) = '2015-02-10 09:36:48'
    ,@currUserId$ varchar(500) = 'TEST'
;/*★PGEND★*/

update tm_menu
set name = @menuName$
	,upperid = @menuUpperId$
	,disporder = @menuDisporder$
	,authidlist = @authidlist$
	,upddttm = @currDatetime$
	,updid = @currUserId$
where id = @menuId$
;
