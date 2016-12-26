USE [EISAN]
GO

/****** Object:  UserDefinedFunction [dbo].[utilSplit]    Script Date: 2016/08/18 16:07:08 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


--------------------------------------------------------------
--  文字列Split関数
-- Copyright(C) SmartERP by WE
-- 【PARAM】
--  (varchar)@prmStringList：分割対象の文字列
--  (varchar)@prmStringPunc：区切り文字列
-- 【RETURN】
--  (TABLE int)    行番号
--  (TABLE varchar)分割した文字列
--  [変更履歴]
--  Rev.1.0 2014/03/31 HJ.Kong 初版
--------------------------------------------------------------
CREATE FUNCTION [dbo].[utilSplit](
    @prmStringList varchar(MAX)
    ,@prmStringPunc varchar(1)
)
RETURNS @TBL_RESULT TABLE(rownum int, splitString varchar(100))
AS
BEGIN
--------------------------------------------------------------
DECLARE
    @end_flg tinyint            --終了フラグ
    ,@sel_value varchar(MAX)    --作業中文字列
    ,@i int                     --インデックス
    ,@j int                     --インデックス
    ,@rownum int                --行番号
--------------------------------------------------------------
SET @end_flg = 0
SET @i = 0
SET @j = 0
SET @rownum = 1

IF @prmStringList IS NULL
	SET @sel_value = 'DUMMY'
ELSE

BEGIN
    SET @sel_value = @prmStringList
    WHILE @end_flg = 0
        BEGIN
            SET @sel_value = substring(@sel_value, @i + 1, len(@sel_value) - @i)
            SET @i = charindex(@prmStringPunc, @sel_value)

            IF @i = 0
                BEGIN
                    SET @end_flg = 1
                END
            ELSE 
                BEGIN
                    insert into @TBL_RESULT(rownum, splitString)
                        select @rownum, substring(@sel_value,1,@i-1) as splitString

                    SET @j = @j + 1
                    SET @rownum = @rownum + 1
                END
        END
    -- -----------------------------
    -- LOOP終了
    -- -----------------------------
END

--------------------------------------------------------------
IF @sel_value != ''
    insert into @TBL_RESULT(rownum, splitString)
        select @rownum, @sel_value as splitString

RETURN
END

GO


