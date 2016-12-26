SELECT
    orderNumber AS orderNum
    , orderDetailNumber AS ordDetNum
    , MAIN.productCode AS prodCode
    , (SELECT SUB.name FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS prodName
    , (SELECT SUB.janCode FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS janCode
    , MAIN.amount AS amounts
    , (SELECT SUB.price FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS price
    , MAIN.totalPrice AS totalPrice
    , (SELECT SUB.taxCode FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS taxCode
    , MAIN.storage AS storage
    , MAIN.field AS field
    , MAIN.note AS note
FROM E_ORDERDETAIL MAIN
WHERE orderNumber = @orderNum$