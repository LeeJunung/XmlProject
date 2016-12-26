
  /*
********************************************************************************
*  SP010.get_userInformation.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  ユーザー情報照会
*  [変更履歴]
********************************************************************************
*/

declare
    @userId$ varchar(50)= '1'
    ,@userNm$ varchar(50) = '1'
;/*★PGEND★*/

-- ログイン情報照会
select
    m_user.id as userId
    ,m_user.name as userNm
    --,m_user.ショップCD as shopCd
    --,(select ショップ名 from Mショップ where Mショップ.ショップCD = M担当者.ショップCD) as shopNm
    --,(select 事業部CD from Mショップ where Mショップ.ショップCD = M担当者.ショップCD) as diviCd
    --,(select 事業部名 from M事業部 where 事業部CD =
	--  (select 事業部CD from Mショップ where Mショップ.ショップCD = M担当者.ショップCD)) as diviNm
    ,m_user.email as mailAddr
    ,m_user.authorityList as authList
from m_user
where
    m_user.id = (case when @userId$ = '' then m_user.id else @userId$ end)
    and m_user.name like '%' + @userNm$ + '%'
--    and ifnull(user.enddt, cast('2999/12/31' as date)) >= cast(@currDate$ as date)
    and m_user.delfg = '0'
;
