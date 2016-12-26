SELECT
    code AS suplCode
    , name AS suplName
    , manager AS suplManager
    , phone AS suplPhone
FROM M_SUPPLIER
WHERE
    code LIKE '%' + @suplCode$ + '%'
    AND name LIKE '%' + @suplName$ + '%'