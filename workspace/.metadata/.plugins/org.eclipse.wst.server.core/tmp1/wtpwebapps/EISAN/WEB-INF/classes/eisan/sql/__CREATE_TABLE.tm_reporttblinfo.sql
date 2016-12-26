USE [EISAN]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__updid__1CDDD855]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__upddt__1BE9B41C]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__delfg__1AF58FE3]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__dispo__1A016BAA]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__coldi__190D4771]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__tbldi__18192338]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__authi__1724FEFF]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__maxle__1630DAC6]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__datat__153CB68D]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__isnul__14489254]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] DROP CONSTRAINT [DF__tm_report__colke__13546E1B]
GO

/****** Object:  Table [dbo].[tm_reporttblinfo]    Script Date: 2015/02/12 10:11:49 ******/
DROP TABLE [dbo].[tm_reporttblinfo]
GO

/****** Object:  Table [dbo].[tm_reporttblinfo]    Script Date: 2015/02/12 10:11:49 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tm_reporttblinfo](
	[tblname] [nvarchar](100) NOT NULL,
	[colname] [nvarchar](200) NOT NULL,
	[colkey] [nchar](1) NULL,
	[isnull] [nvarchar](3) NULL,
	[datatype] [nvarchar](30) NULL,
	[maxlength] [numeric](11, 0) NULL,
	[authidlist] [nvarchar](1000) NULL,
	[tbldispname] [nvarchar](100) NULL,
	[coldispname] [nvarchar](200) NULL,
	[disporder] [numeric](11, 0) NULL,
	[delfg] [nchar](1) NOT NULL,
	[upddttm] [datetime] NULL,
	[updid] [nvarchar](30) NULL,
PRIMARY KEY CLUSTERED 
(
	[tblname] ASC,
	[colname] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [colkey]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [isnull]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [datatype]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [maxlength]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [authidlist]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [tbldispname]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [coldispname]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [disporder]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT ('1') FOR [delfg]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [upddttm]
GO

ALTER TABLE [dbo].[tm_reporttblinfo] ADD  DEFAULT (NULL) FOR [updid]
GO