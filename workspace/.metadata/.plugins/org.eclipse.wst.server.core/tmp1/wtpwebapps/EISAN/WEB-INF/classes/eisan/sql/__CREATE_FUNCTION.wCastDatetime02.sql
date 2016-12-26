USE [EISAN]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastDatetime02]    Script Date: 2015/02/12 15:06:49 ******/
DROP FUNCTION [dbo].[wCastDatetime02]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastDatetime02]    Script Date: 2015/02/12 15:06:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[wCastDatetime02](
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
	SET @rtn = LEFT(CONVERT(varchar, @dt,120),16)
END
--------------------------------------------------------------
RETURN(@rtn)
END

GO


