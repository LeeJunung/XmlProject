DECLARE
	@prodMoveStatus$ varchar(500) = '',
	@prodMoveReqDate$ varchar(500) = '',
	@prodMoveReqEmplCode$ varchar(500) = '',
    @departure$ varchar(500) = '',
	@departureDate$ varchar(500) = '',
	@arrival$ varchar(500) = '',
	@arrivalDate$ varchar(500) = '',
	@note1$ varchar(500) = '',
	@note2$ varchar(500) = '';
/*★PGEND★*/


INSERT INTO e_productMove
    (productMoveNumber, productMoveStatus, productMoveRequestDate, productMoveRequestEmployeeCode, departure, departureDate, arrival, arrivalDate, note1, note2)
--OUTPUT Inserted.productMoveNumber  as newKey
VALUES
    (@prodMoveNum$, @prodMoveStatus$, @prodMoveReqDate$, @prodMoveReqEmplCode$, @departure$, @departureDate$, @arrival$, @arrivalDate$, @note1$, @note2$)
--    ((select max(productMoveNumber) + 1 from e_productMove), @prodMoveStatus$, @prodMoveReqDate$, @prodMoveReqEmplCode$, @departure$, @departureDate$, @arrival$, @arrivalDate$, @note1$, @note2$)

