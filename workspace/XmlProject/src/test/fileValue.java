package test;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class fileValue extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String fileValue = request.getParameter("fileValue");
        String fileValue2 = request.getParameter("fileValue2");
        System.out.println(fileValue);
        
        fileValue = fileValue.replaceAll("\\\\", "\\\\\\\\");
        fileValue2 = fileValue2.replaceAll("\\\\", "\\\\\\\\");
        
        System.out.println(fileValue);
        System.out.println(fileValue2);
        
        request.setAttribute("fileValue", fileValue);
        request.setAttribute("fileValue2", fileValue2);
        
        getServletContext().getRequestDispatcher("/NewFile2.jsp").forward(request, response);
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        doGet(request, response);
    }
}