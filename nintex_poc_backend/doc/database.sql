SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[caseDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[GUID] [uniqueidentifier] NULL,
	[caseID]  AS ('REF-'+right('00000'+CONVERT([varchar](5),[id]),(5))) PERSISTED,
	[caseTitle] [nvarchar](100) NOT NULL,
	[caseDescription] [nvarchar](max) NULL,
	[attachment] [varchar](500) NULL,
	[natureOfComplaint] [varchar](100) NULL,
	[moreOptions] [varchar](100) NULL,
	[remarks] [nvarchar](max) NULL,
	[caseProgress] [varchar](100) NULL,
	[dateOfReceipt] [date] NULL,
	[dateOfAcknowledgement] [date] NULL,
	[substantiveReply] [date] NULL,
	[title] [varchar](10) NULL,
	[complainant] [nvarchar](100) NULL,
	[countryCode] [varchar](100) NULL,
	[telephone] [varchar](100) NULL,
	[email] [varchar](100) NULL,
	[IDorPassport] [varchar](100) NULL,
	[HKID] [varchar](100) NULL,
	[passport] [varchar](100) NULL,
	[district] [varchar](100) NULL,
	[address] [varchar](100) NULL,
	[PIC] [varchar](100) NULL,
	[acceptedCase] [varchar](10) NULL,
	[addPIC1] [varchar](100) NULL,
	[addPIC2] [varchar](100) NULL,
	[addPIC3] [varchar](100) NULL,
	[addPIC4] [varchar](100) NULL,
	[addPIC5] [varchar](100) NULL,
	[deleted] [char](1) NULL,
	[createdBy] [varchar](50) NULL,
	[createdDate] [datetime] NULL,
	[lastModifiedBy] [varchar](50) NULL,
	[lastModifiedDate] [datetime] NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[caseDetails] ADD  CONSTRAINT [PK_caseDetails] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[caseDetails] ADD  CONSTRAINT [DEFAULT_caseDetails_createdDate]  DEFAULT (getutcdate()) FOR [createdDate]
GO
ALTER TABLE [dbo].[caseDetails] ADD  CONSTRAINT [DEFAULT_caseDetails_lastModifiedDate]  DEFAULT (getutcdate()) FOR [lastModifiedDate]
GO
