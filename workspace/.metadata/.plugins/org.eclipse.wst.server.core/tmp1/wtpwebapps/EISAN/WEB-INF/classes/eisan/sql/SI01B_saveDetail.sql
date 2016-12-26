INSERT INTO E_ORDERREQUESTDETAIL
    (orderRequestNumber, orderRequestDetailNumber, productCode, amount, totalPrice, storage, field, note, updateTime, updateUser)
VALUES
    (@ordReqNum$, @ordReqDetNum$, @prodCode$, @amount$, @totalPrice$, @storage$, @field$, @note$, @updateTime$, @updateUser$)
