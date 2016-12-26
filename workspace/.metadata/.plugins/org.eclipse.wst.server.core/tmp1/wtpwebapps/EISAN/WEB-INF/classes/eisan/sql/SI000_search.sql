SELECT
    orderRequestNum AS ordReqNum
    , requestNum AS requestNum
    , orderNum AS orderNum
    , requestEmployeeCode AS reqEmplCode
    , (SELECT name FROM m_employee WHERE code=requestEmployeeCode) AS reqEmplName
    , trusteeEmployeeCode AS trusEmplCode
    , (SELECT name FROM m_employee WHERE code=trusteeEmployeeCode) AS trusEmplName
    , supplierCode AS suplCode
    , (SELECT name FROM M_SUPPLIER WHERE code = supplierCode) AS suplName
    , (SELECT manager FROM M_SUPPLIER WHERE code = supplierCode) AS suplManager
    , (SELECT phone FROM M_SUPPLIER WHERE code = supplierCode) AS suplPhone
    , CONVERT(VARCHAR,requestDate,111) AS requestDate
    , CONVERT(VARCHAR,trusteeDate,111) AS trusDate
    , CASE WHEN (requestStatus = '0') THEN '受託前' WHEN (requestStatus = '1') THEN '受託完了' WHEN (requestStatus = '2') THEN '受託返上'  ELSE '削除/取消' END AS requestStatus
    , note1 AS note1
    , note2 AS note2
FROM E_ORDERREQUEST
WHERE
    ISNULL(orderNum,'0') = (CASE WHEN @orderNum$ = '' THEN ISNULL(orderNum,'0') ELSE @orderNum$ END)
    AND ISNULL(trusteeEmployeeCode,'') = (CASE WHEN @emplCode$ = '' THEN ISNULL(trusteeEmployeeCode,'') ELSE @emplCode$ END)
    AND CONVERT(DATE,requestDate) >= (CASE WHEN @reqDateStart$ = '' THEN '1900/01/01' ELSE @reqDateStart$ END)
    AND CONVERT(DATE,requestDate) <= (CASE WHEN @reqDateEnd$ = '' THEN '2099/12/31' ELSE @reqDateEnd$ END)
    AND CONVERT(DATE,ISNULL(trusteeDate,'1900/01/01')) >= (CASE WHEN @trusDateStart$ = '' THEN '1900/01/01' ELSE @trusDateStart$ END)
    AND CONVERT(DATE,ISNULL(trusteeDate,'2099/12/31')) <= (CASE WHEN @trusDateEnd$ = '' THEN '2099/12/31' ELSE @trusDateEnd$ END)
    AND requestStatus = (CASE WHEN @ordReqStatus$ = '' THEN requestStatus ELSE @ordReqStatus$ END)
ORDER BY requestNum DESC
