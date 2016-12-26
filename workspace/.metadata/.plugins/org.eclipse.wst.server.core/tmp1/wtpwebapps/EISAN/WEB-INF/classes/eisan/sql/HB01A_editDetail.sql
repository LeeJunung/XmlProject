/*DECLARE
  @tblName$ varchar(500) = 'TEST',
  @colName$ varchar(500) = 'TEST',
  @colDispName$ varchar(500) = 'TEST',
  @dispOrder$ varchar(500) = '999999',
  @authidlist$ varchar(500) = '1',
  @currDatetime$ varchar(500) = '2015-02-10 09:36:48',
  @currUserId$ varchar(500) = 'TEST';*/
/*★PGEND★*/

/*CUSTOMER INFO CHECK*/
/*DECLARE @rslt INT
SET @rslt =
    (SELECT COUNT(*) FROM M_CUST WHERE CUSTCODE = @custCode$ AND CUSTNAME = @custName$ AND MANAGER = @custManager$ AND phone = @custPhone$)

IF (@rslt = 1) BEGIN*/
--END
UPDATE E_ORDERREQUESTDETAIL SET
    productCode = @prodCode$
    , amount = @amount$
    , totalPrice = @totalPrice$
    , storage = @storage$
    , field = @field$
    , note = @note$
    ,updateTime = @updateTime$
    ,updateUser = @updateUser$
WHERE orderRequestNumber = @ordReqNum$ AND orderRequestDetailNumber = @ordReqDetNum$