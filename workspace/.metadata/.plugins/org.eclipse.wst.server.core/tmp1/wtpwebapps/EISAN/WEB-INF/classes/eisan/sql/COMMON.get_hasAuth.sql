/*
********************************************************************************
*  COMMON.get_hasAuth.sql
*  Copyright(C) SmartERP by WE
********************************************************************************
*/

declare
    @authId$ varchar(500) = 'Gショップ'
    ,@currUserId$ varchar(500) = '100001'
;/*★PGEND★*/

SELECT dbo.wCheckAuth(@currUserId$,@authId$) as hasAuth