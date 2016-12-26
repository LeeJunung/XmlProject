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
    (SELECT COUNT(*) FROM M_CUST WHERE CUSTCODE = @custCode$ AND CUSTNAME = @custName$ AND MANAGER = @custManager$ AND phone = @custPhone$)*/

INSERT INTO E_ORDERREQUEST
    (orderRequestNum, requestNum, requestEmployeeCode, requestDate, requestStatus, orderRequestStatus, approveStatus, note1, note2, updateTime, updateUser, sumTotalPricePre, sumDiscPercent, sumTotalDisc, sumTotalTax, sumTotalPrice)
VALUES
    (@ordReqNum$, @requestNum$, @emplCode$, @updateTime$, '0', '0', '0', @note1$, @note2$, @updateTime$, @updateUser$, @sumTotalDiscPre$, @sumDiscPercent$, @sumTotalDisc$, @sumTotalTax$, @sumTotalPrice$)
