# Change Log

All notable changes to the "haoide" extension will be documented in this file.


## [0.2.1], 2019-10-08
+ Add new command ```logoutDefaultProject``` for logout from default project
+ Add new command ```buildSobjectSOQL``` for building sobject soql
+ Add new command ```executeGlobalDescribe``` for keeping global describe result to local cache
+ Add new commands ```setSyntaxToHtml``` and ```setSyntaxToJS``` for quickly setting sytax as html or js
+ Add new command ```startQueryExplorer``` for display query result as sortable and searchable table
+ Add new ```recommendations``` for better using vscode
---
+ Allow user to choose workspace when ```authorize new org```
+ Add support for choosing sobject when create new  ```ApexTrigger```
+ Add support for custom login url when authorize new project
+ Add ```.jsconfig``` for disable ```experimentalDecorators``` warning in lwc js file
+ Add chinese translation for part of commands
+ Add ```metadata describe``` check before create new project
+ Add session validation check before execute ```copyLoginUrl``` and ```openDefaultOrg```
+ Hide ```refreshThisFromServer``` command for others except for ```ApexClass```
+ Update svg icon for ```setSyntaxToApex``` command in the ```editor/title``` menu item
+ Add warning message for manually progress terminated
+ Update comment for some missing modules
---
+ Completion Enhancement:
    - Add support for specified condition for sobject definition reloading
    - Add ```external``` and ```unique``` notation for sobject field completion
    - Add ```Formula Tip``` for sobject field completion
    - Add ```childRelationship``` completion for sobject
    - Add missing trigger standard lib for apex completion
    - Remove comments when locate variable type for completion
    - Read ```icon names``` from latest version of dependency ```@salesforce-ux/design-system```
    - Add ```slds classes``` support for any attributes which ends with class from latest version of dependency ```@salesforce-ux/design-system```


## [0.2.0], 2019-09-25
+ Add new command for ```refreshing file from server```
+ Update menu item position and visibility
+ Fix bug for translation of command title and tips
+ 

## [0.1.9], 2019-09-24

+ Add new command for converting array to table
+ Add new command for refreshing folders from server
+ Add new command for creating manifest file in the ``explorer/context`` menu
+ Add new command for retrieving manifest from server
+ Add new command for converting json to typescript
+ Add new command for setting new file with apex syntax in the ``editor/title`` menu
+ Add new setting for controlling whether print debug log of extension
+ Enhancement for custom apex class completion
+ Add support for formating rest body in the rest explorer
+ Add support for ``listMetadata`` when retrieve ``CustomObject``, ``DocumentFoler`` and so on
+ 


## [0.1.8]

+ Add support for method or properties completion of custom apex class


## [0.1.7]

+ Add instance completion for apex and sobject
+ Add picklist value completion for sobject
+ Add rest explorer for rest testing, check [REST Explorer](https://github.com/xjsender/haoide-vscode/blob/master/docs/restExplorer.gif) for detail
+ Add sobjects reloading feature for specified sobjects
+ Add ```.gitignore``` after create new project
+ Add new command ``Execute Tooling Query`` for query tooling objects
+ Add new command ``Reload Symbol Table`` for custom apex class completion


## [0.1.6]

+ Add confirmation for existing-config check when creating new metaobject
+ Add confirmation when destructing files from server
+ Fix recursive login bug when refresh token expired


## [0.1.5]

+ Add new command for ``Convert JSON to Apex``
+ Add new command for ``Creating ApexTrigger``
+ Add new command for ``Creating ApexClass``
+ Add new command for ``Creating Visualforce Page``
+ Add new command for ``Creating Visualforce Component``
+ Add new command for ``Creating LWC``
+ Add new command for ``Creating Aura Application, Component, Event and Interface``
+ Enhancement: save dirty files before execute deploy command
+ Enhancement: reload sobject cache after project is created
+ Enhancement: set new untitled file with apex syntax
+ Fix bug for metadata api when session expired

## [0.1.4]

+ Add new command for ``Destruct This File From Server``
+ Add new command for ``Destruct Open Files From Server``
+ Update local file properties after files are retrieved from server
+ Update lastModifiedDate of file property after files are deploy succeed

## [0.1.3]

+ Add new command for ``updating user language``
+ Fix bug for command ``switch project``
+ Refactor settings and API structure

## [0.1.2]

+ Add new command, ``convert15IdTo18Id``
+ Add new authorized project to exist workspace if exist

## [0.1.1]

Add new command, ``retrieveOpenFilesFromSesrver``, ``deployOpenFilesFronServer``

## [0.1.0]

- Add basic project operation, such as, ``retrieve from server``, ``deploy to server``, ``create new project`` and so on.

## [0.1.0]

- Initial release
