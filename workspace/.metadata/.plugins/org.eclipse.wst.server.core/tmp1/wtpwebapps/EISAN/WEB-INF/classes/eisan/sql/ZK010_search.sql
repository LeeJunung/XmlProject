SELECT
    orderRequestNum AS ordReqNum
    , CONVERT(VARCHAR,orderRequestDate,111) AS ordReqDate
    , orderRequestEmployeeCode AS ordReqEmplCode
    , (SELECT name FROM m_employee WHERE code=orderRequestEmployeeCode) AS ordReqEmplName
    , supplierCode AS suplCode
    , (SELECT name FROM M_SUPPLIER WHERE code = supplierCode) AS suplName
    , (SELECT manager FROM M_SUPPLIER WHERE code = supplierCode) AS suplManager
    , CONVERT(VARCHAR,receiveDate,111) AS reciDate
    , CASE WHEN (receiveStatus = '0') THEN '入庫前' WHEN (receiveStatus = '1') THEN '入庫中' WHEN (receiveStatus = '2') THEN '入庫完了'  ELSE '削除/取消' END AS reciStatus
    , note1 AS note1
    , note2 AS note2
FROM E_ORDERREQUEST
WHERE receiveStatus IS NOT NULL
    AND orderRequestNum = (CASE WHEN @ordReqNum$ = '' THEN orderRequestNum ELSE @ordReqNum$ END)
    AND ISNULL(orderRequestEmployeeCode,'') = (CASE WHEN @ordReqEmplCode$ = '' THEN ISNULL(orderRequestEmployeeCode,'') ELSE @ordReqEmplCode$ END)
    AND ISNULL(supplierCode,'') = (CASE WHEN @suplCode$ = '' THEN ISNULL(supplierCode,'') ELSE @suplCode$ END)
    AND CONVERT(DATE,ISNULL(orderRequestDate,'1900/01/01')) >= (CASE WHEN @ordReqDateStart$ = '' THEN '1900/01/01' ELSE @ordReqDateStart$ END)
    AND CONVERT(DATE,ISNULL(orderRequestDate,'2099/12/31')) <= (CASE WHEN @ordReqDateEnd$ = '' THEN '2099/12/31' ELSE @ordReqDateEnd$ END)
    AND CONVERT(DATE,ISNULL(receiveDate,'1900/01/01')) >= (CASE WHEN @reciDateStart$ = '' THEN '1900/01/01' ELSE @reciDateStart$ END)
    AND CONVERT(DATE,ISNULL(receiveDate,'2099/12/31')) <= (CASE WHEN @reciDateEnd$ = '' THEN '2099/12/31' ELSE @reciDateEnd$ END)
    AND receiveStatus = (CASE WHEN @reciStatus$ = '' THEN receiveStatus ELSE @reciStatus$ END)
ORDER BY orderRequestDate DESC