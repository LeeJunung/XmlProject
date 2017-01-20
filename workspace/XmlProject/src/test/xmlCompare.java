package test;

import java.awt.Color;
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
import org.zkoss.zss.api.model.CellStyle;
import org.zkoss.zss.api.model.EditableCellStyle;
import org.zkoss.zss.jsp.JsonUpdateBridge;
import org.zkoss.zss.model.SSheet;
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
        System.out.println("desktopId2: " + desktopId2);
        System.out.println("zssUuid2: " + zssUuid2);
        
        JsonUpdateBridge bridge = new JsonUpdateBridge(getServletContext(), request, response, desktopId) {
            @Override
            protected void process(Desktop desktop) {
                ss = (Spreadsheet)desktop.getComponentByUuidIfAny(zssUuid);
                ss2 = (Spreadsheet)desktop.getComponentByUuidIfAny(zssUuid2);
            }
        };
        
        result.put("message", "Download Success!");
        bridge.process(result);
        
        System.out.println("ss: " + ss);
        System.out.println("ss2: " + ss);
        
        compareXls();
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        doGet(request, response);
        // response.sendRedirect("NewFile2.jsp");
    }
    
    public void compareXls(){
    	int row = ss.getSelectedSheet().getLastRow();
        int col = ss.getSelectedSheet().getLastColumn(row);
        
        int row2 = ss2.getSelectedSheet().getLastRow();
        int col2 = ss2.getSelectedSheet().getLastColumn(row2);
        
        int compRow = 0;
        int compCol = 0;
        
        if(row >= row2){
        	compRow = row;
        }else {
        	compRow = row2;
        }
        
        if(col > col2){
        	compCol = col;
        } else {
        	compCol = col2;
        }
        
        for (int i = 0; i < compRow; i++) {
			for (int j = 0; j < compCol; j++) {
				Range range = Ranges.range(ss.getSelectedSheet(),i,j);
				Range range2 = Ranges.range(ss2.getSelectedSheet(),i,j);
				
				CellData cellData = range.getCellData();
				CellData cellData2 = range2.getCellData();
				
				Object value = cellData.getValue();
				Object value2 = cellData2.getValue();
				
				if (!value.equals(value2)) {
					Range selection = Ranges.range(ss.getSelectedSheet(), ss.getSelection());
				    CellStyle oldStyle = selection.getCellStyle();
				    EditableCellStyle newStyle = selection.getCellStyleHelper().createCellStyle(oldStyle);
				    newStyle.setBackgroundColor((org.zkoss.zss.api.model.Color) Color.YELLOW);
				    selection.setCellStyle(newStyle);
				    
				    Range selection2 = Ranges.range(ss2.getSelectedSheet(), ss2.getSelection());
				    CellStyle oldStyle2 = selection.getCellStyle();
				    EditableCellStyle newStyle2 = selection.getCellStyleHelper().createCellStyle(oldStyle2);
				    newStyle2.setBackgroundColor((org.zkoss.zss.api.model.Color) Color.YELLOW);
				    selection2.setCellStyle(newStyle2);
				}
			}
		}
    }
}