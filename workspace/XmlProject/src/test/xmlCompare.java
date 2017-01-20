package test;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.zkoss.json.JSONObject;
import org.zkoss.zk.ui.Desktop;
import org.zkoss.zss.api.Range;
import org.zkoss.zss.api.Ranges;
import org.zkoss.zss.api.model.CellData;
import org.zkoss.zss.jsp.JsonUpdateBridge;
import org.zkoss.zss.ui.Spreadsheet;

/**
 * Servlet implementation class xmlCompare
 */
public class xmlCompare extends HttpServlet {
    Spreadsheet ss = null;
    Spreadsheet ss2 = null;
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().append("Served at: ").append(request.getContextPath());
        
        final String desktopId = request.getParameter("desktopId");
        final String zssUuid = request.getParameter("zssUuid");
        
        final String desktopId2 = request.getParameter("desktopId2");
        final String zssUuid2 = request.getParameter("zssUuid2");
        
        final String action = request.getParameter("action");
        
        final JSONObject result = new JSONObject();
        
        result.put("action", action);
        
        System.out.println("desktopId: " + desktopId);
        System.out.println("zssUuid: " + zssUuid);
        System.out.println("desktopId: " + desktopId2);
        System.out.println("zssUuid: " + zssUuid2);
        
        JsonUpdateBridge bridge = new JsonUpdateBridge(getServletContext(), request, response, desktopId) {
            @Override
            protected void process(Desktop desktop) {
                ss = (Spreadsheet)desktop.getComponentByUuidIfAny(zssUuid);
                ss = null;
                ss.getPreloadRowSize();
                System.out.println("ss: " + ss);
            }
        };
        /* JsonUpdateBridge bridge2 = new JsonUpdateBridge(getServletContext(),
         * request, response, desktopId2) {
         * 
         * @Override protected void process(Desktop desktop) { ss2 =
         * (Spreadsheet)desktop.getComponentByUuidIfAny(zssUuid2);
         * System.out.println("ss2: " + ss2); } }; */
        
        int row = ss.getPreloadRowSize();
        int col = ss.getPreloadColumnSize();
        
        int row2 = ss.getSelectedSheet().getLastColumn(0);
        int col2 = ss.getSelectedSheet().getLastRow();
        
        System.out.println("row: " + row);
        System.out.println("col: " + col);
        System.out.println("row: " + row);
        System.out.println("col2: " + col);
        
        Range range = Ranges.range(ss.getSelectedSheet(), row, col);
        CellData cellData = range.getCellData();
        
        // the actual text you enter in a cell, e.g. =SUM(1,2)
        String text = cellData.getEditText();
        cellData.setEditText("=SUM(1,2)");
        
        // use utility class to wrap zk in servlet request and
        // get access and response result
        
        /* InputStream in = new
         * FileInputStream("C:\\Users\\kissco\\Documents\\Book1.xlsx"); Workbook
         * wb = new XSSFWorkbook(in); in.close();
         * 
         * in = new FileInputStream("C:\\Users\\kissco\\Documents\\Book2.xlsx");
         * Workbook wb2 = new XSSFWorkbook(in); in.close();
         * 
         * CellStyle style = wb.createCellStyle();
         * style.setFillForegroundColor(IndexedColors.BRIGHT_GREEN.getIndex());
         * style.setFillPattern(CellStyle.SOLID_FOREGROUND);
         * 
         * CellStyle style2 = wb2.createCellStyle();
         * style2.setFillForegroundColor(IndexedColors.BRIGHT_GREEN.getIndex());
         * style2.setFillPattern(CellStyle.SOLID_FOREGROUND);
         * 
         * CellStyle style3 = wb.createCellStyle();
         * style3.setFillForegroundColor(IndexedColors.GREEN.getIndex());
         * style3.setFillPattern(CellStyle.SOLID_FOREGROUND);
         * 
         * CellStyle style4 = wb2.createCellStyle();
         * style4.setFillForegroundColor(IndexedColors.GREEN.getIndex());
         * style4.setFillPattern(CellStyle.SOLID_FOREGROUND);
         * 
         * for (int i = 0; i < wb.getNumberOfSheets(); i++) { //sheet Sheet
         * sheet1 = wb.getSheetAt(i); Sheet sheet2 = wb2.getSheetAt(i);
         * 
         * System.out.println("lastRownum: " +
         * sheet1.getPhysicalNumberOfRows());
         * 
         * int rowNum = 0; if (sheet1.getPhysicalNumberOfRows() <=
         * sheet2.getPhysicalNumberOfRows()){ rowNum =
         * sheet1.getPhysicalNumberOfRows(); } else { rowNum =
         * sheet2.getPhysicalNumberOfRows(); }
         * 
         * for (int j = 0; j < rowNum; j++) { //row Row row1 = sheet1.getRow(j);
         * Row row2 = sheet2.getRow(j);
         * 
         * if (row1 != null && row2 != null) { for (int k = 0; k <
         * row1.getPhysicalNumberOfCells(); k++) { Cell cell1 = row1.getCell(k);
         * Cell cell2 = row2.getCell(k);
         * 
         * System.out.println(cell1.toString());
         * System.out.println(cell2.toString());
         * 
         * if (cell1.toString().equals(cell2.toString()) == false) {
         * cell1.setCellStyle(style3); cell2.setCellStyle(style4); } } } } } */
        /* Sheet s1 = wb.getSheetAt(0); Row r1 = s1.getRow(0); Row r2 =
         * s1.getRow(1); Cell c1 = r1.getCell(0);
         * System.out.println(c1.getNumericCellValue()); if (c1!=null) { switch
         * (c1.getCellType()) { case Cell.CELL_TYPE_BOOLEAN:
         * System.out.println(c1.getBooleanCellValue()); break; case
         * Cell.CELL_TYPE_NUMERIC: System.out.println(c1.getNumericCellValue());
         * break; case Cell.CELL_TYPE_STRING:
         * System.out.println(c1.getStringCellValue()); break; case
         * Cell.CELL_TYPE_BLANK: break; case Cell.CELL_TYPE_ERROR:
         * System.out.println(c1.getErrorCellValue()); break;
         * 
         * // CELL_TYPE_FORMULA will never occur case Cell.CELL_TYPE_FORMULA:
         * break; } }
         * 
         * r1.setRowStyle(style); r1.getCell(0).setCellStyle(style);
         * r2.setRowStyle(style); r2.getCell(0).setCellStyle(style); */
        
        /* String path = getServletContext().getRealPath("/");
         * 
         * FileOutputStream out = new FileOutputStream(new File(path +
         * "\\Book3.xlsx")); wb.write(out); out.close();
         * 
         * out = new FileOutputStream(new
         * File("C:\\Users\\kissco\\Documents\\Book4.xlsx")); wb2.write(out);
         * out.close();
         * 
         * response.sendRedirect("NewFile2.jsp"); */
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        doGet(request, response);
        // response.sendRedirect("NewFile2.jsp");
    }
}