SELECT
    code AS custCode
    , name AS custName
    , manager AS custManager
    , phone AS custPhone
FROM M_CUSTOMER
WHERE
    code LIKE '%' + @custCode$ + '%'
    AND name LIKE '%' + @custName$ + '%'