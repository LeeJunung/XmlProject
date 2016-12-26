USE [EISAN]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastNumeric02]    Script Date: 2015/02/12 15:07:39 ******/
DROP FUNCTION [dbo].[wCastNumeric02]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastNumeric02]    Script Date: 2015/02/12 15:07:39 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[wCastNumeric02](
     @num numeric(20,0)
)
RETURNS varchar(30)
AS
BEGIN
--------------------------------------------------------------
DECLARE
    @rtn varchar(30)
--------------------------------------------------------------
BEGIN
	SET @rtn = CONVERT(varchar, CAST(@num AS money), 1)
	SET @rtn = SUBSTRING(@rtn, 0,LEN(@rtn)-2)
END
--------------------------------------------------------------
RETURN(@rtn)
END

GO


