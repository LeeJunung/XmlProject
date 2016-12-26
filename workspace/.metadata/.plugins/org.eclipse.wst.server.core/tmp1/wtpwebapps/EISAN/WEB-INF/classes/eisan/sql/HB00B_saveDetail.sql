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
DECLARE @rslt INT
SET @rslt =
    (SELECT COUNT(*) FROM M_CUSTOMER WHERE CODE = @custCode$ AND NAME = @custName$ AND MANAGER = @custManager$ AND phone = @custPhone$)

IF (@rslt = 1) BEGIN
INSERT INTO E_ORDERDETAIL
    (orderNumber, orderDetailNumber, productCode, amount, totalPrice, storage, field, note, updateTime, updateUser)
VALUES
    (@orderNum$, @ordDetNum$, @prodCode$, @amount$, @totalPrice$, @storage$, @field$, @note$, @updateTime$, @updateUser$)
END