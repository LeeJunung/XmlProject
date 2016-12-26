/*
********************************************************************************
*  _Main.get_notiCnt.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  告知事項カウント照会
********************************************************************************
*/

declare
    @currUserId$ varchar(30) = 'mss'
;/*★PGEND★*/

-- 告知事項カウント照会
select count(*) as notiCnt from p_notification full join p_notificationOpen
on p_notification.id = p_notificationOpen.noti_id
and p_notification.updateUser = p_notificationOpen.user_id
where p_notification.deleteFlag != '9'
and opendttm is null
and p_notification.updateUser = @currUserId$
;