SELECT
    code AS emplCode
    , name AS emplName
    , department AS department
FROM M_EMPLOYEE
WHERE
    code LIKE '%' + @emplCode$ + '%'
    AND name LIKE '%' + @emplName$ + '%'
ORDER BY code