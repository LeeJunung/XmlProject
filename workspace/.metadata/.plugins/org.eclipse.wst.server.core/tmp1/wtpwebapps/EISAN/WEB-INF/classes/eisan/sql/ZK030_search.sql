DECLARE
	@prodMoveStatus$ varchar(500) = '',
	@prodMoveReqDateStart$ varchar(500) = '',
	@prodMoveReqDateEnd$ varchar(500) = '',
	@prodMoveCompDateStart$ varchar(500) = '',
	@prodMoveCompDateEnd$ varchar(500) = '',
	@prodMoveReqEmplCode$ varchar(500) = '',
	@prodMoveReqEmplName$ varchar(500) = '',
    @departure$ varchar(500) = '',
    @voucherNumber$ varchar(500) = '',
    @arrival$ varchar(500) = '';
/*★PGEND★*/

SELECT
    productMoveNumber AS  prodMoveNum
    ,CASE WHEN (productMoveStatus = '0') THEN '依頼中' WHEN (productMoveStatus = '1') THEN '依頼承認' WHEN (productMoveStatus = '2') THEN '依頼返上' WHEN (productMoveStatus = '3') THEN '発注完了' WHEN (productMoveStatus = '9') THEN '削除/取消' ELSE '削除/取消' END AS prodMoveStatus
    ,CONVERT(varchar,productMoveRequestDate,111) AS prodMoveReqDate
    ,productMoveRequestEmployeeCode AS prodMoveReqEmplCode
    ,departure AS departure
    ,CONVERT(varchar,departureDate,111) AS departureDate
    ,arrival AS arrival
    ,CONVERT(varchar,arrivalDate,111) AS arrivalDate
    ,voucherNumber As voucherNumber
    ,note1 as note1
FROM e_productMove
WHERE
    productMoveStatus = (CASE WHEN @prodMoveStatus$ = '' THEN productMoveStatus ELSE @prodMoveStatus$ END)
    AND CONVERT(DATE, ISNULL(productMoveRequestDate, '')) >= (CASE WHEN @prodMoveReqDateStart$ = '' THEN '1900/01/01' ELSE @prodMoveReqDateStart$ END)
    AND CONVERT(DATE, ISNULL(productMoveRequestDate, '')) <= (CASE WHEN @prodMoveReqDateEnd$ = '' THEN '2099/12/31' ELSE @prodMoveReqDateEnd$ END)
    AND CONVERT(DATE, ISNULL(productMoveCompleteDate ,'')) >= (CASE WHEN @prodMoveCompDateStart$ = '' THEN '1900/01/01' ELSE @prodMoveCompDateStart$ END)
    AND CONVERT(DATE, ISNULL(productMoveCompleteDate ,'')) <= (CASE WHEN @prodMoveCompDateEnd$ = '' THEN '2099/12/31' ELSE @prodMoveCompDateEnd$ END)
    AND ISNULL(productMoveRequestEmployeeCode, '') = (CASE WHEN @prodMoveReqEmplCode$ = '' THEN ISNULL(productMoveRequestEmployeeCode, '') ELSE @prodMoveReqEmplCode$ END)
    AND ISNULL(productMoveRequestEmployeeCode, '') = (CASE WHEN @prodMoveReqEmplName$ = '' THEN ISNULL(productMoveRequestEmployeeCode, '') ELSE (select code from m_employee where name = @prodMoveReqEmplName$) End)
    AND ISNULL(departure, '') = (CASE WHEN @departure$ = '' THEN ISNULL(departure, '') ELSE @departure$ END)
    AND ISNULL(arrival, '') = (CASE WHEN @arrival$ = '' THEN ISNULL(arrival, '') ELSE @arrival$ END)
    AND ISNULL(voucherNumber, '') = (CASE WHEN @voucherNumber$ = '' THEN ISNULL(voucherNumber, '') ELSE @voucherNumber$ END)
ORDER BY productMoveNumber
