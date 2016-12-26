USE [EISAN]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastDatetime01]    Script Date: 2015/02/12 15:05:55 ******/
DROP FUNCTION [dbo].[wCastDatetime01]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastDatetime01]    Script Date: 2015/02/12 15:05:55 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[wCastDatetime01](
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
	SET @rtn = CONVERT(varchar, @dt,120)
END
--------------------------------------------------------------
RETURN(@rtn)
END

GO


