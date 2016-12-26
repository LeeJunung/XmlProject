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
  a.orderNumber AS orderNum			
  ,CASE WHEN (a.returnGoodsStatus = '0') THEN '返品前' WHEN (a.returnGoodsStatus = '1') THEN '返品完了' WHEN (a.returnGoodsStatus = '2') THEN '依頼返上' WHEN (a.returnGoodsStatus = '3') THEN '発注承認' WHEN (a.returnGoodsStatus = '4') THEN '発注返上' WHEN (a.returnGoodsStatus = '9') THEN '削除/取消' ELSE '削除/取消' END AS returnStatus   --返品ステータス										         	--返品ステータス 
  ,CONVERT(varchar,a.shippingDate,111) AS shipDate												        	--出荷日時
  ,CONVERT(varchar,a.returnGoodsDate,111) AS returnDate									         			--返品日時
  ,a.customerCode AS custCode                                                           --得意先コード
  ,(select name from m_customer where code = a.customerCode) AS custName                --得意先名
  ,(select manager from m_customer where code = a.customerCode) AS custManager          --得意先担当者
  ,a.employeeCode AS emplCode					                                        --受注担当者コード
  ,(select name from m_user where id = a.employeeCode) AS emplName                      --受注担当者名
  ,a.shippingEmployeeCode AS shipEmplCode												--出荷担当者コード  
  ,(select name from m_user where id = a.shippingEmployeeCode) AS shipEmplName          --出荷担当者名
  ,a.note1 as note1																		--備考	
  ,a.note2 as note2																		--注釈		
  ,a.sumTotalPricePre as sumTotalPricePre 												--割引前合計
  ,a.sumDiscPercent as sumDiscPercent													--パーセント
  ,a.sumTotalDisc as sumTotalDisc														--割引 
  ,a.sumTotalTax as sumTotalTax  														--税額
  ,a.sumTotalPrice as sumTotalPrice														--合計
  ,CASE WHEN (b.returnGoodsStatus = '0') THEN '返品前' WHEN (b.returnGoodsStatus = '1') THEN '返品完了' WHEN (b.returnGoodsStatus = '2') THEN '依頼返上' WHEN (b.returnGoodsStatus = '3') THEN '発注承認' WHEN (b.returnGoodsStatus = '4') THEN '発注返上' WHEN (b.returnGoodsStatus = '9') THEN '削除/取消' ELSE '削除/取消' END AS returnStatus2  --返品ステータス					          						--返品ステータス
  ,b.productCode AS prodCode												        	--商品コード
  ,(select name from m_product where code = b.productCode) AS prodName 		            --商品名
  ,(select janCode from m_product where code = b.productCode) AS janCode		        --JANコード
  ,b.amount AS amount 															        --数量
  ,(select price from m_product where code = b.productCode) AS prodPrice 		        --単価
  ,b.totalPrice AS totalPrice															--合計
  ,b.storage AS storage															        --倉庫
  ,(select field from m_product where code = b.productCode) AS field   		            --部門
  ,b.note AS note																        --備考
FROM E_ORDER a, E_ORDERDETAIL b
WHERE 
	a.orderNumber = b.orderNumber
    AND a.orderNumber = @orderNum$
ORDER BY 
	b.orderNumber desc
