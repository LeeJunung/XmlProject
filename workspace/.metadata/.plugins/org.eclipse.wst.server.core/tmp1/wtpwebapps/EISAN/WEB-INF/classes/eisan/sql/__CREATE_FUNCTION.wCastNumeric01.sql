USE [EISAN]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastNumeric01]    Script Date: 2015/02/12 15:07:14 ******/
DROP FUNCTION [dbo].[wCastNumeric01]
GO

/****** Object:  UserDefinedFunction [dbo].[wCastNumeric01]    Script Date: 2015/02/12 15:07:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


CREATE FUNCTION [dbo].[wCastNumeric01](
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
END
--------------------------------------------------------------
RETURN(@rtn)
END

GO


