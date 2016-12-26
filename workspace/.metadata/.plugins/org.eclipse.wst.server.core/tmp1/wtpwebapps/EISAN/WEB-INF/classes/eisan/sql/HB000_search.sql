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
    , employeeCode AS emplCode
    , (SELECT name FROM M_EMPLOYEE WHERE code=employeeCode) AS emplName
    , customerCode AS custCode
    , (SELECT name FROM M_CUSTOMER WHERE code=customerCode) AS custName
    , (SELECT manager FROM M_CUSTOMER WHERE code=customerCode) AS custManager
    , (SELECT phone FROM M_CUSTOMER WHERE code=customerCode) AS custPhone
    , CONVERT(VARCHAR,orderDate,111) AS orderDate
    , CONVERT(VARCHAR,shippingDate,111) AS shipDate
    , CONVERT(VARCHAR,depositDate,111) AS depoDate
    , (CASE WHEN orderStatus='0' THEN '処理中'
        WHEN orderStatus='1' THEN '承認完了'
        WHEN orderStatus='2' THEN '承認返上'
        WHEN orderStatus='9' THEN '削除/取消' ELSE '' END) AS orderStatus
    , (CASE WHEN shippingStatus='0' THEN '入庫前'
        WHEN shippingStatus='1' THEN '入庫中'
        WHEN shippingStatus='2' THEN '入庫完了'
        WHEN shippingStatus='9' THEN '削除/取消' ELSE '' END) AS shipStatus
    , note1 AS note1
    , note2 AS note2
    , CONVERT(INT,sumTotalPricePre) AS sumTotalPricePre
    , sumDiscPercent
    , sumTotalDisc
    , sumTotalTax
    , sumTotalPrice
FROM E_ORDER
WHERE orderNumber = (CASE WHEN @orderNum$ = '' THEN orderNumber ELSE @orderNum$ END)
    AND employeeCode = (CASE WHEN @emplCode$ = '' THEN employeeCode ELSE @emplCode$ END)
    AND customerCode = (CASE WHEN @custCode$ = '' THEN customerCode ELSE @custCode$ END)
    AND CONVERT(DATE,orderDate) >= (CASE WHEN @orderDateStart$ = '' THEN '1900/01/01' ELSE @orderDateStart$ END)
    AND CONVERT(DATE,orderDate) <= (CASE WHEN @orderDateEnd$ = '' THEN '2099/12/31' ELSE @orderDateEnd$ END)
    AND ISNULL(CONVERT(DATE,shippingDate),'1900/01/01') >= (CASE WHEN @shipDateStart$ = '' THEN '1900/01/01' ELSE @shipDateStart$ END)
    AND ISNULL(CONVERT(DATE,shippingDate),'2099/12/31') <= (CASE WHEN @shipDateEnd$ = '' THEN '2099/12/31' ELSE @shipDateEnd$ END)
    --AND ISNULL(CONVERT(DATE,depositDate),'1900/01/01') >= (CASE WHEN @depoDateStart$ = '' THEN '1900/01/01' ELSE @depoDateStart$ END)
    --AND ISNULL(CONVERT(DATE,depositDate),'2099/12/31') <= (CASE WHEN @depoDateEnd$ = '' THEN '2099/12/31' ELSE @depoDateEnd$ END)
    AND orderStatus = (CASE WHEN @orderStatus$ = '' THEN orderStatus ELSE @orderStatus$ END)
    AND ISNULL(shippingStatus,'0') = (CASE WHEN @shipStatus$ = '' THEN ISNULL(shippingStatus,'0') ELSE @shipStatus$ END)
    --AND ISNULL(depositStatus,0) = (CASE WHEN @depoStatus$ = '' THEN ISNULL(depositStatus,0) ELSE @depoStatus$ END)
ORDER BY orderDate DESC