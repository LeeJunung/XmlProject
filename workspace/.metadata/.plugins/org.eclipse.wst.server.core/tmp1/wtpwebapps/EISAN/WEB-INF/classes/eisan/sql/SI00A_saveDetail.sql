UPDATE E_ORDERREQUESTDETAIL SET
    productCode = @prodCode$
    , amount = @amount$
    , totalPrice = @totalPrice$
    , storage = @storage$
    , field = @field$
    , note = @note$
    , supplierCode = @suplCode$
    ,updateTime = @updateTime$
    ,updateUser = @updateUser$
WHERE orderRequestNumber = @ordReqNum$ AND orderRequestDetailNumber = @ordReqDetNum$