UPDATE E_ORDERREQUEST
SET approveStatus = @aprvFlag$
    , approveEmployeeCode = @aprvEmplCode$
    , approveDate = GETDATE()
    , updateTime = GETDATE()
    , updateUser = @aprvEmplCode$
WHERE orderRequestNum = @ordReqNum$