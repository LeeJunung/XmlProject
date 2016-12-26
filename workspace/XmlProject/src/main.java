import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.xssf.streaming.SXSSFWorkbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class main {
	public static void main(String[] args) throws EncryptedDocumentException, InvalidFormatException, IOException {
		
		InputStream in = new FileInputStream("C:\\Users\\kissco\\Documents\\Book1.xlsx");
		Workbook wb = new XSSFWorkbook(in);
		
		Sheet sheet1 = wb.getSheetAt(0);
		
		Row row = sheet1.getRow(0);
		
		String val = row.getCell(0).toString();
	}
}