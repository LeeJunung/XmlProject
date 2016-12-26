
	
SELECT
  a.productMoveNumber AS prodMoveNumber
  ,a.productMoveStatus AS prodMoveStatus
  ,CONVERT(varchar,a.productMoveRequestDate,111) AS prodMoveReqDate
  ,a.productMoveRequestEmployeeCode AS prodMoveReqEmplCode
  ,(select name from m_user where id = a.productMoveRequestEmployeeCode) AS prodMoveReqEmplName
  ,a.departure AS departure
  ,CONVERT(varchar,a.departureDate,111) AS departureDate
  ,a.arrival AS arrival
  ,CONVERT(varchar,a.arrivalDate,111) AS arrivalDate
  ,a.voucherNumber AS voucherNumber
  ,a.note1 AS note1
  ,a.note2 AS note2
  ,CASE WHEN (b.productMoveStatus = '0') THEN '依頼中' WHEN (b.productMoveStatus = '1') THEN '依頼承認' WHEN (b.productMoveStatus = '2') THEN '依頼返上' WHEN (b.productMoveStatus = '3') THEN '発注完了' WHEN (b.productMoveStatus = '9') THEN '削除/取消' ELSE '削除/取消' END AS prodMoveDetStatus
  ,b.productMoveStatus AS prodMoveDetStatusCode
  ,b.productMoveDetailNumber AS prodMoveDetNum
  ,b.productCode AS prodCode
  ,(select name from m_product where code = b.productCode) AS prodName
  ,(select janCode from m_product where code = b.productCode) AS janCode
  ,b.amount AS amount
  ,(select price from m_product where code = b.productCode) AS prodPrice
  ,b.totalPrice AS totalPrice
  ,b.note AS note
FROM e_productMove a, e_productMoveDetail b
WHERE 
	a.productMoveNumber = b.productMoveNumber
    AND a.productMoveNumber = @prodMoveNum$
ORDER BY 
	b.productMoveDetailNumber desc