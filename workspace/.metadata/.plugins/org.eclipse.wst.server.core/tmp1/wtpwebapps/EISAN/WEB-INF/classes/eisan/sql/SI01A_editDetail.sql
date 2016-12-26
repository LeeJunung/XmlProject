IF (@ordReqDetNum$ = '1') BEGIN
    DELETE E_ORDERREQUESTDETAIL WHERE orderRequestNumber = @ordReqNum$
END

INSERT INTO E_ORDERREQUESTDETAIL
    (orderRequestNumber, orderRequestDetailNumber, productCode, amount, totalPrice, storage, field, note, updateTime, updateUser)
VALUES
    (@ordReqNum$, @ordReqDetNum$, @prodCode$, @amount$, @totalPrice$, @storage$, @field$, @note$, @updateTime$, @updateUser$)