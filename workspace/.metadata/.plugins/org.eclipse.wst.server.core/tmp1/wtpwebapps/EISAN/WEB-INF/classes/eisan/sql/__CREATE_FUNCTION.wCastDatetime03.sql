USE [EISAN]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastDatetime03]    Script Date: 2015/02/12 15:06:56 ******/
DROP FUNCTION [dbo].[wCastDatetime03]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastDatetime03]    Script Date: 2015/02/12 15:06:56 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[wCastDatetime03](
     @dt datetime
)
RETURNS varchar(30)
AS
BEGIN
--------------------------------------------------------------
DECLARE
    @rtn varchar(30)
--------------------------------------------------------------
BEGIN
	SET @rtn = LEFT(CONVERT(varchar, @dt,120),10)
END
--------------------------------------------------------------
RETURN(@rtn)
END

GO


