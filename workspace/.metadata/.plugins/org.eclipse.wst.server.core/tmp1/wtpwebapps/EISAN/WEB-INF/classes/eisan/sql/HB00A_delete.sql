/*DECLARE
  @tblName$ varchar(500) = 'TEST',
  @colName$ varchar(500) = 'TEST',
  @colDispName$ varchar(500) = 'TEST',
  @dispOrder$ varchar(500) = '999999',
  @authidlist$ varchar(500) = '1',
  @currDatetime$ varchar(500) = '2015-02-10 09:36:48',
  @currUserId$ varchar(500) = 'TEST';*/
/*★PGEND★*/

UPDATE E_ORDER
SET orderStatus = '9'
WHERE orderNumber = @orderNum$