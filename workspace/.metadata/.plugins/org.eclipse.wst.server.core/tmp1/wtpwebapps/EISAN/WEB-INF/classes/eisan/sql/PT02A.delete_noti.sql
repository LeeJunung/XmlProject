/*
********************************************************************************
*  PT02A.delete_noti.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  告知事項削除
********************************************************************************
*/

declare
    @currUserId$ varchar(30) = 'MSS'
    , @id$ int = 1
;/*★PGEND★*/

-- 告知事項登録
update  p_notification
set deleteFlag = '9'
    , updateTime = getdate()
    , updateDate = @currUserId$
where id = @id$