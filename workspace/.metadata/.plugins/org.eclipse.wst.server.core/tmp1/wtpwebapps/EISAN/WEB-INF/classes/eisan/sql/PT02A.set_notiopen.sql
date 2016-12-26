/*
********************************************************************************
*  PT020.set_notiopen.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  告知事項
********************************************************************************
*/

declare
    @currUserId$ varchar(30) = 'mss'
    , @id$ varchar(30) = '1'
;/*★PGEND★*/

-- 告知事項
declare @cnt int

set @cnt = (select count(*) from p_notificationOpen where noti_id = convert(bigint, @id$) and user_id = @currUserId$)

if @cnt = 0
begin
	insert into p_notificationOpen (noti_id, user_id, opendttm)
	values(convert(bigint, @id$), @currUserId$, getdate())
end