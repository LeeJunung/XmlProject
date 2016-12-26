/*
********************************************************************************
*  PT020.get_notiList.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  告知事項リスト照会
********************************************************************************
*/

declare
    @currUserId$ varchar(30) = 'MSS'
    ,@strDt$ varchar(30) = '2016/09/01'
    ,@endDt$ varchar(30) = '2016/09/30'
    ,@comboBox$ varchar(30) = '2016/09/30'
    ,@textField$ varchar(30) = '2016/09/30'
;/*★PGEND★*/

-- 告知事項リスト照会
select
    p_notification.id as id
	, p_notification.title as title
	, p_notification.message as message
    , convert(varchar(16), p_notification.updateTime, 20) as upddttm
	, m_user.name as userName
	, convert(varchar(16), (select opendttm from p_notificationOpen where noti_id = p_notification.id and user_id = p_notification.updateUser), 20) as opendttm
from p_notification join m_user on p_notification.updateUser = m_user.id
where
    p_notification.deleteFlag = '0'
    and p_notification.updateTime >= (case when @strDt$ = '' then '1900/01/01' else @strDt$ end)
    and p_notification.updateTime <= (case when @endDt$ = '' then '2999/12/31' else @endDt$ end)
    and  p_notification.title like '%' + (case when @comboBox$ = 'title' then @textField$ else '' end) + '%'
    and  p_notification.message like '%' + (case when @comboBox$ = 'message' then @textField$ else '' end) + '%'
    and  m_user.name like '%' + (case when @comboBox$ = 'userName' then @textField$ else '' end) + '%'
order by p_notification.id desc
;