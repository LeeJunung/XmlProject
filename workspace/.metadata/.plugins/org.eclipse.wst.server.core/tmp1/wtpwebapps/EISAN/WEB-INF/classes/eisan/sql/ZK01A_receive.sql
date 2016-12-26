/*DECLARE
    @tblName$ varchar(500) = 'TEST',
    @colName$ varchar(500) = 'TEST',
    @colDispName$ varchar(500) = 'TEST',
    @dispOrder$ varchar(500) = '999999',
    @authidlist$ varchar(500) = '1',
    @currDatetime$ varchar(500) = '2015-02-10 09:36:48',
    @currUserId$ varchar(500) = 'TEST';*/
/*★PGEND★*/

UPDATE E_ORDERREQUESTDETAIL SET
    receiveStatus = '1'
    , receiveDate = @updateTime$
    , note = @note$
WHERE orderRequestNumber = @ordReqNum$ AND orderRequestDetailNumber = @ordReqDetNum$

IF ((SELECT COUNT(*) FROM E_ORDERREQUESTDETAIL WHERE orderRequestNumber=@ordReqNum$ AND receiveStatus='0')
  = (SELECT COUNT(*) FROM E_ORDERREQUESTDETAIL WHERE orderRequestNumber=@ordReqNum$)) BEGIN
    UPDATE E_ORDERREQUEST SET
        receiveStatus = '0'
        , receiveDate = @updateTime$
        , updateUser = @updateUser$
        , updateTime = @updateTime$
    WHERE orderRequestNum=@ordReqNum$
END

ELSE IF ((SELECT COUNT(*) FROM E_ORDERREQUESTDETAIL WHERE orderRequestNumber=@ordReqNum$ AND receiveStatus='1')
  = (SELECT COUNT(*) FROM E_ORDERREQUESTDETAIL WHERE orderRequestNumber=@ordReqNum$)) BEGIN
    UPDATE E_ORDERREQUEST SET
        receiveStatus = '2'
        , receiveDate = @updateTime$
        , updateUser = @updateUser$
        , updateTime = @updateTime$
    WHERE orderRequestNum = @ordReqNum$

    UPDATE E_ORDER SET
        shippingStatus = '0'
        , updateUser = @updateUser$
        , updateTime = @updateTime$
    WHERE orderNumber = (SELECT orderNum FROM E_ORDERREQUEST WHERE orderRequestNum=@ordReqNum$)

    UPDATE E_ORDERDETAIL SET
        shippingStatus = '0'
    WHERE orderNumber = (SELECT orderNum FROM E_ORDERREQUEST WHERE orderRequestNum=@ordReqNum$)
END

ELSE BEGIN
    UPDATE E_ORDERREQUEST SET
        receiveStatus = '1'
        , receiveDate = @updateTime$
        , updateUser = @updateUser$
        , updateTime = @updateTime$
    WHERE orderRequestNum = @ordReqNum$
END