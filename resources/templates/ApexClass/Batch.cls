global class {MetaObject_Name__c} implements Database.Batchable<sObject> {
    public String query;

    global {MetaObject_Name__c}(String query) {
        this.query = query;
    }
    
    global {MetaObject_Name__c}() {
        
    }

    
    global Database.QueryLocator start(Database.BatchableContext bc) {
        return Database.getQueryLocator(query);
    }

    global void execute(Database.BatchableContext BC, List<sObject> scope) {
        
    }

    global void finish(Database.BatchableContext BC) {

    }
}
