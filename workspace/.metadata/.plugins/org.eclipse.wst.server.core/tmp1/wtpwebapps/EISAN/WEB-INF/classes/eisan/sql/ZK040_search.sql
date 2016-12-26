DECLARE
	@suplCode$ varchar(500) = '',
	@suplName$ varchar(500) = '',
	@suplEmplCode$ varchar(500) = '',
	@suplEmplName$ varchar(500) = '',
	@returnDateStart$ varchar(500) = '',
	@returnDateEnd$ varchar(500) = '',
	@receiveDateStart$ varchar(500) = '',
	@receiveDateEnd$ varchar(500) = '',
	@ordReqNum$ varchar(500) = '',
	@voucherNum$ varchar(500) = '',
	@returnStatus$ char(1) = '';

/*★PGEND★*/

SELECT
    orderRequestNum AS ordReqNum
	,CASE WHEN (returnGoodsStatus = '0') THEN '返品前' WHEN (returnGoodsStatus = '1') THEN '返品完了' WHEN (returnGoodsStatus = '2') THEN '依頼返上' WHEN (returnGoodsStatus = '3') THEN '発注承認' WHEN (returnGoodsStatus = '4') THEN '発注返上' WHEN (returnGoodsStatus = '9') THEN '削除/取消' ELSE '削除/取消' END AS returnStatus
    ,CONVERT(varchar,receiveDate,111) AS receiveDate
    ,CONVERT(varchar,returnGoodsDate,111) AS returnDate
	,(select name from m_supplier where code = supplierCode) AS suplName
    ,(select name from m_employee where code = supplierEmployeeCode) AS suplEmplName
    ,note1 AS note1
FROM E_ORDERREQUEST

WHERE
    returnGoodsStatus = (CASE WHEN @returnStatus$ = '' THEN returnGoodsStatus ELSE @returnStatus$ END)
    /*supplierCode = (CASE WHEN @suplCode$ = '' THEN supplierCode ELSE @suplCode$ END)*/
    AND ISNULL(supplierCode, '') = (CASE WHEN @suplCode$ = '' THEN ISNULL(supplierCode, '') ELSE @suplCode$ END)
    AND ISNULL(supplierCode, '') = (CASE WHEN @suplName$ = '' THEN ISNULL(supplierCode, '') ELSE (select code from m_supplier where name = @suplName$) End)
    AND ISNULL(supplierEmployeeCode, '') = (CASE WHEN @suplEmplCode$ = '' THEN ISNULL(supplierEmployeeCode, '') ELSE @suplEmplCode$ END)
    AND ISNULL(supplierEmployeeCode, '') = (CASE WHEN @suplEmplName$ = '' THEN ISNULL(supplierEmployeeCode, '') ELSE (select code from m_employee where name = @suplEmplName$) End)
    AND CONVERT(DATE, ISNULL(returnGoodsDate, '')) >= (CASE WHEN @returnDateStart$ = '' THEN '1900/01/01' ELSE @returnDateStart$ END)
    AND CONVERT(DATE, ISNULL(returnGoodsDate, '')) <= (CASE WHEN @returnDateEnd$ = '' THEN '2099/12/31' ELSE @returnDateEnd$ END)
    AND CONVERT(DATE, ISNULL(receiveDate ,'')) >= (CASE WHEN @receiveDateStart$ = '' THEN '1900/01/01' ELSE @receiveDateStart$ END)
    AND CONVERT(DATE, ISNULL(receiveDate ,'')) <= (CASE WHEN @receiveDateEnd$ = '' THEN '2099/12/31' ELSE @receiveDateEnd$ END)
    AND ISNULL(orderRequestNum, '') = (CASE WHEN @ordReqNum$ = '' THEN ISNULL(orderRequestNum, '') ELSE @ordReqNum$ END)
    AND ISNULL(voucherNumber, '') = (CASE WHEN @voucherNum$ = '' THEN ISNULL(voucherNumber, '') ELSE @voucherNum$ END)

ORDER BY ordReqNum DESC
