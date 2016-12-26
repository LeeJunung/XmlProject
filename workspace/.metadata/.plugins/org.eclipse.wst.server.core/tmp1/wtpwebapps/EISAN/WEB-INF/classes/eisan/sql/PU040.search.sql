SELECT
    code AS prodCode
    , name AS prodName
    , janCode AS janCode
    , taxCode AS taxCode
    , price AS price
FROM M_PRODUCT
WHERE
    code LIKE '%' + @prodCode$ + '%'
    AND name LIKE '%' + @prodName$ + '%'