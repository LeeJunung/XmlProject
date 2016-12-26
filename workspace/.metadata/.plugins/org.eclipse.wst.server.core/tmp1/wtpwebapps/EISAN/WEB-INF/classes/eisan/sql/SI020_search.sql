SELECT
    orderRequestNum AS ordReqNum
    , orderNum AS orderNum
    , orderRequestEmployeeCode AS emplCode
    , (SELECT name FROM M_EMPLOYEE WHERE code=orderRequestEmployeeCode) AS emplName
    , approveEmployeeCode AS aprvEmplCode
    , (SELECT name FROM M_EMPLOYEE WHERE code=approveEmployeeCode) AS aprvEmplName
    , supplierCode AS suplCode
    , (SELECT name FROM M_SUPPLIER WHERE code = supplierCode) AS suplName
    , (SELECT manager FROM M_SUPPLIER WHERE code = supplierCode) AS suplManager
    , (SELECT phone FROM M_SUPPLIER WHERE code = supplierCode) AS suplPhone
    , CONVERT(VARCHAR,orderRequestDate,111) AS ordReqDate
    , CONVERT(VARCHAR,postingDate,111) AS postDate
    , CONVERT(VARCHAR,approveDate,111) AS aprvDate
    , note1 AS note2
    , note2 AS note2
    ,CASE WHEN (approveStatus = '0') THEN '未承認' WHEN (approveStatus = '1') THEN '承認完了' WHEN (approveStatus = '2') THEN '承認返上' WHEN (approveStatus = '9') THEN '削除/取消' ELSE '削除/取消' END AS aprvStatus
FROM E_ORDERREQUEST
WHERE
    ISNULL(orderNum,'0') = (CASE WHEN @orderNum$ = '' THEN ISNULL(orderNum,'0') ELSE @orderNum$ END)
    AND orderRequestNum = (CASE WHEN @ordReqNum$ = '' THEN orderRequestNum ELSE @ordReqNum$ END)
    AND ISNULL(orderRequestEmployeeCode,'') = (CASE WHEN @emplCode$ = '' THEN ISNULL(orderRequestEmployeeCode,'') ELSE @emplCode$ END)
    AND ISNULL(supplierCode,'') = (CASE WHEN @suplCode$ = '' THEN ISNULL(supplierCode,'') ELSE @suplCode$ END)
    AND CONVERT(DATE,ISNULL(orderRequestDate,'1900/01/01')) >= (CASE WHEN @ordReqDateStart$ = '' THEN '1900/01/01' ELSE @ordReqDateStart$ END)
    AND CONVERT(DATE,ISNULL(orderRequestDate,'2099/12/31')) <= (CASE WHEN @ordReqDateEnd$ = '' THEN '2099/12/31' ELSE @ordReqDateEnd$ END)
    AND CONVERT(DATE,ISNULL(approveDate,'1900/01/01')) >= (CASE WHEN @aprvDateStart$ = '' THEN '1900/01/01' ELSE @aprvDateStart$ END)
    AND CONVERT(DATE,ISNULL(approveDate,'2099/12/31')) <= (CASE WHEN @aprvDateEnd$ = '' THEN '2099/12/31' ELSE @aprvDateEnd$ END)
    AND ISNULL(approveStatus,'') = (CASE WHEN @aprvStatus$ = '' THEN ISNULL(approveStatus,'') ELSE @aprvStatus$ END)
ORDER BY orderRequestDate DESC