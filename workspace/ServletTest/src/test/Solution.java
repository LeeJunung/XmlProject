package test;

import java.util.Random;

class Solution {
    public int solution(int[] A) {
        int sum = 0;
        int beforeSum = 0;
        int afterSum = 0;
        int equ = 0;
        int result = 0;
        
        for (int i =1;i<A.length;i++){
            for(int j = 0;j<i;j++){
                beforeSum += A[j];
            }
            
            for(int k = 0;k<A.length;k++){
                sum += A[k];    
            }
            
            equ = A[i];
            afterSum = sum - beforeSum - equ;
            
            if((beforeSum == afterSum) && (equ == afterSum)) {
              /*System.out.println("i: " + i + "th");
              System.out.println("beforeSum: " + beforeSum);
              System.out.println("equ: " + equ);
              System.out.println("afterSum: " + afterSum);
              System.out.println("sum: " + sum);
              System.out.println("result: " + result);
              System.out.println("----------------------");*/
              
              result = i;
              /*System.out.println("i: " + i + "th");
              System.out.println("beforeSum: " + beforeSum);
              System.out.println("equ: " + equ);
              System.out.println("afterSum: " + afterSum);
              System.out.println("sum: " + sum);
              System.out.println("result: " + result);
              System.out.println("----------------------");*/
              break;
            }
            
            if(i == A.length -1 && beforeSum == 0){
              result = i;
             /* System.out.println("i: " + i + "th");
              System.out.println("beforeSum: " + beforeSum);
              System.out.println("equ: " + equ);
              System.out.println("afterSum: " + afterSum);
              System.out.println("sum: " + sum);
              System.out.println("result: " + result);
              System.out.println("----------------------");*/
              break;
            }
            
            
            /*System.out.println("i: " + i + "th");
            System.out.println("beforeSum: " + beforeSum);
            System.out.println("equ: " + equ);
            System.out.println("afterSum: " + afterSum);
            System.out.println("sum: " + sum);
             System.out.println("result: " + result);
            System.out.println("----------------------");*/
            
            
            beforeSum = 0;
            afterSum = 0;
            sum = 0;
        }
        
        if (result == 0) return -1;
        
        return result;    
    }
}