<%-- <%@ taglib uri="http://digamma.ch/taglib/excel.tld" prefix="xls"%> --%>
<%@ page language="java" contentType="application/vnd.ms-excel; name = 'My_Excel'; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%
	response.setHeader("Content-Disposition", "inline:filename-myfile.xls"); 
	response.setHeader("Content-Description", "JSP Generated Data");
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<table>
	<tr>
		<td>1</td>
		<td>2</td>
		<td>3</td>
		<td>4</td>
	<tr>
	<tr>
		<td>a</td>
		<td>b</td>
		<td>c</td>
		<td>d</td>
	<tr>
</table>

<%-- <xls:workbook filename="simpleExcel.xls">
	<xls:sheet name="First Sheet">
		<xls:row>
			<xls:cell>Hello, World !</xls:cell>
		</xls:row>
	</xls:sheet>
</xls:workbook> --%>
</body>
</html>