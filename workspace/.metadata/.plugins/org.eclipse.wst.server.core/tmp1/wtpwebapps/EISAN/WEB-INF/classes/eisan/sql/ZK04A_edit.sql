UPDATE e_orderRequest SET
    note1 = @note1$
    ,note2 = @note2$
    ,updateTime = @updateTime$
    ,updateUser = @updateUser$
WHERE orderRequestNum = @ordReqNum$
