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
    ,@fileCont$ varchar(50)  = 'テスト帳票'
    ,@menuCmnt$ varchar(50)  = '070100'
    ,@currDatetime$ varchar(500) = '2015-02-10 09:36:48'
    ,@currUserId$ varchar(500) = 'TEST'
;/*★PGEND★*/

insert tm_reporthistory
    (id
	,comment
    ,content
    ,relfg
	,delfg
	,upddttm
	,updid)
values
	(@menuId$
	,@menuCmnt$
	,@fileCont$
	,'9'
	,'1'
	,@currDatetime$
    ,@currUserId$)
;
