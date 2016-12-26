INSERT INTO E_ORDERREQUEST
    (orderRequestNum, orderRequestEmployeeCode, supplierCode, orderRequestDate, orderRequestStatus, approveStatus, note1, note2, updateTime, updateUser)
VALUES
    (@ordReqNum$, @emplCode$, @suplCode$, @updateTime$, '0', '0', @note1$, @note2$, @updateTime$, @updateUser$)
