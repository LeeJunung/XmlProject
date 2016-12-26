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
FROM E_ORDERREQUESTDETAIL
WHERE orderRequestNumber = @ordReqNum$
