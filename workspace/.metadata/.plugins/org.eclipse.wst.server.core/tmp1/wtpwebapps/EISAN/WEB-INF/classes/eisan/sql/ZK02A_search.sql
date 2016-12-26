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
    , orderDetailNumber AS ordDetNum
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
    , CONVERT(VARCHAR,shippingDate,111) AS shipDate
    , CASE WHEN (shippingStatus = '0') THEN '出荷前' WHEN (shippingStatus = '1') THEN '出荷完了' ELSE '削除/取消' END AS shipStatus
FROM E_ORDERDETAIL
WHERE orderNumber = @orderNum$