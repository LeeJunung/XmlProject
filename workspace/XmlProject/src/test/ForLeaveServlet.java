package test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.Writer;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.zkoss.json.JSONObject;
import org.zkoss.util.media.AMedia;
import org.zkoss.zk.ui.Desktop;
import org.zkoss.zss.api.Exporter;
import org.zkoss.zss.api.Exporters;
import org.zkoss.zss.api.model.Book;
import org.zkoss.zss.jsp.JsonUpdateBridge;
import org.zkoss.zss.ui.Spreadsheet;
import org.zkoss.zul.Filedownload;

/**
 * Servlet implementation class ForLeaveServle
 */
@WebServlet("/ForLeaveServle")
public class ForLeaveServlet extends HttpServlet {
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
    
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // parameter from ajax request, you have to pass it in AJAX request
        // necessary parameter to get ZK server side desktop
        final String desktopId = request.getParameter("desktopId");
        if(desktopId == null) {
            response.sendRedirect("NewFile2.jsp");
            return;
        }
        // necessary parameter to get ZK server side spreadsheet
        final String zssUuid = request.getParameter("zssUuid");
        
        final String action = request.getParameter("action");
        
        // prepare a json result object, it can contain your ajax result and
        // also the necessary zk component update result
        final JSONObject result = new JSONObject();
        // set back for client to check action result, it depends on your logic.
        result.put("action", action);
        
        // use utility class to wrap zk in servlet request and
        // get access and response result
        JsonUpdateBridge bridge = new JsonUpdateBridge(getServletContext(), request, response, desktopId) {
        	
        	
        	@Override
            protected void process(Desktop desktop) {
                Spreadsheet ss = (Spreadsheet)desktop.getComponentByUuidIfAny(zssUuid);
                System.out.println("ss: " + ss);
                try {
                    doExport(ss);
                }
                catch(IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
                
                /* Book book = ss.getBook(); Sheet sheet = book.getSheetAt(0);
                 * 
                 * if("reset".equals(action)) { handleReset(sheet, result); }
                 * else if("check".equals(action)) { handleCheck(sheet, result);
                 * } */
            }
        };
        
        /* Generate ZK update result in given JSON object. An AJAX response
         * handler at client side, zssjsp, will 'eval' this result to update ZK
         * components. */
        result.put("message", "Download Success!");
        bridge.process(result);
        
        Writer w = response.getWriter();
        w.append(result.toJSONString());
    }
    
    public void doExport(Spreadsheet ss) throws IOException {
        Exporter exporter = Exporters.getExporter();
        Book book = ss.getBook();
        File file = File.createTempFile(Long.toString(System.currentTimeMillis()), "temp");
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(file);
            exporter.export(book, fos);
        }
        finally {
            if(fos != null) {
                fos.close();
            }
        }
        // generate file name upon book type (2007,2003)
        String dlname = BookUtil.suggestName(book);
        Filedownload.save(new AMedia(dlname, null, null, file, true));
    }
}