SELECT
    orderRequestNum AS ordReqNum
    , requestNum AS reqNum
    , orderRequestEmployeeCode AS emplCode
    , (SELECT name FROM M_EMPLOYEE WHERE code=orderRequestEmployeeCode) AS emplName
    , supplierCode AS suplCode
    , (SELECT name FROM M_SUPPLIER WHERE code = supplierCode) AS suplName
    , (SELECT manager FROM M_SUPPLIER WHERE code = supplierCode) AS suplManager
    , (SELECT phone FROM M_SUPPLIER WHERE code = supplierCode) AS suplPhone
    , CONVERT(VARCHAR,orderRequestDate,111) AS ordReqDate
    , CONVERT(VARCHAR,requestDate,111) AS reqDate
    , CONVERT(VARCHAR,receiveDate,111) AS reciDate
    , CONVERT(VARCHAR,withdrawDate,111) AS drawDate
    , note1 AS note1
    , note2 AS note2
    , CASE WHEN (orderRequestStatus = '0') THEN '発注中' WHEN (orderRequestStatus = '1') THEN '発注承認' WHEN (orderRequestStatus = '2') THEN '発注返上' WHEN (orderRequestStatus = '9') THEN '削除/取消' ELSE '削除/取消' END AS ordReqStatus
FROM E_ORDERREQUEST
WHERE
    ISNULL(orderNum,'0') = (CASE WHEN @orderNum$ = '' THEN ISNULL(orderNum,'0') ELSE @orderNum$ END)
    AND orderRequestNum = (CASE WHEN @ordReqNum$ = '' THEN orderRequestNum ELSE @ordReqNum$ END)
    AND ISNULL(orderRequestEmployeeCode,'') = (CASE WHEN @emplCode$ = '' THEN ISNULL(orderRequestEmployeeCode,'') ELSE @emplCode$ END)
    AND ISNULL(supplierCode,'') = (CASE WHEN @suplCode$ = '' THEN ISNULL(supplierCode,'') ELSE @suplCode$ END)
    AND CONVERT(DATE,ISNULL(orderRequestDate,'1900/01/01')) >= (CASE WHEN @ordReqDateStart$ = '' THEN '1900/01/01' ELSE @ordReqDateStart$ END)
    AND CONVERT(DATE,ISNULL(orderRequestDate,'2099/12/31')) <= (CASE WHEN @ordReqDateEnd$ = '' THEN '2099/12/31' ELSE @ordReqDateEnd$ END)
    AND CONVERT(DATE,ISNULL(receiveDate,'1900/01/01')) >= (CASE WHEN @reciDateStart$ = '' THEN '1900/01/01' ELSE @reciDateStart$ END)
    AND CONVERT(DATE,ISNULL(receiveDate,'2099/12/31')) <= (CASE WHEN @reciDateEnd$ = '' THEN '2099/12/31' ELSE @reciDateEnd$ END)
    --AND CONVERT(DATE,ISNULL(withdrawDate,'2099/12/31')) >= (CASE WHEN @drawDateStart$ = '' THEN '1900/01/01' ELSE @drawDateStart$ END)
    --AND CONVERT(DATE,ISNULL(withdrawDate,'1900/01/01')) <= (CASE WHEN @drawDateEnd$ = '' THEN '2099/12/31' ELSE @drawDateEnd$ END)
    AND orderRequestStatus = (CASE WHEN @ordReqStatus$ = '' THEN orderRequestStatus ELSE @ordReqStatus$ END)
    AND ISNULL(receiveStatus,'') = (CASE WHEN @reciStatus$ = '' THEN ISNULL(receiveStatus,'') ELSE @reciStatus$ END)
    --AND ISNULL(withdrawStatus,'') = (CASE WHEN @drawStatus$ = '' THEN ISNULL(withdrawStatus,'') ELSE @drawStatus$ END)
    --AND ISNULL(orderNum,'0') = (CASE WHEN @orderExist$='' OR @orderExist$='0' THEN ISNULL(orderNum,'0') WHEN @orderExist$='1' THEN orderNum WHEN @orderExist$='2' THEN '0' END)
ORDER BY orderRequestDate DESC
