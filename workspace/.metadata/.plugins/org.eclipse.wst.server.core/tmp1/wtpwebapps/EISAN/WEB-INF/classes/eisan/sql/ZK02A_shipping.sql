/*DECLARE
    @tblName$ varchar(500) = 'TEST',
    @colName$ varchar(500) = 'TEST',
    @colDispName$ varchar(500) = 'TEST',
    @dispOrder$ varchar(500) = '999999',
    @authidlist$ varchar(500) = '1',
    @currDatetime$ varchar(500) = '2015-02-10 09:36:48',
    @currUserId$ varchar(500) = 'TEST';*/
/*★PGEND★*/

UPDATE E_ORDERDETAIL SET
    shippingStatus = '1'
    , shippingDate = @updateTime$
    , note = @note$
WHERE orderNumber = @orderNum$ AND orderDetailNumber = @ordDetNum$

IF ((SELECT COUNT(*) FROM E_ORDERDETAIL WHERE orderNumber=@orderNum$ AND shippingStatus='0')
  = (SELECT COUNT(*) FROM E_ORDERDETAIL WHERE orderNumber=@orderNum$)) BEGIN
    UPDATE E_ORDER SET
        shippingStatus = '0'
        , shippingDate = @updateTime$
        , updateUser = @updateUser$
        , updateTime = @updateTime$
    WHERE orderNumber = @orderNum$
END

ELSE IF ((SELECT COUNT(*) FROM E_ORDERDETAIL WHERE orderNumber=@orderNum$ AND shippingStatus='1')
  = (SELECT COUNT(*) FROM E_ORDERDETAIL WHERE orderNumber=@orderNum$)) BEGIN
    UPDATE E_ORDER SET
        shippingStatus = '2'
        , shippingDate = @updateTime$
        , updateUser = @updateUser$
        , updateTime = @updateTime$
    WHERE orderNumber = @orderNum$
END

ELSE BEGIN
    UPDATE E_ORDER SET
        shippingStatus = '1'
        , shippingDate = @updateTime$
        , updateUser = @updateUser$
        , updateTime = @updateTime$
    WHERE orderNumber = @orderNum$
END