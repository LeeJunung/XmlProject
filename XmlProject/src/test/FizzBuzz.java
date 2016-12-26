package test;

import java.util.Scanner;

public class FizzBuzz {
	public static void main(String[] args) {
		int a = 0;
		
		do {
			System.out.print("input number please(stop is 0): ");
			Scanner scan = new Scanner(System.in);
			a = scan.nextInt(); 
			System.out.println(ketka(a));
		} while (a != 0);
		
	}
	
	public static String ketka(int a){
		String test = "";
		
		if(a % 3 == 0) test += "Fizz";
		if(a % 5 == 0) test += "Buzz";
		
		return test;
	}
}
