IF (@ordDetNum$ = '1') BEGIN
    DELETE FROM E_ORDERDETAIL WHERE orderNumber = @orderNum$
END

INSERT INTO E_ORDERDETAIL
    (orderNumber, orderDetailNumber, productCode, amount, totalPrice, storage, field, note, updateTime, updateUser)
VALUES
    (@orderNum$, @ordDetNum$, @prodCode$, @amount$, @totalPrice$, @storage$, @field$, @note$, @updateTime$, @updateUser$)