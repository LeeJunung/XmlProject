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

        i.storageCode AS storCode

        ,i.productCode AS prodCode

    ,i.inventoryDetailNumber AS invenNum

        ,CONVERT(varchar,i.inventoryDate,111) AS invenDate

        ,(CASE

                WHEN i.moveType = '1' THEN '販売' 

                WHEN i.moveType = '2' THEN '仕入'

                WHEN i.moveType = '3'　THEN　'移動'

                WHEN i.moveType = '4' THEN '返品(販)'

                WHEN i.moveType = '5' THEN '返品(仕)' ELSE '' END) AS moveType

        ,(CASE 

                WHEN i.status = '1' THEN '予定'

                WHEN i.status = '2' THEN '移動中'

                WHEN i.status = '3' THEN '完了' ELSE '' END) AS status

        ,i.amount AS amount   

    ,s1.name AS departure

    ,s2.name AS arrival

    ,note AS note

FROM E_INVENTORYDETAIL i

LEFT OUTER JOIN m_storage s1

        ON i.departure = s1.code

LEFT OUTER JOIN m_storage s2

        ON i.arrival = s2.code

WHERE  i.productCode = @prodCode$

        AND i.storageCode = @storCode$