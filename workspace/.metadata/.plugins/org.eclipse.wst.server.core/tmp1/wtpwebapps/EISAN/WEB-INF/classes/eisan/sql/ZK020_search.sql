SELECT
    orderNumber AS orderNum
    , CONVERT(VARCHAR,orderDate,111) AS orderDate
    , employeeCode AS emplCode
    , (SELECT name FROM m_employee WHERE code=employeeCode) AS emplName
    , customerCode AS custCode
    , (SELECT name FROM M_CUSTOMER WHERE code = customerCode) AS custName
    , (SELECT manager FROM M_CUSTOMER WHERE code = customerCode) AS custManager
    , CONVERT(VARCHAR,shippingDate,111) AS shipDate
    , CASE WHEN (shippingStatus = '0') THEN '出荷前' WHEN (shippingStatus = '1') THEN '出荷中' WHEN (shippingStatus = '2') THEN '出荷完了'  ELSE '削除/取消' END AS shipStatus
    , note1 AS note1
    , note2 AS note2
FROM E_ORDER
WHERE shippingStatus IS NOT NULL
    AND orderNumber = (CASE WHEN @orderNum$ = '' THEN orderNumber ELSE @orderNum$ END)
    AND ISNULL(employeeCode,'') = (CASE WHEN @emplCode$ = '' THEN ISNULL(employeeCode,'') ELSE @emplCode$ END)
    AND ISNULL(customerCode,'') = (CASE WHEN @custCode$ = '' THEN ISNULL(customerCode,'') ELSE @custCode$ END)
    AND CONVERT(DATE,ISNULL(orderDate,'1900/01/01')) >= (CASE WHEN @orderDateStart$ = '' THEN '1900/01/01' ELSE @orderDateStart$ END)
    AND CONVERT(DATE,ISNULL(orderDate,'2099/12/31')) <= (CASE WHEN @orderDateEnd$ = '' THEN '2099/12/31' ELSE @orderDateEnd$ END)
    AND CONVERT(DATE,ISNULL(shippingDate,'1900/01/01')) >= (CASE WHEN @shipDateStart$ = '' THEN '1900/01/01' ELSE @shipDateStart$ END)
    AND CONVERT(DATE,ISNULL(shippingDate,'2099/12/31')) <= (CASE WHEN @shipDateEnd$ = '' THEN '2099/12/31' ELSE @shipDateEnd$ END)
    AND shippingStatus = (CASE WHEN @shipStatus$ = '' THEN shippingStatus ELSE @shipStatus$ END)
ORDER BY orderDate DESC