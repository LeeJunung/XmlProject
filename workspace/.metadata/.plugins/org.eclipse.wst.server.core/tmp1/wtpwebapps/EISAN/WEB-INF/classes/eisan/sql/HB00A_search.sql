/*DECLARE
	@tblName$ varchar(500) = 'TEST',
	@colName$ varchar(500) = 'TEST',
	@colDispName$ varchar(500) = 'TEST',
	@dispOrder$ varchar(500) = '999999',
	@authidlist$ varchar(500) = '1',
    @currDatetime$ varchar(500) = '2015-02-10 09:36:48',
    @currUserId$ varchar(500) = 'TEST';*/
/*★PGEND★*/

SELECT
   orderDetailNumber AS ordDetNum
  , productCode AS prodCode
  , (SELECT SUB.name FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS prodName
  , (SELECT SUB.janCode FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS janCode
  , MAIN.amount AS amount
  , (SELECT SUB.price FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS price
  , MAIN.totalPrice AS totalPrice
  , (SELECT SUB.taxCode FROM M_PRODUCT SUB WHERE SUB.code = MAIN.productCode) AS taxCode
  , MAIN.storage AS storage
  , MAIN.field AS field
  , MAIN.note AS note
FROM E_ORDERDETAIL MAIN
WHERE orderNumber = @orderNum$
