/*
********************************************************************************
*  PT020.new_noti.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  告知事項登録
********************************************************************************
*/

declare
    @currUserId$ varchar(30) = 'MSS'
    ,@title$ varchar(30) = 'title'
    ,@message$ varchar(30) = 'message'
;/*★PGEND★*/

-- 告知事項登録
insert into p_notification
    (id, title, message, deleteFlag, updateTime, updateUser)
values (
    convert(bigint, (next value for p_noti_id))
    , @title$
    , @message$
    , '0'
    , getdate()
    , @currUserId$
)

insert into p_notificationOpen
    (noti_id, user_id, opendttm)
values (
    convert(bigint, (select current_value from sys.sequences where name = 'p_noti_id'))
    , @currUserId$
    , getdate()
)