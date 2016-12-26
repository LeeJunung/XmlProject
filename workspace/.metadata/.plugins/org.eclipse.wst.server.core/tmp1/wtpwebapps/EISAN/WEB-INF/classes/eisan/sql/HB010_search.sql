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
    orderRequestNum AS ordReqNum
    , requestNum AS requestNum
    , requestEmployeeCode AS emplCode
    , (SELECT name FROM m_employee WHERE code=requestEmployeeCode) AS emplName
    , supplierCode AS suplCode
    , (SELECT name FROM m_supplier WHERE code=supplierCode) AS suplName
    , (SELECT manager FROM m_supplier WHERE code=supplierCode) AS suplManager
    , (SELECT phone FROM m_supplier WHERE code=supplierCode) AS suplPhone
    , CONVERT(VARCHAR,orderRequestDate,111) AS ordReqDate
    , CONVERT(VARCHAR,requestDate,111) AS requestDate
    , CONVERT(VARCHAR,approveDate,111) AS aprvDate
    , CONVERT(VARCHAR,receiveDate,111) AS reciDate
    , CONVERT(VARCHAR,withdrawDate,111) AS drawDate
    , (CASE WHEN (requestStatus = '0') THEN '依頼中'
        WHEN (requestStatus = '1') THEN '依頼完了'
        WHEN (requestStatus = '2') THEN '依頼返上'
        WHEN (requestStatus = '3') THEN '発注完了'
        WHEN (requestStatus = '9') THEN '取消/削除' ELSE '' END) AS requestStatus
    , note1 AS note1
    , note2 AS note2
FROM E_ORDERREQUEST
WHERE requestNum = (CASE WHEN @requestNum$ = '' THEN requestNum ELSE @requestNum$ END) AND requestNum IS NOT NULL
    AND requestEmployeeCode = (CASE WHEN @emplCode$ = '' THEN requestEmployeeCode ELSE @emplCode$ END)
    AND CONVERT(DATE,requestDate) >= (CASE WHEN @requestDateStart$ = '' THEN '1900/01/01' ELSE @requestDateStart$ END)
    AND CONVERT(DATE,requestDate) <= (CASE WHEN @requestDateEnd$ = '' THEN '2099/12/31' ELSE @requestDateEnd$ END)
    AND CONVERT(DATE,receiveDate) >= (CASE WHEN @reciDateStart$ = '' THEN '1900/01/01' ELSE @reciDateStart$ END)
    AND CONVERT(DATE,receiveDate) <= (CASE WHEN @reciDateEnd$ = '' THEN '2099/12/31' ELSE @reciDateEnd$ END)
    --AND CONVERT(DATE,withdrawDate) >= (CASE WHEN @drawDateStart$ = '' THEN '1900/01/01' ELSE @drawDateStart$ END)
    --AND CONVERT(DATE,withdrawDate) <= (CASE WHEN @rdrawDateEnd$ = '' THEN '2099/12/31' ELSE @rdrawDateEnd$ END)
    AND requestStatus = (CASE WHEN @requestStatus$ = '' THEN requestStatus ELSE @requestStatus$ END)
    AND ISNULL(receiveStatus,'0') = (CASE WHEN @reciStatus$ = '' THEN ISNULL(receiveStatus,'0') ELSE @reciStatus$ END)
ORDER BY requestDate DESC
