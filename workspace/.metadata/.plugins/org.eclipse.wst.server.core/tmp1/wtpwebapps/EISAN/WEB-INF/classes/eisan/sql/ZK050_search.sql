/*DECLARE
	@tblName$ varchar(500) = 'TEST',
	@colName$ varchar(500) = 'TEST',
	@colDispName$ varchar(500) = 'TEST',
	@dispOrder$ varchar(500) = '999999',
	@authidlist$ varchar(500) = '1',
    @currDatetime$ varchar(500) = '2015-02-10 09:36:48',
    @currUserId$ varchar(500) = 'TEST';*/
/*★PGEND★*/

SELECT
    orderNumber AS orderNum
	,CASE WHEN (returnGoodsStatus = '0') THEN '返品前' WHEN (returnGoodsStatus = '1') THEN '返品完了' WHEN (returnGoodsStatus = '2') THEN '依頼返上' WHEN (returnGoodsStatus = '3') THEN '発注承認' WHEN (returnGoodsStatus = '4') THEN '発注返上' WHEN (returnGoodsStatus = '9') THEN '削除/取消' ELSE '削除/取消' END AS returnStatus
    ,CONVERT(varchar,shippingDate,111) AS shipDate
    ,CONVERT(varchar,returnGoodsDate,111) AS returnDate
	,(select name from m_customer where code = customerCode) AS custName
    ,(select name from m_employee where code = employeeCode) AS emplName
    ,note1 AS note1
FROM E_ORDER
WHERE
    returnGoodsStatus = (CASE WHEN @returnStatus$ = '' THEN returnGoodsStatus ELSE @returnStatus$ END)
    AND ISNULL(customerCode, '') = (CASE WHEN @custCode$ = '' THEN ISNULL(customerCode, '') ELSE @custCode$ END) 
    AND ISNULL(customerCode, '') = (CASE WHEN @custName$ = '' THEN ISNULL(customerCode, '') ELSE (select code from m_customer where name = @custName$) End)
    AND ISNULL(employeeCode, '') = (CASE WHEN @emplCode$ = '' THEN ISNULL(employeeCode, '') ELSE @emplCode$ END) 
    AND ISNULL(employeeCode, '') = (CASE WHEN @emplName$ = '' THEN ISNULL(employeeCode, '') ELSE (select code from m_employee where name = @emplName$) End)
    AND CONVERT(DATE, ISNULL(returnGoodsDate, '1900/01/01')) >= (CASE WHEN @returnDateStart$ = '' THEN '1900/01/01' ELSE @returnDateStart$ END)
    AND CONVERT(DATE, ISNULL(returnGoodsDate, '1900/01/01')) <= (CASE WHEN @returnDateEnd$ = '' THEN '2099/12/31' ELSE @returnDateEnd$ END)
    AND CONVERT(DATE, ISNULL(shippingDate, '1900/01/01')) >= (CASE WHEN @shipDateStart$ = '' THEN '1900/01/01' ELSE @shipDateStart$ END)
    AND CONVERT(DATE, ISNULL(shippingDate, '1900/01/01')) <= (CASE WHEN @shipDateEnd$ = '' THEN '2099/12/31' ELSE @shipDateEnd$ END)
    AND ISNULL(orderNumber, '') = (CASE WHEN @orderNum$ = '' THEN ISNULL(orderNumber, '') ELSE @orderNum$ END)
    AND ISNULL(voucherNumber, '') = (CASE WHEN @voucherNum$ = '' THEN ISNULL(voucherNumber, '') ELSE @voucherNum$ END)
ORDER BY orderNum DESC