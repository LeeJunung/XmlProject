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
     s.code AS storCode
    ,s.name AS storName
    ,p.code as prodCode
    ,p.name AS prodName
    ,i.quantity AS amount
    ,i.price AS prodPrice
FROM E_INVENTORY AS i
JOIN M_STORAGE AS s
	ON i.storageCode = s.code
JOIN M_PRODUCT AS p
	ON i.productCode = p.code
WHERE 1+1=2
	AND s.code = (CASE WHEN @storCode$ = '' THEN s.code ELSE @storCode$ END)
	AND s.name = (CASE WHEN @storName$ = '' THEN s.name ELSE @storName$ END)
	AND p.code = (CASE WHEN @prodCode$ = '' THEN p.code ELSE @prodCode$ END)
	AND p.name = (CASE WHEN @prodName$ = '' THEN p.name ELSE @prodName$ END)