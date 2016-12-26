USE [EISAN]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastDatetime04]    Script Date: 2015/02/12 15:07:07 ******/
DROP FUNCTION [dbo].[wCastDatetime04]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastDatetime04]    Script Date: 2015/02/12 15:07:07 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[wCastDatetime04](
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
	SET @rtn = LEFT(CONVERT(varchar, @dt,120),7)
END
--------------------------------------------------------------
RETURN(@rtn)
END

GO


