USE [EISAN]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__name__5B1014F8]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__menulev__5CF85D6A]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__upperid__5A1BF0BF]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__dispord__5DEC81A3]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__url__5EE0A5DC]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__authidl__5FD4CA15]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__delfg__60C8EE4E]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__upddttm__61BD1287]
GO

ALTER TABLE [dbo].[tm_menu] DROP CONSTRAINT [DF__tm_menu__updid__62B136C0]
GO


/****** Object:  Table [dbo].[tm_menu]    Script Date: 2015/02/12 10:02:47 ******/
DROP TABLE [dbo].[tm_menu]
GO

/****** Object:  Table [dbo].[tm_menu]    Script Date: 2015/02/12 10:02:47 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tm_menu](
	[id] [nvarchar](30) NOT NULL,
	[name] [nvarchar](50) NULL,
	[kind] [nchar](1) NOT NULL,
	[step] [numeric](11, 0) NULL,
	[upperid] [nvarchar](30) NULL,
	[disporder] [numeric](11, 0) NULL,
	[url] [nvarchar](1000) NULL,
	[authidlist] [nvarchar](1000) NULL,
	[delfg] [nchar](1) NOT NULL,
	[upddttm] [datetime] NULL,
	[updid] [nvarchar](30) NULL,
 CONSTRAINT [PK__tm_menu__3213E83FE5B5827D] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__name__5B1014F8]  DEFAULT (NULL) FOR [name]
GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__menulev__5CF85D6A]  DEFAULT (NULL) FOR [step]
GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__upperid__5A1BF0BF]  DEFAULT (NULL) FOR [upperid]
GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__dispord__5DEC81A3]  DEFAULT (NULL) FOR [disporder]
GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__url__5EE0A5DC]  DEFAULT (NULL) FOR [url]
GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__authidl__5FD4CA15]  DEFAULT (NULL) FOR [authidlist]
GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__delfg__60C8EE4E]  DEFAULT ('1') FOR [delfg]
GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__upddttm__61BD1287]  DEFAULT (NULL) FOR [upddttm]
GO

ALTER TABLE [dbo].[tm_menu] ADD  CONSTRAINT [DF__tm_menu__updid__62B136C0]  DEFAULT (NULL) FOR [updid]
GO
