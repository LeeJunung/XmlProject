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
    	left: 45%;
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
</head>

<%
	String fileValue = (String)request.getAttribute("fileValue");
    String fileValue2 = (String)request.getAttribute("fileValue2");	

    if(fileValue == null || fileValue.trim() == ""){
		fileValue = "/WEB-INF/Book1.xlsx";
	}
    
    if(fileValue2 == null || fileValue2.trim() == ""){
		fileValue2 = "/WEB-INF/Book2.xlsx";
	}
%>
<script type="text/javascript">
jq(document).ready(function(){
    //register client event on button by jquery api
    console.log("aaaaaaa");
    jq("#kbtn1").click(function(){
        postAjax("myzss1");
    });
    jq("#kbtn2").click(function(){
        postAjax("myzss2");
    });
});

function postAjax(action){
	console.log("bbbbbbbb");
    //get the necessary zk ids form zssjsp[component_id] 
    //'myzss' is the sparedhseet id that you gaved in
    // sparedsheet tag 
    var desktopId = zssjsp[action].desktopId; 
    var zssUuid = zssjsp[action].uuid;
    
    console.log(desktopId);
    console.log(zssUuid);
    
    /*use jquery api to post ajax to your servlet (in this 
    demo, it is AjaxBookServlet), provide desktop id 
    and spreadsheet uuid to access zk component 
    data in your servlet */
    jq.ajax({url:"app4l",//the servlet url
        data:{desktopId:desktopId,zssUuid:zssUuid,action:action},
        type:'POST',
        dataType:'json'}).done(handleAjaxResult);
}

//the method to handle ajax result from your servlet 
function handleAjaxResult(result){
    //process the json result that contains zk client update information 
    zssjsp.processJson(result);
    alert(result.message);
}

function compareAjax(action){
	var desktopId = zssjsp["myzss1"].desktopId; 
    var zssUuid = zssjsp["myzss1"].uuid;
    
    var desktopId2 = zssjsp["myzss2"].desktopId; 
    var zssUuid2 = zssjsp["myzss2"].uuid;
    
    jq.ajax({url:"xmlCompare",//the servlet url
        data:{desktopId:desktopId,zssUuid:zssUuid,action:action,desktopId2:desktopId2,zssUuid2:zssUuid2},
        type:'POST',dataType:'json'}).done(styleAjaxResult);
}

function styleAjaxResult(result){
	
	
}


function fileSelector(){
	var fileValue = document.getElementById("file1").value;
	var fileValue2 = document.getElementById("file2").value;
	
	var file_exp = fileValue.slice(fileValue.lastIndexOf(".")+1).toLowerCase();
	var file_exp2 = fileValue2.slice(fileValue2.lastIndexOf(".")+1).toLowerCase();
	
	if(file_exp != ''){
		if(!(file_exp == 'xls' || file_exp == 'xlsx')){
			alert('Excel ファイルを選択してください');
			return;
		}
	}
	
	if(file_exp2 != ''){
		if(!(file_exp2 == 'xls' || file_exp2 == 'xlsx')){
			alert('Excel ファイルを選択してください');
			return;
		}
	}

	if(fileValue == null || fileValue.trim() == ""){
		console.log("12345");
		fileValue = "<%=fileValue%>";
	}
	
	if(fileValue2 == null || fileValue2.trim() == ""){
		console.log("gesrgesrgsergse");
		fileValue2 = "<%=fileValue2%>";
	}
	
	location.href = "fileValue?fileValue=" + fileValue + "&fileValue2=" + fileValue2;
}

function fos(){
		location.href = "xmlCompare";
}

function chan(){
	var name = document.getElementById("fileup").value;
	console.log(name);
	alert(name);
}
</script>
<body class = "canvas">
  
<input type= "file" id = "file1" class = "file1" onchange="fileSelector();"/>
<div class = "sheet1">
    <zssjsp:spreadsheet id="myzss1" src="<%=fileValue%>" width="45%" height="100%" maxVisibleRows="200" maxVisibleColumns="40" showSheetbar="true"
    showToolbar="true" showFormulabar="true" showContextMenu="true"/>
</div>
<input type= "button" id="btn" class = "btn" value ="比較" onclick="compareAjax();"/>
<input type= "file" id = "file2" class = "file2" onchange="fileSelector();"/>
<div class = "sheet2">
    <zssjsp:spreadsheet id="myzss2" src="<%=fileValue2%>" width="45%" height="100%" maxVisibleRows="200" maxVisibleColumns="40" showSheetbar="true"
    showToolbar="true" showFormulabar="true" showContextMenu="true"/>
</div>

<input type = "button" value = "ファイル１確定" id = "kbtn1" class = "kbtn1"/>
<input type = "button" value = "ファイル２確定" id = "kbtn2" class = "kbtn2"/>

파일업로드<input type="file" id="fileup" onchange="chan();" />
실제 값<input type="text" id="filetext"/>
</body>
</html>