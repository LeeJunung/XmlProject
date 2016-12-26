UPDATE E_ORDER
SET approveStatus = @aprvFlag$
    , approveDate = @aprvDate$
    , approveEmployeeCode = @aprvEmplCode$
    , note1 = @note1$
    , note2 = @note2$
    , updateTime = @aprvDate$
    , updateUser = @aprvEmplCode$
WHERE orderNumber = @orderNum$