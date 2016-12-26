USE [EISAN]
GO

/****** Object:  UserDefinedFunction [dbo].[wCheckAuth]    Script Date: 2015/02/12 14:38:40 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


-------------------------------------------------------------
-- 権限チェック関数
-- Copyright(C) SmartERP by WE
-- 【PARAM】
--  (varchar)@prmAuthId：権限ID
--  (varchar)@prmUserId：担当者ID
-- 【RETURN】
--  (varchar)権限有無('0':権限なし '1'：権限あり)
--  [変更履歴]
--  Rev.1.0 2014/03/31 HJ.Kong 初版
--------------------------------------------------------------
CREATE FUNCTION [dbo].[wCheckAuth](
    @prmUserId varchar(20)
	,@prmAuthIdList varchar(1000)
)
RETURNS varchar(1)
AS
BEGIN
--------------------------------------------------------------
DECLARE
    @rtn varchar(1)
    ,@chk int
--------------------------------------------------------------
BEGIN

    -- (IF)パラメータがNULLの場合
    IF @prmUserId is null

        -- 権限なし
        SET @rtn = '0'

    -- (IF)パラメータがNULLではない場合
    ELSE 
    BEGIN

        -- 本部権限有無チェック
        SET @chk =
            (
			select 
			    count(*) 
			from 
			    dbo.utilSplit((select authorityList from m_user where id = @prmUserId), ',') A
			where 
			    A.splitString in ( select B.splitString from dbo.utilSplit((@prmAuthIdList),',') B)
			)
        IF @chk = 0
            SET @rtn = '0'
        ELSE
            SET @rtn = '1'

    END
END
--------------------------------------------------------------
RETURN(@rtn)
END
GO


