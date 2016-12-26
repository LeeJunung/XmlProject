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
    orderRequestNumber AS ordReqNum
    , orderRequestDetailNumber AS ordReqDetNum
    , productCode AS prodCode
    , (SELECT name FROM M_PRODUCT  WHERE code = productCode) AS prodName
    , (SELECT janCode FROM M_PRODUCT WHERE code = productCode) AS janCode
    , amount AS amount
    , (SELECT price FROM M_PRODUCT WHERE code = productCode) AS price
    , totalPrice AS totalPrice
    , (SELECT taxCode FROM M_PRODUCT WHERE code = productCode) AS taxCode
    , storage AS storage
    , field AS field
    , note AS note
    , CONVERT(VARCHAR,receiveDate,111) AS reciDate
    , CASE WHEN (receiveStatus = '0') THEN '入庫前' WHEN (receiveStatus = '1') THEN '入庫完了' ELSE '削除/取消' END AS reciStatus
FROM E_ORDERREQUESTDETAIL
WHERE orderRequestNumber = @ordReqNum$