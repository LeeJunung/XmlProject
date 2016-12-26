UPDATE E_ORDERREQUEST
SET requestStatus = '2', orderDate = GETDATE()
WHERE orderRequestNum = @ordReqNum$