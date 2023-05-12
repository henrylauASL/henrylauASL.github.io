CREATE TABLE [dbo].[caseDetails](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[caseTitle] [varchar](100) NOT NULL,
    [caseDescription] [varchar](5000) NULL,
    [attachment] [varchar](500) NULL,
    [natureOfComplaint] [varchar](100) NULL,
    [moreOptions] [varchar](100) NULL,
	[remarks] [varchar](5000) NULL,
    [caseProgress] [varchar](100) NULL,
    [dateOfReceipt] [date] NULL,
    [dateOfAcknowledgement] [date] NULL,
    [substantiveReply] [date] NULL,
    [title] [varchar](10) NULL,
    [complainant] [varchar](100) NULL,
    [countryCode] [varchar](100) NULL,
    [telephone] [varchar](100) NULL,
    [email] [varchar](100) NULL,
    [IDorPassport] [varchar](100) NULL,
    [HKID] [varchar](100) NULL,
    [passport] [varchar](100) NULL,
    [dristrict] [varchar](100) NULL,
    [address] [varchar](100) NULL,
    [PIC] [varchar](100) NULL,
    [addPIC1] [varchar](100) NULL,
    [addPIC2] [varchar](100) NULL,
    [addPIC3] [varchar](100) NULL,
    [addPIC4] [varchar](100) NULL,
    [addPIC5] [varchar](100) NULL,
    [deleted] [char](1) NULL,
	[createdBy] [varchar](50) NULL,
	[createdDate] [datetime] NULL,
	[lastModifiedBy] [varchar](50) NULL,
	[lastModifiedDate] [datetime] NULL,
)