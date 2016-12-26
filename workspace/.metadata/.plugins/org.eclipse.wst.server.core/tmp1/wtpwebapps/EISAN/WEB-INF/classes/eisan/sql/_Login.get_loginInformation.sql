
  /*
********************************************************************************
*  _Login.get_loginInformation.sql
*  Copyright(C) SmartERP by WE
*
*  [概要]
*  ログイン情報照会
*  [変更履歴]
*  Rev.1.0 2014/12/31 HJ.Kong 初版
********************************************************************************
*/

declare
    @userId$ varchar(50)= '1'
    ,@userPw$ varchar(50) = '1'
    ,@currDate$ varchar(50)= '2014/11/04'
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
    m_user.id = @userId$
    and isnull(m_user.password, '') = @userPw$
--    and ifnull(user.enddt, cast('2999/12/31' as date)) >= cast(@currDate$ as date)
    and m_user.deleteFlag = '0'
;
