<%@page import="java.io.PrintWriter"%>
<%@page import="com.oreilly.servlet.multipart.DefaultFileRenamePolicy"%>
<%@page import="com.oreilly.servlet.MultipartRequest"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>file upload</title>
</head>
<body>
	<h3>file upload</h3>
	
	<%
		String dir = application.getRealPath("/upload");
		int max = 5 * 1024 * 1024;
		
		try {
			MultipartRequest m = new MultipartRequest(request, dir, max, "UTF-8", new DefaultFileRenamePolicy());

			String subject = m.getParameter("subject");
			String file1 = m.getFilesystemName("file1");
			String ofile1 = m.getFile("file1").getPath() + "\\" + file1;
			String file2 = m.getFilesystemName("file2");
			String ofile2 = m.getFile("file2").getPath() + "\\" + file2;
	%>
	
	<p>title: <%= subject%></p>
	<% if(file1 != null){ %>
		<p>upload file1 : <a href = "upload/<%=file1%>"><%=file1%></a></p>
	<%} %>
	<% if(file2 != null){ %>
		<p>upload file2 : <a href = "upload/<%=file2%>"><%=file2%></a></p>
	<%} 
		} catch (Exception e) {
		e.printStackTrace(new PrintWriter(out));
	}
	%>
</body>
</html>