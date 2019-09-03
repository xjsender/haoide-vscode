/**********************************************************************
 * 
 *
 * @url: /services/apexrest/rest
 * @data:
 *  {
        
    }
*************************************************************************/
@RestResource(urlMapping='/rest')
global with sharing class {MetaObject_Name__c} {
    @HttpPost
    global static String doPost() {
        return null;
    }
}