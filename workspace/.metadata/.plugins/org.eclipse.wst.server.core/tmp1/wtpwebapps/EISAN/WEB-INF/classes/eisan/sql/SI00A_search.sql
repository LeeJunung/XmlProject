SELECT
    orderRequestNumber AS ordReqNum
    , orderRequestDetailNumber AS ordReqDetNum
    , MAIN.productCode AS prodCode
    , (SELECT SUB.name FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS prodName
    , (SELECT SUB.janCode FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS janCode
    , MAIN.amount AS amount
    , (SELECT SUB.price FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS price
    , MAIN.totalPrice AS totalPrice
    , (SELECT SUB.taxCode FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS taxCode
    , MAIN.storage AS storage
    , MAIN.field AS field
    , MAIN.note AS note
    , supplierCode AS suplCode
    , (SELECT SUB.name FROM M_SUPPLIER SUB WHERE SUB.code = MAIN.supplierCode) AS suplName
FROM E_ORDERREQUESTDETAIL MAIN
WHERE orderRequestNumber = @ordReqNum$