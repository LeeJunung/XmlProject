SELECT
    orderNumber AS orderNum
    , employeeCode AS emplCode
    , (SELECT name FROM M_EMPLOYEE WHERE code=employeeCode) AS emplName
    , approveEmployeeCode AS aprvEmplCode
    , (SELECT name FROM M_EMPLOYEE WHERE code=approveEmployeeCode) AS aprvEmplName
    , customerCode AS custCode
    , (SELECT name FROM M_CUSTOMER WHERE code=customerCode) AS custName
    , (SELECT manager FROM M_CUSTOMER WHERE code=customerCode) AS custManager
    , (SELECT phone FROM M_CUSTOMER WHERE code=customerCode) AS custPhone
    , CONVERT(VARCHAR,orderDate,111) AS orderDate
    , CONVERT(VARCHAR,approveDate,111) AS aprvDate
    , (CASE WHEN (approveStatus = '0') THEN '未承認'
        WHEN (approveStatus = '1') THEN '承認完了'
        WHEN (approveStatus = '2') THEN '承認返上' ELSE '' END) AS aprvStatus
    , note1 AS note1
    , note2 AS note2
FROM E_ORDER
WHERE
    orderNumber = (CASE WHEN @orderNum$ = '' THEN orderNumber ELSE @orderNum$ END) AND approveStatus IS NOT NULL
    AND employeeCode = (CASE WHEN @emplCode$ = '' THEN employeeCode ELSE @emplCode$ END)
    AND customerCode = (CASE WHEN @custCode$ = '' THEN customerCode ELSE @custCode$ END)
    AND CONVERT(DATE,orderDate) >= (CASE WHEN @orderDateStart$ = '' THEN '1900/01/01' ELSE @orderDateStart$ END)
    AND CONVERT(DATE,orderDate) <= (CASE WHEN @orderDateEnd$ = '' THEN '2099/12/31' ELSE @orderDateEnd$ END)
    AND CONVERT(DATE,ISNULL(approveDate,'1900/01/01')) >= (CASE WHEN @aprvDateStart$ = '' THEN '1900/01/01' ELSE @aprvDateStart$ END)
    AND CONVERT(DATE,ISNULL(approveDate,'2099/12/31')) <= (CASE WHEN @aprvDateEnd$ = '' THEN '2099/12/31' ELSE @aprvDateEnd$ END)
    AND approveStatus = (CASE WHEN @aprvStatus$ = '' THEN approveStatus ELSE @aprvStatus$ END)
ORDER BY orderDate DESC
