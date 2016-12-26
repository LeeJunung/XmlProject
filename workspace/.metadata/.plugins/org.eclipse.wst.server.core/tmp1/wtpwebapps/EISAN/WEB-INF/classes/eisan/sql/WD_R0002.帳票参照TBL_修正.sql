DECLARE
	@tblName$ varchar(500) = 'TEST',
	@tblDispName$ varchar(500) = 'TEST',
	@dispOrder$ varchar(500) = '999999',
	@authidlist$ varchar(500) = '1',
    @currDatetime$ varchar(500) = '2015-02-10 09:36:48',
    @currUserId$ varchar(500) = 'TEST';
/*★PGEND★*/

UPDATE
    tm_reporttblinfo
SET 
	tbldispname = @tblDispName$,
	disporder = @dispOrder$,
	authidlist = @authidlist$
	,upddttm = @currDatetime$,
	updid = @currUserId$
WHERE
    tblname = @tblName$
