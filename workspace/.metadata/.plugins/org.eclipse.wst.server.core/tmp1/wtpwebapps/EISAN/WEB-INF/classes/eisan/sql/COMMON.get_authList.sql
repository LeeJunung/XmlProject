/*
********************************************************************************
*  COMMON.get_authList.sql
*  Copyright(C) SmartERP by WE
********************************************************************************
*/

SELECT
    id as authId
    ,kind as authKind
    ,expl as authExpl
    ,delfg as delfg
	,repdispfg as repDispfg
    ,upddttim as upddttm
    ,updid as updid
FROM 
    m_auth
WHERE 
    repdispfg = '1'