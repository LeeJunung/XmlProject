/*
********************************************************************************
*  PT02A.update_noti.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  告知事項修正
********************************************************************************
*/

declare
    @currUserId$ varchar(30) = 'MSS'
    ,@title$ varchar(30) = 'title'
    ,@message$ varchar(30) = 'message'
    , @id$ int = 1
;/*★PGEND★*/

-- 告知事項登録
update  p_notification
set title = @title$
    , message = @message$
    , updateTime = getdate()
    , updateUser = @currUserId$
where id = @id$