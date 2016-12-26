USE [EISAN]
GO

SET ANSI_NULLS ON
;
SET QUOTED_IDENTIFIER ON
;
SET ANSI_PADDING ON
;
CREATE TABLE [dbo].[tm_code](
	[group] [varchar](30) NOT NULL,
	[kind] [varchar](200) NOT NULL,
	[code] [varchar](50) NOT NULL,
	[name] [varchar](100) NULL,
	[detail] [varchar](300) NULL,
	[disporder] [numeric](11, 0) NULL,
	[delfg] [char](1) NOT NULL,
	[upddttm] [datetime] NULL,
	[updid] [varchar](30) NULL,
PRIMARY KEY CLUSTERED
(
	[group] ASC,
	[kind] ASC,
	[code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

;
SET ANSI_PADDING OFF
;