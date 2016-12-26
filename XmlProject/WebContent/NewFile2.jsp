<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib prefix="zssjsp" uri="http://www.zkoss.org/jsp/zss"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
    <title>My First ZK Spreadsheet JSP application</title>
    <zssjsp:head/>
    <style type="text/css">
    .sheet1{
    	width: 95%;
    	height: 50%;
    	top: 10%;
    	position: absolute;
    	align: left;
    }
    
    .sheet2{
    	width: 95%;
    	height: 50%;
    	top: 10%;
    	position: absolute;
    	left: 50%;
    }
    
    .btn{
    	position: absolute;
    	left: 43%;
    	top: 30%;
    }
    
    .file1{
    	top: 5%;
    	position: absolute;
    }
    
    .file2{
    	left: 50%;
    	top: 5%;
    	position: absolute;
    }
    
    .kbtn1{
    	top: 65%;
    	position: absolute;
    }
    
    .kbtn2{
    	left: 50%;
    	top: 65%;
    	position: absolute;
    }
    </style>
    <script type="text/javascript">
   		function fos(){
   			location.href = "xmlCompare";
   		}
   		
    
    </script>
</head>
<script type="text/javascript">
function fileSelector1(){
	//fileValue = document.getElementById("file1").value;
	var fileValue = document.getElementById("file1");
	alert(fileValue);
	
	var url = fileValue.getAsDataURL();
	alert(url);
	
	location.href = "fileValue?fileValue=fileValue.value";
	
	//var zss1 = document.getElementById('myzss1');
	//zss1.src = fileValue.src;
	//return;
}
</script>
<%
	String fileValue = (String)request.getAttribute("fileValue");
	if(fileValue == null){
		fileValue = "/WEB-INF/Book1.xlsx";
	}
%>
<body class = "canvas">
<input type= "file" id = "file1" class = "file1" onchange="fileSelector1();"/>
<div class = "sheet1">
    <zssjsp:spreadsheet id="myzss1" src="<%=fileValue%>" width="40%" height="100%" maxVisibleRows="200" maxVisibleColumns="40" showSheetbar="true"/>
</div>
<input type= "button" class = "btn" value ="比較" onclick="fos();"/>
<input type= "file" class = "file2"/>
<div class = "sheet2">
    <zssjsp:spreadsheet id="myzss2" src="/WEB-INF/Book2.xlsx" width="40%" height="100%" maxVisibleRows="200" maxVisibleColumns="40" showSheetbar="true"/>
</div>

<input type = "button" value = "ファイル１確定" class = "kbtn1"/>
<input type = "button" value = "ファイル２確定" class = "kbtn2"/>

파일업로드<input type="file" id="fileup" onchange="this.select(); document.getElementById('filetext').value=document.selection.createRange().text.toString();" />
실제 값<input type="text" id="filetext" />
</body>
</html>