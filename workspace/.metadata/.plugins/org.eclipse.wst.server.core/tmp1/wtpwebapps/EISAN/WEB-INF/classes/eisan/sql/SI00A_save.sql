UPDATE E_ORDERREQUEST
SET requestStatus = '1', orderRequestStatus = '0'
    , orderRequestDate = @updateTime$
    , orderNum = @orderNum$
    , supplierCode = @suplCode$
    , orderRequestEmployeeCode = @ordReqEmplCode$
    , trusteeEmployeeCode = @ordReqEmplCode$
    , requestDate = @updateTime$
    , trusteeDate = @updateTime$
    , note1 = @note1$
    , note2 = @note2$
    , updateTime = @updateTime$
    , updateUser = @updateUser$
WHERE orderRequestNum = @ordReqNum$
