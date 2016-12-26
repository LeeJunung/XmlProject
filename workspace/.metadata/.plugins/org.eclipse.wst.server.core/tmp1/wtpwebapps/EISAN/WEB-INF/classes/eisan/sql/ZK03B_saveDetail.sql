IF (@prodMoveDetNum$ = '1') BEGIN
    DELETE FROM e_productMoveDetail WHERE productMoveNumber = @prodMoveNum$
END

INSERT INTO e_productMoveDetail
    (productMoveNumber, productMoveDetailNumber, productMoveStatus, productCode, amount, totalPrice, note)
VALUES
    (@prodMoveNum$, @prodMoveDetNum$, @prodMoveStatus$, @prodCode$, @amount$, @totalPrice$, @note$)