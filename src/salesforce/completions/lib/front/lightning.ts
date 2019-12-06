/**
 * @file manually collected from lightning guide
 * Since 2019, Summer19, v45
 * @author Mouse Liu <mouse.mliu@gmail.com>
 */

import { getIconNames, getCssNames } from "../util";

// events count: 69
const std_events = {
    "aura:applicationEvent": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "The root event of the event hierarchy for all events of type=\"APPLICATION\""
    },
    "aura:componentEvent": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "The root event of the event hierarchy for all events of type=\"APPLICATION\""
    },
    "aura:doneRendering": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates that the initial rendering of the root application or root component has completed."
    },
    "aura:doneWaiting": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates that the client-side framework is done waiting for a response to a server request.  This will always be preceded by a aura:waiting event."
    },
    "aura:locationChange": {
        "attrs": [
            {
                "name": "token",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The new hash part of the url"
            },
            {
                "name": "querystring",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The query string portion of the hash that is stripped off and applied to the event as parameters."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates that the hash part of the url in the brower's location bar has been modified."
    },
    "aura:methodCall": {
        "attrs": [
            {
                "name": "name",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The name of the method called."
            },
            {
                "name": "arguments",
                "type": "list",
                "access": "global",
                "required": false,
                "description": "The list of arguments passed into the public method."
            }
        ],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that a public method was called."
    },
    "aura:noAccess": {
        "attrs": [
            {
                "name": "redirectURL",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "A url that the server says the application should redirect the browser to when this event fires."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates that a requested resource is not accessible due to security constraints on that resource."
    },
    "aura:systemError": {
        "attrs": [
            {
                "name": "message",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The message to be displayed during an error."
            },
            {
                "name": "error",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The system error that's returned."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates that an error has occurred."
    },
    "aura:valueChange": {
        "attrs": [
            {
                "name": "expression",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The expression that triggered the value change."
            },
            {
                "name": "oldValue",
                "type": "object",
                "access": "global",
                "required": false,
                "description": "The previous value that was changed."
            },
            {
                "name": "value",
                "type": "object",
                "access": "global",
                "required": false,
                "description": "The new value."
            },
            {
                "name": "index",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "If the handler was registered through an ArrayValue or MapValue, the name/index of the changed Value in that ArrayValue or MapValue"
            }
        ],
        "eventType": "VALUE",
        "access": "global",
        "description": "Indicates that a Value has changed."
    },
    "aura:valueDestroy": {
        "attrs": [
            {
                "name": "value",
                "type": "object",
                "access": "global",
                "required": false,
                "description": "The component that is being destroyed."
            }
        ],
        "eventType": "VALUE",
        "access": "global",
        "description": "Indicates that a component is being destroyed."
    },
    "aura:valueEvent": {
        "attrs": [],
        "eventType": "VALUE",
        "access": "global",
        "description": "The root event of the event hierarchy for all events of type=\"VALUE\""
    },
    "aura:valueInit": {
        "attrs": [
            {
                "name": "value",
                "type": "object",
                "access": "global",
                "required": false,
                "description": "The component that initialized."
            }
        ],
        "eventType": "VALUE",
        "access": "global",
        "description": "Indicates that a component has been initialized."
    },
    "aura:valueRender": {
        "attrs": [
            {
                "name": "value",
                "type": "object",
                "access": "global",
                "required": false,
                "description": "The component that rendered."
            }
        ],
        "eventType": "VALUE",
        "access": "global",
        "description": "Indicates that a component has been rendered."
    },
    "aura:waiting": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates that the client-side framework is currently awaiting a response to a server request."
    },
    "force:closeQuickAction": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Closes a quick action panel. Only one quick action panel can be open in the app at a time."
    },
    "force:createRecord": {
        "attrs": [
            {
                "name": "entityApiName",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Required. The API name of the custom or standard object, such as \"Account\", \"Case\", \"Contact\", \"Lead\", \"Opportunity\", or \"namespace__objectName__c\"."
            },
            {
                "name": "recordTypeId",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Non-null if recordTypes are enabled. Null means Master RecordType."
            },
            {
                "name": "defaultFieldValues",
                "type": "map",
                "access": "global",
                "required": false,
                "description": "Prepopulates fields on a record create panel, including fields not displayed on the panel. ID fields and rich text fields can't be prepopulated. Users must have create access to prepopulated fields. Errors during saving that are caused by field access limitations do not display error messages.         "
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Event fired to show the Full Record Create panel"
    },
    "force:editRecord": {
        "attrs": [
            {
                "name": "recordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": null
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Displays the record edit screen for a given record"
    },
    "force:navigateHome": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": null
    },
    "force:navigateToComponent": {
        "attrs": [
            {
                "name": "componentDef",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The component to navigate to, for example, c:myComponent."
            },
            {
                "name": "componentAttributes",
                "type": "object",
                "access": "global",
                "required": false,
                "description": "The attributes for the component."
            },
            {
                "name": "isredirect",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "Specifies whether the navigation is a redirect. If true, the browser replaces the current URL with the new one in the navigation history. This value defaults to false."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Navigates from a Lightning component to another."
    },
    "force:navigateToList": {
        "attrs": [
            {
                "name": "listViewId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the list view to be displayed"
            },
            {
                "name": "listViewName",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Specifies the name for the list view and doesn't need to match the actual name. To use the actual name that's saved for the list view, set listViewName to null."
            },
            {
                "name": "scope",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The name of the sObject in the view, for example, 'Account' or 'MyObject__c'"
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Navigates to the list view specified by listViewId."
    },
    "force:navigateToObjectHome": {
        "attrs": [
            {
                "name": "scope",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "name or key prefix of entity to display object home for."
            },
            {
                "name": "resetHistory",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "Set to true to reset history"
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "used to navigate to object home"
    },
    "force:navigateToRelatedList": {
        "attrs": [
            {
                "name": "relatedListId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The API name of the related list to display. For standard objects it is typically the related list's entity api name in plural form, such as 'Contacts' or '\u200bOpportunitie\u200bs'. For custom objects it takes the form of '{\u200bYourCustom\u200bRelationship\u200bLabel}__r' "
            },
            {
                "name": "parentRecordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the parent record"
            },
            {
                "name": "entityApiName",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The entity API name of the related list"
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Navigates to the related list specified by parentRecordId."
    },
    "force:navigateToSObject": {
        "attrs": [
            {
                "name": "networkId",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Network that the event is associated with."
            },
            {
                "name": "recordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The record ID"
            },
            {
                "name": "slideDevName",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The slideDevName of the slide to navigate to. By default, options are 'chatter', 'related', 'detail'."
            },
            {
                "name": "isredirect",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "If we are redirecting in place, we don't want to create 2 history entries for hybrid. Instead hybrid ignores redirects as a history entry."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Navigates to an sObject record specified by recordId."
    },
    "force:navigateToURL": {
        "attrs": [
            {
                "name": "networkId",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Network that the event is associated with."
            },
            {
                "name": "isredirect",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "If we are redirecting in place, we don't want to create 2 history entries for hybrid. Instead hybrid ignores redirects as a history entry."
            },
            {
                "name": "url",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The URL of the target"
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Navigates to the specified URL."
    },
    "force:recordSave": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Record save request"
    },
    "force:recordSaveSuccess": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that the record has been successfully saved."
    },
    "force:refreshView": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": null
    },
    "force:showToast": {
        "attrs": [
            {
                "name": "title",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Specifies the title for a message to display. The title is shown above the message in a slightly larger font."
            },
            {
                "name": "duration",
                "type": "integer",
                "access": "global",
                "required": false,
                "description": "Length of time the toast is visible for, in milliseconds. Applies to 'dismissible' or 'pester' toast modes. The default is 5000ms if the provided value is less than 5000ms."
            },
            {
                "name": "message",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The message to display in the toast."
            },
            {
                "name": "key",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Icon to use when toast type is 'other'. Icon keys are available at the Lightning Design System Icons page."
            },
            {
                "name": "mode",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The toast mode, which controls how users can dismiss the toast. Valid values are 'pester' and 'sticky'. The default is 'dismissible', which displays the close button."
            },
            {
                "name": "type",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The toast type, which can be 'error', 'warning', 'success', or 'info'. The default is 'other', which is styled like an 'info' toast and doesn\u2019t display an icon, unless specified by the key attribute."
            },
            {
                "name": "messageTemplate",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Overwrites message string with the specified message. Requires messageTemplateData."
            },
            {
                "name": "messageTemplateData",
                "type": "object[]",
                "access": "global",
                "required": false,
                "description": "An array of text and actions to be used in messageTemplate."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Displays page-level toasts."
    },
    "forceChatter:customOpenFile": {
        "attrs": [
            {
                "name": "recordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "ID of the file record. This must not be empty."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Adds custom logic for file open/tap action for Communities on mobile and tablet devices."
    },
    "forceChatter:postCreated": {
        "attrs": [
            {
                "name": "feedItemId",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The id of the feed item that has been created"
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when a post is made"
    },
    "forceCommunity:analyticsInteraction": {
        "attrs": [
            {
                "name": "hitType",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The type of hit. Supported types: 'event', 'social', 'exception', 'timing'."
            },
            {
                "name": "eventCategory",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The type or category of item that was interacted with. Required for 'event' hitType."
            },
            {
                "name": "eventAction",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The type of action. Required for 'event' hitType."
            },
            {
                "name": "eventLabel",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "A label for providing additional event information."
            },
            {
                "name": "eventValue",
                "type": "integer",
                "access": "global",
                "required": false,
                "description": "A positive numeric value associated with the event."
            },
            {
                "name": "socialNetwork",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The network on which the action occurs. Required for 'social' hitType."
            },
            {
                "name": "socialAction",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The type of action that happens. Required for 'social' hitType."
            },
            {
                "name": "socialTarget",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Specifies the target of a social interaction. Required for 'social' hitType."
            },
            {
                "name": "exDescription",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "A description of the exception."
            },
            {
                "name": "exFatal",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "True if the exception was fatal."
            },
            {
                "name": "timingCategory",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "A string for categorizing all user timing variables into logical groups. Required for 'timing' hitType."
            },
            {
                "name": "timingVar",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "A string to identify the variable being recorded. Required for 'timing' hitType."
            },
            {
                "name": "timingValue",
                "type": "integer",
                "access": "global",
                "required": false,
                "description": "The number of milliseconds in elapsed time to report to Google Analytics. Required for 'timing' hitType."
            },
            {
                "name": "timingLabel",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "A string that can be used to add flexibility in visualizing user timings in the reports."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Tracks events triggered by custom components in communities and sends the data to Google Analytics."
    },
    "forceCommunity:routeChange": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "This event is fired whenever a route url is changed"
    },
    "lightning:conversationAgentSend": {
        "attrs": [
            {
                "name": "recordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Record ID of the conversation"
            },
            {
                "name": "content",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The text of a message in the chat log."
            },
            {
                "name": "name",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The name of the agent who is attempting to send the message as it appears in the chat log."
            },
            {
                "name": "type",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The type of message that was received\u2014for example, agent."
            },
            {
                "name": "timestamp",
                "type": "date",
                "access": "global",
                "required": true,
                "description": "The date and time the agent attempted to send the chat message."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates an agent sent a message"
    },
    "lightning:conversationChatEnded": {
        "attrs": [
            {
                "name": "recordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Record ID of the conversation"
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates a conversation has ended"
    },
    "lightning:conversationCustomEvent": {
        "attrs": [
            {
                "name": "recordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Record ID of the conversation"
            },
            {
                "name": "type",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Name of the custom event"
            },
            {
                "name": "data",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Data attached to the custom event"
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates receipt of a custom event on a conversation"
    },
    "lightning:conversationNewMessage": {
        "attrs": [
            {
                "name": "recordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Record ID of the conversation"
            },
            {
                "name": "content",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The text of a message in the chat log."
            },
            {
                "name": "name",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The name of the agent who is attempting to send the message as it appears in the chat log."
            },
            {
                "name": "type",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The type of message that was received\u2014for example, agent."
            },
            {
                "name": "timestamp",
                "type": "date",
                "access": "global",
                "required": true,
                "description": "The date and time the agent attempted to send the chat message."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Indicates receipt of a end user of a conversation"
    },
    "lightning:omniChannelLoginSuccess": {
        "attrs": [
            {
                "name": "statusId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the agent\u2019s current presence status."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when an Omni-Channel user is logged in successfully."
    },
    "lightning:omniChannelLogout": {
        "attrs": [],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when an Omni-Channel user is logged out."
    },
    "lightning:omniChannelStatusChanged": {
        "attrs": [
            {
                "name": "statusId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the agent\u2019s current presence status."
            },
            {
                "name": "channels",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The JSON string of channel objects."
            },
            {
                "name": "statusName",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The name the agent\u2019s current presence status."
            },
            {
                "name": "statusApiName",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The API name of the agent\u2019s current presence status."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when an Omni-Channel user changes his or her status."
    },
    "lightning:omniChannelWorkAccepted": {
        "attrs": [
            {
                "name": "workItemId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the object that\u2019s routed through Omni-Channel."
            },
            {
                "name": "workId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of a work assignment that\u2019s routed to an agent."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when a user accepts a work assignment, or when a work assignment is automatically accepted."
    },
    "lightning:omniChannelWorkAssigned": {
        "attrs": [
            {
                "name": "workItemId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the object that\u2019s routed through Omni-Channel."
            },
            {
                "name": "workId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of a work assignment that\u2019s routed to an agent."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when a user is assigned a new work item."
    },
    "lightning:omniChannelWorkClosed": {
        "attrs": [
            {
                "name": "workItemId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the object that\u2019s routed through Omni-Channel."
            },
            {
                "name": "workId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of a work assignment that\u2019s routed to an agent."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when a user closes a tab in the console that\u2019s associated with a work item."
    },
    "lightning:omniChannelWorkDeclined": {
        "attrs": [
            {
                "name": "workItemId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the object that\u2019s routed through Omni-Channel."
            },
            {
                "name": "workId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of a work assignment that\u2019s routed to an agent."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when a user declines a work assignment."
    },
    "lightning:omniChannelWorkloadChanged": {
        "attrs": [
            {
                "name": "configuredCapacity",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The configured capacity for the agent."
            },
            {
                "name": "previousWorkload",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The agent\u2019s workload before the change."
            },
            {
                "name": "newWorkload",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The agent\u2019s new workload after the change."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fired when an agent\u2019s workload changes."
    },
    "lightning:openFiles": {
        "attrs": [
            {
                "name": "recordIds",
                "type": "string[]",
                "access": "global",
                "required": true,
                "description": "IDs of the records to open. This must not be empty. "
            },
            {
                "name": "selectedRecordId",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "ID of the record to open first among the one specified in the recordIds attribute. If this value is not provided or if the value provided is not in the list, the first element from the list will be used. "
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "The lightning:openFiles event is no longer recommended. Use the Lightning navigation service instead. Application event used to open one or more file records. This event triggers a modal file previewer or download depending on the form factor. "
    },
    "lightning:sendChatterExtensionPayload": {
        "attrs": [
            {
                "name": "payload",
                "type": "object",
                "access": "global",
                "required": true,
                "description": "Payload data to be saved with the feed item."
            },
            {
                "name": "extensionTitle",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Title for the extension to be saved with the feed item."
            },
            {
                "name": "extensionDescription",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Description for the extension to be saved with the feed item"
            },
            {
                "name": "extensionThumbnailUrl",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "thumbnailUrl for the extension to be saved with the feedItem"
            }
        ],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "For Chatter Rich Publisher Apps only. Sends the payload and metadata that needs to be saved for the extension with the feed item."
    },
    "lightning:tabClosed": {
        "attrs": [
            {
                "name": "tabId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The closed tab ID."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fires when a Console workspace or subtab has been successfully closed."
    },
    "lightning:tabCreated": {
        "attrs": [
            {
                "name": "tabId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The newly created tab ID."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fires when a Console workspace or subtab has been successfully created."
    },
    "lightning:tabFocused": {
        "attrs": [
            {
                "name": "previousTabId",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The previously focused tab ID."
            },
            {
                "name": "currentTabId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The currently focused tab ID."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fires when a Console workspace or subtab is focused."
    },
    "lightning:tabRefreshed": {
        "attrs": [
            {
                "name": "tabId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The currently refreshed tab ID."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fires when a Console workspace or subtab has been successfully refreshed."
    },
    "lightning:tabReplaced": {
        "attrs": [
            {
                "name": "tabId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the refreshed tab."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fires when a Console primary tab or subtab has been successfully replaced. For example, when saving a new record and the create form is replaced with the newly created Record Home."
    },
    "lightning:tabUpdated": {
        "attrs": [
            {
                "name": "tabId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The ID of the tab that was updated."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Fires when a Console workspace or subtab has been updated. This may include label, icon, and/or content changes."
    },
    "lightningcommunity:deflectionSignal": {
        "attrs": [
            {
                "name": "sourceType",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Descriptor of where deflection occured. Only signals with supported types will get processed. sourceType is synonymous with signalAgent."
            },
            {
                "name": "source",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The unique identifier of how the user arrived at the deflection item"
            },
            {
                "name": "destinationType",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Entity type of the deflection item"
            },
            {
                "name": "destination",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The id of the deflection item"
            },
            {
                "name": "payload",
                "type": "object",
                "access": "global",
                "required": false,
                "description": "Additional information about the deflection signal. The content of the payload depends on the sourceType."
            },
            {
                "name": "shouldSubmitSourceTypeSignals",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "Once an event is fired with shouldSubmitSourceTypeSignals=true,all signals of that                      sourceType are submitted to the server in a single batch to be processed. This should always be true unless signals are logically dependent on each other and must be processed together."
            },
            {
                "name": "callback",
                "type": "object",
                "access": "global",
                "required": false,
                "description": "Callback function invoked after signal is received and processed. Only called if shouldSubmitSourceTypeSignals=true."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "This event is fired whenever a community user interacts with a deflection item (an item determined to be responsible for a case deflection).                                                                          Reports can then be created on supported signal types."
    },
    "ltng:afterScriptsLoaded": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Fired when ltng:require has loaded all scripts listed in ltng:require.scripts"
    },
    "ltng:beforeLoadingResources": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Fired before ltng:require attempts to load any requested resources"
    },
    "ltng:selectSObject": {
        "attrs": [
            {
                "name": "recordId",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The record ID associated with the record to select."
            },
            {
                "name": "channel",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Represents the channel name. Specify this attribute if you want particular components to process some event messages while ignoring others."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Sends recordId when an object was selected in the UI"
    },
    "ltng:sendMessage": {
        "attrs": [
            {
                "name": "message",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "A message in the form of a String or JSON."
            },
            {
                "name": "channel",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Represents the channel name. Use a channel to enable a component to filter down to specific events."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Sends some data (String or JSON) to other components within the application"
    },
    "ui:clearErrors": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that validation errors are cleared."
    },
    "ui:collapse": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that a component is collapsed."
    },
    "ui:expand": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that a component is expanded."
    },
    "ui:menuFocusChange": {
        "attrs": [
            {
                "name": "previousItem",
                "type": "component[]",
                "access": "global",
                "required": false,
                "description": "The menu item that's previously focused."
            },
            {
                "name": "currentItem",
                "type": "component[]",
                "access": "global",
                "required": false,
                "description": "The menu item that's currently focused."
            }
        ],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that menu item focus is changed inside a menu component."
    },
    "ui:menuSelect": {
        "attrs": [
            {
                "name": "selectedItem",
                "type": "component[]",
                "access": "global",
                "required": false,
                "description": "The menu item that's selected."
            },
            {
                "name": "hideMenu",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "Hides menu if set to true."
            },
            {
                "name": "deselectSiblings",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "Deselects the siblings of the currently selected menu item."
            },
            {
                "name": "focusTrigger",
                "type": "boolean",
                "access": "global",
                "required": false,
                "description": "Sets focus to menuTrigger."
            }
        ],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that a menu item inside a menu component is selected."
    },
    "ui:menuTriggerPress": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that the menu trigger is clicked."
    },
    "ui:validationError": {
        "attrs": [],
        "eventType": "COMPONENT",
        "access": "global",
        "description": "Indicates that the component has validation error(s)."
    },
    "wave:discover": {
        "attrs": [
            {
                "name": "UID",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Optional identifier that will be included in the response data."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Wave event that wave dashboard listens and responds to with a discoverResponse event."
    },
    "wave:discoverResponse": {
        "attrs": [
            {
                "name": "id",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Dashboard Id."
            },
            {
                "name": "type",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Type of component, usually dashboard."
            },
            {
                "name": "title",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "Title of the dashboard."
            },
            {
                "name": "isLoaded",
                "type": "boolean",
                "access": "global",
                "required": true,
                "description": "Whether dashboard is loaded or still loading."
            },
            {
                "name": "UID",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Optional parameter sent with the request."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Response event to a wave:discover request."
    },
    "wave:pageChange": {
        "attrs": [
            {
                "name": "pageid",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The dashboard page that should be displayed if value is supplied."
            },
            {
                "name": "devName",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The dev name for the Wave Asset."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Event that updates the dashboard with the specified pageid."
    },
    "wave:selectionChanged": {
        "attrs": [
            {
                "name": "noun",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The type of the Wave asset for which a selection change event occurred."
            },
            {
                "name": "verb",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The action that occurred on the Wave asset."
            },
            {
                "name": "id",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The identifier of the Wave asset for which a selection change event occurred."
            },
            {
                "name": "payload",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "Contains the selection information from the asset that fired the event."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Wave event that sends selection change information to the Lightning component."
    },
    "wave:update": {
        "attrs": [
            {
                "name": "id",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The identifier for the Wave asset, in the form of a standard 18-character ID."
            },
            {
                "name": "value",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The JSON representing the filter or selection to be applied to the asset."
            },
            {
                "name": "type",
                "type": "string",
                "access": "global",
                "required": true,
                "description": "The type of the Wave asset. Currently, only dashboard is supported."
            },
            {
                "name": "devName",
                "type": "string",
                "access": "global",
                "required": false,
                "description": "The dev name for the Wave Asset."
            }
        ],
        "eventType": "APPLICATION",
        "access": "global",
        "description": "Event that updates the Wave asset with the specified filter or selection."
    }
};

const standard_lib = {
    'e': {
        "type": "Standard Class",
        "properties": Object.keys(std_events)
    },

    "A": {
        "type": "Standard Class",
        "prefix": "$",
        "sub_classes": [
            "util", "localizationService"
        ],
        "methods": {
            "createComponent(String type, Object attributes, function callback)\tvoid": "createComponent(${1:String type}, ${2:Object attributes}, ${3:function callback})$0",
            "createComponents(Array components, function callback)\tvoid": "createComponents(${1:Array components}, ${2:function callback})$0",
            "enqueueAction(Action action, Boolean background)\tvoid": "enqueueAction(${1:Action action}, ${2:Boolean background})$0",
            "enqueueAction(Action action)\tvoid": "enqueueAction(${1:Action action})$0",
            "get(String key, function callback)\tvoid": "get(${1:String key}, ${2:function callback})$0",
            "get(String key)\tvoid": "get(${1:String key})$0",
            "getCallback(function callback)\tvoid": "getCallback(${!:function callback})$0",
            "getComponent(Object identifier)\tvoid": "getComponent(${1:Object identifier})$0",
            "getReference(String key)\tvoid": "getReference(${1:String key})$0",
            "getRoot()\tvoid": "getRoot()$0",
            "getToken(String token)\tvoid": "getToken(${1:String token})$0",
            "log(Object value, Object error)\tvoid": "log(${1:Object value}, ${2:Object error})$0",
            "reportError(String message, Error error)\tvoid": "reportError(${1:String message}, ${2:Error error})$0",
            "set(String key, Object value)\tvoid": "set(${1:String key}, ${2:Object value})$0",
            "warning(String w, Error e)\tvoid": "warning(${1:String w}, ${2:Error e})$0",
        }
    },

    "util": {
        "sub_class": true,
        "type": "Standard Class",
        "methods": {
            "addClass(Object element, String newClass)\tvoid": "addClass(${1:Object element}, ${2:String newClass})$0",
            "getBooleanValue(Object val)\tBoolean": "getBooleanValue(${1:Object val})$0",
            "hasClass(Object element, String className)\tBoolean": "hasClass(${1:Object element}, ${2:String className})$0",
            "isArray(Object obj)\tBoolean": "isArray(${1:Object obj})$0",
            "isEmpty(Object obj)\tBoolean": "isEmpty(${1:Object obj})$0",
            "isObject(Object obj)\tBoolean": "isObject(${1:Object obj})$0",
            "isUndefined(Object obj)\tBoolean": "isUndefined(${1:Object obj})$0",
            "isUndefinedOrNull(Object obj)\tBoolean": "isUndefinedOrNull(${1:Object obj})$0",
            "removeClass(Object element, String newClass)\tvoid": "removeClass(${1:Object element}, ${2:String newClass})$0",
            "toggleClass(Object element, String className)\tvoid": "toggleClass(${1:Object element}, ${2:String className})$0"
        }
    },

    "localizationService": {
        "sub_class": true,
        "type": "Sub Class",
        "methods": {
            "UTCToWallTime(Date date, String timezone, function callback)\tvoid": "UTCToWallTime(${1:Date date}, ${2:String timezone}, ${3:function callback})$0",
            "WallTimeToUTC(Date date, String timezone, function callback)\tvoid": "WallTimeToUTC(${1:Date date}, ${2:String timezone}, ${3:function callback})$0",
            "displayDuration(Duration d, Boolean noSuffix)\tString": "displayDuration(${1:Duration d}, ${2:Boolean noSuffix})$0",
            "displayDurationInDays(Duration d)\tNumber": "displayDurationInDays(${1:Duration d})$0",
            "displayDurationInHours(Duration d)\tNumber": "displayDurationInHours(${1:Duration d})$0",
            "displayDurationInMilliseconds(Duration d)\tNumber": "displayDurationInMilliseconds(${1:Duration d})$0",
            "displayDurationInMinutes(Duration d)\tNumber": "displayDurationInMinutes(${1:Duration d})$0",
            "displayDurationInMonths(Duration d)\tNumber": "displayDurationInMonths(${1:Duration d})$0",
            "displayDurationInSeconds(Duration d)\tNumber": "displayDurationInSeconds(${1:Duration d})$0",
            "duration(Number | Object num, String unit)\tObject": "duration(${1:Number | Object num}, ${2:String unit})$0",
            "endOf(String | Number | Date date, String unit)\tDate": "endOf(${1:String | Number | Date date}, ${2:String unit})$0",
            "formatCurrency(Number number)\tNumber": "formatCurrency(${1:Number number})$0",
            "formatDate(String | Number | Date date, String formatString, String locale)\tString": "formatDate(${1:String | Number | Date date}, ${2:String formatString}, ${3:String locale})$0",
            "formatDateTime(String | Number | Date date, String formatString, String locale)\tString": "formatDateTime(${1:String | Number | Date date}, ${2:String formatString}, ${3:String locale})$0",
            "formatDateTimeUTC(String | Number | Date date, String formatString, String locale)\tString": "formatDateTimeUTC(${1:String | Number | Date date}, ${2:String formatString}, ${3:String locale})$0",
            "formatDateUTC(String | Number | Date date, String formatString, String locale)\tString": "formatDateUTC(${1:String | Number | Date date}, ${2:String formatString}, ${3:String locale})$0",
            "formatNumber(Number number)\tNumber": "formatNumber(${1:Number number})$0",
            "formatPercent(Number number)\tNumber": "formatPercent(${1:Number number})$0",
            "formatTime(String | Number | Date date, String formatString, String locale)\tString": "formatTime(${1:String | Number | Date date}, ${2:String formatString}, ${3:String locale})$0",
            "formatTimeUTC(String | Number | Date date, String formatString, String locale)\tString": "formatTimeUTC(${1:String | Number | Date date}, ${2:String formatString}, ${3:String locale})$0",
            "getDateStringBasedOnTimezone(String timezone, Date dateObj, function callback)\tvoid": "getDateStringBasedOnTimezone(${1:String timezone}, ${2:Date dateObjfunction callback})$0",
            "getDaysInDuration(Duration d)\tNumber": "getDaysInDuration(${1:Duration d})$0",
            "getDefaultCurrencyFormat()\tNumber": "getDefaultCurrencyFormat()$0",
            "getDefaultNumberFormat()\tNumber": "getDefaultNumberFormat()$0",
            "getDefaultPercentFormat()\tNumber": "getDefaultPercentFormat()$0",
            "getHoursInDuration(Duration d)\tNumber": "getHoursInDuration(${1:Duration d})$0",
            "getLocalizedDateTimeLabels()\tObject": "getLocalizedDateTimeLabels()$0",
            "getMillisecondsInDuration(Duration d)\tNumber": "getMillisecondsInDuration(${1:Duration d})$0",
            "getMinutesInDuration(Duration d)\tNumber": "getMinutesInDuration(${1:Duration d})$0",
            "getMonthsInDuration(Duration d)\tNumber": "getMonthsInDuration(${1:Duration d})$0",
            "getNumberFormat(String formatString symbols)\tNumber": "getNumberFormat(${1:String formatString symbols})$0",
            "getSecondsInDuration(Duration d)\tNumber": "getSecondsInDuration(${1:Duration d})$0",
            "getToday(String timezone, function callback)\tString": "getToday(${1:String timezone}, ${2:function callback})$0",
            "getYearsInDuration(Duration d)\tNumber": "getYearsInDuration(${1:Duration d})$0",
            "isAfter(String | Number | Date date1, String | Number | Date date2, String unit)\tBoolean": "isAfter(${1:String | Number | Date date1}, ${2:String | Number | Date date2}, ${3:String unit})$0",
            "isBefore(String | Number | Date date1, String | Number | Date date2, String unit)\tBoolean": "isBefore(${1:String | Number | Date date1}, ${2:String | Number | Date date2}, ${3:String unit})$0",
            "isBetween(String | Number | Date date, String | Number | Date fromDate, String | Number | Date toDate, String unit)\tBoolean: unit})$0": "isBetween(${1:String | Number | Date date}, ${2:String | Number | Date fromDate}, ${3:String | Number | Date toDate}, ${4:String unit})\tBoolean: unit})$0",
            "isPeriodTimeView(String pattern)\tBoolean": "isPeriodTimeView(${1:String pattern})$0",
            "isSame(String | Number | Date date1, String | Number | Date date2, String unit)\tBoolean": "isSame(${1:String | Number | Date date1}, ${2:String | Number | Date date2}, ${3:String unit})$0",
            "parseDateTime(String dateTimeString, String parseFormat, String locale, Boolean strictParsing)\tDate": "parseDateTime(${1:String dateTimeString}, ${2:String parseFormat}, ${3:String locale}, ${4:Boolean strictParsing})$0",
            "parseDateTimeISO8601(String dateTimeString)\tDate": "parseDateTimeISO8601(${1:String dateTimeString})$0",
            "parseDateTimeUTC(String dateTimeString, String parseFormat, String locale, Boolean strictParsing)\tDate": "parseDateTimeUTC(${1:String dateTimeString}, ${2:String parseFormat}, ${3:String locale}, ${4:Boolean strictParsing})$0",
            "startOf(String | Number | Date date, String unit)\tDate": "startOf(${1:String | Number | Date date}, ${2:String unit})$0",
            "toISOString(Date date)\tString": "toISOString(${1:Date date})$0",
            "translateFromLocalizedDigits(String input)\tString": "translateFromLocalizedDigits(${1:String input})$0",
            "translateFromOtherCalendar(Date date)\tDate": "translateFromOtherCalendar(${1:Date date})$0",
            "translateToLocalizedDigits(String input)\tString": "translateToLocalizedDigits(${1:String input})$0",
            "translateToOtherCalendar(Date date)\tDate": "translateToOtherCalendar(${1:Date date})$0"
        }
    },

    "action": {
        "type": "Customized Lib",
        "methods": {
            "getError()\tObject[]": "getError()$0",
            "getName()\tString": "getName()$0",
            "getParam(String name)\tObject": "getParam(${1:String name})$0",
            "getParams()\tObject": "getParams()$0",
            "getReturnValue()\tvoid": "getReturnValue()$0",
            "getState()\tString": "getState()$0",
            "isBackground()\tvoid": "isBackground()$0",
            "setAbortable()\tvoid": "setAbortable()$0",
            "setBackground()\tvoid": "setBackground()$0",
            "setCallback(Object scope, function callback, String name)\tvoid": "setCallback(${1:Object scope}, ${2:function callback}, ${3:String name})$0",
            "setParam(String key, Object value)\tvoid": "setParam(${1:String key}, ${2:Object value})$0",
            "setParams(Object config)\tvoid": "setParams(${1:Object config})$0",
            "setStorable(Object config)\tvoid": "setStorable(${1:Object config})$0"
        }
    },

    "response": {
        "type": "Customized Lib",
        "methods": {
            "getState()\tString": "getState()",
            "getReturnValue()\tObject": "getReturnValue()",
            "getError()\tArray": "getError()"
        }
    },


    "component": {
        "type": "Customized Lib",
        "methods": {
            "addEventHandler(String event, function handler, String phase, Boolean includeFacets)\tvoid": "addEventHandler(${1:String event}, ${2:function handler}, ${3:String phase}, ${4:Boolean includeFacetse})$0",
            "addValueHandler(Object config)\tvoid": "addValueHandler(${1:Object config})$0",
            "addValueProvider(String key, Object valueProvider)\tvoid": "addValueProvider(${1:String key}, ${2:Object valueProvider})$0",
            "autoDestroy(Boolean destroy)\tvoid": "autoDestroy(Boolean destroy)$0",
            "clearReference(String key)\tvoid": "clearReference(${1:String key})$0",
            "destroy()\tvoid": "destroy()$0",
            "find(String | Object name)\tvoid": "find(${1:String | Object} ${2:name})$0",
            "get(String key)\tvoid": "get(${1:String key})$0",
            "getConcreteComponent()\tvoid": "getConcreteComponent()$0",
            "getElement()\tvoid": "getElement()$0",
            "getElements()\tvoid": "getElements()$0",
            "getEvent(String name)\tvoid": "getEvent(${1:String name})$0",
            "getGlobalId()\tvoid": "getGlobalId()$0",
            "getLocalId()\tvoid": "getLocalId()$0",
            "getName()\tvoid": "getName()$0",
            "getReference(String key)\tPropertyReferenceValue": "getReference(${1:String key})$0",
            "getSuper()\tvoid": "getSuper()$0",
            "getType()\tvoid": "getType()$0",
            "getVersion()\tvoid": "getVersion()$0",
            "isConcrete()\tvoid": "isConcrete()$0",
            "isInstanceOf(String name)\tBoolean": "isInstanceOf(${1:String name})$0",
            "isValid()\tvoid": "isValid()$0",
            "removeEventHandler(String event, function handler, String phase)\tvoid": "removeEventHandler(${1:String event}, ${2:function handler}, ${3:String phase})$0",
            "set(String key, Object value)\tvoid": "set(${1:String key}, ${2:Object value})$0"
        }
    },

    "cmp": {
        "type": "Customized Lib",
        "methods": {
            "addEventHandler(String event, function handler, String phase, Boolean includeFacets)\tvoid": "addEventHandler(${1:String event}, ${2:function handler}, ${3:String phase}, ${4:Boolean includeFacetse})$0",
            "addValueHandler(Object config)\tvoid": "addValueHandler(${1:Object config})$0",
            "addValueProvider(String key, Object valueProvider)\tvoid": "addValueProvider(${1:String key}, ${2:Object valueProvider})$0",
            "autoDestroy(Boolean destroy)\tvoid": "autoDestroy(Boolean destroy)$0",
            "clearReference(String key)\tvoid": "clearReference(${1:String key})$0",
            "destroy()\tvoid": "destroy()$0",
            "find(String | Object name)\tvoid": "find(${1:String | Object} ${2:name})$0",
            "get(String key)\tvoid": "get(${1:String key})$0",
            "getConcreteComponent()\tvoid": "getConcreteComponent()$0",
            "getElement()\tvoid": "getElement()$0",
            "getElements()\tvoid": "getElements()$0",
            "getEvent(String name)\tvoid": "getEvent(${1:String name})$0",
            "getGlobalId()\tvoid": "getGlobalId()$0",
            "getLocalId()\tvoid": "getLocalId()$0",
            "getName()\tvoid": "getName()$0",
            "getReference(String key)\tPropertyReferenceValue": "getReference(${1:String key})$0",
            "getSuper()\tvoid": "getSuper()$0",
            "getType()\tvoid": "getType()$0",
            "getVersion()\tvoid": "getVersion()$0",
            "isConcrete()\tvoid": "isConcrete()$0",
            "isInstanceOf(String name)\tBoolean": "isInstanceOf(${1:String name})$0",
            "isValid()\tvoid": "isValid()$0",
            "removeEventHandler(String event, function handler, String phase)\tvoid": "removeEventHandler(${1:String event}, ${2:function handler}, ${3:String phase})$0",
            "set(String key, Object value)\tvoid": "set(${1:String key}, ${2:Object value})$0"
        }
    },

    "Browser": {
        "type": "Standard Class",
        "prefix": "$",
        "methods": {
            "formFactor()\tBoolean": "formFactor()$0",
            "isAndroid()\tBoolean": "isAndroid()$0",
            "isIOS()\tBoolean": "isIOS()$0",
            "isIPad()\tBoolean": "isIPad()$0",
            "isIPhone()\tBoolean": "isIPhone()$0",
            "isPhone()\tBoolean": "isPhone()$0",
            "isTablet()\tBoolean": "isTablet()$0",
            "isWindowsPhone()\tBoolean": "isWindowsPhone()$0"
        }
    },

    "console": {
        "type": "Standard Class",
        "methods": {
            "log()\tvoid": "log($1)$0",
            "error()\tvoid": "error($1)$0",
            "info()\tvoid": "info($1)$0",
            "warn()\tvoid": "warn($1)$0"
        }
    },

    "event": {
        "type": "Standard Class",
        "methods": {
            "fire(Object params)\tvoid": "fire(${1:Object params})$0",
            "getEventType()\tString": "getEventType()$0",
            "getName()\tString": "getName()$0",
            "getParam(String name)\tObject": "getParam(${1:String name})$0",
            "getParams()\tObject": "getParams()$0",
            "getPhase()\tvoid": "getPhase()$0",
            "getSource()\tObject": "getSource()$0",
            "getType()\tString": "getType()$0",
            "pause()\tvoid": "pause()$0",
            "preventDefault()\tvoid": "preventDefault()$0",
            "setParam(String key, Object value)\tvoid": "setParam(${1:String key}, ${2:Object value})$0",
            "setParams(Object config)\tvoid": "setParams(${1:Object config})$0",
            "stopPropagation()\tvoid": "stopPropagation()$0"
        }
    },

    "Locale": {
        "type": "Standard Class",
        "prefix": "$",
        "properties": [
            "country",
            "currency",
            "currencyCode",
            "decimal",
            "firstDayOfWeek",
            "grouping",
            "isEasternNameStyle",
            "labelForToday",
            "language",
            "langLocale",
            "nameOfMonths",
            "nameOfWeekdays",
            "timezone",
            "userLocaleCountry",
            "userLocaleLang",
            "variant"
        ]
    },

    "Label": {
        "metaObject": "CustomLabel",
        "type": "Standard Class",
        "prefix": "$"
    },

    "Resource": {
        "metaObject": "StaticResource",
        "type": "Standard Class",
        "prefix": "$"
    },

    "v": {
        "type": "Component View"
    }
};

// interface count: 32
let component_interfaces = [
    "aura:rootComponent",
    "clients:availableForMailAppAppPage",
    "clients:hasEventContext",
    "clients:hasItemContext",
    "flexipage:availableForAllPageTypes",
    "flexipage:availableForRecordHome",
    "forceCommunity:availableForAllPageTypes",
    "forceCommunity:layout",
    "forceCommunity:profileMenuInterface",
    "forceCommunity:searchInterface",
    "forceCommunity:themeLayout",
    "force:appHostable",
    "force:hasRecordId",
    "force:hasSObjectName",
    "force:lightningQuickActionWithoutHeader",
    "force:lightningQuickAction",
    "lightning:actionOverride",
    "lightning:appHomeTemplate",
    "lightning:availableForChatterExtensionComposer",
    "lightning:availableForChatterExtensionRenderer",
    "lightning:availableForFlowActions",
    "lightning:availableForFlowScreens",
    "lightning:backgroundUtilityItem",
    "lightning:hasPageReference",
    "lightning:homeTemplate",
    "lightning:isUrlAddressable",   
    "lightning:recordHomeTemplate",
    "lightning:utilityItem",
    "lightning:prechatUI",
    "lightningcommunity:allowInRelaxedCSP",
    "lightningsnapin:minimizedUI",
    "lightningsnapin:prechatUI",
    "ltng:allowGuestAccess"
];

let timezones = [
    "Pacific/Kiritimati",
    "Pacific/Enderbury",
    "Pacific/Tongatapu",
    "Pacific/Chatham",
    "Asia/Kamchatka",
    "Pacific/Auckland",
    "Pacific/Fiji",
    "Pacific/Guadalcanal",
    "Pacific/Norfolk",
    "Australia/Lord_Howe",
    "Australia/Brisbane",
    "Australia/Sydney",
    "Australia/Adelaide",
    "Australia/Darwin",
    "Asia/Seoul",
    "Asia/Tokyo",
    "Asia/Hong_Kong",
    "Asia/Kuala_Lumpur",
    "Asia/Manila",
    "Asia/Shanghai",
    "Asia/Singapore",
    "Asia/Taipei",
    "Australia/Perth",
    "Asia/Bangkok",
    "Asia/Ho_Chi_Minh",
    "Asia/Jakarta",
    "Asia/Rangoon",
    "Asia/Dhaka",
    "Asia/Kathmandu",
    "Asia/Colombo",
    "Asia/Kolkata",
    "Asia/Karachi",
    "Asia/Tashkent",
    "Asia/Yekaterinburg",
    "Asia/Kabul",
    "Asia/Tehran",
    "Asia/Baku",
    "Asia/Dubai",
    "Asia/Tbilisi",
    "Asia/Yerevan",
    "Africa/Nairobi",
    "Asia/Baghdad",
    "Asia/Beirut",
    "Asia/Jerusalem",
    "Asia/Kuwait",
    "Asia/Riyadh",
    "Europe/Athens",
    "Europe/Bucharest",
    "Europe/Helsinki",
    "Europe/Istanbul",
    "Europe/Minsk",
    "Europe/Moscow",
    "Africa/Cairo",
    "Africa/Johannesburg",
    "Europe/Amsterdam",
    "Europe/Berlin",
    "Europe/Brussels",
    "Europe/Paris",
    "Europe/Prague",
    "Europe/Rome",
    "Africa/Algiers",
    "Europe/Dublin",
    "Europe/Lisbon",
    "Europe/London",
    "Africa/Casablanca",
    "America/Scoresbysund",
    "Atlantic/Azores",
    "GMT",
    "Atlantic/Cape_Verde",
    "Atlantic/South_Georgia",
    "America/St_Johns",
    "America/Argentina/Buenos_Aires",
    "America/Halifax",
    "America/Sao_Paulo",
    "Atlantic/Bermuda",
    "America/Caracas",
    "America/Indiana/Indianapolis",
    "America/New_York",
    "America/Puerto_Rico",
    "America/Santiago",
    "America/Bogota",
    "America/Chicago",
    "America/Lima",
    "America/Mexico_City",
    "America/Panama",
    "America/Denver",
    "America/El_Salvador",
    "America/Mazatlan",
    "America/Los_Angeles",
    "America/Phoenix",
    "America/Tijuana",
    "America/Anchorage",
    "Pacific/Pitcairn",
    "America/Adak",
    "Pacific/Gambier",
    "Pacific/Marquesas",
    "Pacific/Honolulu",
    "Pacific/Niue",
    "Pacific/Pago_Pago"
];

export let html_global_methods = [
    "onabort", "onautocomplete", "onautocompleteerror", "onauxclick", "onblur",
    "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick",
    "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag",
    "ondragend", "ondragenter", "ondragexit", "ondragleave", "ondragover",
    "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended",
    "onerror", "onfocus", "oninput", "oninvalid", "onkeydown",
    "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata",
    "onloadstart", "onmousedown", "onmouseenter", "onmouseleave",
    "onmousemove", "onmouseout", "onmouseover", "onmouseup",
    "onmousewheel", "onpause", "onplay", "onplaying", "onprogress",
    "onratechange", "onreset", "onresize", "onscroll", "onseeked",
    "onseeking", "onselect", "onshow", "onsort", "onstalled", "onsubmit",
    "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting"
];

// Parse all classes from salesforce-ux modules
export let cssNames = getCssNames();

// ["analytics", "aura", "force", "forceChatter", "forceCommunity", "lightning", "ltng", "ui", "wave"]
// aura + lwc component from Salesforce Lightning Component Library count: 158 + 72 = 232
// last commit count: 249
// merged (current) count: 251, with deferent cmps at the last section
let iconNames = getIconNames();
export let tag_defs: { [key: string]: any } = {
    "aura:component": {
        "attribs": {
            "body": {
                "type": "String",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "access": "global",
                "required": false
            },
            "access": {
                "type": "Picklist",
                "values": [
                    "public",
                    "global"
                ]
            },
            "controller": {
                "type": "String"
            },
            "description": {
                "type": "String"
            },
            "extends": {
                "type": "Picklist",
                "values": [
                    "aura:template"
                ]
            },
            "implements": {
                "type": "Picklist",
                "values": component_interfaces
            },
            "isTemplate": {
                "type": "Boolean"
            },
            "template": {
                "type": "Component"
            },
            "extensible": {
                "type": "Boolean",
                "description": "Set to true if the component can be extended. The default is false."
            }
        },
        "simple": false,
        "type": "aura",
        "description": "The root of the component hierarchy. Provides a default rendering implementation.",
        "access": "global"
    },
    "aura:expression": {
        "attribs": {
            "value": {
                "description": "The expression to evaluate and render.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Renders the value to which an expression evaluates. Creates an instance of this component which renders the                         referenced \"property reference value\" set to the value attribute when expressions are found in free text or markup.",
        "access": "global"
    },
    "aura:html": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "tag": {
                "description": "The name of the html element that should be rendered.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "HTMLAttributes": {
                "description": "A Map of attributes to set on the html element.",
                "type": "HashMap",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A meta component that represents all html elements.  Any html found in your markup causes the creation of one of these.",
        "access": "global"
    },
    "aura:if": {
        "attribs": {
            "isTrue": {
                "type": "Boolean",
                "description": "An expression that must be fulfilled in order to display the body.",
                "access": "global",
                "required": true
            },
            "body": {
                "type": "componentdefref[]",
                "description": "The components to render when isTrue evaluates to true.",
                "access": "global",
                "required": true
            },
            "else": {
                "type": "ComponentDefRef[]",
                "description": "The alternative to render when isTrue evaluates to false, and the body is not rendered.  Should always be set using the aura:set tag.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Conditionally instantiates and renders either the body or the components in the else attribute.",
        "access": "global"
    },
    "aura:iteration": {
        "attribs": {
            "items": {
                "type": "List",
                "description": "The collection of data to iterate over",
                "access": "global",
                "required": true
            },
            "var": {
                "type": "String",
                "description": "The name of the variable to use for each item inside the iteration",
                "access": "global",
                "required": true
            },
            "indexVar": {
                "type": "String",
                "description": "The name of variable to use for the index of each item inside the iteration",
                "access": "global",
                "required": false
            },
            "start": {
                "type": "integer",
                "description": "The index of the collection to start at (inclusive)",
                "access": "global",
                "required": false
            },
            "end": {
                "type": "integer",
                "description": "The index of the collection to stop at (exclusive)",
                "access": "global",
                "required": false
            },
            "loaded": {
                "type": "boolean",
                "description": "True if the iteration has finished loading the set of templates.",
                "access": "global",
                "required": false
            },
            "body": {
                "type": "ComponentDefRef[]",
                "description": "Template to use when creating components for each iteration.",
                "access": "global",
                "required": true
            },
            "template": {
                "type": "componentdefref[]",
                "description": "The template that is used to generate components. By default, this is set from the body markup on first load.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Renders a view of a collection of items. Supports iterations containing components that can be created exclusively on the client-side.",
        "access": "global"
    },
    "aura:renderIf": {
        "attribs": {
            "body": {
                "type": "component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "access": "global",
                "required": false
            },
            "isTrue": {
                "type": "Boolean",
                "description": "An expression that must evaluate to true to display the body of the component.",
                "access": "global",
                "required": true
            },
            "else": {
                "type": "ComponentDefRef[]",
                "description": "The alternative content to render when isTrue evaluates to false, and the body is not rendered. Set using the <aura:set> tag.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Deprecated. Use aura:if instead. This component allows you to conditionally render its contents. It renders its body only if isTrue evaluates to true. The else attribute allows you to render an alternative when isTrue evaluates to false.",
        "access": "global"
    },
    "aura:template": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "The title of the template.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "auraPreInitBlock": {
                "type": "component[]",
                "description": "The block of content that is rendered before Aura initialization.",
                "access": "global",
                "required": false
            },
            "doctype": {
                "description": "The DOCTYPE declaration for the template",
                "type": "String",
                "access": "global",
                "required": false
            },
            "loadingText": {
                "description": "Loading text",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errorTitle": {
                "description": "Error title when an error has occured.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errorMessage": {
                "description": "Error loading text",
                "type": "String",
                "access": "global",
                "required": false
            },
            "defaultBodyClass": {
                "description": "Default body CSS styles.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "bodyClass": {
                "description": "Extra body CSS styles",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Default template used to bootstrap Aura framework. To use another template, extend aura:template and set attributes using aura:set.",
        "access": "global"
    },
    "aura:text": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "value": {
                "type": "String",
                "description": "The String to be rendered.",
                "required": false,
                "access": "global"
            }
        },
        "description": "Renders plain text.  When any free text (not a tag or attribute value) is found in markup, an instance of this component is created with the value attribute set to the text found in the markup.",
        "access": "global"
    },
    "aura:unescapedHtml": {
        "attribs": {
            "body": {
                "description": "The body of <aura:unescapedHtml> is ignored and won't be rendered.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The string that should be rendered as unescaped HTML.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "The value assigned to this component will be rendered as-is, without altering its contents. It's intended for outputting pre-formatted HTML, for example, where the formatting is arbitrary, or expensive to calculate. The body of this component is ignored, and won't be rendered. Warning: this component outputs value as unescaped HTML, which introduces the possibility of security vulnerabilities in your code. You must sanitize user input before rendering it unescaped, or you will create a cross-site scripting (XSS) vulnerability. Only use <aura:unescapedHtml> with trusted or sanitized sources of data.",
        "access": "global"
    },
    "force:canvasApp": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "developerName": {
                "description": "Developer name of the canvas app. This name is defined when the canvas app is created and can be viewed in the Canvas App Previewer. Either developerName or applicationName is required.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "applicationName": {
                "description": "Name of the canvas app. Either applicationName or developerName is required.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "namespacePrefix": {
                "description": "Namespace value of the Developer Edition organization in which the canvas app was created. Optional if the canvas app wasn\u00a1\u00aft created in a Developer Edition organization. If not specified, defaults to null.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "parameters": {
                "description": "Object representation of parameters passed to the canvas app. This should be supplied in JSON format or as a JavaScript object literal. Here\u00a1\u00afs an example of parameters in a JavaScript object literal: {param1:'value1',param2:'value2'}. If not specified, defaults to null.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "border": {
                "description": "Width of the canvas app border, in pixels. If not specified, defaults to 0 px.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "width": {
                "description": "Canvas app window width, in pixels. If not specified, defaults to 800 px.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "height": {
                "description": "Canvas app window height, in pixels. If not specified, defaults to 900 px.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxWidth": {
                "description": "The maximum width of the Canvas app window in pixels. Defaults to 1000 px; 'infinite' is also a valid value.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxHeight": {
                "description": "The maximum height of the Canvas app window in pixels. Defaults to 2000 px; 'infinite' is also a valid value.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "scrolling": {
                "description": "Canvas window scrolling",
                "type": "String",
                "access": "global",
                "required": false
            },
            "canvasId": {
                "description": "An unique label within a page for the Canvas app window. This should be used when targeting events to this canvas app.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "containerId": {
                "description": "An html element id in which canvas app is rendered. The container needs to be defined before canvasApp cmp usage.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onCanvasAppLoad": {
                "description": "Name of the JavaScript function to be called after the canvas app loads.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onCanvasSubscribed": {
                "description": "Name of the JavaScript function to be called after the canvas app registers with the parent.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onCanvasAppError": {
                "description": "Name of the JavaScript function to be called if the canvas app fails to render.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "displayLocation": {
                "description": "The location in the application where the canvas app is currently being called from.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "sublocation": {
                "description": "The sublocation is the location in the application where the canvas app is currently being called from, for ex, displayLocation can be PageLayout and sublocation can be S1MobileCardPreview or S1MobileCardFullview, etc",
                "type": "String",
                "access": "global",
                "required": false
            },
            "referenceId": {
                "description": "The reference id of the canvas app, if set this is used instead of developerName, applicationName and namespacePrefix",
                "type": "String",
                "access": "global",
                "required": false
            },
            "watermark": {
                "description": "Renders a link if set to true",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Title for the link",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Enables you to include a Force.com Canvas app in a Lightning component.",
        "access": "global"
    },
    "force:inputField": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "The CSS style used to display the field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Data value of Salesforce field to which to bind.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether this field is required or not.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "errorComponent": {
                "description": "A component which is responsible for displaying the error message.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A component that provides a concrete type-specific input component implementation based on the data to which it is bound.",
        "access": "global"
    },
    "force:outputField": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Data value of Salesforce field to which to bind.",
                "type": "Object",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A component that provides a concrete type-specific output component implementation based on the data to which it is bound.",
        "access": "global"
    },
    "force:recordData": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "The record Id",
                "type": "String",
                "access": "global",
                "required": false
            },
            "targetFields": {
                "description": "A simplified view of the fields in targetRecord, to reference record fields in component markup.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "targetRecord": {
                "description": "The provided record. This attribute will contain only the fields relevant to the requested layoutType and/or fields atributes.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "targetError": {
                "description": "Will be set to the localized error message if the record can't be provided.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "layoutType": {
                "description": "Name of the layout to query, which determines the fields included. Valid values are FULL or COMPACT. The layoutType and/or fields attribute must be specified.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "fields": {
                "description": "Specifies which of the record's fields to query.",
                "type": "String[]",
                "access": "global",
                "required": false
            },
            "mode": {
                "description": "The mode in which to load the record: VIEW (default) or EDIT.",
                "type": "Picklist",
                "values": [
                    "VIEW",
                    "EDIT"
                ],
                "access": "global",
                "required": false
            },
            "recordUpdated": {
                "description": "Event fired when the record has changed.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Provides the ability to create, read, update, and delete Salesforce records in Lightning.",
        "access": "global"
    },
    "force:recordEdit": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "The Id of the record to load, optional if record attribute is specified.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "recordSave": {
                "description": "Record save request",
                "type": "COMPONENT"
            },
            "recordSaveSuccess": {
                "description": "Indicates that the record has been successfully saved.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Generates an editable view of the specified Salesforce record.",
        "access": "global"
    },
    "force:recordView": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "record": {
                "description": "The record (SObject) to load, optional if recordId attribute is specified.",
                "type": "SObjectRow",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "The Id of the record to load, optional if record attribute is specified.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The type of layout to use to display the record. Possible values: FULL, MINI. The default is FULL.",
                "type": "Picklist",
                "values": [
                    "FULL",
                    "MINI"
                ],
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Generates a view of the specified Salesforce record.",
        "access": "global"
    },
    "forceChatter:feed": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "feedDesign": {
                "type": "string",
                "description": "Valid values include DEFAULT ( shows inline comments on desktop, a bit more detail ) or BROWSE ( primarily an overview of the feed items )",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The strategy used to find items associated with the subject. Valid values include: News, Home, Record, To.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "subjectId": {
                "description": "For most feeds tied to an entity, this is used specified the desired entity. Defaults to the current user if not specified",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a Chatter Feed",
        "access": "global"
    },
    "forceChatter:fullFeed": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The strategy used to find items associated with the subject. Valid values include: News, Home, Record, To.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "subjectId": {
                "description": "For most feeds tied to an entity, this is used specified the desired entity. Defaults to the current user if not specified",
                "type": "String",
                "access": "global",
                "required": false
            },
            "handleNavigationEvents": {
                "description": "Should this component handle navigation events for entities and urls. If true then navigation events will result in the entity or url being opened in a new window.",
                "type": "Boolean",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": null,
        "access": "global"
    },
    "forceChatter:publisher": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "The record Id",
                "type": "String",
                "access": "global",
                "required": false
            },
            "context": {
                "description": "The context in which the component is being displayed (RECORD or GLOBAL). RECORD is for a record feed, and GLOBAL is for all other feed types. This attribute is case-sensitive.",
                "type": "String",
                "access": "global",
                "required": true
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Lets users create posts on records or groups and upload attachments from their desktops in Lightning Experience and communities and from their mobile devices in communities. Note that this component is not available to mobile devices in Lightning Experience.",
        "access": "global"
    },
    "forceCommunity:appLauncher": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays the App Launcher in Lightning communities to make it easy for members to move between their communities and their Salesforce org.      Add this component to any custom Lightning component in communities.",
        "access": "global"
    },
    "forceCommunity:navigationMenuBase": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "menuItems": {
                "description": "Automatically populated with data of menu item. This attribute is read-only.",
                "type": "Object",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An abstract component for customizing the navigation menu in a community, which loads menu data and handles navigation. The menu\u2019s look and feel is controlled by the component that's extending it.",
        "access": "global"
    },
    "forceCommunity:notifications": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Notifications lets your members receive notifications wherever they are working, whether in their communities or in their apps. Members receive notifications on any screen\u2014mobile, tablet, and desktop. All events that trigger notifications (@mentions and group posts) are supported. When a member clicks a notification, the originating detail page or other appropriate location is displayed for seamless collaboration across communities and apps.",
        "access": "global"
    },
    "forceCommunity:routeLink": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "id": {
                "description": "The ID of the anchor tag.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the anchor tag.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "The text to display for the link tooltip.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed in the link.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "routeInput": {
                "description": "The map of dynamic parameters that create the link. Only recordId-based routes are supported.",
                "type": "HashMap",
                "access": "global",
                "required": true
            },
            "onClick": {
                "description": "Action to trigger when the anchor is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Sets an HTML anchor tag with an href attribute that\u2019s automatically generated from the provided record ID. Use it to improve SEO link equity in template-based communities.",
        "access": "global"
    },
    "forceCommunity:waveDashboard": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "Id of the current entity in the context of which the component is being displayed.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "dashboardId": {
                "description": "The unique ID of the dashboard",
                "type": "String",
                "access": "global",
                "required": false
            },
            "developerName": {
                "description": "The unique developer name of the dashboard",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hideOnError": {
                "description": "Controls whether or not users see a dashboard that has an error",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "height": {
                "description": "Specifies the height of the dashboard, in pixels.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "showSharing": {
                "description": "If true, and the dashboard is shareable, then the dashboard shows the Share icon",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "showTitle": {
                "description": "If true, tile of the dashboard is included above the dashboard. If false, the dashboard appears without a title.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "showHeader": {
                "description": "If true, the dashboard is displayed with a header bar that includes dashboard information and controls",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "rendered": {
                "type": "boolean",
                "description": "Specifies whether or not the component is rendered on the page.",
                "access": "global",
                "required": false
            },
            "filter": {
                "description": "Adds selections or filters to the embedded dashboard at runtime",
                "type": "String",
                "access": "global",
                "required": false
            },
            "openLinksInNewWindow": {
                "description": "If false, links to other dashboards will be opened in the same window.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "accessToken": {
                "description": "A valid access token obtained by logging into Salesforce. Useful when the component is used by Lightning Out in a non-Salesforce domain.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Use this component to add a Salesforce Analytics dashboard to a Community page.",
        "access": "global"
    },
    "lightning:accordion": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "activeSectionName": {
                "description": "The activeSectionName changes the default expanded section. The first section in the accordion is expanded by default.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "allowMultipleSectionsOpen": {
                "type": "boolean",
                "description": "If true, all sections will be closed by default and the accordion will allow multiple sections open at a time.",
                "access": "global",
                "required": false
            },
            "onsectiontoggle": {
                "type": "action",
                "description": "Action fired when the open sections change, it contains all open sections.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A collection of vertically stacked sections with multiple content areas. This component requires version 41.0 and later.",
        "access": "global"
    },
    "lightning:accordionSection": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The unique section name to use with the activeSectionName attribute in the lightning:accordion component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text that displays as the title of the section.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "actions": {
                "description": "Enables a custom menu implementation. Actions are displayed to the right of the section title.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A single section that is nested in a lightning:accordion component. This component requires version 41.0 and later.",
        "access": "global"
    },
    "lightning:avatar": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "variant": {
                "type": "string",
                "description": "The variant changes the shape of the avatar. Valid values are empty, circle, and square. This value defaults to square.",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The size of the avatar. Valid values are x-small, small, medium, and large. This value defaults to medium.",
                "type": "Picklist",
                "values": [
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false
            },
            "src": {
                "description": "The URL for the image. Required",
                "type": "String",
                "access": "global",
                "required": true
            },
            "alternativeText": {
                "description": "The alternative text used to describe the avatar, which is displayed as hover text on the image. Required",
                "type": "String",
                "access": "global",
                "required": true
            },
            "fallbackIconName": {
                "type": "string",
                "description": "The Lightning Design System name of the icon used as a fallback when the image fails to load. The initials fallback relies on this for its background color. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed. Only icons from the standard and custom categories are allowed.",
                "access": "global",
                "required": false
            },
            "initials": {
                "type": "string",
                "description": "If the record name contains two words, like first and last name, use the first capitalized letter of each. For records that only have a single word name, use the first two letters of that word using one capital and one lower case letter.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A visual representation of an object.",
        "access": "global"
    },
    "lightning:badge": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text to be displayed inside the badge.",
                "type": "String",
                "access": "global",
                "required": true
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a label which holds a small amount of information, such as the number of unread notifications.",
        "access": "global"
    },
    "lightning:breadcrumb": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text label for the breadcrumb.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "href": {
                "description": "The URL of the page that the breadcrumb goes to.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onclick": {
                "description": "The action triggered when the breadcrumb is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name for the breadcrumb component. This value is optional and can be used to identify the breadcrumb in a callback.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An item in the hierarchy path of the page the user is on.",
        "access": "global"
    },
    "lightning:breadcrumbs": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "href": {
                "description": "The URL of the page that the breadcrumb goes to.",
                "type": "String"
            },
            "label": {
                "description": "The text label for the breadcrumb. Required.",
                "type": "String"
            },
            "name": {
                "description": "The name for the breadcrumb component. This value is optional and can be used to identify the breadcrumb in a callback.",
                "type": "String"
            },
            "onclick": {
                "description": "The action triggered when the breadcrumb is clicked.",
                "type": "Action"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A hierarchy path of the page you're currently visiting within the website or app.",
        "access": "global"
    },
    "lightning:button": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name for the button element. This value is optional and can be used to identify the button in a callback.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value for the button element. This value is optional and can be used when submitting a form.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text to be displayed inside the button.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of the button. Accepted variants include base, neutral, brand, destructive, and inverse. This value defaults to neutral.",
                "type": "Picklist",
                "values": [
                    "base",
                    "neutral",
                    "brand",
                    "destructive",
                    "inverse",
                    "success"
                ],
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon. ",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "iconPosition": {
                "description": "Describes the position of the icon with respect to body. Options include left and right. This value defaults to left.",
                "type": "Picklist",
                "values": [
                    "left",
                    "right"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether this button should be displayed in a disabled state. Disabled buttons can't be clicked. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "onclick": {
                "description": "The action triggered when the button is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "Specifies the type of button. Valid values are button, reset, and submit. This value defaults to button.",
                "type": "Picklist",
                "values": [
                    "button",
                    "rest",
                    "submit"
                ],
                "access": "global",
                "required": false
            },
            "ariaLabel": {
                "type": "string",
                "description": "Label describing the button to assistive technologies.",
                "access": "global",
                "required": false
            },
            "ariaDescribedBy": {
                "type": "string",
                "description": "A space-separated list of element IDs that provides descriptive labels for the button.",
                "access": "global",
                "required": false
            },
            "ariaControls": {
                "type": "string",
                "description": "A space-separated list of element IDs that this button controls the contents or presence of.",
                "access": "global",
                "required": false
            },
            "ariaExpanded": {
                "type": "string",
                "description": "Indicates whether an element the button controls is expanded or collapsed. Valid values are 'true' or 'false'.",
                "access": "global",
                "required": false
            },
            "ariaLive": {
                "type": "string",
                "description": "Indicates that the button will be updated. Valid values are 'assertive', 'polite', or 'off'.",
                "access": "global",
                "required": false
            },
            "ariaAtomic": {
                "type": "string",
                "description": "Indicates whether assistive technologies will present all, or only parts of, the changed region. Valid values are 'true' or 'false'.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a button element.",
        "access": "global"
    },
    "lightning:buttonGroup": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a group of buttons.",
        "access": "global"
    },
    "lightning:buttonIcon": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name for the button element. This value is optional and can be used to identify the button in a callback.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value for the button element. This value is optional and can be used when submitting a form.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon. Names are written in the format '\\utility:down\\' where 'utility' is the category, and 'down' is the specific icon to be displayed. Required.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": true
            },
            "iconClass": {
                "description": "The class to be applied to the contained icon element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of the button. Accepted variants include base, neutral, brand, destructive, and inverse. This value defaults to neutral.",
                "type": "Picklist",
                "values": [
                    "base",
                    "container",
                    "brand",
                    "border",
                    "border-filled",
                    "bare-inverse",
                    "border-inverse"
                ],
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The size of the buttonIcon. For the bare variant, options include x-small, small, medium, and large. For non-bare variants, options include xx-small, x-small, small, and medium. This value defaults to medium.",
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether this button should be displayed in a disabled state. Disabled buttons can't be clicked. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "alternativeText": {
                "description": "The alternative text used to describe the icon. This text should describe what happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'. Required.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "onclick": {
                "description": "The action triggered when the button is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "Specifies the type of button. Valid values are button, reset, and submit. This value defaults to button.",
                "type": "Picklist",
                "values": [
                    "button",
                    "reset",
                    "submit"
                ],
                "access": "global",
                "required": false
            },
            "tooltip": {
                "type": "string",
                "description": "Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.",
                "access": "global",
                "required": false
            },
            "ariaLabel": {
                "type": "string",
                "description": "Label describing the button to assistive technologies.",
                "access": "global",
                "required": false
            },
            "ariaDescribedBy": {
                "type": "string",
                "description": "A space-separated list of element IDs that provides descriptive labels for the button.",
                "access": "global",
                "required": false
            },
            "ariaControls": {
                "type": "string",
                "description": "A space-separated list of element IDs that this button controls the contents or presence of.",
                "access": "global",
                "required": false
            },
            "ariaExpanded": {
                "type": "string",
                "description": "Indicates whether an element the button controls is expanded or collapsed. Valid values are 'true' or 'false'.",
                "access": "global",
                "required": false
            },
            "ariaLive": {
                "type": "string",
                "description": "Indicates that the button will be updated. Valid values are 'assertive', 'polite', or 'off'.",
                "access": "global",
                "required": false
            },
            "ariaAtomic": {
                "type": "string",
                "description": "Indicates whether assistive technologies will present all, or only parts of, the changed region. Valid values are 'true' or 'false'.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An icon-only HTML button.",
        "access": "global"
    },
    "lightning:buttonIconStateful": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name for the button element. This value is optional and can be used to identify the button in a callback.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value for the button element. This value is optional and can be used when submitting a form.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": true
            },
            "variant": {
                "description": "The variant changes the appearance of buttonIcon. Accepted variants border, and border-inverse. This value defaults to border.",
                "type": "Picklist",
                "values": [
                    "border",
                    "border-filled",
                    "border-inverse"
                ],
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The size of the buttonIcon. Options include xx-small, x-small, small, and medium. This value defaults to medium.",
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether this button should be displayed in a disabled state. Disabled buttons can't be clicked. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "alternativeText": {
                "description": "The alternative text used to describe the icon. This text should describe what happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "onclick": {
                "description": "The action that will be run when the button is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "selected": {
                "description": "Specifies whether button is in selected state or not",
                "type": "Boolean",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An icon-only button that retains state. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:buttonMenu": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "ComponentDefRef[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Tooltip text on the button.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "type": "string",
                "description": "Optional text to be shown on the button.",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of the button. Accepted variants include base, neutral, brand, destructive, and inverse. This value defaults to neutral.",
                "type": "Picklist",
                "values": [
                    "base",
                    "container",
                    "border",
                    "border-filled",
                    "bare-inverse",
                    "border-inverse"
                ],
                "access": "global",
                "required": false
            },
            "onselect": {
                "description": "Action fired when a menu item is selected. The 'detail.menuItem' property of the passed event is the selected menu item.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "menuAlignment": {
                "description": "Determines the alignment of the menu relative to the button. Available options are: left, center, right. This value defaults to left.",
                "type": "Picklist",
                "values": [
                    "auto",
                    "left",
                    "center",
                    "right",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right"
                ],
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon. Names are written in the format '\\utility:down\\' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "iconSize": {
                "description": "The size of the icon. Options include xx-small, x-small, medium, or large. This value defaults to medium.",
                "type": "String",
                "values": [
                    "xx-small",
                    "x-small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether this button should be displayed in a disabled state. Disabled buttons can't be clicked. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "visible": {
                "type": "boolean",
                "description": "If true, the menu items are displayed. This value defaults to false.",
                "access": "global",
                "required": false
            },
            "alternativeText": {
                "description": "The alternative text used to describe the icon. This text should describe what happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'. Required.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name for the button element. This value is optional and can be used to identify the button in a callback.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value for the button element. This value is optional and can be used when submitting a form.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "isLoading": {
                "type": "boolean",
                "description": "If true, the menu is in a loading state and shows a spinner. This value defaults to false.",
                "access": "global",
                "required": false
            },
            "loadingStateAlternativeText": {
                "type": "string",
                "description": "Message displayed while the menu is in the loading state.",
                "access": "global",
                "required": false
            },
            "isDraft": {
                "type": "boolean",
                "description": "If true, the menu trigger shows a draft indicator. This value defaults to false.",
                "access": "global",
                "required": false
            },
            "draftAlternativeText": {
                "type": "string",
                "description": "Describes the reason for showing the draft indicator. This is required when the isDraft attribute is true.",
                "access": "global",
                "required": false
            },
            "tooltip": {
                "type": "string",
                "description": "Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.",
                "access": "global",
                "required": false
            },
            "onopen": {
                "type": "action",
                "description": "Action fired when the menu is opened.",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "If true, the menu items are displayed. This value defaults to false.",
                "type": "Boolean"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a dropdown menu with a list of actions or functions.",
        "access": "global"
    },
    "lightning:buttonStateful": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "state": {
                "description": "The state of the button, which shows whether the button has been selected or not. The default state is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "labelWhenOff": {
                "description": "The text to be displayed inside the button when state is false.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "labelWhenOn": {
                "description": "The text to be displayed inside the button when state is true.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "labelWhenHover": {
                "description": "The text to be displayed inside the button when state is true and the button receives focus.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "iconNameWhenOff": {
                "description": "The name of the icon to be used in the format \\'utility:add\\' when the state is false.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "iconNameWhenOn": {
                "description": "The name of the icon to be used in the format \\'utility:check\\' when the state is true.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "iconNameWhenHover": {
                "description": "The name of the icon to be used in the format \\'utility:close\\' when the state is true and the button receives focus.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of the button. Accepted variants include brand, inverse, neutral and text. This value defaults to neutral.",
                "type": "Picklist",
                "values": [
                    "neutral",
                    "brand",
                    "destructive",
                    "inverse",
                    "success",
                    "text"
                ],
                "access": "global",
                "required": false
            },
            "onclick": {
                "description": "The action triggered when the button is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A button that toggles between states.",
        "access": "global"
    },
    "lightning:card": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "The title can include text or another component, and is displayed in the header.",
                "type": "Component[]",
                "access": "global",
                "required": true
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon. Names are written in the format '\\utility:down\\' where 'utility' is the category, and 'down' is the specific icon to be displayed. The icon is displayed in the header to the left of the title.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "actions": {
                "description": "Actions are components such as button or buttonIcon. Actions are displayed in the header.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of the card. Accepted variants include base or narrow. This value defaults to base.",
                "type": "Picklist",
                "values": [
                    "base",
                    "narrow"
                ],
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "footer": {
                "description": "The footer can include text or another component",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Cards are used to apply a container around a related grouping of information.",
        "access": "global"
    },
    "lightning:carousel": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "scrollDuration": {
                "description": "The auto scroll duration. The default is 5 seconds, after that the next image is displayed.",
                "type": "Integer",
                "default": 5,
                "access": "global",
                "required": false
            },
            "disableAutoScroll": {
                "description": "Specifies whether auto scroll is disabled. The default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "disableAutoRefresh": {
                "description": "Specifies whether the carousel should stop looping from the beginning after the last item is displayed. The default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A collection of images that are displayed one at a time.",
        "access": "global"
    },
    "lightning:checkboxGroup": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "type": "string",
                "description": "Specifies a shortcut key to activate or focus an element.",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "type": "integer",
                "description": "Specifies the tab order of an element when the Tab key is used for navigating. The tabindex value can be set to 0 or -1. The default is 0, which means that the component is focusable and participates in sequential keyboard navigation. -1 means that the component is focusable but does not participate in keyboard navigation.",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the checkbox group receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the checkbox group releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name of the checkbox group.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "label": {
                "description": "Text label for the checkbox group.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "options": {
                "description": "Array of label-value pairs for each checkbox.",
                "type": "List",
                "access": "global",
                "required": true
            },
            "value": {
                "description": "The list of selected checkboxes. Each array entry contains the value of a selected checkbox. The value of each checkbox is set in the options attribute.",
                "type": "String[]",
                "access": "global",
                "required": true
            },
            "variant": {
                "type": "string",
                "description": "The variant changes the appearance of the checkbox group. Accepted variants include standard, label-hidden, label-inline, and label-stacked. This value defaults to standard. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and checkbox group. Use label-stacked to place the label above the checkbox group.",
                "access": "global",
                "required": false
            },
            "messageWhenValueMissing": {
                "description": "Optional message displayed when no checkbox is selected and the required attribute is set to true.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Set to true if at least one checkbox must be selected. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Set to true if the checkbox group is disabled. Checkbox selections can't be changed for a disabled checkbox group. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "onchange": {
                "description": "The action triggered when a checkbox value changes.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A checkbox group that enables selection of single or multiple options. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:clickToDial": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The phone number.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "recordId": {
                "description": "The Salesforce record Id that's associated with the phone number.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "params": {
                "description": "Comma-separated list of parameters to pass to the third-party phone system.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Renders a formatted phone number as click-to-dial enabled or disabled for Open CTI and Voice. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:combobox": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "Specifies the name of an input element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Specifies the value of an input element.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of an input field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies that an input element should be disabled. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "readonly": {
                "description": "Specifies that an input field is read-only. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies that an input field must be filled out before submitting the form. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "validity": {
                "description": "Represents the validity states that an element can be in, with respect to constraint validation.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "onchange": {
                "description": "The action triggered when a value attribute changes.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "options": {
                "description": "A list of options that are available for selection. Each option has the following attributes: class, selected, label, and value.",
                "type": "Object[]",
                "access": "global",
                "required": true
            },
            "label": {
                "description": "Text label for the combobox.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "placeholder": {
                "description": "Text that is displayed before an option is selected, to prompt the user to select an option. The default is &quot;Select an Option&quot;.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "dropdownAlignment": {
                "description": "Determines the alignment of the drop-down relative to the input. Available values are left, center, right, bottom-left, bottom-center, bottom-right. The default is left.",
                "type": "Picklist",
                "values": [
                    "auto",
                    "left",
                    "center",
                    "right",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right"
                ],
                "access": "global",
                "required": false
            },
            "messageWhenValueMissing": {
                "description": "Error message to be displayed when the value is missing and input is required.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "fieldLevelHelp": {
                "type": "string",
                "description": "Help text detailing the purpose and function of the combobox.",
                "access": "global",
                "required": false
            },
            "spinnerActive": {
                "type": "boolean",
                "description": "Displays a spinner to indicate activity in the dropdown list. This value defaults to false.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A widget that provides an input field that is readonly, accompanied with a dropdown list of selectable options.",
        "access": "global"
    },
    "lightning:container": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "The CSS class for the iframe element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "src": {
                "description": "The resource name, landing page and query params in url format. Navigation is supported only for the single page identified.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "alternativeText": {
                "description": "Used for alternative text in accessibility scenarios.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onmessage": {
                "description": "The client-side controller action to run when a message is received from the contained content.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onerror": {
                "description": "The client-side controller action to run when an error occurs when sending a message to the contained app.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Used to contain content that uses a third-party javascript framework such as Angular or React.",
        "access": "global"
    },
    "lightning:conversationToolkitAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "methods": {},
        "simple": false,
        "type": "aura",
        "description": "Console integration APIs for Live Agent.",
        "access": "global"
    },
    "lightning:datatable": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "columns": {
                "description": "Array of the columns object that's used to define the data types. Required properties include 'label', 'fieldName', and 'type'. The default type is 'text'.",
                "type": "List",
                "access": "global",
                "required": false
            },
            "data": {
                "description": "The array of data to be displayed.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "keyField": {
                "description": "Required for better performance. Associates each row with a unique ID.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "hideCheckboxColumn": {
                "description": "Hides or displays the checkbox column for row selection. To hide the checkbox column, set hideCheckboxColumn to true. The default is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "hideTableHeader": {
                "type": "boolean",
                "description": "Specifies whether the table header should be hidden.",
                "access": "global",
                "required": false
            },
            "resizeColumnDisabled": {
                "description": "Specifies whether column resizing is disabled. The default is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "suppressBottomBar": {
                "type": "boolean",
                "description": "Specifies whether the inline edit Save/Cancel bottom bar should be hidden.",
                "access": "global",
                "required": false
            },
            "minColumnWidth": {
                "description": "The minimum width for all columns. The default is 50px.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "maxColumnWidth": {
                "description": "The maximum width for all columns. The default is 1000px.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "resizeStep": {
                "description": "The width to resize the column when user press left or right arrow. The default is 10px.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "sortedBy": {
                "description": "The column fieldName that controls the sorting order. Sort the data using the onsort event handler.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "sortedDirection": {
                "description": "Specifies the sorting direction. Sort the data using the onsort event handler. Valid options include 'asc' and 'desc'.",
                "type": "Picklist",
                "values": [
                    "asc",
                    "desc"
                ],
                "access": "global",
                "required": false
            },
            "defaultSortDirection": {
                "description": "Specifies the default sorting direction on an unsorted column. Valid options include 'asc' and 'desc'. The default is 'asc' for sorting in ascending order.",
                "type": "Picklist",
                "values": [
                    "asc",
                    "desc"
                ],
                "access": "global",
                "required": false
            },
            "showRowNumberColumn": {
                "type": "boolean",
                "description": "Shows or hides the row number column. Set to true to show the row number column. The default is false.",
                "access": "global",
                "required": false
            },
            "rowNumberOffset": {
                "type": "integer",
                "description": "Determines where to start counting the row number. The default is 0.",
                "access": "global",
                "required": false
            },
            "enableInfiniteLoading": {
                "type": "boolean",
                "description": "Enables or disables infinite loading. The default is false.",
                "access": "global",
                "required": false
            },
            "loadMoreOffset": {
                "type": "integer",
                "description": "Determines when to trigger infinite loading based on how many pixels the table's scroll position is from the bottom of the table. The default is 20.",
                "access": "global",
                "required": false
            },
            "isLoading": {
                "type": "boolean",
                "description": "Specifies whether more data is being loaded and displays a spinner if so. The default is false.",
                "access": "global",
                "required": false
            },
            "maxRowSelection": {
                "type": "integer",
                "description": "The maximum number of rows that can be selected. Checkboxes are used for selection by default, and radio buttons are used when maxRowSelection is 1.",
                "access": "global",
                "required": false
            },
            "selectedRows": {
                "type": "list",
                "description": "Enables programmatic row selection with a list of keyField values.",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object",
                "description": "Specifies an object containing information about cell level, row level, and table level errors. When it's set, error messages are displayed on the table accordingly.",
                "access": "global",
                "required": false
            },
            "draftValues": {
                "type": "object",
                "description": "The current values per row that are provided during inline edit.",
                "access": "global",
                "required": false
            },
            "oncellchange": {
                "type": "action",
                "description": "The action triggered when a cell's value changes after an inline edit. Returns the draftValues object.",
                "access": "global",
                "required": false
            },
            "onloadmore": {
                "type": "action",
                "description": "The action triggered when infinite loading loads more data.",
                "access": "global",
                "required": false
            },
            "onrowselection": {
                "description": "The action triggered when a row is selected.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onsort": {
                "description": "The action triggered when a column is sorted.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onheaderaction": {
                "type": "action",
                "description": "The action triggered when a header action is clicked. By default, it also closes the header actions menu. Returns the action and columnDefinition objects.",
                "access": "global",
                "required": false
            },
            "onrowaction": {
                "type": "action",
                "description": "The action triggered when a row action is clicked. By default, it also closes the row actions menu. Returns the eventDetails object.",
                "access": "global",
                "required": false
            },
            "onresize": {
                "type": "action",
                "description": "The action triggered when the table renders columns the first time and every time its resized an specific column. Returns columnWidths.",
                "access": "global",
                "required": false
            },
            "onsave": {
                "type": "action",
                "description": "The action triggered when clicking on the table footer bar's save button during inline edit. Returns the draftValues object.",
                "access": "global",
                "required": false
            },
            "oncancel": {
                "type": "action",
                "description": "The action triggered when clicking on the table footer bar's cancel button during inline edit. All edited cells are reverted to their original values.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A table that displays columns of data, formatted according to type. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:dualListbox": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "Specifies the name of an input element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Specifies the value of an input element.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of an input field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies that an input element should be disabled. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "readonly": {
                "description": "Specifies that an input field is read-only. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies that an input field must be filled out before submitting the form. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "validity": {
                "description": "Represents the validity states that an element can be in, with respect to constraint validation.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "onchange": {
                "description": "The action triggered when a value attribute changes.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "Label for the dual list box.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "sourceLabel": {
                "description": "Label for source options list box.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "selectedLabel": {
                "description": "Label for selected options list box.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "options": {
                "description": "A list of options that are available for selection. Each option has the following attributes: label and value.",
                "type": "Object[]",
                "access": "global",
                "required": true
            },
            "downButtonLabel": {
                "type": "string",
                "description": "Label for down button.",
                "access": "global",
                "required": false
            },
            "removeButtonLabel": {
                "type": "string",
                "description": "Label for remove button.",
                "access": "global",
                "required": false
            },
            "addButtonLabel": {
                "type": "string",
                "description": "Label for add button.",
                "access": "global",
                "required": false
            },
            "upButtonLabel": {
                "type": "string",
                "description": "Label for up button.",
                "access": "global",
                "required": false
            },
            "requiredOptions": {
                "description": "A list of required options that cannot be removed from selected options list box. This list is populated with values from options attribute.",
                "type": "List",
                "access": "global",
                "required": false
            },
            "values": {
                "description": "A list of default options that are included in the selected options list box. This list is populated with values from the options attribute.",
                "type": "List",
                "access": "global",
                "required": false
            },
            "fieldLevelHelp": {
                "type": "string",
                "description": "Help text detailing the purpose and function of the dual listbox.",
                "access": "global",
                "required": false
            },
            "min": {
                "description": "Minimum number of options required in the selected options list box.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "max": {
                "description": "Maximum number of options required in the selected options list box.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "disableReordering": {
                "type": "boolean",
                "description": "Set to true to hide the Up and Down buttons used for reordering the Selected list items.",
                "access": "global",
                "required": false
            },
            "size": {
                "type": "integer",
                "description": "Number of items that display before vertical scrollbars are displayed for the listboxes. Determines the vertical size of the dual listbox.",
                "access": "global",
                "required": false
            },
            "showActivityIndicator": {
                "type": "boolean",
                "description": "Displays a spinner to indicate activity in the listbox. This value defaults to false.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A widget that provides an input listbox, accompanied with a listbox of selectable options. Order of selected options is saved. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:dynamicIcon": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The Lightning Design System name of the dynamicIcon. Valid values are: ellie, eq, score, strength, trend, and waffle.",
                "type": "Picklist",
                "values": [
                    "ellie",
                    "eq",
                    "score",
                    "strength",
                    "trend",
                    "waffle"
                ],
                "access": "global",
                "required": true
            },
            "option": {
                "description": "The option attribute changes the appearance of the dynamicIcon",
                "type": "String",
                "access": "global",
                "required": false
            },
            "alternativeText": {
                "description": "The alternative text used to describe the dynamicIcon. This text should describe what&#x2019;s happening. For example, 'Graph is refreshing', not what the icon looks like, 'Graph'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onclick": {
                "description": "The action triggered when the icon is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents various animated icons with different states. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:empApi": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "methods": {},
        "simple": false,
        "type": "aura",
        "description": "Exposes the EmpJs Streaming API library which subscribes to a streaming channel and listens to event messages using a shared CometD connection. This component is supported only in desktop browsers. This component requires API version 44.0 or later.",
        "access": "global"
    },
    "lightning:fileCard": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "fileId": {
                "description": "The Salesforce File ID (ContentDocument).",
                "type": "String",
                "access": "global",
                "required": true
            },
            "description": {
                "type": "string",
                "description": "The description of the file, by default it is set to the filename",
                "access": "global",
                "required": false
            },
            "hideDescription": {
                "type": "boolean",
                "description": "Hides the file description in the caption if enabled",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a preview of an uploaded file available in Salesforce CRM Content or Salesforce Files.",
        "access": "global"
    },
    "lightning:fileUpload": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text label for the file uploader.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "name": {
                "type": "string",
                "description": "Specifies the name of the input element.",
                "access": "global",
                "required": true
            },
            "recordId": {
                "description": "The record Id of the record that the uploaded file is associated to.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "multiple": {
                "description": "Specifies whether a user can upload more than one file simultanesouly. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether this component should be displayed in a disabled state. Disabled components can't be clicked. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "accept": {
                "description": "Comma-separated list of file extensions that can be uploaded in the format .ext, such as .pdf, .jpg, or .png",
                "type": "List",
                "access": "global",
                "required": false
            },
            "onuploadfinished": {
                "description": "The action triggered when files have finished uploading.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A file uploader for uploading and attaching files to records.",
        "access": "global"
    },
    "lightning:flexipageRegionInfo": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "width": {
                "description": "The width of the region that the component resides in.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Provides Lightning page region information to the component that contains it.",
        "access": "global"
    },
    "lightning:flow": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onstatuschange": {
                "description": "The current status of the flow interview.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a flow interview in Lightning runtime. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:formattedAddress": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "required": false,
                "access": "global"
            },
            "title": {
                "type": "String",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "required": false,
                "access": "global"
            },
            "street": {
                "type": "String",
                "description": "The street detail for the address.",
                "required": false,
                "access": "global"
            },
            "city": {
                "type": "String",
                "description": "The city detail for the address.",
                "required": false,
                "access": "global"
            },
            "province": {
                "type": "String",
                "description": "The province detail for the address.",
                "required": false,
                "access": "global"
            },
            "country": {
                "type": "String",
                "description": "The country detail for the address.",
                "required": false,
                "access": "global"
            },
            "postalCode": {
                "type": "String",
                "description": "The postal code detail for the address.",
                "required": false,
                "access": "global"
            },
            "latitude": {
                "type": "Decimal",
                "description": "The latitude of the location if known. Latitude values must be within -90 and 90.",
                "required": false,
                "access": "global"
            },
            "longitude": {
                "type": "Decimal",
                "description": "The longitude of the location if known. Longitude values must be within -180 and 180.",
                "required": false,
                "access": "global"
            },
            "disabled": {
                "type": "Boolean",
                "description": "Specifies whether the address is clickable. This value defaults to False.",
                "required": false,
                "access": "global"
            },
            "showStaticMap": {
                "type": "boolean",
                "description": "Displays a static map of the location using Google Maps. This value defaults to false.",
                "access": "global",
                "required": false
            }
        },
        "description": "Displays a formatted address that provides a link to the given location on Google Maps. This component requires API version 42.0 and later.",
        "access": "global"
    },
    "lightning:formattedDateTime": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value to be formatted, which can be a Date object or timestamp.",
                "type": "Object",
                "access": "global",
                "required": true
            },
            "hour12": {
                "description": "Determines whether time is displayed as 12-hour. If false, time displays as 24-hour. The default setting is determined by the user's locale.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "weekday": {
                "description": "Allowed values are narrow, short, or long.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "era": {
                "description": "Allowed values are narrow, short, or long.",
                "type": "Picklist",
                "values": [
                    "narrow",
                    "short",
                    "long"
                ],
                "access": "global",
                "required": false
            },
            "year": {
                "description": "Allowed values are numeric or 2-digit.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "month": {
                "description": "Allowed values are 2-digit, narrow, short, or long.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "day": {
                "description": "Allowed values are numeric or 2-digit.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hour": {
                "description": "Allowed values are numeric or 2-digit.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "minute": {
                "description": "Allowed values are numeric or 2-digit.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "second": {
                "description": "Allowed values are numeric or 2-digit.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "timeZoneName": {
                "description": "Allowed values are short or long. For example, the Pacific Time zone would display as 'PST' if you select 'short', or 'Pacific Standard Time' if you select 'long.'",
                "type": "String",
                "access": "global",
                "required": false
            },
            "timeZone": {
                "description": "The time zone to use. Implementations can include any time zone listed in the IANA time zone database. The default is the runtime's default time zone. Use this attribute only if you want to override the default time zone.",
                "type": "Picklist",
                "values": timezones,
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays formatted date and time.",
        "access": "global"
    },
    "lightning:formattedEmail": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The email address that's displayed if a label is not provided.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "label": {
                "description": "The text label for the email.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hideIcon": {
                "type": "boolean",
                "description": "If true, hides the email icon so only the email address is displayed.",
                "access": "global",
                "required": false
            },
            "onclick": {
                "description": "The action triggered when the email is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String"
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays an email as a hyperlink with the mailto: URL scheme. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:formattedLocation": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "latitude": {
                "description": "The latitude value of the geolocation. Latitude values must be within -90 and 90.",
                "type": "Decimal",
                "access": "global",
                "required": true
            },
            "longitude": {
                "description": "The longitude value of the geolocation. Longitude values must be within -180 and 180.",
                "type": "Decimal",
                "access": "global",
                "required": true
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a geolocation in decimal degrees (DD) using the format [latitude, longitude]. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:formattedName": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "required": false,
                "access": "global"
            },
            "title": {
                "type": "String",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "required": false,
                "access": "global"
            },
            "firstName": {
                "type": "String",
                "description": "The value for the first name.",
                "required": false,
                "access": "global"
            },
            "salutation": {
                "type": "String",
                "description": "The value for the salutation, such as Dr. or Mrs.",
                "required": false,
                "access": "global"
            },
            "lastName": {
                "type": "String",
                "description": "The value for the last name.",
                "required": false,
                "access": "global"
            },
            "middleName": {
                "type": "String",
                "description": "The value for the middle name.",
                "required": false,
                "access": "global"
            },
            "suffix": {
                "type": "String",
                "description": "The value for the suffix.",
                "required": false,
                "access": "global"
            },
            "informalName": {
                "type": "String",
                "description": "The value for the informal name.",
                "required": false,
                "access": "global"
            },
            "format": {
                "type": "String",
                "description": "The format for which to display the name. Valid values include short, medium, and long. This value defaults to long.",
                "required": false,
                "access": "global"
            }
        },
        "description": "Displays a formatted name that can include a salutation and suffix. This component requires API version 42.0 and later.",
        "access": "global"
    },
    "lightning:formattedNumber": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value to be formatted.",
                "type": "Decimal",
                "access": "global",
                "required": true
            },
            "style": {
                "description": "The number formatting style to use. Possible values are decimal, currency, and percent. This value defaults to decimal.",
                "type": "Picklist",
                "values": [
                    "decimal",
                    "currency",
                    "percent"
                ],
                "access": "global",
                "required": false
            },
            "currencyCode": {
                "description": "Only used if style='currency', this attribute determines which currency is displayed. Possible values are the ISO 4217 currency codes, such as 'USD' for the US dollar.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "currencyDisplayAs": {
                "description": "Determines how currency is displayed. Possible values are symbol, code, and name. This value defaults to symbol.",
                "type": "Picklist",
                "values": [
                    "symbol",
                    "code",
                    "name"
                ],
                "access": "global",
                "required": false
            },
            "minimumIntegerDigits": {
                "description": "The minimum number of integer digits that are required. Possible values are from 1 to 21.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "minimumFractionDigits": {
                "description": "The minimum number of fraction digits that are required.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "maximumFractionDigits": {
                "description": "The maximum number of fraction digits that are allowed.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "minimumSignificantDigits": {
                "description": "The minimum number of significant digits that are required. Possible values are from 1 to 21.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "maximumSignificantDigits": {
                "description": "The maximum number of significant digits that are allowed. Possible values are from 1 to 21.",
                "type": "Integer",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays formatted numbers for decimals, currency, and percentages.",
        "access": "global"
    },
    "lightning:formattedPhone": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Sets the phone number to display.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onclick": {
                "description": "The action triggered when the phone number is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a phone number as a hyperlink with the tel: URL scheme. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:formattedRichText": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Sets the rich text to display.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disableLinkify": {
                "type": "boolean",
                "description": "Prevents the component from creating links in the rich text.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays rich text that's formatted with whitelisted tags and attributes. Other tags and attributes are removed and only their text content is displayed. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:formattedText": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Text to output.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "linkify": {
                "description": "Specifies whether the text should be converted to a link. If set to true, URLs and email addresses are displayed in anchor tags.",
                "type": "Boolean",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays text, replaces newlines with line breaks, and linkifies if requested. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:formattedTime": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "required": false,
                "access": "global"
            },
            "title": {
                "type": "String",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "required": false,
                "access": "global"
            },
            "value": {
                "type": "String",
                "description": "The time value to format.",
                "required": false,
                "access": "global"
            }
        },
        "description": "Displays a formatted time in user's locale format. This component requires API version 42.0 and later.",
        "access": "global"
    },
    "lightning:formattedUrl": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The URL to be formatted.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "target": {
                "description": "Specifies where to open the link. Options include _blank, _parent, _self, and _top.",
                "type": "Picklist",
                "values": [
                    "_blank",
                    "_parent",
                    "_self",
                    "_top"
                ],
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text to display in the link.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tooltip": {
                "description": "The text to display when the mouse hovers over the link.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onclick": {
                "description": "The action triggered when the URL is clicked.",
                "type": "Action"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a URL as a hyperlink. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:helptext": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "content": {
                "description": "Text to be shown in the popover.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon used as the visible element",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "iconVariant": {
                "type": "string",
                "description": "The iconVariant changes the appearance of the icon. Accepted variants include inverse, warning, error.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An icon with a text popover.",
        "access": "global"
    },
    "lightning:icon": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon. Names are written in the format '\\utility:down\\' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": true
            },
            "size": {
                "description": "The size of the icon. Options include xx-small, x-small, small, medium, or large. This value defaults to medium.",
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of a utility icon. Accepted variants include inverse, warning and error. Use the inverse variant to implement a white fill in utility icons on dark backgrounds.",
                "type": "Picklist",
                "values": [
                    "error",
                    "warning",
                    "inverse"
                ],
                "access": "global",
                "required": false
            },
            "alternativeText": {
                "description": "The alternative text used to describe the icon. This text should describe what happens when you click the button, for example 'Upload File', not what the icon looks like, 'Paperclip'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "src": {
                "type": "string",
                "description": "A uri path to a custom svg sprite, including the name of the resouce, for example: /assets/icons/standard-sprite/svg/test.svg#icon-heart",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a visual element that provides context and enhances usability.",
        "access": "global"
    },
    "lightning:input": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "Specifies the name of an input element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Specifies the value of an input element.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of an input field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies that an input element should be disabled. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "readonly": {
                "description": "Specifies that an input field is read-only. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies that an input field must be filled out before submitting the form. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "validity": {
                "description": "Represents the validity states that an element can be in, with respect to constraint validation.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "onchange": {
                "description": "The action triggered when a value attribute changes.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The type of the input. This value defaults to text.",
                "type": "Picklis",
                "values": [
                    "Checkbox",
                    "Checkbox-button",
                    "Color",
                    "Date",
                    "Datetime",
                    "Email",
                    "File",
                    "Month",
                    "Number",
                    "Password",
                    "Radio",
                    "Range",
                    "Search",
                    "Tel",
                    "Text",
                    "Time",
                    "Toggle",
                    "URL",
                    "Week"
                ],
                "access": "global",
                "required": false
            },
            "label": {
                "description": "Text label for the input.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "formatter": {
                "description": "String value with the formatter to be used.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "files": {
                "description": "A FileList that contains selected files. This attribute can be used only when type='file'.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "isLoading": {
                "description": "Specifies whether the spinner is displayed to indicate that data is loading. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters allowed in the field.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "minlength": {
                "description": "The minimum number of characters allowed in the field.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "pattern": {
                "description": "Specifies the regular expression that the input's value is checked against. This attributed is supported for text, date, search, url, tel, email, and password types.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "autocomplete": {
                "type": "string",
                "description": "Controls auto-filling of the field. This attribute is supported for email, search, tel, text, and url. Set the attribute to pass through autocomplete values to be interpreted by the browser.",
                "access": "global",
                "required": false
            },
            "max": {
                "description": "Expected higher bound for the value in Floating-Point number",
                "type": "Decimal",
                "access": "global",
                "required": false
            },
            "min": {
                "description": "Expected lower bound for the value in Floating-Point number",
                "type": "Decimal",
                "access": "global",
                "required": false
            },
            "step": {
                "description": "Granularity of the value in Positive Floating Point. Use 'any' when granularity is not a concern.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "checked": {
                "description": "Specifies whether the checkbox is checked. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "timezone": {
                "type": "string",
                "description": "Specifies the time zone used when type='datetime' only. This value defaults to the user\u2019s Salesforce time zone setting.",
                "access": "global",
                "required": false
            },
            "dateStyle": {
                "type": "string",
                "description": "The display style of the date when type='date' or type='datetime'. Valid values are short, medium (default), and long. The format of each style is specific to the locale. On mobile devices this attribute has no effect.",
                "access": "global",
                "required": false
            },
            "timeStyle": {
                "type": "string",
                "description": "The display style of the time when type='time' or type='datetime'. Valid values are short (default), medium, and long. Currently, medium and long styles look the same. On mobile devices this attribute has no effect.",
                "access": "global",
                "required": false
            },
            "accept": {
                "description": "Specifies the types of files that the server accepts. This attribute can be used only when type='file'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "multiple": {
                "description": "Specifies that a user can enter more than one value. This attribute can be used only when type='file' or type='email'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "messageWhenBadInput": {
                "description": "Error message to be displayed when a bad input is detected.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenPatternMismatch": {
                "description": "Error message to be displayed when a pattern mismatch is detected.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenTypeMismatch": {
                "description": "Error message to be displayed when a type mismatch is detected.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenValueMissing": {
                "description": "Error message to be displayed when the value is missing.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenRangeOverflow": {
                "description": "Error message to be displayed when a range overflow is detected.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenRangeUnderflow": {
                "description": "Error message to be displayed when a range underflow is detected.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenStepMismatch": {
                "description": "Error message to be displayed when a step mismatch is detected.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenTooLong": {
                "description": "Error message to be displayed when the value is too long.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenTooShort": {
                "type": "string",
                "description": "Error message to be displayed when the value is too short.",
                "access": "global",
                "required": false
            },
            "messageToggleActive": {
                "description": "Text shown for the active state of a toggle. The default is \"Active\".",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageToggleInactive": {
                "description": "Text shown for then inactive state of a toggle. The default is \"Inactive\".",
                "type": "String",
                "access": "global",
                "required": false
            },
            "ariaLabel": {
                "type": "string",
                "description": "Describes the input to assistive technologies.",
                "access": "global",
                "required": false
            },
            "ariaLabelledBy": {
                "type": "string",
                "description": "A space-separated list of element IDs that provide labels for the input.",
                "access": "global",
                "required": false
            },
            "ariaDescribedBy": {
                "type": "string",
                "description": "A space-separated list of element IDs that provide descriptive labels for the input.",
                "access": "global",
                "required": false
            },
            "ariaControls": {
                "type": "string",
                "description": "A space-separated list of element IDs whose presence or content is controlled by the input.",
                "access": "global",
                "required": false
            },
            "timeAriaLabel": {
                "type": "string",
                "description": "Describes the time input to assistive technologies when type=datetime. On mobile devices, this label is merged with ariaLabel and dateAriaLabel to describe the native date time input.",
                "access": "global",
                "required": false
            },
            "timeAriaLabelledBy": {
                "type": "string",
                "description": "A space-separated list of element IDs that provide labels for the time input when type=datetime. On mobile devices, this is merged with ariaLabelledBy and dateAriaLabelledBy to describe the native date time input.",
                "access": "global",
                "required": false
            },
            "timeAriaDescribedBy": {
                "type": "string",
                "description": "A space-separated list of element IDs that provide descriptive labels for the time input when type=datetime. On mobile devices, this is merged with ariaDescribedBy and dateAriaDescribedBy to describe the native date time input.",
                "access": "global",
                "required": false
            },
            "timeAriaControls": {
                "type": "string",
                "description": "A space-separated list of element IDs whose presence or content is controlled by the time input when type=datetime. On mobile devices, this is merged with ariaControls and dateAriaControls to describe the native date time input.",
                "access": "global",
                "required": false
            },
            "dateAriaLabel": {
                "type": "string",
                "description": "Describes the date input to assistive technologies when type=datetime. On mobile devices, this label is merged with ariaLabel and timeAriaLabel to describe the native date time input.",
                "access": "global",
                "required": false
            },
            "dateAriaLabelledBy": {
                "type": "string",
                "description": "A space-separated list of element IDs that provide labels for the date input when type=datetime. On mobile devices, this is merged with ariaLabelledBy and timeAriaLabelledBy to describe the native date time input.",
                "access": "global",
                "required": false
            },
            "dateAriaDescribedBy": {
                "type": "string",
                "description": "A space-separated list of element IDs that provide descriptive labels for the date input when type=datetime. On mobile devices, this is merged with ariaDescribedBy and timeAriaDescribedBy to describe the native date time input.",
                "access": "global",
                "required": false
            },
            "dateAriaControls": {
                "type": "string",
                "description": "A space-separated list of element IDs whose presence or content is controlled by the date input when type=datetime. On mobile devices, this is merged with ariaControls and timeAriaControls to describe the native date time input.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents interactive controls that accept user input depending on the type attribute.",
        "access": "global"
    },
    "lightning:inputAddress": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "required": false,
                "access": "global"
            },
            "title": {
                "type": "String",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "required": false,
                "access": "global"
            },
            "addressLabel": {
                "type": "String",
                "description": "The label of the address compound field.",
                "required": false,
                "access": "global"
            },
            "fieldLevelHelp": {
                "type": "string",
                "description": "Help text detailing the purpose and function of the address compound field.",
                "access": "global",
                "required": false
            },
            "streetLabel": {
                "type": "String",
                "description": "The label of the street field of the address.",
                "required": false,
                "access": "global"
            },
            "cityLabel": {
                "type": "String",
                "description": "The label of the city field of the address.",
                "required": false,
                "access": "global"
            },
            "provinceLabel": {
                "type": "String",
                "description": "The label of the province field of the address.",
                "required": false,
                "access": "global"
            },
            "countryLabel": {
                "type": "String",
                "description": "The label of the country field of the address.",
                "required": false,
                "access": "global"
            },
            "postalCodeLabel": {
                "type": "String",
                "description": "The label of the postal code field of the address.",
                "required": false,
                "access": "global"
            },
            "street": {
                "type": "String",
                "description": "The street field of the address.",
                "required": false,
                "access": "global"
            },
            "city": {
                "type": "String",
                "description": "The city field of the address.",
                "required": false,
                "access": "global"
            },
            "province": {
                "type": "String",
                "description": "The province field of the address. If provinceOptions is provided, this province value is selected by default.",
                "required": false,
                "access": "global"
            },
            "provinceOptions": {
                "type": "List",
                "description": "The array of label-value pairs for the province. Displays a dropdown menu of options.",
                "required": false,
                "access": "global"
            },
            "country": {
                "type": "String",
                "description": "The country field of the address. If countryOptions is provided, this country value is selected by default.",
                "required": false,
                "access": "global"
            },
            "countryOptions": {
                "type": "List",
                "description": "The array of label-value pairs for the country. Displays a dropdown menu of options.",
                "required": false,
                "access": "global"
            },
            "postalCode": {
                "type": "String",
                "description": "The postal code field of the address.",
                "required": false,
                "access": "global"
            },
            "disabled": {
                "type": "Boolean",
                "description": "Specifies whether the address fields are disabled. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "required": {
                "type": "Boolean",
                "description": "Specifies whether the address fields are required. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "readonly": {
                "type": "Boolean",
                "description": "Specifies whether the address fields are read-only. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "showAddressLookup": {
                "type": "boolean",
                "description": "Specifies whether to enable address lookup using Google Maps. This value defaults to false.",
                "access": "global",
                "required": false
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "description": "The variant changes the appearance of the compound field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "required": false,
                "access": "global"
            },
            "onblur": {
                "type": "Action",
                "description": "The action triggered when the input releases focus.",
                "required": false,
                "access": "global"
            },
            "onchange": {
                "type": "Action",
                "description": "The action triggered when the value changes.",
                "required": false,
                "access": "global"
            },
            "onfocus": {
                "type": "Action",
                "description": "The action triggered when the input receives focus.",
                "required": false,
                "access": "global"
            }
        },
        "description": "Represents an address compound field. This component requires API version 42.0 and later.",
        "access": "global"
    },
    "lightning:inputField": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the\n                                body of the tag.",
                "required": false,
                "access": "global"
            },
            "fieldName": {
                "type": "String",
                "description": "The API name of the field to be displayed.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's\n                                base classes.",
                "required": false,
                "access": "global"
            },
            "value": {
                "type": "string",
                "description": "The field value, which overrides the existing value.",
                "access": "global",
                "required": false
            },
            "onchange": {
                "type": "action",
                "description": "The action triggered when the input value changes.",
                "access": "global",
                "required": false
            },
            "disabled": {
                "type": "boolean",
                "description": "Whether or not the field is disabled. Defaults to false for readonly fields, true for other fields.",
                "access": "global",
                "required": false
            },
            "variant": {
                "type": "string",
                "description": "The variant changes the label position of an input field. Accepted variants include standard (default), label-hidden, label-inline, and label-stacked. If variant is specified, the label position is determined by the variant. Otherwise, it is determined by the density setting of the parent form.",
                "access": "global",
                "required": false
            }
        },
        "description": "Represents an editable input for a field on a Salesforce object. This component requires API version 42.0 and later.",
        "access": "global"
    },
    "lightning:inputLocation": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "required": false,
                "access": "global"
            },
            "title": {
                "type": "String",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "required": false,
                "access": "global"
            },
            "latitude": {
                "type": "String",
                "description": "The latitude value. Latitude values must be within -90 and 90.",
                "required": false,
                "access": "global"
            },
            "longitude": {
                "type": "String",
                "description": "The longitude value. Longitude values must be within -180 and 180.",
                "required": false,
                "access": "global"
            },
            "required": {
                "type": "Boolean",
                "description": "Specifies whether the compound field must be filled out. An error message is displayed if a user interacts with the field and does not provide a value. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "disabled": {
                "type": "Boolean",
                "description": "Specifies whether the compound field should be disabled. Disabled fields are grayed out and not clickable. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "readonly": {
                "type": "Boolean",
                "description": "Specifies whether the compound field is read-only. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "fieldLevelHelp": {
                "type": "string",
                "description": "Help text detailing the purpose and function of geolocation compound field.",
                "access": "global",
                "required": false
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "description": "The variant changes the appearance of the compound field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "required": false,
                "access": "global"
            },
            "label": {
                "type": "String",
                "description": "Text label for the compound field.",
                "required": false,
                "access": "global"
            },
            "onblur": {
                "type": "Action",
                "description": "The action triggered when the input releases focus.",
                "required": false,
                "access": "global"
            },
            "onchange": {
                "type": "Action",
                "description": "The action triggered when the value changes.",
                "required": false,
                "access": "global"
            },
            "onfocus": {
                "type": "Action",
                "description": "The action triggered when the input receives focus.",
                "required": false,
                "access": "global"
            }
        },
        "description": "Represents a geolocation compound field that accepts a latitude and longitude value. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:inputName": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "required": false,
                "access": "global"
            },
            "title": {
                "type": "String",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "required": false,
                "access": "global"
            },
            "firstName": {
                "type": "String",
                "description": "Displays the First Name field.",
                "required": false,
                "access": "global"
            },
            "salutation": {
                "type": "String",
                "description": "Displays the Salutation field as a dropdown menu. An array of label-value pairs must be provided using the options attribute.",
                "required": false,
                "access": "global"
            },
            "lastName": {
                "type": "String",
                "description": "Displays the Last Name field. This field is always displayed if you set required to true.",
                "required": false,
                "access": "global"
            },
            "middleName": {
                "type": "String",
                "description": "Displays the Middle Name field.",
                "required": false,
                "access": "global"
            },
            "suffix": {
                "type": "String",
                "description": "Displays the Suffix field.",
                "required": false,
                "access": "global"
            },
            "informalName": {
                "type": "String",
                "description": "Displays the Informal Name field.",
                "required": false,
                "access": "global"
            },
            "options": {
                "type": "List",
                "description": "Displays a list of salutation options, such as Dr. or Mrs., provided as label-value pairs.",
                "required": false,
                "access": "global"
            },
            "required": {
                "type": "Boolean",
                "description": "Specifies whether the compound field must be filled out. A red asterisk is displayed on the Last Name field. An error message is displayed if a user interacts with the Last Name field and does not provide a value. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "disabled": {
                "type": "Boolean",
                "description": "Specifies whether the compound field should be disabled. Disabled fields are grayed out and not clickable. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "readonly": {
                "type": "Boolean",
                "description": "Specifies whether the compound field is read-only. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "description": "The variant changes the appearance of the compound field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "required": false,
                "access": "global"
            },
            "label": {
                "type": "String",
                "description": "Text label for the compound field.",
                "required": false,
                "access": "global"
            },
            "fieldsToDisplay": {
                "type": "List",
                "description": "List of fields to be displayed on the component. This value defaults to ['firstName', 'salutation', 'lastName']. Other field values include middleName, informalName, suffix.",
                "required": false,
                "access": "global"
            },
            "fieldLevelHelp": {
                "type": "string",
                "description": "Help text detailing the purpose and function of name compound field.",
                "access": "global",
                "required": false
            },
            "onblur": {
                "type": "Action",
                "description": "The action triggered when the input releases focus.",
                "required": false,
                "access": "global"
            },
            "onchange": {
                "type": "Action",
                "description": "The action triggered when the value changes.",
                "required": false,
                "access": "global"
            },
            "onfocus": {
                "type": "Action",
                "description": "The action triggered when the input receives focus.",
                "required": false,
                "access": "global"
            }
        },
        "description": "Represents a name compound field. This component requires API version 42.0 and later.",
        "access": "global"
    },
    "lightning:inputRichText": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "ariaLabel": {
                "type": "string",
                "description": "Label describing the rich text editor to assistive technologies",
                "access": "global",
                "required": false
            },
            "ariaLabelledby": {
                "type": "string",
                "description": "An element ID that provides a label for the rich text editor.",
                "access": "global",
                "required": false
            },
            "ariaDescribedby": {
                "type": "string",
                "description": "A space-separated list of element IDs that provides descriptive labels for the rich text editor.",
                "access": "global",
                "required": false
            },
            "label": {
                "type": "string",
                "description": "Text label for the rich text editor.",
                "access": "global",
                "required": false
            },
            "labelVisible": {
                "type": "boolean",
                "description": "Specifies whether the label is visible or not. The default is false.",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The HTML content in the rich text editor.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabledCategories": {
                "description": "A comma-separated list of button categories to remove from the toolbar.",
                "type": "List",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the editor is disabled. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "valid": {
                "description": "Specifies whether the editor content is valid. If invalid, the slds-has-error class is added. This value defaults to true.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "formats": {
                "type": "list",
                "description": "A list of formats accepted by the text editor. By default, the list is computed based on enabled categories. The \"table\" format is always enabled to support copying and pasting of tables. If formats are specified, all desired formats must be specified. Omitting a format from the list removes the corresponding button.",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of the toolbar. Accepted variants include bottom-toolbar.",
                "type": "Picklist",
                "values": [
                    "bottom-toolbar"
                ],
                "access": "global",
                "required": false
            },
            "messageWhenBadInput": {
                "description": "Error message that's displayed when valid is false.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "shareWithEntityId": {
                "type": "string",
                "description": "Entity ID to share the image with.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A WYSIWYG editor with a customizable toolbar for entering rich text",
        "access": "global"
    },
    "lightning:insertImageButton": {
        "attribs": {
            "body": {
                "description": "Body of the layout component.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Button to insert an inline image in lightning:inputRichText. This component requires API version 43.0 and later.",
        "access": "global"
    },
    "lightning:layout": {
        "attribs": {
            "body": {
                "description": "Body of the layout component.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class that is applied to the outer element. This style is in addition to base classes output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "horizontalAlign": {
                "description": "Determines how to spread the layout items horizontally. The alignment options are center, space, spread, and end.",
                "type": "Picklist",
                "values": [
                    "center",
                    "space",
                    "spread",
                    "end"
                ],
                "access": "global",
                "required": false
            },
            "verticalAlign": {
                "description": "Determines how to spread the layout items vertically. The alignment options are start, center, end, and stretch.",
                "type": "Picklist",
                "values": [
                    "start",
                    "center",
                    "end",
                    "stretch"
                ],
                "access": "global",
                "required": false
            },
            "multipleRows": {
                "description": "Determines whether to wrap the child items when they exceed the layout width. If true, the items wrap to the following line. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "pullToBoundary": {
                "description": "Pulls layout items to the layout boundaries and corresponds to the padding size on the layout item. Possible values are small, medium, or large.",
                "type": "Picklist",
                "values": [
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a responsive grid system for arranging containers on a page.",
        "access": "global"
    },
    "lightning:layoutItem": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class that will be applied to the outer element. This style is in addition to base classes output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "If the viewport is divided into 12 parts, size indicates the relative space the container occupies. Size is expressed as an integer from 1 through 12. This applies for all device-types.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "smallDeviceSize": {
                "description": "If the viewport is divided into 12 parts, this attribute indicates the relative space the container occupies on device-types larger than mobile. It is expressed as an integer from 1 through 12.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "mediumDeviceSize": {
                "description": "If the viewport is divided into 12 parts, this attribute indicates the relative space the container occupies on device-types larger than tablet. It is expressed as an integer from 1 through 12.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "largeDeviceSize": {
                "description": "If the viewport is divided into 12 parts, this attribute indicates the relative space the container occupies on device-types larger than desktop. It is expressed as an integer from 1 through 12.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "flexibility": {
                "description": "Make the item fluid so that it absorbs any extra space in its container or shrinks when there is less space. Allowed values are auto, shrink, no-shrink, grow, no-grow, no-flex.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "padding": {
                "description": "Sets padding to either the right and left sides of a container, or all sides of a container. Allowed values are horizontal-small, horizontal-medium, horizontal-large, around-small, around-medium, around-large.",
                "type": "Picklist",
                "values": [
                    "horizontal-small",
                    "horizontal-medium",
                    "horizontal-large",
                    "around-small",
                    "around-medium",
                    "around-large"
                ],
                "access": "global",
                "required": false
            },
            "alignmentBump": {
                "type": "string",
                "description": "Specifies a direction to bump the alignment of adjacent layout items. Allowed values are left, top, right, bottom.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "The basic element of lightning:layout.",
        "access": "global"
    },
    "lightning:listView": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "objectApiName": {
                "type": "String",
                "description": "The API name of the object to be displayed in this List View",
                "required": true,
                "access": "global"
            },
            "listName": {
                "type": "String",
                "description": "The developer name of the List View",
                "required": true,
                "access": "global"
            },
            "rows": {
                "type": "Integer",
                "description": "Specifies the number of rows to initially load and additional rows after each subsequent 'Load More' click. The default and maximum number of rows value is 50.",
                "required": false,
                "access": "global"
            },
            "showActionBar": {
                "type": "Boolean",
                "description": "Specifies whether the action bar displays. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "enableInlineEdit": {
                "type": "Boolean",
                "description": "Specifies whether the inline edit of cells is enabled. This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "showRowLevelActions": {
                "type": "Boolean",
                "description": "Specifies whether row level actions are displayed (as a dropdown menu in the last column of the row). This value defaults to false.",
                "required": false,
                "access": "global"
            },
            "showSearchBar": {
                "type": "boolean",
                "description": "Specifies whether the search bar displays. This value defaults to false. Note: The server side may still disable search if it does not support searching.",
                "access": "global",
                "required": false
            }
        },
        "description": "Displays a List View of the specified object. This component requires API 42.0 and later.",
        "access": "global"
    },
    "lightning:map": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "zoomLevel": {
                "description": "Corresponds to zoom levels defined in Google Maps API. If not specified, the map component automatically chooses an appropriate zoom level to show all markers with comfortable margins.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "mapMarkers": {
                "description": "Array containing one or more objects with the address or coordinates to be displayed.",
                "type": "Object",
                "access": "global",
                "required": true
            },
            "markersTitle": {
                "description": "Provides the heading title for the markers. Required if specifying multiple markers. The title is displayed below the map as a header for the list of clickable addresses.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "center": {
                "description": "If provided an icon with the provided name is shown to the right of the menu item.",
                "type": "Object",
                "values": "Centers the map according to an specific 'mapMarker' object. If a map marker is not specified, the map centers automatically.",
                "access": "global",
                "required": false
            },
            "showFooter": {
                "description": "Shows footer with 'Open in Google Maps' link. Default value: 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "listView": {
                "type": "string",
                "description": "Displays or hides the list of locations. Valid values are visible, hidden, or auto. This value defaults to auto, which shows the list only when multiple markers are present. Passing in an invalid value hides the list view.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A lightning:map component securely displays a map of one or more locations. This component requires API version 44.0 and later.",
        "access": "global"
    },
    "lightning:menuItem": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Tooltip text.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "A value associated with the menu item.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "If provided an icon with the provided name is shown to the right of the menu item.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "label": {
                "description": "Text of the menu item.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "checked": {
                "description": "If not specified, the menu item is not checkable. If true, the a check mark is shown to the left of the menu item. If false, a check mark is not shown but there is space to accommodate one.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "If true the menu item is not actionable and is shown as disabled.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "onactive": {
                "description": "DEPRECATED. The action triggered when this menu item becomes active.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "isDraft": {
                "type": "boolean",
                "description": "If true, the menu item shows a draft indicator. This value defaults to false.",
                "access": "global",
                "required": false
            },
            "draftAlternativeText": {
                "type": "string",
                "description": "Describes the reason for showing the draft indicator. This is required when the isDraft attribute is true",
                "access": "global",
                "required": false
            },
            "prefixIconName": {
                "type": "string",
                "description": "The name of an icon to display before the text of the menu item.",
                "access": "global",
                "required": false
            },
            "href": {
                "type": "string",
                "description": "URL for a link to use for the menu item.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a list item in a menu.",
        "access": "global"
    },
    "lightning:navigation": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Generates URL for a given pageReference. This component requires API version 43.0 and later.",
        "access": "global"
    },
    "lightning:navigationItemAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "This component allows you to access methods for programmatically controlling navigation items in Lightning console apps, where navigation items display in an item menu. This component requires API version 43.0 and later.",
        "access": "global"
    },
    "lightning:notificationsLibrary": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays messages via notices and toasts. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:omniToolkitAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "This component provides access to the API for the Omni-channel toolkit.",
        "access": "global"
    },
    "lightning:outputField": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "fieldName": {
                "description": "The API name of the field to be displayed.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "Changes the appearance of the output. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a read-only display of a label, help text, and value for a field on a Salesforce object. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:overlayLibrary": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays messages via modals and popovers. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:path": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "The record's ID",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "Changes the appearance of the path",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hideUpdateButton": {
                "description": "Specified whether the Mark Complete button is displayed next to the path. If true, the button is not displayed. The Mark Complete button is displayed by default.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "onselect": {
                "description": "The action triggered when a step on the path is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a path driven by a picklist field and Path Setup metadata. This component requires API 41.0 and later.",
        "access": "global"
    },
    "lightning:picklistPath": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "The record's ID",
                "type": "String",
                "access": "global",
                "required": false
            },
            "picklistFieldApiName": {
                "description": "The API name of the field from which the path is derived. For example, StageName for Opportunity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "Changes the appearance of the path",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onselect": {
                "description": "The action triggered when a step on the path is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a path based on a specified picklist field. This component requires API 41.0 and later.",
        "access": "global"
    },
    "lightning:pill": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text label that displays in the pill.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "href": {
                "description": "The URL of the page that the link goes to.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onclick": {
                "description": "The action triggered when the button is clicked.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "media": {
                "description": "The icon or figure that's displayed next to the textual information.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "hasError": {
                "description": "Specifies whether the pill has errors. The default is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "onremove": {
                "description": "The action triggered when the pill is removed.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name for the pill. This value is optional and can be used to identify the pill in a callback.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A pill displays a label that can contain links and can be removed from view.",
        "access": "global"
    },
    "lightning:pillContainer": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "required": false,
                "access": "global"
            },
            "title": {
                "type": "String",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "required": false,
                "access": "global"
            },
            "items": {
                "type": "List",
                "description": "An array of items to be rendered as pills in a container.",
                "required": false,
                "access": "global"
            },
            "label": {
                "type": "String",
                "description": "Aria label for the pill container.",
                "required": false,
                "access": "global"
            },
            "singleLine": {
                "type": "Boolean",
                "description": "Whether keep pills in single line.",
                "required": false,
                "access": "global"
            },
            "onitemremove": {
                "type": "Action",
                "description": "The action triggered when a pill is removed.",
                "required": false,
                "access": "global"
            }
        },
        "description": "A list of pills grouped in a container. This component requires API version 42.0 and later. ",
        "access": "global"
    },
    "lightning:progressBar": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant of the progress bar. Valid values are base and circular.",
                "type": "Picklist",
                "values": [
                    "base",
                    "circular"
                ],
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The percentage value of the progress bar.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The size of the progress bar. Valid values are x-small, small, medium, and large. The default value is medium.",
                "type": "Picklist",
                "values": [
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a horizontal progress bar from left to right to indicate the progress of an operation. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:progressIndicator": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "Changes the visual pattern of the indicator. Valid values are base and path. This value defaults to base.",
                "type": "Picklist",
                "values": [
                    "base",
                    "path"
                ],
                "access": "global",
                "required": false
            },
            "currentStep": {
                "description": "The current step, which must match the value attribute of one of progressStep components. If a step is not provided, the value of the first progressStep component is used.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "Changes the appearance of the progress indicator for the base type only",
                "type": "picklist",
                "values": [
                    "base",
                    "shaded"
                ],
                "access": "global",
                "required": false
            },
            "hasError": {
                "description": "Indicates whether the current step is in error state and displays a warning icon on the step indicator. Applies to the base type only. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Provides a visual indication on the progress of a particular process. This component is available in version 41.0 and later.",
        "access": "global"
    },
    "lightning:quickActionAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "This component allows you to access methods for programmatically controlling actions on record pages in Lightning Experience. This component requires API version 43.0 and later.",
        "access": "global"
    },
    "lightning:quipCard": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "parentRecordId": {
                "description": "ID of the Salesforce record to display the card for.",
                "type": "String",
                "access": "global",
                "required": true
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Quip card",
        "access": "global"
    },
    "lightning:radioGroup": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "Specifies the name of an input element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Specifies the value of an input element.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of an input field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies that an input element should be disabled. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "readonly": {
                "description": "Specifies that an input field is read-only. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies that an input field must be filled out before submitting the form. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "validity": {
                "description": "Represents the validity states that an element can be in, with respect to constraint validation.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "onchange": {
                "description": "The action triggered when a value attribute changes.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "Text label for the radio group.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "options": {
                "description": "Array of label-value pairs for each radio button.",
                "type": "List",
                "access": "global",
                "required": true
            },
            "type": {
                "description": "The style of the radio group. Options are radio or button. The default is radio.",
                "type": "Picklist",
                "values": [
                    "radio",
                    "button"
                ],
                "access": "global",
                "required": false
            },
            "messageWhenValueMissing": {
                "description": "Optional message displayed when no radio button is selected and the required attribute is set to true.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A radio button group that can have a single option selected. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:recordEditForm": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "recordId": {
                "type": "String",
                "description": "The ID of the record to be displayed.",
                "required": false,
                "access": "global"
            },
            "objectApiName": {
                "type": "String",
                "description": "The API name of the object.",
                "required": true,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "required": false,
                "access": "global"
            },
            "recordTypeId": {
                "type": "String",
                "description": "The ID of the record type, which is required if you created multiple record types but don't have a default.",
                "required": false,
                "access": "global"
            },
            "density": {
                "type": "string",
                "description": "Sets the arrangement style of fields and labels in the form.  Accepted values are compact, comfy, and auto (default). Use compact to display fields and their labels on the same line. Use comfy to display fields below their labels. Use auto to let the component dynamically set the density according to the user's Display Density setting and the width of the form.",
                "access": "global",
                "required": false
            },
            "onload": {
                "type": "Action",
                "description": "The action triggered when the form data is loaded.",
                "required": false,
                "access": "global"
            },
            "onsubmit": {
                "type": "Action",
                "description": "The action triggered when the form is submitted.",
                "required": false,
                "access": "global"
            },
            "onsuccess": {
                "type": "Action",
                "description": "The action triggered when the form is saved.",
                "required": false,
                "access": "global"
            },
            "onerror": {
                "type": "Action",
                "description": "The action triggered when there is an error on form submission.",
                "required": false,
                "access": "global"
            }
        },
        "description": "Represents a record edit layout that displays one or more fields, provided by lightning:outputField. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:recordForm": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "fields": {
                "description": "List of fields to be displayed.",
                "type": "String[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class that will be applied to the outer element. This style is in addition to base classes associated with the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "The ID of the record to be displayed.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "objectApiName": {
                "description": "The API name of the object.",
                "type": "String",
                "required": true,
                "access": "global"
            },
            "layoutType": {
                "description": "The type of layout to use to display the form fields. Possible values: Compact, Full.",
                "type": "Picklist",
                "values": [
                    "Compact",
                    "Full"
                ],
                "access": "global",
                "required": false
            },
            "columns": {
                "description": "Specifies the number of columns for the form.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "mode": {
                "description": "Specifies the interaction and display style for the form. Possible values: view, edit, readonly",
                "type": "Picklist",
                "values": [
                    "view",
                    "edit",
                    "readonly"
                ],
                "access": "global",
                "required": false
            },
            "recordTypeId": {
                "description": "The ID of the record type, which is required if you created multiple record types but don't have a default.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "density": {
                "type": "string",
                "description": "Sets the arrangement style of fields and labels in the form.  Accepted values are compact, comfy, and auto (default). Use compact to display fields and their labels on the same line. Use comfy to display fields below their labels. Use auto to let the component dynamically set the density according to the user's Display Density setting and the width of the form.",
                "access": "global",
                "required": false
            },
            "onload": {
                "description": "The action triggered when the form data is loaded.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onsubmit": {
                "description": "The action triggered when the form is submitted.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onsuccess": {
                "description": "The action triggered when the form is saved.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onerror": {
                "description": "The action triggered when there is an error on form submission.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Creates an editable form or display form for a record. This component requires API version 43.0 and later.",
        "access": "global"
    },
    "lightning:recordViewForm": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "The ID of the record to be displayed.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "objectApiName": {
                "description": "The API name of the object.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "density": {
                "type": "string",
                "description": "Sets the arrangement style of fields and labels in the form.  Accepted values are compact, comfy, and auto (default). Use compact to display fields and their labels on the same line. Use comfy to display fields below their labels. Use auto to let the component dynamically set the density according to the user's Display Density setting and the width of the form.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a record view that displays one or more fields, provided by lightning:outputField. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:relativeDateTime": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The timestamp or JavaScript Date object to be formatted.",
                "type": "Object",
                "access": "global",
                "required": true
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays the relative time difference between the source date-time and the provided date-time.",
        "access": "global"
    },
    "lightning:select": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "Specifies the name of an input element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value of the select, also used as the default value to select the right option during init. If no value is provided, the first option will be selected.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of an input field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies that an input element should be disabled. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "readonly": {
                "description": "Specifies that an input field is read-only. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies that an input field must be filled out before submitting the form. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "validity": {
                "description": "Represents the validity states that an element can be in, with respect to constraint validation.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "onchange": {
                "description": "The action triggered when a value attribute changes.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class that will be applied to the outer element. This style is in addition to base classes associated with the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "Text that describes the desired select input.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "messageWhenValueMissing": {
                "description": "Error message to be displayed when the value is missing.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a select input.",
        "access": "global"
    },
    "lightning:slider": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The numerical value of the input range. This value defaults to 0.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onchange": {
                "description": "The action triggered when the slider value changes. You must pass any newly selected value back to the slider component to bind the new value to the slider.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "min": {
                "description": "The min value of the input range. This value defaults to 0.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "max": {
                "description": "The max value of the input range. This value defaults to 100.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "step": {
                "description": "The step increment value of the input range. Example steps include 0.1, 1, or 10. This value defaults to 1.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The size value of the input range. This value default to empty, which is the base. Supports x-small, small, medium, and large.",
                "type": "Picklist",
                "values": [
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The type of the input range position. This value defaults to horizontal.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text label for the input range. Provide your own label to describe the slider. Otherwise, no label is displayed.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "The disabled value of the input range. This value default to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of the slider. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false
            },
            "messageWhenBadInput": {
                "description": "Error message to be displayed when a bad input is detected. Use with setCustomValidity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenPatternMismatch": {
                "description": "Error message to be displayed when a pattern mismatch is detected. Use with setCustomValidity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenTypeMismatch": {
                "description": "Error message to be displayed when a type mismatch is detected. Use with setCustomValidity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenValueMissing": {
                "description": "Error message to be displayed when the value is missing. Use with setCustomValidity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenRangeOverflow": {
                "description": "Error message to be displayed when a range overflow is detected. Use with setCustomValidity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenRangeUnderflow": {
                "description": "Error message to be displayed when a range underflow is detected. Use with setCustomValidity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenStepMismatch": {
                "description": "Error message to be displayed when a step mismatch is detected. Use with setCustomValidity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenTooLong": {
                "description": "Error message to be displayed when the value is too long. Use with setCustomValidity.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the slider releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the slider receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An input range slider for specifying a value between two specified numbers. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:spinner": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The size of the spinner. Accepted sizes are small, medium, and large. This value defaults to medium.",
                "type": "Picklist",
                "values": [
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of the spinner. Accepted variants are brand and inverse.",
                "type": "Picklist",
                "values": [
                    "base",
                    "brand",
                    "inverse"
                ],
                "access": "global",
                "required": false
            },
            "alternativeText": {
                "description": "The alternative text used to describe the reason for the wait and need for a spinner.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays an animated spinner.",
        "access": "global"
    },
    "lightning:tab": {
        "attribs": {
            "body": {
                "description": "The body of the tab.",
                "type": "ComponentDefRef[]",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "The title displays when you hover over the tab. The title should describe the content of the tab for screen readers.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "id": {
                "description": "The optional ID is used during tabset's onSelect event to determine which tab was clicked.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text that appears in the tab.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "iconName": {
                "type": "string",
                "description": "The Lightning Design System name of an icon to display to the left of the tab label. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the icon to be displayed. Only utility icons can be used in this component.",
                "access": "global",
                "required": false
            },
            "iconAssistiveText": {
                "type": "string",
                "description": "Assistive text for the icon specified by iconName.",
                "access": "global",
                "required": false
            },
            "showErrorIndicator": {
                "type": "boolean",
                "description": "Specifies whether there's an error in the tab content. An error icon is displayed to the right of the tab label.",
                "access": "global",
                "required": false
            },
            "onactive": {
                "description": "The action triggered when this tab becomes active.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A single tab that is nested in a lightning:tabset component.",
        "access": "global"
    },
    "lightning:tabset": {
        "attribs": {
            "body": {
                "type": "componentdefref[]",
                "description": "The body of the component. This could be one or more lightning:tab components.",
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "variant": {
                "type": "string",
                "description": "The variant changes the appearance of the tabset. Accepted variants are default, scoped, and vertical.",
                "access": "global",
                "required": false
            },
            "selectedTabId": {
                "type": "string",
                "description": "Allows you to set a specific tab to open by default. If this attribute is not used, the first tab opens by default.",
                "access": "global",
                "required": false
            },
            "onselect": {
                "type": "action",
                "description": "The action that will run when the tab is clicked.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a list of tabs.",
        "access": "global"
    },
    "lightning:textarea": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "Specifies the name of an input element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value of the textarea, also used as the default value during init.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "variant": {
                "description": "The variant changes the appearance of an input field. Accepted variants include standard and label-hidden. This value defaults to standard.",
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies that an input element should be disabled. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "readonly": {
                "description": "Specifies that an input field is read-only. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies that an input field must be filled out before submitting the form. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "validity": {
                "description": "Represents the validity states that an element can be in, with respect to constraint validation.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "onchange": {
                "description": "The action triggered when a value attribute changes.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "Specifies a shortcut key to activate or focus an element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "tabindex": {
                "description": "Specifies the tab order of an element (when the tab button is used for navigating).",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "onfocus": {
                "description": "The action triggered when the element receives focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onblur": {
                "description": "The action triggered when the element releases focus.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class that will be applied to the outer element. This style is in addition to base classes associated with the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "Text that describes the desired textarea input.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters allowed in the textarea.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "minlength": {
                "description": "The minimum number of characters allowed in the textarea.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "messageWhenBadInput": {
                "description": "Error message to be displayed when a bad input is detected.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenValueMissing": {
                "description": "Error message to be displayed when the value is missing.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenTooLong": {
                "description": "Error message to be displayed when the value is too long.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "messageWhenTooShort": {
                "type": "string",
                "description": "Error message to be displayed when the value is too short.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a multiline text input.",
        "access": "global"
    },
    "lightning:tile": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class that will be applied to the outer element. This style is in addition to base classes associated with the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text label that displays in the tile and hover text.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "href": {
                "description": "The URL of the page that the link goes to.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "media": {
                "description": "The icon or figure that's displayed next to the textual information.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A grouping of related information associated with a record.",
        "access": "global"
    },
    "lightning:tree": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "items": {
                "description": "An array of key-value pairs that describe the tree. Keys include label, name, disabled, expanded, and items.",
                "type": "Object",
                "access": "global",
                "required": false
            },
            "header": {
                "description": "The text that's displayed as the tree heading.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onselect": {
                "description": "The action triggered when a tree item is selected.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a nested tree. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:treeGrid": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the\n                                body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class for the outer element, in addition to the component's\n                                base classes.",
                "required": false,
                "access": "global"
            },
            "title": {
                "type": "String",
                "description": "Displays tooltip text when the mouse moves over the\n                                element.",
                "required": false,
                "access": "global"
            },
            "columns": {
                "type": "List",
                "description": "Array of the columns object that's used to define the data types.\n                                Required properties include 'label', 'dataKey', and 'type'. The\n                                default type is 'text'.",
                "required": false,
                "access": "global"
            },
            "data": {
                "type": "Object",
                "description": "The array of data to be displayed.",
                "required": false,
                "access": "global"
            },
            "expandedRows": {
                "type": "List",
                "description": "The array of unique row IDs that are expanded.",
                "required": false,
                "access": "global"
            },
            "selectedRows": {
                "type": "List",
                "description": "The array of unique row IDs that are selected.",
                "required": false,
                "access": "global"
            },
            "keyField": {
                "type": "String",
                "description": "Required for better performance. Associates each row with a\n                                unique ID.",
                "required": true,
                "access": "global"
            },
            "hideCheckboxColumn": {
                "type": "Boolean",
                "description": "Hides or displays the checkbox column for row selection. To hide\n                                the checkbox column, set hideCheckboxColumn to true. The default is\n                                false.",
                "required": false,
                "access": "global"
            },
            "isLoading": {
                "type": "Boolean",
                "description": "Specifies whether more data is being loaded and displays a\n                                spinner if so. The default is false.",
                "required": false,
                "access": "global"
            },
            "resizeColumnDisabled": {
                "type": "Boolean",
                "description": "Specifies whether column resizing is disabled. The default is\n                                false.",
                "required": false,
                "access": "global"
            },
            "minColumnWidth": {
                "type": "Integer",
                "description": "The minimum width for all columns. The default is 50px.",
                "required": false,
                "access": "global"
            },
            "maxColumnWidth": {
                "type": "Integer",
                "description": "The maximum width for all columns. The default is 1000px.",
                "required": false,
                "access": "global"
            },
            "onrowselection": {
                "type": "Action",
                "description": "The action triggered when a row is selected.",
                "required": false,
                "access": "global"
            },
            "onrowaction": {
                "type": "Action",
                "description": "The action triggered when an operation its clicked. By default\n                                its to closes the actions menu.",
                "required": false,
                "access": "global"
            },
            "onresize": {
                "type": "Action",
                "description": "The action triggered when the table renders columns the first\n                                time and every time its resized an specific column.",
                "required": false,
                "access": "global"
            },
            "ontoggle": {
                "type": "Action",
                "description": "The action triggered when a row is toggled (expanded or\n                                collapsed).",
                "required": false,
                "access": "global"
            },
            "ontoggleall": {
                "type": "Action",
                "description": "The action triggered when all rows are toggled (expanded or\n                                collapsed).",
                "required": false,
                "access": "global"
            },
            "showRowNumberColumn": {
                "type": "Boolean",
                "description": "Hides or displays the row number column. To show the row number\n                                column, set showRowNumberColumn to true. The default is\n                                false.",
                "required": false,
                "access": "global"
            },
            "rowNumberOffset": {
                "type": "Integer",
                "description": "Determines where to start counting the row number. The default is\n                                0.",
                "required": false,
                "access": "global"
            },
            "": {
                "type": "Object",
                "description": "The toggled row data.",
                "required": false
            },
            "minColumnWidthmaxColumnWidth": {
                "type": "integer",
                "description": "The width of the column when it's initialized, which must be\n                                within the minColumnWidth and\n                                    maxColumnWidth values, or\n                                within 50px and 1000px if they are not provided.",
                "required": false
            },
            "currencyCodecurrency": {
                "type": "object",
                "description": "Provides custom formatting with component attributes for the data\n                                type. For example, currencyCode\n                                for the currency type. For more\n                                information, see Formatting with Data Types.",
                "required": false
            },
            "standard:opportunity": {
                "type": "string",
                "description": "The Lightning Design System name of the icon. Names are written\n                                in the format standard:opportunity. The icon is appended to the left\n                                of the header label.",
                "required": false
            },
            "lightning:formattedNumber": {
                "type": "Displays a percentage using lightning:formattedNumber",
                "description": "Same as number type",
                "required": false
            },
            "lightning:formattedDateTime": {
                "type": "Displays a date and time based on the locale using lightning:formattedDateTime",
                "description": "N/A",
                "required": false
            },
            "lightning:formattedText": {
                "type": "Displays text using lightning:formattedText",
                "description": "N/A",
                "required": false
            },
            "lightning:formattedUrl": {
                "type": "Displays a URL using lightning:formattedUrl",
                "description": "label, target",
                "required": false
            },
            "lightning:buttonMenuright": {
                "type": "Displays a dropdown menu using lightning:buttonMenu with actions as menu\n                                items",
                "description": "rowActions (required), menuAlignment (defaults to right)",
                "required": false
            },
            "lightning:button": {
                "type": "Displays a button using lightning:button",
                "description": "disabled, iconName, iconPosition, label, name, title,\n                                variant",
                "required": false
            },
            "lightning:formattedEmail": {
                "type": "Displays an email address using lightning:formattedEmail",
                "description": "N/A",
                "required": false
            },
            "lightning:formattedLocation": {
                "type": "Displays a latitude and longitude of a location using lightning:formattedLocation",
                "description": "latitude, longitude",
                "required": false
            },
            "lightning:formattedPhone": {
                "type": "Displays a phone number using lightning:formattedPhone",
                "description": "N/A",
                "required": false
            }
        },
        "description": "Displays a hierarchical view of data in a table. This component requires API version 42.0 and later.",
        "access": "global"
    },
    "lightning:unsavedChanges": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "Label for the unsaved content which appears in prompt for save or discard.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "onsave": {
                "description": "Action to handle saving unsaved content.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "ondiscard": {
                "description": "Action to handle discarding unsaved content.",
                "type": "Action",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A component that can be used to notify the UI containment hierarchy of unsaved changes",
        "access": "global"
    },
    "lightning:utilityBarAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "The public API for the Utility Bar.",
        "access": "global"
    },
    "lightning:verticalNavigation": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "compact": {
                "description": "Specify true to reduce spacing between navigation items. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "shaded": {
                "description": "Specify true when the vertical navigation is sitting on top of a shaded background. This value defaults to false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "onbeforeselect": {
                "description": "Action fired before an item is selected",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "onselect": {
                "description": "Action fired when an item is selected. The event params include the `name` of the selected item.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "selectedItem": {
                "description": "Name of the nagivation item to make active.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "ariaLabel": {
                "type": "string",
                "description": "The aria label attribute for the navigation component",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a vertical list of links that either take the user to another page or parts of the page the user is in. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:verticalNavigationItem": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed for the navigation item.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "name": {
                "description": "A unique identifier for the navigation item.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "href": {
                "description": "The URL of the page that the navigation item goes to.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A text-only link within lightning:verticalNavigationSection or lightning:verticalNavigationOverflow. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:verticalNavigationItemBadge": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed for this navigation item.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "name": {
                "description": "A unique identifier for this navigation item.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "href": {
                "description": "The URL of the page that the navigation item goes to.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "badgeCount": {
                "description": "The number to show inside the badge. If this value is zero the badge will be hidden.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "assistiveText": {
                "description": "Assistive text describing the number in the badge. This is used to enhance accessibility and is not displayed to the user.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A link and badge within a lightning:verticalNavigationSection or lightning:verticalNavigationOverflow. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:verticalNavigationItemIcon": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "Displays tooltip text when the mouse moves over the element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed for this navigation item.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "name": {
                "description": "A unique identifier for this navigation item.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "href": {
                "description": "The URL of the page that the navigation item goes to.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon. Names are written in the format '\\utility:down\\' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A link and icon within a lightning:verticalNavigationSection or lightning:verticalNavigationOverflow. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:verticalNavigationOverflow": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents an overflow of items from a preceding lightning:verticalNavigationSection, with the ability to toggle visibility. This component requires API 41.0 and later.",
        "access": "global"
    },
    "lightning:verticalNavigationSection": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "type": "string",
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "access": "global",
                "required": false
            },
            "title": {
                "type": "string",
                "description": "Displays tooltip text when the mouse moves over the element.",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The heading text for this section.",
                "type": "String",
                "access": "global",
                "required": true
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a section within a lightning:verticalNavigation. This component requires API version 41.0 and later.",
        "access": "global"
    },
    "lightning:workspaceAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "This is the Public API for accessing/manipulating workspaces (Tabs and Subtabs)",
        "access": "global"
    },
    "lightningcommunity:backButton": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "iconName": {
                "description": "The Lightning Design System name of the icon. Only utility icons can be used in this component.",
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false
            },
            "onnavigationcomplete": {
                "description": "Event handler action fired after every page navigation is complete. 'navigationcomplete' event provides 'canGoBack' boolean parameter value.",
                "type": "Action",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "Styling class for back button.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Icon button to navigate to previous community page in myCommnunity IOS app.",
        "access": "global"
    },
    "lightningsnapin:minimizedAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Enables you to customize your user interface for the minimized snap-in in Snap-ins for web.",
        "access": "global"
    },
    "lightningsnapin:prechatAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Enables customization of the user interface for the pre-chat page in Snap-ins Chat. Your custom pre-chat component must implement the lightningsnapin:prechatUI interface.",
        "access": "global"
    },
    "lightningsnapin:settingsAPI": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Enables you to fetch certain settings from within your custom components for Snap-ins for web.",
        "access": "global"
    },
    "ltng:require": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "styles": {
                "description": "The set of style sheets in dependency order that will be loaded.",
                "type": "String[]",
                "access": "global",
                "required": false
            },
            "scripts": {
                "description": "The set of scripts in dependency order that will be loaded.",
                "type": "String[]",
                "access": "global",
                "required": false
            },
            "afterScriptsLoaded": {
                "description": "Fired when ltng:require has loaded all scripts listed in ltng:require.scripts",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Loads scripts and stylesheets while maintaining dependency order. The styles are loaded in the order that they are listed. The styles only load once if they are specified in multiple <ltng:require> tags in the same component or across different components.",
        "access": "global"
    },
    "ui:actionMenuItem": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "selected": {
                "description": "The status of the menu item. True means this menu item is selected; False is not selected.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The concrete type of the menu item. Accepted values are 'action', 'checkbox', 'radio', 'separator' or any namespaced,component descriptor, e.g. ns:xxxxmenuItem.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hideMenuAfterSelected": {
                "description": "Set to true to hide menu after the menu item is selected.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A menu item that triggers an action. This component is nested in a ui:menu component.",
        "access": "global"
    },
    "ui:button": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "buttonTitle": {
                "description": "The text displayed in a tooltip when the mouse pointer hovers over the button.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "buttonType": {
                "description": "Specifies the type attribute in the HTML input element. Default value is button.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the button. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the button. Corresponds to the value attribute of the rendered HTML input element.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "A CSS style to be attached to the label. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether this button should be displayed in a disabled state. Disabled buttons can't be clicked. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "accesskey": {
                "description": "The keyboard access key that puts the button in focus. When the button is in focus, pressing Enter clicks the button.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "press": {
                "description": "Indicates that the component has been pressed.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a button element.",
        "access": "global"
    },
    "ui:checkboxMenuItem": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "selected": {
                "description": "The status of the menu item. True means this menu item is selected; False is not selected.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The concrete type of the menu item. Accepted values are 'action', 'checkbox', 'radio', 'separator' or any namespaced component descriptor, e.g. ns:xxxxmenuItem.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hideMenuAfterSelected": {
                "description": "Set to true to hide menu after the menu item is selected.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "\u200bA menu item with a checkbox that supports multiple selection and can be used to invoke an action. This component is nested in a ui:menu component.",
        "access": "global"
    },
    "ui:inputCheckbox": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Indicates whether the status of the option is selected. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is 'change,click'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name of the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "text": {
                "description": "The input value attribute.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a checkbox. Its behavior can be configured using events such as click and change.",
        "access": "global"
    },
    "ui:inputCurrency": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The input value of the number.",
                "type": "BigDecimal",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is change.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The width of the input field, in characters. Corresponds to the size attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "format": {
                "description": "The format of the number. For example, format='.00' displays the number followed by two decimal places. If not specified, the Locale default format will be used.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An input field for entering a currency.",
        "access": "global"
    },
    "ui:inputDate": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The input value of the date/time.",
                "type": "Date",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is 'change'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "format": {
                "description": "The java.text.SimpleDateFormat style format string.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "displayDatePicker": {
                "description": "Indicate if ui:datePicker is displayed.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "langLocale": {
                "description": "The language locale used to format date time.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An input field for entering a date.",
        "access": "global"
    },
    "ui:inputDateTime": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The input value of the date/time.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is 'change'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "format": {
                "description": "The java.text.SimpleDateFormat style format string.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "displayDatePicker": {
                "description": "Indicate if ui:datePicker is displayed.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "langLocale": {
                "description": "The language locale used to format date time.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An input field for entering a date and time.",
        "access": "global"
    },
    "ui:inputDefaultError": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The list of errors strings to be displayed.",
                "type": "ArrayList",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "The default implementation of field-level errors, which iterates over the value and displays the message.",
        "access": "global"
    },
    "ui:inputEmail": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value currently in the input field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is 'change'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The width of the input field, in characters. Corresponds to the size attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents an input field for entering an email address.",
        "access": "global"
    },
    "ui:inputNumber": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The input value of the number.",
                "type": "BigDecimal",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is 'change'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The width of the input field, in characters. Corresponds to the size attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "format": {
                "description": "The format of the number. For example, format=\u00a1\u00b0.00\u00a1\u00b1 displays the number followed by two decimal places. If not specified, the Locale default format will be used.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An input field for entering a number, taking advantage of client input assistance and validation when available.",
        "access": "global"
    },
    "ui:inputPhone": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value currently in the input field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is 'change'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The width of the input field, in characters. Corresponds to the size attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents an input field for entering a telephone number.",
        "access": "global"
    },
    "ui:inputRadio": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Indicates whether the status of the option is selected. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is change.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether this radio button should be displayed in a disabled state. Disabled radio buttons can't be clicked. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name of the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "text": {
                "description": "The input value attribute.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "The radio button used in the input.",
        "access": "global"
    },
    "ui:inputRichText": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value currently in the input field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is change.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "rows": {
                "description": "The height of the text area, which is defined by the number of rows to display at a time. Default value is '2'.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "cols": {
                "description": "The width of the text area, which is defined by the number of characters to display in a single row at a time. Default value is \u00a1\u00b020\u00a1\u00b1.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "readonly": {
                "description": "Specifies whether the text area should be rendered as read-only. Default value is \u00a1\u00b0false\u00a1\u00b1.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "The text that is displayed by default.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "resizable": {
                "description": "Specifies whether or not the textarea should be resizable. Defaults to true.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML textarea element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "width": {
                "description": "The editor UI outer width. This can be an integer, for pixel sizes, or any CSS-defined unit. If isRichText is set to false, use the cols attribute instead.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "height": {
                "description": "The height of the editing area (that includes the editor content). This can be an integer, for pixel sizes, or any CSS-defined length unit.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An input field for entering rich text. This component is not supported by LockerService.",
        "access": "global"
    },
    "ui:inputSecret": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value currently in the input field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is 'change'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The width of the input field, in characters. Corresponds to the size attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An input field for entering secret text with type password.",
        "access": "global"
    },
    "ui:inputSelect": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value currently in the input field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is change.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "options": {
                "description": "A list of aura.components.ui.InputOption.",
                "type": "List",
                "access": "global",
                "required": false
            },
            "multiple": {
                "description": "Specifies whether the input is a multiple select. Default value is \u00a1\u00b0false\u00a1\u00b1.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a drop-down list with options.",
        "access": "global"
    },
    "ui:inputSelectOption": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "name": {
                "description": "The name of the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Indicates whether the status of the option is selected. Default value is \u00a1\u00b0false\u00a1\u00b1.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "text": {
                "description": "The input value attribute.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An HTML option element that is nested in a ui:inputSelect component. Denotes the available options in the list.",
        "access": "global"
    },
    "ui:inputText": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value currently in the input field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is change.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The width of the input field, in characters. Corresponds to the size attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents an input field suitable for entering a single line of free-form text.",
        "access": "global"
    },
    "ui:inputTextArea": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value currently in the input field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is 'change'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "rows": {
                "description": "The height of the text area, which is defined by the number of rows to display at a time. Default value is '2'.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "cols": {
                "description": "The width of the text area, which is defined by the number of characters to display in a single row at a time. Default value is '20'.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "readonly": {
                "description": "Specifies whether the text area should be rendered as read-only. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "The text that is displayed by default.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "resizable": {
                "description": "Specifies whether or not the textarea should be resizable. Defaults to true.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML textarea element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An HTML textarea element that can be editable or read-only. Scroll bars may not appear on Chrome browsers in Android devices, but you can select focus in the textarea to activate scrolling.",
        "access": "global"
    },
    "ui:inputURL": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The value currently in the input field.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "errors": {
                "type": "object[]",
                "description": "The list of errors to be displayed.",
                "access": "global",
                "required": false
            },
            "required": {
                "description": "Specifies whether the input is required. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "updateOn": {
                "description": "Updates the component's value binding if the updateOn attribute is set to the handled event. Default value is change.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "labelClass": {
                "description": "The CSS class of the label component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "requiredIndicatorClass": {
                "description": "The CSS class of the required indicator component",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "maxlength": {
                "description": "The maximum number of characters that can be typed into the input field. Corresponds to the maxlength attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "size": {
                "description": "The width of the input field, in characters. Corresponds to the size attribute of the rendered HTML input element.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "change": {
                "description": "Indicates that the content of a component or the state has changed.",
                "type": "COMPONENT"
            },
            "clearErrors": {
                "description": "Indicates that any validation error should be cleared.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "copy": {
                "description": "Indicates that the user has copied content to the clipboard.",
                "type": "COMPONENT"
            },
            "cut": {
                "description": "Indicates that the user has cut content to the clipboard.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "paste": {
                "description": "Indicates that the user has pasted content from the clipboard.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            },
            "validationError": {
                "description": "Indicates that the component has validation error(s).",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "An input field for entering a URL.",
        "access": "global"
    },
    "ui:menu": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A dropdown menu list with a trigger that controls its visibility. To create a clickable link and menu items, use ui:menuTriggerLink and and ui:menuList component.",
        "access": "global"
    },
    "ui:menuItem": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "selected": {
                "description": "The status of the menu item. True means this menu item is selected; False is not selected.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The concrete type of the menu item. Accepted values are 'action', 'checkbox', 'radio', 'separator' or any namespaced component descriptor, e.g. ns:xxxxmenuItem.",
                "type": "String",
                "values": [
                    "action",
                    "checkbox",
                    "radio",
                    "separator",
                    "${1:ns:xxxxmenuItem}"
                ],
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hideMenuAfterSelected": {
                "description": "Set to true to hide menu after the menu item is selected.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A UI menu item in a ui:menuList component.",
        "access": "global"
    },
    "ui:menuItemSeparator": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A menu separator to divide menu items, such as ui:radioMenuItem, and used in a ui:menuList component.",
        "access": "global"
    },
    "ui:menuList": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "visible": {
                "description": "Controls the visibility of the menu. The default is false, which hides the menu.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "closeOnTabKey": {
                "description": "Indicates whether to close the target list on tab key or not.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "autoPosition": {
                "description": "Move the popup target up when there is not enough space at the bottom to display. Note: even if autoPosition is set to false, popup will still position the menu relative to the trigger. To override default positioning, use manualPosition attribute.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "curtain": {
                "description": "Whether or not to apply an overlay under the target.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "closeOnClickOutside": {
                "description": "Close target when user clicks or taps outside of the target",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "menuItems": {
                "description": "A list of menu items set explicitly using instances of the Java class: aura.components.ui.MenuItem.",
                "type": "List",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "collapse": {
                "description": "Indicates that a component collapses.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "expand": {
                "description": "Indicates that a component expands.",
                "type": "COMPONENT"
            },
            "menuFocusChange": {
                "description": "Indicates that the user changes menu item focus inside a menu component.",
                "type": "COMPONENT"
            },
            "menuSelect": {
                "description": "Indicates that the user selects a menu item inside a menu component.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A menu component that contains menu items.",
        "access": "global"
    },
    "ui:menuTrigger": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "label": {
                "type": "string",
                "description": "The text displayed on the component.",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "The text to display as a tooltip when the mouse pointer hovers over this component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "menuTriggerPress": {
                "description": "Indicates that the menu trigger is clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A clickable link that expands and collapses a menu. To create a link for ui:menu, use ui:menuTriggerLink instead.",
        "access": "global"
    },
    "ui:menuTriggerLink": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "The text to display as a tooltip when the mouse pointer hovers over this component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "menuTriggerPress": {
                "description": "Indicates that the menu trigger is clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "A link that triggers a dropdown menu used in ui:menu",
        "access": "global"
    },
    "ui:message": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "The title text for the message.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "severity": {
                "description": "The severity of the message. Possible values: message (default), confirm, info, warning, error",
                "type": "String",
                "access": "global",
                "required": false
            },
            "closable": {
                "description": "Specifies whether to display an 'x' that will close the alert when clicked. Default value is 'false'.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Represents a message of varying severity levels",
        "access": "global"
    },
    "ui:outputCheckbox": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "Specifies whether the checkbox is checked.",
                "type": "Boolean",
                "access": "global",
                "required": true
            },
            "altChecked": {
                "description": "The alternate text description when the checkbox is checked. Default value is 'True'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "altUnchecked": {
                "description": "The alternate text description when the checkbox is unchecked. Default value is 'False'.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a checkbox in a checked or unchecked state.",
        "access": "global"
    },
    "ui:outputCurrency": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The output value of the currency, which is defined as type Decimal.",
                "type": "BigDecimal",
                "access": "global",
                "required": true
            },
            "format": {
                "description": "The format of the number. For example, format=\u00a1\u00b0.00\u00a1\u00b1 displays the number followed by two decimal places. If not specified, the default format based on the browser's locale will be used.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "currencyCode": {
                "description": "The ISO 4217 currency code specified as a String, e.g. USD.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "currencySymbol": {
                "description": "The currency symbol specified as a String.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays the currency in the default or specified format, such as with specific currency code or decimal places.",
        "access": "global"
    },
    "ui:outputDate": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The output value of the date. It should be a date string in ISO-8601 format (YYYY-MM-DD).",
                "type": "String",
                "access": "global",
                "required": true
            },
            "format": {
                "description": "A string (pattern letters are defined in java.text.SimpleDateFormat) used to format the date and time of the value attribute.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "langLocale": {
                "description": "The language locale used to format date value.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a date in the default or specified format based on the user's locale.",
        "access": "global"
    },
    "ui:outputDateTime": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "An ISO8601-formatted string representing a date time.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "format": {
                "description": "A string (pattern letters are defined in java.text.SimpleDateFormat) used to format the date and time of the value attribute.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "langLocale": {
                "description": "The language locale used to format date value.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "timezone": {
                "description": "The timezone ID, for example, America/Los_Angeles.",
                "type": "Picklist",
                "values": timezones,
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a date, time in a specified or default format based on the user's locale.",
        "access": "global"
    },
    "ui:outputEmail": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The output value of the email",
                "type": "String",
                "access": "global",
                "required": true
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays an email address in an HTML anchor (<a>) element. The leading and trailing space are trimmed.",
        "access": "global"
    },
    "ui:outputNumber": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The number displayed when this component is rendered.",
                "type": "BigDecimal",
                "access": "global",
                "required": true
            },
            "format": {
                "description": "The format of the number. For example, format=\u00a1\u00b0.00\u00a1\u00b1 displays the number followed by two decimal places. If not specified, the Locale default format will be used.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays the number in the default or specified format. Supports up to 18 digits before the decimal place.",
        "access": "global"
    },
    "ui:outputPhone": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The phone number displayed when this component is rendered.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays the phone number in a URL link format.",
        "access": "global"
    },
    "ui:outputRichText": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The richly-formatted text used for output.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "linkify": {
                "type": "boolean",
                "description": "Indicates if the URLs in the text are set to render as hyperlinks.",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays formatted text including tags such as paragraph, image, and hyperlink, as specified in the value attribute.",
        "access": "global"
    },
    "ui:outputText": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The text displayed when this component is rendered.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "title": {
                "type": "string",
                "description": "Displays extra information as hover text.",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays text as specified by the value attribute.",
        "access": "global"
    },
    "ui:outputTextArea": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The text to display.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "linkify": {
                "type": "boolean",
                "description": "Indicates if the URLs in the text are set to render as hyperlinks.",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays the text area as specified by the value attribute.",
        "access": "global"
    },
    "ui:outputURL": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "value": {
                "description": "The text displayed when this component is rendered.",
                "type": "String",
                "access": "global",
                "required": true
            },
            "iconClass": {
                "description": "The CSS style used to display the icon or image.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "title": {
                "description": "The text to display as a tooltip when the mouse pointer hovers over this component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "target": {
                "description": "The target destination where this rendered component is displayed. Possible values: _blank, _parent, _self, _top",
                "type": "Picklist",
                "values": [
                    "_blank",
                    "_parent",
                    "_self",
                    "_top"
                ],
                "access": "global",
                "required": false
            },
            "alt": {
                "description": "The alternate text description for image (used when there is no label)",
                "type": "String",
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Displays a link to a URL as specified by the value attribute, rendered on a given text (label attribute) and image, if any.",
        "access": "global"
    },
    "ui:radioMenuItem": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "class": {
                "description": "A CSS style to be attached to the component. This style is added in addition to base styles output by the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "selected": {
                "description": "The status of the menu item. True means this menu item is selected; False is not selected.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "type": {
                "description": "The concrete type of the menu item. Accepted values are 'action', 'checkbox', 'radio', 'separator' or any namespaced component descriptor, e.g. ns:xxxxmenuItem.",
                "type": "Picklist",
                "values": [
                    "action",
                    "checkbox",
                    "radio",
                    "separator",
                    "${1:ns:xxxxmenuItem}"
                ],
                "access": "global",
                "required": false
            },
            "label": {
                "description": "The text displayed on the component.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hideMenuAfterSelected": {
                "description": "Set to true to hide menu after the menu item is selected.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "disabled": {
                "description": "Specifies whether the component should be displayed in a disabled state. Default value is false.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "aura:id": {
                "type": "String"
            },
            "blur": {
                "description": "Indicates that a component has been put out of focus.",
                "type": "COMPONENT"
            },
            "click": {
                "description": "Indicates that a component has been clicked.",
                "type": "COMPONENT"
            },
            "dblclick": {
                "description": "Indicates that a component has been double-clicked.",
                "type": "COMPONENT"
            },
            "focus": {
                "description": "Indicates that a component has been put on focus.",
                "type": "COMPONENT"
            },
            "keydown": {
                "description": "Indicates that the user has pressed and released a keyboard key.",
                "type": "COMPONENT"
            },
            "keypress": {
                "description": "Indicates that the user has pressed and held down a keyboard key.",
                "type": "COMPONENT"
            },
            "keyup": {
                "description": "Indicates that the user has released a keyboard key.",
                "type": "COMPONENT"
            },
            "mousedown": {
                "description": "Indicates that the user has pressed a mouse key.",
                "type": "COMPONENT"
            },
            "mousemove": {
                "description": "Indicates that the user has moved the mouse pointer.",
                "type": "COMPONENT"
            },
            "mouseout": {
                "description": "Indicates that the user has moved the mouse pointer away from the component.",
                "type": "COMPONENT"
            },
            "mouseover": {
                "description": "Indicates that the user has moved the mouse pointer over the component.",
                "type": "COMPONENT"
            },
            "mouseup": {
                "description": "Indicates that the user has released the mouse button.",
                "type": "COMPONENT"
            },
            "select": {
                "description": "Indicates that the user has made a selection.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura",
        "description": "\u200bA menu item with a radio button that indicates a mutually exclusive selection and can be used to invoke an action. This component is nested in a ui:menu component.",
        "access": "global"
    },
    "ui:scrollerWrapper": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            },
            "class": {
                "type": "String",
                "description": "A CSS class applied to the outer element. This style is in addition to base classes output by the component.",
                "required": false,
                "access": "global"
            }
        },
        "description": "Creates a container that enables native scrolling in the Salesforce app.",
        "access": "global"
    },
    "wave:sdk": {
        "simple": false,
        "type": "aura",
        "attribs": {
            "body": {
                "type": "Component[]",
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "required": false,
                "access": "global"
            }
        },
        "description": null,
        "access": "global"
    },
    "wave:waveDashboard": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]",
                "access": "global",
                "required": false
            },
            "recordId": {
                "description": "Id of the current entity in the context of which the component is being displayed.",
                "type": "String",
                "access": "global",
                "required": false
            },
            "dashboardId": {
                "description": "The unique ID of the dashboard",
                "type": "String",
                "access": "global",
                "required": false
            },
            "developerName": {
                "description": "The unique developer name of the dashboard",
                "type": "String",
                "access": "global",
                "required": false
            },
            "hideOnError": {
                "description": "Controls whether or not users see a dashboard that has an error",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "height": {
                "description": "Specifies the height of the dashboard, in pixels.",
                "type": "Integer",
                "access": "global",
                "required": false
            },
            "showSharing": {
                "description": "If true, and the dashboard is shareable, then the dashboard shows the Share icon",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "showTitle": {
                "description": "If true, title of the dashboard is included above the dashboard. If false, the dashboard appears without a title.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "showHeader": {
                "description": "If true, the dashboard is displayed with a header bar that includes dashboard information and controls",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "rendered": {
                "type": "boolean",
                "description": "Specifies whether or not the component is rendered on the page.",
                "access": "global",
                "required": false
            },
            "filter": {
                "description": "Adds selections or filters to the embedded dashboard at runtime",
                "type": "String",
                "access": "global",
                "required": false
            },
            "openLinksInNewWindow": {
                "description": "If false, links to other dashboards will be opened in the same window.",
                "type": "Boolean",
                "access": "global",
                "required": false
            },
            "accessToken": {
                "description": "A valid access token obtained by logging into Salesforce. Useful when the component is used by Lightning Out in a non salesforce domain.",
                "type": "String",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "aura",
        "description": "Use this component to add a Salesforce Einstein Analytics dashboard to a Lightning Experience page.",
        "access": "global"
    },
    "lightning-accordion": {
        "simple": false,
        "type": "lwc",
        "description": "A collection of vertically stacked sections with multiple content areas.",
        "attribs": {
            "title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays tooltip text when the mouse moves over the element."
            },
            "active-section-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Changes the default expanded section.\nThe first section in the accordion is expanded by default."
            },
            "allow-multiple-sections-open": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the accordion allows multiple open sections.\nOtherwise, opening a section closes another that's currently open."
            }
        },
        "events": {
            "onsectiontoggle": {
                "type": "COMPONENT",
                "description": "The event fired when an accordion section is toggled"
            }
        },
        "access": "global"
    },
    "lightning-accordion-section": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The unique section name to use with the active-section-name attribute in the accordion component."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The text that displays as the title of the section."
            },
            "title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays a tooltip text when the mouse moves over the element."
            }
        },
        "description": "A single section that is nested in an accordion component.",
        "access": "global"
    },
    "lightning-avatar": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "alternative-text": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The alternative text used to describe the avatar, which is displayed as\nhover text on the image."
            },
            "fallback-icon-name": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "",
                "description": "The Lightning Design System name of the icon used as a fallback when the\nimage fails to load. The initials fallback relies on this for its\nbackground color. Names are written in the format 'standard:account'\nwhere 'standard' is the category, and 'account' is the specific icon to\nbe displayed. Only icons from the standard and custom categories are\nallowed."
            },
            "initials": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If the record name contains two words, like first and last name, use the\nfirst capitalized letter of each. For records that only have a single\nword name, use the first two letters of that word using one capital and\none lower case letter."
            },
            "size": {
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The size of the avatar. Valid values are x-small, small, medium, and large. This value defaults to medium."
            },
            "src": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The URL for the image."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "square",
                    "circle",
                    ""
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the shape of the avatar. Valid values are empty,\ncircle, and square. This value defaults to square."
            }
        },
        "description": "A visual representation of an object.",
        "access": "global"
    },
    "lightning-badge": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text to be displayed inside the badge."
            }
        },
        "description": "Represents a label which holds a small amount of information, such as the\nnumber of unread notifications.",
        "access": "global"
    },
    "lightning-breadcrumb": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "href": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The URL of the page that the breadcrumb goes to."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text label for the breadcrumb."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The name for the breadcrumb component. This value is optional and can be\nused to identify the breadcrumb in a callback."
            }
        },
        "description": "An item in the hierarchy path of the page the user is on.",
        "access": "global"
    },
    "lightning-breadcrumbs": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": "A hierarchy path of the page you're currently visiting within the website or app.",
        "access": "global"
    },
    "lightning-button": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "base",
                    "neutral",
                    "brand",
                    "destructive",
                    "inverse",
                    "success"
                ],
                "access": "global",
                "required": false,
                "default": "neutral",
                "description": ""
            },
            "icon-name": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "icon-position": {
                "type": "Picklist",
                "values": [
                    "left",
                    "right"
                ],
                "access": "global",
                "required": false,
                "default": "left",
                "description": ""
            },
            "type": {
                "type": "Picklist",
                "values": [
                    "reset",
                    "submit",
                    "button"
                ],
                "access": "global",
                "required": false,
                "default": "button",
                "description": ""
            }
        },
        "description": null,
        "access": "global"
    },
    "lightning-button-group": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": null,
        "access": "global"
    },
    "lightning-button-icon": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "base",
                    "neutral",
                    "brand",
                    "destructive",
                    "inverse",
                    "success"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "icon-name": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "icon-class": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "size": {
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "type": {
                "type": "Picklis",
                "values": [
                    "button",
                    "rest",
                    "submit"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "tooltip": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            }
        },
        "description": null,
        "access": "global"
    },
    "lightning-button-icon-stateful": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "base",
                    "neutral",
                    "brand",
                    "destructive",
                    "inverse",
                    "success"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "icon-name": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "size": {
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "selected": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            }
        },
        "description": null,
        "access": "global"
    },
    "lightning-button-menu": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "variant": {
                "type": "Picklist",
                "values": [
                    "bare",
                    "container",
                    "border",
                    "border-filled",
                    "bare-inverse",
                    "border-inverse"
                ],
                "access": "global",
                "required": false,
                "default": "border",
                "description": "The variant changes the look of the button.\nAccepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse.\nThis value defaults to border."
            },
            "icon-size": {
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false,
                "default": "medium",
                "description": "The size of the icon.\nOptions include xx-small, x-small, medium, or large.\nThis value defaults to medium."
            },
            "icon-name": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "utility:down",
                "description": "The name of the icon to be used in the format 'utility:down'.\nIf an icon other than 'utility:down' or 'utility:chevrondown' is used,\na utility:down icon is appended to the right of that icon.\nThis value defaults to utility:down."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value for the button element.\nThis value is optional and can be used when submitting a form."
            },
            "alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The assistive text for the button."
            },
            "loading-state-alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Message displayed while the menu is in the loading state."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Optional text to be shown on the button."
            },
            "draft-alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Describes the reason for showing the draft indicator.\nThis is required when is-draft is true."
            },
            "menu-alignment": {
                "type": "String",
                "values": [
                    "auto",
                    "left",
                    "center",
                    "right",
                    "bottom-left",
                    "bottom-center",
                    "bottom-right"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Determines the alignment of the menu relative to the button.\nAvailable options are: auto, left, center, right, bottom-left, bottom-center, bottom-right.\nThe auto option aligns the dropdown menu based on available space.\nThis value defaults to left."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the menu can be opened by users."
            },
            "nubbin": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, a nubbin is present on the menu.\nA nubbin is a stub that protrudes from the menu item towards the button menu.\nThe nubbin position is based on the menu-alignment."
            },
            "title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays tooltip text when the mouse moves over the button menu."
            },
            "is-draft": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the menu trigger shows a draft indicator."
            },
            "is-loading": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the menu is in a loading state and shows a spinner."
            },
            "access-key": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The keyboard shortcut for the button menu."
            },
            "tab-index": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.\ntabindex can be set to 0 or -1.\nThe default tabindex value is 0, which means that the button is focusable and participates in sequential keyboard navigation.\n-1 means that the button is focusable but does not participate in keyboard navigation."
            },
            "tooltip": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text to display when the user mouses over or focuses on the button.\nThe tooltip is auto-positioned relative to the button and screen space."
            }
        },
        "description": "Represents a dropdown menu with a list of actions or functions.",
        "access": "global"
    },
    "lightning-button-stateful": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "icon-name-when-on": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "",
                "description": "The name of the icon to be used in the format 'utility:check' when the state is true."
            },
            "icon-name-when-off": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "",
                "description": "The name of the icon to be used in the format 'utility:add' when the state is false."
            },
            "icon-name-when-hover": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "",
                "description": "The name of the icon to be used in the format 'utility:close' when the state is true and the button receives focus."
            },
            "label-when-off": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text to be displayed inside the button when state is false."
            },
            "label-when-on": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text to be displayed inside the button when state is true."
            },
            "label-when-hover": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The text to be displayed inside the button when state is true and the button receives focus."
            },
            "variant": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the button.\nAccepted variants include brand, destructive, inverse, neutral, success, and text."
            },
            "selected": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the button is in the selected state."
            }
        },
        "description": "A button that toggles between states.",
        "access": "global"
    },
    "lightning-card": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The title can include text, and is displayed in the header.\nTo include additional markup or another component, use the title slot."
            },
            "icon-name": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The Lightning Design System name of the icon.\nNames are written in the format 'utility:down' where 'utility' is the category,\nand 'down' is the specific icon to be displayed.\nThe icon is displayed in the header to the left of the title.",
                "values": iconNames
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "base",
                    "narrow"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the card.\nAccepted variants include base or narrow.\nThis value defaults to base."
            }
        },
        "description": "Cards apply a container around a related grouping of information.",
        "access": "global"
    },
    "lightning-carousel": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "disable-auto-scroll": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, images do not automatically scroll and users must click the indicators to scroll."
            },
            "disable-auto-refresh": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the carousel stops looping\nafter the last item is displayed."
            },
            "scroll-duration": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "5",
                "description": "The auto scroll duration. The default is 5 seconds, after that the next\nimage is displayed."
            }
        },
        "description": "A collection of images that are displayed one at a time.",
        "access": "global"
    },
    "lightning-checkbox-group": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Text label for the checkbox group."
            },
            "options": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Array of label-value pairs for each checkbox."
            },
            "message-when-value-missing": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Optional message to be displayed when no checkbox is selected\nand the required attribute is set."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The name of the checkbox group."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The list of selected checkboxes.\nEach array entry contains the value of a selected checkbox.\nThe value of each checkbox is set in the options attribute."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the checkbox group is disabled.\nCheckbox selections can't be changed for a disabled checkbox group."
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, at least one checkbox must be selected."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the checkbox group.\nAccepted variants include standard, label-hidden, label-inline, and label-stacked.\nThis value defaults to standard.\nUse label-hidden to hide the label but make it available to assistive technology.\nUse label-inline to horizontally align the label and checkbox group.\nUse label-stacked to place the label above the checkbox group."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states that an element can be in, with respect to constraint validation."
            }
        },
        "description": "A checkbox group that enables selection of single or multiple options.",
        "access": "global"
    },
    "lightning-click-to-dial": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The phone number."
            },
            "record-id": {
                "type": "",
                "description": "The Salesforce record Id that's associated with the phone number.\nThis Id is passed by the component and does not get validated.",
                "access": "global",
                "required": false
            },
            "params": {
                "type": "List",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Comma-separated list of parameters to pass to the third-party phone system."
            },
            "body": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Inherited from aura:componentThe body of the component. In markup, this is everything in the body of the tag."
            },
            "class": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedA CSS class for the outer element, in addition to the component's base classes."
            },
            "title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedDisplays tooltip text when the mouse moves over the element."
            },
            "recordId": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The Salesforce record Id that's associated with the phone number."
            }
        },
        "description": "Renders a formatted phone number as click-to-dial enabled or disabled for Open CTI and Voice.",
        "access": "global"
    },
    "lightning-combobox": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text label for the combobox."
            },
            "dropdown-alignment": {
                "type": "",
                "description": "Specifies where the drop-down list is aligned with or anchored to\nthe selection field. By default the list is aligned with the\nselection field at the top left so the list opens down. Use bottom-left\nto make the selection field display at the bottom so the list opens\nabove it. Use auto to let the component determine where to open\nthe list based on space available.",
                "access": "global",
                "required": false
            },
            "placeholder": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "Select an Option",
                "description": "Text that is displayed before an option is selected, to prompt the user to select an option. The default is \"Select an Option\"."
            },
            "message-when-value-missing": {
                "type": "",
                "description": "Error message to be displayed when the value is missing and input is required.",
                "access": "global",
                "required": false
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedSpecifies the name of an input element."
            },
            "field-level-help": {
                "type": "",
                "description": "Help text detailing the purpose and function of the combobox.",
                "access": "global",
                "required": false
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-inline",
                    "label-hidden",
                    "label-stacked"
                ],
                "access": "global",
                "required": false,
                "default": "standard",
                "description": "InheritedThe variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedSpecifies the value of an input element."
            },
            "options": {
                "type": "List",
                "access": "global",
                "required": true,
                "default": "",
                "description": "A list of options that are available for selection. Each option has the following attributes: label and value."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "InheritedSpecifies that an input element should be disabled. This value defaults to false."
            },
            "read-only": {
                "type": "",
                "description": "If present, the combobox is read-only.\nA read-only combobox is also disabled.",
                "access": "global",
                "required": false
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "InheritedSpecifies that an input field must be filled out before submitting the form. This value defaults to false."
            },
            "spinner-active": {
                "type": "",
                "description": "If present, a spinner is displayed below the menu items to indicate loading activity.",
                "access": "global",
                "required": false
            },
            "validity": {
                "type": "Boolean",
                "access": "global",
                "required": true,
                "default": "",
                "description": "InheritedRepresents the validity states that an element can be in, with respect to constraint validation."
            },
            "body": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Inherited from aura:componentThe body of the component. In markup, this is everything in the body of the tag."
            },
            "readonly": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "InheritedSpecifies that an input field is read-only. This value defaults to false."
            },
            "onchange": {
                "type": "Method",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedThe action triggered when a value attribute changes."
            },
            "accesskey": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedSpecifies a shortcut key to activate or focus an element."
            },
            "tabindex": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedSpecifies the tab order of an element when the Tab key is used for navigating. The tabindex value can be set to 0 or -1. The default is 0, which means that the component is focusable and participates in sequential keyboard navigation. -1 means that the component is focusable but does not participate in keyboard navigation."
            },
            "onfocus": {
                "type": "Method",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedThe action triggered when the element receives focus."
            },
            "onblur": {
                "type": "Method",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedThe action triggered when the element releases focus."
            },
            "class": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedA CSS class for the outer element, in addition to the component's base classes."
            },
            "title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "InheritedDisplays tooltip text when the mouse moves over the element."
            },
            "dropdownAlignment": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "left",
                "description": "Specifies where the drop-down list is aligned with or anchored to the selection field. By default the list is aligned with the selection field at the top so the list opens down.  Use bottom-left to make the selection field display at the bottom so the list opens above it.  Use auto to let the component determine where to open the list based on space available."
            },
            "messageWhenValueMissing": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is missing and input is required."
            },
            "fieldLevelHelp": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Help text detailing the purpose and function of the combobox."
            },
            "spinnerActive": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "Displays a spinner to indicate activity in the dropdown list. This value defaults to false."
            }
        },
        "description": "A widget that provides an input field that is readonly,\naccompanied by a dropdown list of selectable options.",
        "access": "global"
    },
    "lightning-datatable": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "columns": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Array of the columns object that's used to define the data types.\nRequired properties include 'label', 'fieldName', and 'type'. The default type is 'text'.\nSee the Documentation tab for more information."
            },
            "data": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The array of data to be displayed."
            },
            "key-field": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Required for better performance.\nAssociates each row with a unique ID."
            },
            "hide-checkbox-column": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the checkbox column for row selection is hidden."
            },
            "show-row-number-column": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the row numbers are shown in the first column."
            },
            "row-number-offset": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Determines where to start counting the row number.\nThe default is 0."
            },
            "resize-column-disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, column resizing is disabled."
            },
            "min-column-width": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum width for all columns.\nThe default is 50px."
            },
            "max-column-width": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum width for all columns.\nThe default is 1000px."
            },
            "resize-step": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "10px",
                "description": "The width to resize the column when a user presses left or right arrow.\nThe default is 10px."
            },
            "sorted-by": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The column fieldName that controls the sorting order.\nSort the data using the onsort event handler."
            },
            "sorted-direction": {
                "type": "Picklist",
                "values": [
                    "asc",
                    "desc"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the sorting direction.\nSort the data using the onsort event handler.\nValid options include 'asc' and 'desc'."
            },
            "default-sort-direction": {
                "type": "Picklist",
                "values": [
                    "asc",
                    "desc"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the default sorting direction on an unsorted column.\nValid options include 'asc' and 'desc'.\nThe default is 'asc' for sorting in ascending order."
            },
            "enable-infinite-loading": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, you can load a subset of data and then display more\nwhen users scroll to the end of the table.\nUse with the onloadmore event handler to retrieve more data."
            },
            "load-more-offset": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Determines when to trigger infinite loading based on\nhow many pixels the table's scroll position is from the bottom of the table.\nThe default is 20."
            },
            "is-loading": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, a spinner is shown to indicate that more data is loading."
            },
            "max-row-selection": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum number of rows that can be selected.\nCheckboxes are used for selection by default,\nand radio buttons are used when maxRowSelection is 1."
            },
            "selected-rows": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Enables programmatic row selection with a list of key-field values."
            },
            "errors": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies an object containing information about cell level, row level, and table level errors.\nWhen it's set, error messages are displayed on the table accordingly."
            },
            "draft-values": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The current values per row that are provided during inline edit."
            },
            "hide-table-header": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the table header is hidden."
            },
            "suppress-bottom-bar": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the footer that displays the Save and Cancel buttons is hidden during inline editing."
            }
        },
        "description": null,
        "access": "global"
    },
    "lightning-dual-listbox": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "source-label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Label for the source options listbox."
            },
            "selected-label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Label for the selected options listbox."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Label for the dual listbox."
            },
            "options": {
                "type": "List",
                "access": "global",
                "required": true,
                "default": "",
                "description": "A list of options that are available for selection. Each option has the following attributes: label and value."
            },
            "min": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "0",
                "description": "Minimum number of options required in the selected options listbox."
            },
            "max": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Maximum number of options allowed in the selected options listbox."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the name of an input element."
            },
            "message-when-value-missing": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is missing and input is required."
            },
            "message-when-range-overflow": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a range overflow is detected."
            },
            "message-when-range-underflow": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a range underflow is detected."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the listbox is disabled and users cannot interact with it."
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the user must add an item to the selected listbox before submitting the form."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A list of default options that are included in the selected options listbox. This list is populated with values from the options attribute."
            },
            "required-options": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A list of required options that cannot be removed from selected options listbox. This list is populated with values from the options attribute."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden",
                    "label-inline",
                    "label-stacked"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the dual listbox.\nAccepted variants include standard, label-hidden, label-inline, and label-stacked.\nThis value defaults to standard.\nUse label-hidden to hide the label but make it available to assistive technology.\nUse label-inline to horizontally align the label and dual listbox.\nUse label-stacked to place the label above the dual listbox."
            },
            "size": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Number of items that display in the listboxes before vertical scrollbars are displayed. Determines the vertical size of the listbox."
            },
            "field-level-help": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Help text detailing the purpose and function of the dual listbox."
            },
            "disable-reordering": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the Up and Down buttons used for reordering the selected list items are hidden."
            },
            "show-activity-indicator": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, a spinner is displayed in the first listbox to indicate loading activity."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states that an element can be in, with respect to constraint validation."
            },
            "add-button-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Label for add button."
            },
            "remove-button-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Label for remove button."
            },
            "up-button-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Label for up button."
            },
            "down-button-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Label for down button."
            }
        },
        "description": "A pair of listboxes that enables multiple options to be selected and reordered.",
        "access": "global"
    },
    "lightning-dynamic-icon": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The alternative text used to describe the dynamic icon.\nThis text should describe what's happening.\nFor example, 'Graph is refreshing', not what the icon looks like, 'Graph'."
            },
            "type": {
                "type": "Picklist",
                "values": [
                    "ellie",
                    "eq",
                    "score",
                    "strength",
                    "trend",
                    "waffle"
                ],
                "access": "global",
                "required": true,
                "default": "",
                "description": "The Lightning Design System name of the dynamic icon.\nValid values are: ellie, eq, score, strength, trend, and waffle."
            },
            "option": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The option attribute changes the appearance of the dynamic icon.\nThe options available depend on the type.\neq: play (default) or stop\nscore: positive (default) or negative\nstrength: -3, -2, -1, 0 (default), 1, 2, 3\ntrend: neutral (default), up, or down"
            }
        },
        "description": "Represents various animated icons with different states.",
        "access": "global"
    },
    "lightning-emp-api": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": null,
        "access": "global"
    },
    "lightning-file-upload": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "name": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Specifies the name of the input element."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text label for the file uploader."
            },
            "accept": {
                "type": "Picklist",
                "values": [
                    ".avi",
                    ".doc",
                    ".dot",
                    ".docx",
                    ".exe",
                    ".msg",
                    ".wrf",
                    ".html",
                    ".acgi",
                    ".htm",
                    ".htx",
                    ".shtm",
                    ".shtml",
                    ".htt",
                    ".mht",
                    ".mhtm",
                    ".mhtml",
                    ".mov",
                    ".mp3",
                    ".mp4",
                    ".mpeg",
                    ".mpg",
                    ".pdf",
                    ".ppt",
                    ".pot",
                    ".pps",
                    ".pptx",
                    ".svg",
                    ".svgz",
                    ".swf",
                    ".txml",
                    ".unknown",
                    ".wav",
                    ".wma",
                    ".wmv",
                    ".xhtml",
                    ".xls",
                    ".xlt",
                    ".xlsx",
                    ".xm"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Comma-separated list of file extensions that can be uploaded\nin the format .ext, such as .pdf, .jpg, or .png."
            },
            "record-id": {
                "type": "TrackObject",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The record Id of the record that the uploaded file is associated to."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "Specifies whether this component should be displayed in a disabled state.\nDisabled components can't be clicked. The default is false."
            },
            "multiple": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "Specifies whether a user can upload more than one file simultanesouly.\nThe default is false."
            }
        },
        "description": "A file uploader for uploading and attaching files to records.",
        "access": "global"
    },
    "lightning-formatted-address": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "street": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The street detail for the address."
            },
            "city": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The city detail for the address."
            },
            "province": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The province detail for the address."
            },
            "country": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The country detail for the address."
            },
            "postal-code": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The postal code detail for the address."
            },
            "latitude": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The latitude of the location if known. Latitude values must be within -90 and 90."
            },
            "longitude": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The longitude of the location if known. Longitude values must be within -180 and 180."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the address is displayed as plain text and is not clickable."
            },
            "show-static-map": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "Displays a static map of the location using Google Maps. This value defaults to false."
            }
        },
        "description": "Displays a formatted address with a link to the given location on Google Maps.\nThe link is opened in a new tab.\nA static map can be displayed with the address for better context.",
        "access": "global"
    },
    "lightning-formatted-date-time": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value to be formatted, which can be a Date object, timestamp, or an ISO8601 formatted string."
            },
            "weekday": {
                "type": "Picklist",
                "values": [
                    "narrow",
                    "short",
                    "long"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies how to display the day of the week. Allowed values are narrow, short, or long."
            },
            "era": {
                "type": "Picklist",
                "values": [
                    "narrow",
                    "short",
                    "long"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Allowed values are narrow, short, or long."
            },
            "year": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Allowed values are numeric or 2-digit."
            },
            "month": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Allowed values are 2-digit, narrow, short, or long."
            },
            "day": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Allowed values are numeric or 2-digit."
            },
            "hour": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Allowed values are numeric or 2-digit."
            },
            "minute": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Allowed values are numeric or 2-digit."
            },
            "second": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Allowed values are numeric or 2-digit."
            },
            "time-zone-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Allowed values are short or long. For example, the Pacific time zone would display as 'PST'\nif you specify 'short', or 'Pacific Standard Time' if you specify 'long.'"
            },
            "time-zone": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The time zone to display. Use this attribute only if you want to override the default, which is the runtime's\ntime zone. Specify a time zone listed in the IANA time zone database (https://www.iana.org/time-zones). For example, set\nthe value to 'Pacific/Honolulu' to display Hawaii time. The short code UTC is also accepted."
            },
            "hour12": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Determines whether time is displayed as 12-hour. If false, time displays as 24-hour. The default setting is determined by the user's locale."
            }
        },
        "description": "Displays formatted date and time.",
        "access": "global"
    },
    "lightning-formatted-email": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The email address that's displayed if a label is not provided."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The text label for the email address."
            },
            "tab-index": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.\nA value of 0 means that the element is focusable and\nparticipates in sequential keyboard navigation. A value of -1 means\nthat the element is focusable but does not participate in keyboard navigation."
            },
            "hide-icon": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "If present, the email icon is hidden and only the email address is displayed."
            }
        },
        "description": "Displays an email as a hyperlink with the mailto: URL scheme.",
        "access": "global"
    },
    "lightning-formatted-location": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "latitude": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The latitude of the geolocation. Latitude values must be within -90 and 90."
            },
            "longitude": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The longitude of the geolocation. Longitude values must be within -180 and 180."
            }
        },
        "description": "Displays a geolocation in decimal degrees using the format [latitude, longitude].",
        "access": "global"
    },
    "lightning-formatted-name": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "format": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The format to use to display the name. Valid values include short, medium, and long. This value defaults to long."
            },
            "salutation": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value for the salutation, such as Dr. or Mrs."
            },
            "first-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value for the first name."
            },
            "last-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value for the last name."
            },
            "middle-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value for the middle name."
            },
            "suffix": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value for the suffix, such as Jr. or Esq."
            },
            "informal-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value for the informal name."
            }
        },
        "description": "Displays a formatted name that can include a salutation and suffix.",
        "access": "global"
    },
    "lightning-formatted-number": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The value to be formatted."
            },
            "format-style": {
                "type": "Picklist",
                "values": [
                    "decimal",
                    "currency",
                    "percent"
                ],
                "access": "global",
                "required": false,
                "default": "decimal",
                "description": "The number formatting style to use. Possible values are decimal, currency,\nand percent. This value defaults to decimal."
            },
            "currency-code": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Only used if format-style='currency', this attribute determines which currency is\ndisplayed. Possible values are the ISO 4217 currency codes, such as 'USD' for the US dollar."
            },
            "currency-display-as": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "symbol",
                "description": "Determines how currency is displayed. Possible values are symbol, code, and name. This value defaults to symbol."
            },
            "minimum-integer-digits": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum number of integer digits that are required. Possible values are from 1 to 21."
            },
            "minimum-fraction-digits": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum number of fraction digits that are required."
            },
            "maximum-fraction-digits": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum number of fraction digits that are allowed."
            },
            "minimum-significant-digits": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum number of significant digits that are required. Possible values are from 1 to 21."
            },
            "maximum-significant-digits": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum number of significant digits that are allowed. Possible values are from 1 to 21."
            }
        },
        "description": "Displays formatted numbers for decimals, currency, and percentages.",
        "access": "global"
    },
    "lightning-formatted-phone": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Sets the phone number to display."
            },
            "tab-index": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.\nA value of 0 means that the element is focusable and\nparticipates in sequential keyboard navigation. A value of -1 means\nthat the element is focusable but does not participate in keyboard navigation."
            }
        },
        "description": "Displays a phone number as a hyperlink with the tel: URL scheme.",
        "access": "global"
    },
    "lightning-formatted-rich-text": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "disable-linkify": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the component does not create links in the rich text."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Sets the rich text to display."
            }
        },
        "description": "Displays rich text that's formatted with whitelisted tags and attributes.\nOther tags and attributes are removed and only their text content is displayed.",
        "access": "global"
    },
    "lightning-formatted-text": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Sets the text to display."
            },
            "linkify": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, URLs and email addresses are displayed in anchor tags.\nThey are displayed in plain text by default."
            }
        },
        "description": "Displays text, replaces newlines with line breaks, and linkifies if requested.",
        "access": "global"
    },
    "lightning-formatted-time": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Time value to format."
            }
        },
        "description": "Displays a formatted time in user's locale format.",
        "access": "global"
    },
    "lightning-formatted-url": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "target": {
                "type": "Picklist",
                "values": [
                    "_blank",
                    "_parent",
                    "_self",
                    "_top"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies where to open the link. Options include _blank, _parent, _self, and _top."
            },
            "tooltip": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The text to display when the mouse hovers over the link."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The text to display in the link."
            },
            "tab-index": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.\nA value of 0 means that the element is focusable and\nparticipates in sequential keyboard navigation. A value of -1 means\nthat the element is focusable but does not participate in keyboard navigation."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The URL to format."
            }
        },
        "description": "Displays a URL as a hyperlink.",
        "access": "global"
    },
    "lightning-helptext": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "content": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text to be shown in the popover."
            },
            "icon-name": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The Lightning Design System name of the icon used as the visible element.\nNames are written in the format 'utility:info' where 'utility' is the category,\nand 'info' is the specific icon to be displayed.\nThe default is 'utility:info'.",
                "values": iconNames
            },
            "icon-variant": {
                "type": "Picklist",
                "values": [
                    "inverse",
                    "warning",
                    "error"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Changes the appearance of the icon.\nAccepted variants include inverse, warning, error."
            }
        },
        "description": "An icon with a text popover used for tooltips.",
        "access": "global"
    },
    "lightning-icon": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The alternative text used to describe the icon.\nThis text should describe what happens when you click the button,\nfor example 'Upload File', not what the icon looks like, 'Paperclip'."
            },
            "src": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A uri path to a custom svg sprite, including the name of the resouce,\nfor example: /assets/icons/standard-sprite/svg/test.svg#icon-heart"
            },
            "icon-name": {
                "type": "Picklist",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The Lightning Design System name of the icon.\nNames are written in the format 'utility:down' where 'utility' is the category,\nand 'down' is the specific icon to be displayed.",
                "values": iconNames
            },
            "size": {
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The size of the icon. Options include xx-small, x-small, small, medium, or large.\nThe default is medium."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "inverse",
                    "success",
                    "warning",
                    "error"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of a utility icon.\nAccepted variants include inverse, success, warning, and error.\nUse the inverse variant to implement a white fill in utility icons on dark backgrounds."
            }
        },
        "description": "Represents a visual element that provides context and enhances usability.",
        "access": "global"
    },
    "lightning-input": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "placeholder": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the name of an input element."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Text label for the input."
            },
            "message-when-bad-input": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a bad input is detected."
            },
            "message-when-pattern-mismatch": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a pattern mismatch is detected."
            },
            "message-when-range-overflow": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a range overflow is detected."
            },
            "message-when-range-underflow": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a range underflow is detected."
            },
            "message-when-step-mismatch": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a step mismatch is detected."
            },
            "message-when-too-short": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is too short."
            },
            "message-when-too-long": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is too long."
            },
            "message-when-type-mismatch": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a type mismatch is detected."
            },
            "message-when-value-missing": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is missing."
            },
            "message-toggle-active": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text shown for the active state of a toggle. The default is \"Active\"."
            },
            "message-toggle-inactive": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text shown for the inactive state of a toggle. The default is \"Inactive\"."
            },
            "aria-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Describes the input to assistive technologies."
            },
            "autocomplete": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Controls auto-filling of the field. Input types that support autocomplete are\nemail, search, tel, text, and url. Set the attribute to pass\nthrough autocomplete values to be interpreted by the browser."
            },
            "format-fraction-digits": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use."
            },
            "time-aria-controls": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs whose presence or content is controlled by the\ntime input when type='datetime'. On mobile devices, this is merged with aria-controls\nand date-aria-controls to describe the native date time input."
            },
            "date-style": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The display style of the date when type='date' or type='datetime'. Valid values are\nshort, medium (default), and long. The format of each style is specific to the locale.\nOn mobile devices this attribute has no effect."
            },
            "time-style": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The display style of the time when type='time' or type='datetime'. Valid values are\nshort (default), medium, and long. Currently, medium and long styles look the same.\nOn mobile devices this attribute has no effect."
            },
            "date-aria-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Describes the date input to assistive technologies when type='datetime'. On mobile devices,\nthis label is merged with aria-label and time-aria-label to describe the native date time input."
            },
            "date-aria-labelled-by": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs that provide labels for the date input when type='datetime'.\nOn mobile devices, this is merged with aria-labelled-by and time-aria-labelled-by to describe\nthe native date time input."
            },
            "time-aria-labelled-by": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs that provide labels for the time input when type='datetime'.\nOn mobile devices, this is merged with aria-labelled-by and date-aria-labelled-by to describe\nthe native date time input."
            },
            "time-aria-described-by": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs that provide descriptive labels for the time input when\ntype='datetime'. On mobile devices, this is merged with aria-described-by and date-aria-described-by\nto describe the native date time input."
            },
            "date-aria-controls": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs whose presence or content is controlled by the\ndate input when type='datetime'. On mobile devices, this is merged with aria-controls\nand time-aria-controls to describe the native date time input."
            },
            "date-aria-described-by": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs that provide descriptive labels for the date input when\ntype='datetime'. On mobile devices, this is merged with aria-described-by and time-aria-described-by\nto describe the native date time input."
            },
            "aria-controls": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs whose presence or content is controlled by the input."
            },
            "aria-labelled-by": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs that provide labels for the input."
            },
            "aria-described-by": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A space-separated list of element IDs that provide descriptive labels for the input."
            },
            "formatter": {
                "type": "Picklist",
                "values": [
                    "decimal",
                    "percent",
                    "percent-fixed",
                    "currency"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "String value with the formatter to be used for number input. Valid values include\ndecimal, percent, percent-fixed, and currency."
            },
            "type": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The type of the input. This value defaults to text."
            },
            "is-loading": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "For the search type only. If present, a spinner is displayed to indicate that data is loading."
            },
            "pattern": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the regular expression that the input's value is checked against.\nThis attribute is supported for text, search, url, tel, email, and password types."
            },
            "max-length": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum number of characters allowed in the field."
            },
            "accept": {
                "type": "Picklist",
                "values": [
                    ".avi",
                    ".doc",
                    ".dot",
                    ".docx",
                    ".exe",
                    ".msg",
                    ".wrf",
                    ".html",
                    ".acgi",
                    ".htm",
                    ".htx",
                    ".shtm",
                    ".shtml",
                    ".htt",
                    ".mht",
                    ".mhtm",
                    ".mhtml",
                    ".mov",
                    ".mp3",
                    ".mp4",
                    ".mpeg",
                    ".mpg",
                    ".pdf",
                    ".ppt",
                    ".pot",
                    ".pps",
                    ".pptx",
                    ".svg",
                    ".svgz",
                    ".swf",
                    ".txml",
                    ".unknown",
                    ".wav",
                    ".wma",
                    ".wmv",
                    ".xhtml",
                    ".xls",
                    ".xlt",
                    ".xlsx",
                    ".xm"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the types of files that the server accepts. This attribute can be used only when type='file'."
            },
            "min-length": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum number of characters allowed in the field."
            },
            "max": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum acceptable value for the input.  This attribute can be used only with number,\nrange, date, time, and datetime input types. For number and range type, the max value is a\ndecimal number. For the date, time, and datetime types, the max value must use a valid string for the type."
            },
            "min": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum acceptable value for the input. This attribute can be used only with number,\nrange, date, time, and datetime input types. For number and range types, the min value\nis a decimal number. For the date, time, and datetime types, the min value must use a valid string for the type."
            },
            "step": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Granularity of the value, specified as a positive floating point number.\nUse 'any' when granularity is not a concern. This value defaults to 1."
            },
            "checked": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the checkbox is selected."
            },
            "multiple": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies that a user can enter more than one value. This attribute can be used only when type='file' or type='email'."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the value of an input element."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-inline",
                    "label-hidden",
                    "label-stacked"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of an input field.\nAccepted variants include standard, label-inline, label-hidden, and label-stacked.\nThis value defaults to standard, which displays the label above the field.\nUse label-hidden to hide the label but make it available to assistive technology.\nUse label-inline to horizontally align the label and input field.\nUse label-stacked to place the label above the input field."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the input field is disabled and users cannot interact with it."
            },
            "read-only": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the input field is read-only and cannot be edited by users."
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the input field must be filled out before the form is submitted."
            },
            "timezone": {
                "type": "Picklist",
                "values": timezones,
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the time zone used when type='datetime' only. This value defaults to the user's Salesforce time zone setting."
            },
            "files": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A FileList that contains selected files. This attribute can be used only when type='file'."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states that an element can be in, with respect to constraint validation."
            },
            "field-level-help": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Help text detailing the purpose and function of the input.\nThis attribute isn't supported for file, radio, toggle, and checkbox-button types."
            },
            "access-key": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies a shortcut key to activate or focus an element."
            },
            "checkValidity": {
                "type": "Method",
                "access": "global",
                "arguments": "message",
                "description": "Sets a custom error message to be displayed when a form is submitted."
            },
            "reportValidity": {
                "type": "Method",
                "access": "global",
                "arguments": "message",
                "description": "Displays the error messages and returns false if the input is invalid. If the input is valid, reportValidity() clears displayed error messages and returns true."
            },
            "focus": {
                "type": "Method",
                "access": "global",
                "arguments": "message",
                "description": "Sets focus on the input element."
            },
            "blur": {
                "type": "Method",
                "access": "global",
                "arguments": "message",
                "description": "Removes keyboard focus from the input element."
            },
            "showHelpMessageIfInvalid": {
                "type": "Method",
                "access": "global",
                "arguments": "message",
                "description": "Displays error messages on invalid fields. An invalid field fails at least one constraint validation and returns false when checkValidity() is called."
            }
        },
        "description": "Represents interactive controls that accept user input depending on the type attribute.",
        "access": "global"
    },
    "lightning-input-address": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "address-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the address compound field."
            },
            "street-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the street field of the address."
            },
            "city-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the city field of the address."
            },
            "province-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the province field of the address."
            },
            "country-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the country field of the address."
            },
            "postal-code-label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the postal code field of the address."
            },
            "province-options": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The array of label-value pairs for the province. Displays a dropdown menu of options."
            },
            "country-options": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The array of label-value pairs for the country. Displays a dropdown menu of options."
            },
            "street": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The street field of the address."
            },
            "city": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The city field of the address."
            },
            "province": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The province field of the address. If province-options is provided, this province value is selected by default."
            },
            "country": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The country field of the address. If country-options is provided, this country value is selected by default."
            },
            "postal-code": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The postal code field of the address."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the address fields are disabled and users cannot interact with them."
            },
            "show-address-lookup": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, address lookup using Google Maps is enabled."
            },
            "read-only": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the address fields are read-only and cannot be edited."
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the address fields must be filled before the form is submitted."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of an input address field.\nAccepted variants include standard, label-hidden, label-inline, and label-stacked.\nThis value defaults to standard.\nUse label-hidden to hide the label but make it available to assistive technology.\nUse label-inline to horizontally align the label and input address field.\nUse label-stacked to place the label above the input address field."
            },
            "field-level-help": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Help text detailing the purpose and function of the input."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states that an element can be in, with respect to constraint validation."
            }
        },
        "description": "Represents an address compound field.",
        "access": "global"
    },
    "lightning-input-field": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "readonly": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "Specifies whether the input fields are read-only. This value defaults to false."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the label position of an input field.\nAccepted variants include standard, label-hidden, label-inline, and label-stacked.\nIf variant is specified, the label position is determined by the variant.\nOtherwise, it is determined by the density setting of the parent form."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The field value, which overrides the existing value."
            },
            "field-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The API name of the field to be displayed."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the field is disabled and users cannot interact with it.\nRead-only fields are also disabled by default."
            },
            "dirty": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. If present, the field has been modified by the user but not saved or submitted."
            }
        },
        "description": "Represents an editable input for a field on a Salesforce object.",
        "access": "global"
    },
    "lightning-input-location": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the geolocation compound field."
            },
            "field-level-help": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Help text detailing the purpose and function of the input."
            },
            "latitude": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The latitude value. Latitude values must be within -90 and 90."
            },
            "longitude": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The longitude value. Longitude values must be within -180 and 180."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the geolocation fields are disabled and users cannot interact with them."
            },
            "read-only": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the geolocations fields are read-only and cannot be edited."
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the geolocation fields must be filled out before the form is submitted.\nAn error message is displayed if a user interacts with the field\nand does not provide a value."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of a geolocation compound field.\nAccepted variants include standard, label-hidden, label-inline, and label-stacked.\nThis value defaults to standard.\nUse label-hidden to hide the label but make it available to assistive technology.\nUse label-inline to horizontally align the label and geolocation fields.\nUse label-stacked to place the label above the geolocation fields."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states that an element can be in, with respect to constraint validation."
            }
        },
        "description": "Represents a geolocation compound field that accepts a latitude and longitude value.",
        "access": "global"
    },
    "lightning-input-name": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the input name field."
            },
            "options": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays a list of salutation options, such as Dr. or Mrs., provided as label-value pairs."
            },
            "fields-to-display": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "[{type=string, value=firstName}, {type=string, value=salutation}, {type=string, value=lastName}]",
                "description": "List of fields to be displayed on the component. This value defaults to\n['firstName', 'salutation', 'lastName']. Other field values include middleName,\ninformalName, suffix."
            },
            "salutation": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays the Salutation field as a dropdown menu. An array of label-value pairs must be provided using the options attribute."
            },
            "first-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays the First Name field."
            },
            "middle-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays the Middle Name field."
            },
            "informal-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays the Informal Name field."
            },
            "last-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays the Last Name field."
            },
            "suffix": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays the Suffix field."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the input name field is disabled and users cannot interact with it."
            },
            "read-only": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the input name field is read-only and cannot be edited."
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the input name field must be filled out before the form is submitted.\nA red asterisk is displayed on the Last Name field. An error\nmessage is displayed if a user interacts with the Last Name\nfield and does not provide a value."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of a name compound field.\nAccepted variants include standard, label-hidden, label-inline, and label-stacked.\nThis value defaults to standard.\nUse label-hidden to hide the label but make it available to assistive technology.\nUse label-inline to horizontally align the label and name fields.\nUse label-stacked to place the label above the name fields."
            },
            "field-level-help": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Help text detailing the purpose and function of the input."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states that an element can be in, with respect to constraint validation."
            }
        },
        "description": "Represents a name compound field.",
        "access": "global"
    },
    "lightning-input-rich-text": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The label of the rich text editor."
            },
            "label-visible": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "If present, the label on the rich text editor is visible."
            },
            "placeholder": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text that is displayed when the field is empty, to prompt the user for a valid entry."
            },
            "disabled-categories": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A comma-separated list of button categories to remove from the toolbar."
            },
            "formats": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A whitelist of formats. By default, the list is computed based on enabled categories.\nThe 'table' format is always enabled to support copying and pasting of tables if formats are not provided."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the toolbar. Accepted variant is bottom-toolbar which causes\nthe toolbar to be displayed below the text box."
            },
            "message-when-bad-input": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when invalid input is detected."
            },
            "custom-buttons": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Custom buttons to add to the toolbar."
            },
            "share-with-entity-id": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Entity ID to share the image with."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The HTML content in the rich text editor."
            },
            "valid": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies whether the editor content is valid. If invalid, the slds-has-error class is added. This value defaults to true."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the editor is disabled and users cannot interact with it."
            }
        },
        "description": "A WYSIWYG editor with a customizable toolbar for entering rich text",
        "access": "global"
    },
    "lightning-layout": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "horizontal-align": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Determines how to spread the layout items horizontally.\nThe alignment options are center, space, spread, and end."
            },
            "vertical-align": {
                "type": "Picklist",
                "values": [
                    "start",
                    "center",
                    "end",
                    "stretch"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Determines how to align the layout items vertically in the container.\nThe alignment options are start, center, end, and stretch."
            },
            "pull-to-boundary": {
                "type": "Picklist",
                "values": [
                    "small",
                    "medium",
                    "large."
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Pulls layout items to the layout boundaries and corresponds\nto the padding size on the layout item. Possible values are small, medium, or large."
            },
            "multiple-rows": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, layout items wrap to the following line when they exceed the layout width."
            }
        },
        "description": "Represents a responsive grid system for arranging containers on a page.",
        "access": "global"
    },
    "lightning-layout-item": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "flexibility": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Make the item fluid so that it absorbs any extra space in its\ncontainer or shrinks when there is less space. Allowed values are:\nauto (columns grow or shrink equally as space allows),\nshrink (columns shrink equally as space decreases),\nno-shrink (columns don't shrink as space reduces),\ngrow (columns grow equally as space increases),\nno-grow (columns don't grow as space increases),\nno-flex (columns don't grow or shrink as space changes).\nUse a comma-separated value for multiple options, such as 'auto, no-shrink'."
            },
            "alignment-bump": {
                "type": "Picklist",
                "values": [
                    "left",
                    "top",
                    "right",
                    "bottom"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies a direction to bump the alignment of adjacent layout items. Allowed values are left, top, right, bottom."
            },
            "padding": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Sets padding to either the right and left sides of a container,\nor all sides of a container. Allowed values are horizontal-small,\nhorizontal-medium, horizontal-large, around-small, around-medium, around-large."
            },
            "size": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If the viewport is divided into 12 parts, size indicates the\nrelative space the container occupies. Size is expressed as\nan integer from 1 through 12. This applies for all device-types."
            },
            "small-device-size": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If the viewport is divided into 12 parts, this attribute indicates\nthe relative space the container occupies on device-types larger than\nmobile. It is expressed as an integer from 1 through 12."
            },
            "medium-device-size": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If the viewport is divided into 12 parts, this attribute indicates\nthe relative space the container occupies on device-types larger than\ntablet. It is expressed as an integer from 1 through 12."
            },
            "large-device-size": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If the viewport is divided into 12 parts, this attribute indicates\nthe relative space the container occupies on device-types larger than\ndesktop. It is expressed as an integer from 1 through 12."
            }
        },
        "description": "The basic element in a lightning-layout component.\nA layout item groups information together to define visual grids, spacing, and sections.",
        "access": "global"
    },
    "lightning-map": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "show-footer": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "If present, the footer element is displayed below the map.\nThe footer shows an 'Open in Google Maps' link that opens an external window\nto display the selected marker location in Google Maps. Default value is false."
            },
            "list-view": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "auto",
                "description": "Displays or hides the list of locations. Valid values are visible, hidden, or auto.\nThis value defaults to auto, which shows the list only when multiple markers are present.\nPassing in an invalid value hides the list view."
            },
            "zoom-level": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The zoom levels as defined by Google Maps API.\nIf a zoom level is not specified, a default zoom level is applied to accommodate all markers on the map."
            },
            "center": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A location to use as the map's center.\nIf center is not specified, the map centers automatically."
            },
            "markers-title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Provides the heading title for the markers. Required if specifying multiple markers.\nThe title is displayed below the map as a header for the list of clickable addresses."
            },
            "map-markers": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "One or more objects with the address or latitude and longitude to be displayed on the map.\nIf latitude and longitude are provided, the address is ignored."
            }
        },
        "description": "Displays a map with markers for one or more locations.",
        "access": "global"
    },
    "lightning-menu-item": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A value associated with the menu item."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text of the menu item."
            },
            "icon-name": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The name of an icon to display after the text of the menu item.",
                "values": iconNames
            },
            "prefix-icon-name": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The name of an icon to display before the text of the menu item.",
                "values": iconNames
            },
            "href": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "URL for a link to use for the menu item."
            },
            "draft-alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Describes the reason for showing the draft indicator.\nThis is required when is-draft is present on the lightning-menu-item tag."
            },
            "is-draft": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, a draft indicator is shown on the menu item.\nA draft indicator is denoted by blue asterisk on the left of the menu item.\nWhen you use a draft indicator, include alternative text for accessibility using draft-alternative-text."
            },
            "access-key": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The keyboard shortcut for the menu item."
            },
            "tab-index": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.\ntabindex can be set to 0 or -1.\nThe default tabindex value is 0, which means that the menu item is focusable and\nparticipates in sequential keyboard navigation. The value -1 means\nthat the menu item is focusable but does not participate in keyboard navigation."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the menu item is disabled and users cannot interact with it."
            },
            "checked": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, a check mark displays on the left of the menu item if it's selected."
            }
        },
        "description": "Represents a list item in a menu.",
        "access": "global"
    },
    "lightning-navigation": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": null,
        "access": "global"
    },
    "lightning-output-field": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "field-class": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A CSS class for the outer element, in addition to the component's base classes."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Changes the appearance of the output. Accepted variants\ninclude standard and label-hidden. This value defaults to standard."
            },
            "field-name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The API name of the field to be displayed."
            }
        },
        "description": "Represents a read-only display of a label, help text, and value for a field on a Salesforce object.",
        "access": "global"
    },
    "lightning-pill": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "href": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The URL of the page that the link goes to."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text label that displays in the pill."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The name for the pill. This value is optional and can be used to identify the pill in a callback."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the pill.\nAccepted variants include link, plain, and plainLink.\nThe default variant is link, which creates a link in the pill when you specify the href attribute.\nThe plain variant renders the pill without a link and ignores the href attribute.\nThe plainLink variant is reserved for internal use."
            },
            "has-error": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the pill is shown with a red border and an error icon on the left of the label."
            },
            "is-plain-link": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Specifies whether the element variant is a plain link."
            },
            "tab-index": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Use tabindex instead to indicate if an element should be focusable.\nA value of 0 means that the pill is focusable and\nparticipates in sequential keyboard navigation. A value of -1 means\nthat the pill is focusable but does not participate in keyboard navigation."
            },
            "aria-selected": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the aria-selected of an element."
            },
            "role": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the role of an element."
            }
        },
        "description": "A pill displays a label that can contain links and can be removed from view.",
        "access": "global"
    },
    "lightning-pill-container": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Aria label for the pill container."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "bare"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the pill container. Accepted variants\ninclude standard and bare. This value defaults to standard."
            },
            "single-line": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies whether to keep the pills in a single line."
            },
            "is-collapsible": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies whether the pill container can be collapsed."
            },
            "is-expanded": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies whether the pill container is expanded."
            },
            "items": {
                "type": "Object",
                "access": "global",
                "required": false,
                "default": "",
                "description": "An array of items to be rendered as pills in a container."
            }
        },
        "description": "A list of pills grouped in a container. This component requires API version 42.0 and later.",
        "access": "global"
    },
    "lightning-platform-resource-loader": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": null,
        "access": "global"
    },
    "lightning-platform-show-toast-event": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": null,
        "access": "global"
    },
    "lightning-progress-bar": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "0",
                "description": "The percentage value of the progress bar."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the progress bar.\nAccepted variants include base or circular.\nThis value defaults to base."
            },
            "size": {
                "type": "Picklist",
                "values": [
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The size of the progress bar.\nValid values are x-small, small, medium, and large.\nThe default value is medium."
            }
        },
        "description": "Displays a horizontal progress bar from left to right to indicate the progress of an operation.",
        "access": "global"
    },
    "lightning-progress-indicator": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "type": {
                "type": "Picklist",
                "values": [
                    "base",
                    "path"
                ],
                "access": "global",
                "required": false,
                "default": "base",
                "description": "Changes the visual pattern of the indicator. Valid values are base and path.\nThe default is base."
            },
            "variant": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "base",
                "description": "Changes the appearance of the progress indicator for the base type only.\nValid values are base or shaded. The shaded variant adds a light gray border to the step indicators.\nThe default is base."
            },
            "current-step": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Set current-step to match the value attribute of one of progress-step components.\nIf current-step is not provided, the value of the first progress-step component is used."
            },
            "has-error": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "If present, the current step is in error state and a warning icon is displayed on the step indicator.\nOnly the base type can display errors."
            }
        },
        "description": "Provides a visual indication on the progress of a particular process.",
        "access": "global"
    },
    "lightning-radio-group": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "type": {
                "type": "Picklist",
                "values": [
                    "radio",
                    "button"
                ],
                "access": "global",
                "required": false,
                "default": "radio",
                "description": "The style of the radio group. Options are radio or button. The default is radio."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Text label for the radio group."
            },
            "options": {
                "type": "List",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Array of label-value pairs for each radio button."
            },
            "message-when-value-missing": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Optional message displayed when no radio button is selected and the required attribute is set to true."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the name of the radio button group. Only only one button can be selected if a name is specified\nfor the group."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the value of the selected radio button."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the radio group is disabled and users cannot interact with it."
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, a radio button must be selected before the form can be submitted."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "label-hidden",
                    "label-inline",
                    "label-stacked"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the radio group.\nAccepted variants include standard, label-hidden, label-inline, and label-stacked.\nThis value defaults to standard.\nUse label-hidden to hide the label but make it available to assistive technology.\nUse label-inline to horizontally align the label and radio group.\nUse label-stacked to place the label above the radio group."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states that an element can be in, with respect to constraint validation."
            }
        },
        "description": "A radio button group that can have a single option selected.",
        "access": "global"
    },
    "lightning-record-edit-form": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "field-names": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Reserved for internal use. Names of the fields to include in the form."
            },
            "record-type-id": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The ID of the record type, which is required if you created\nmultiple record types but don't have a default."
            },
            "form-class": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A CSS class for the form element."
            },
            "layout-type": {
                "type": "Picklist",
                "values": [
                    "Compact",
                    "Full"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The type of layout to use to display the form fields. Possible values: Compact, Full."
            },
            "density": {
                "type": "Picklist",
                "values": [
                    "compact",
                    "comfy",
                    "auto"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Sets the arrangement style of fields and labels in the form.\nAccepted values are compact, comfy, and auto (default).\nUse compact to display fields and their labels on the same line.\nUse comfy to display fields below their labels.\nUse auto to let the component dynamically set\nthe density according to the user's Display Density setting\nand the width of the form."
            },
            "record-id": {
                "type": "TrackObject",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The ID of the record to be displayed."
            },
            "object-api-name": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The API name of the object."
            }
        },
        "description": "Represents a record edit layout that displays one or more fields, provided by lightning-input-field.",
        "access": "global"
    },
    "lightning-record-form": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "record-type-id": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The ID of the record type, which is required if you created\nmultiple record types but don't have a default."
            },
            "mode": {
                "type": "Picklist",
                "values": [
                    "view",
                    "edit",
                    "readonly"
                ],
                "access": "global",
                "required": false,
                "default": "view",
                "description": "Specifies the interaction and display style for the form.\nPossible values: view, edit, readonly.\nIf a record ID is not provided, the default mode is edit, which displays a form to create new records.\nIf a record ID is provided, the default mode is view, which displays field values with edit icons on updateable fields."
            },
            "layout-type": {
                "type": "Picklist",
                "values": [
                    "Compact",
                    "Full"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The type of layout to use to display the form fields. Possible values: Compact, Full.\nWhen creating a new record, only the full layout is supported."
            },
            "density": {
                "type": "Picklist",
                "values": [
                    "compact",
                    "comfy",
                    "auto"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Sets the arrangement style of fields and labels in the form.\nAccepted values are compact, comfy, and auto (default).\nUse compact to display fields and their labels on the same line.\nUse comfy to display fields below their labels.\nUse auto to let the component dynamically set\nthe density according to the user's Display Density setting\nand the width of the form."
            },
            "record-id": {
                "type": "TrackObject",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The ID of the record to be displayed."
            },
            "object-api-name": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The API name of the object."
            },
            "columns": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the number of columns for the form."
            },
            "fields": {
                "type": "List",
                "access": "global",
                "required": false,
                "default": "",
                "description": "List of fields to be displayed. The fields display in the order you list them."
            }
        },
        "description": "Creates an editable form or display form for a record.",
        "access": "global"
    },
    "lightning-record-view-form": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "density": {
                "type": "Picklist",
                "values": [
                    "compact",
                    "comfy",
                    "auto"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "Sets the arrangement style of fields and labels in the form.\nAccepted values are compact, comfy, and auto (default).\nUse compact to display fields and their labels on the same line.\nUse comfy to display fields below their labels.\nUse auto to let the component dynamically set\nthe density according to the user's Display Density setting\nand the width of the form."
            },
            "record-id": {
                "type": "TrackObject",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The ID of the record to be displayed."
            },
            "object-api-name": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The API name of the object."
            }
        },
        "description": "Represents a record view layout that displays one or more fields, provided by lightning-output-field.",
        "access": "global"
    },
    "lightning-relative-date-time": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The timestamp or JavaScript Date object to be formatted."
            }
        },
        "description": "Displays the relative time difference between the source date-time and the provided date-time.",
        "access": "global"
    },
    "lightning-slider": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "size": {
                "type": "Picklist",
                "values": [
                    "xx-small",
                    "x-small",
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The size of the slider.\nThe default is an empty string, which sets the slider to the width of the viewport. Accepted values are x-small, small, medium, and large."
            },
            "type": {
                "type": "Picklist",
                "values": [
                    "vertical",
                    "horizontal"
                ],
                "access": "global",
                "required": false,
                "default": "horizontal",
                "description": "The type determines the orientation of the slider. Accepted values are vertical and horizontal. The default is horizontal."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Text label to describe the slider. Provide your own label to describe the slider."
            },
            "message-when-range-overflow": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a range overflow is detected."
            },
            "message-when-range-underflow": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a range underflow is detected."
            },
            "message-when-step-mismatch": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a step mismatch is detected."
            },
            "message-when-value-missing": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is missing."
            },
            "message-when-too-long": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is too long."
            },
            "message-when-bad-input": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a bad input is detected."
            },
            "message-when-pattern-mismatch": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a pattern mismatch is detected."
            },
            "message-when-type-mismatch": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a type mismatch is detected."
            },
            "min": {
                "type": "Number",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum value of the input range. The default is 0."
            },
            "max": {
                "type": "Number",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum value of the input range. The default is 100."
            },
            "step": {
                "type": "Number",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The step increment value of the input range.\nExample steps include 0.1, 1, or 10. The default is 1."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the slider is disabled and users cannot interact with it."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the slider.\nAccepted variants include standard and label-hidden.\nThe default is standard."
            },
            "value": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The numerical value of the slider. The default is 0."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states of the slider input, with respect to constraint validation."
            }
        },
        "description": "An input range slider for specifying a value between two specified numbers.",
        "access": "global"
    },
    "lightning-spinner": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The alternative text used to describe the reason for the wait and need for a spinner."
            },
            "size": {
                "type": "Picklist",
                "values": [
                    "small",
                    "medium",
                    "large"
                ],
                "access": "global",
                "required": false,
                "default": "medium",
                "description": "The size of the spinner. Accepted sizes are small, medium, and large. This value defaults to medium."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "base",
                    "brand",
                    "inverse"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the spinner.\nAccepted variants include base, brand, and inverse. The default is base."
            }
        },
        "description": "Displays an animated spinner.",
        "access": "global"
    },
    "lightning-tab": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The optional string to be used during tabset's select event to determine which tab was clicked.\nThis string is also used by active-tab-value in tabset to open a tab."
            },
            "label": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The text displayed in the tab header."
            },
            "title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies text that displays in a tooltip over the tab content."
            },
            "icon-name": {
                "type": "Picklist",
                "values": iconNames,
                "access": "global",
                "required": false,
                "default": "",
                "description": "The Lightning Design System name of an icon to display to the left of the tab label.\nSpecify the name in the format 'utility:down' where 'utility' is the category, and\n'down' is the icon to be displayed. Only utility icons can be used."
            },
            "icon-assistive-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The alternative text for the icon specified by icon-name."
            },
            "show-error-indicator": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies whether there's an error in the tab content.\nAn error icon is displayed to the right of the tab label."
            }
        },
        "description": "A single tab in a tabset component.",
        "access": "global"
    },
    "lightning-tabset": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "title": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Displays tooltip text when the mouse moves over the tabset."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "scoped",
                    "vertical"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the tabset. Accepted variants are standard, scoped, and vertical."
            },
            "active-tab-value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Sets a specific tab to open by default using a string that matches a tab's value string. If not used, the first tab opens by default."
            }
        },
        "description": "Represents a list of tabs.",
        "access": "global"
    },
    "lightning-textarea": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "Text that describes the textarea input field."
            },
            "placeholder": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text that is displayed when the field is empty,\nto prompt the user for a valid entry."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Specifies the name of an input element."
            },
            "message-when-bad-input": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when a bad input is detected."
            },
            "message-when-too-short": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is too short."
            },
            "message-when-too-long": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is too long."
            },
            "message-when-value-missing": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Error message to be displayed when the value is missing."
            },
            "access-key": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The keyboard shortcut for input field."
            },
            "max-length": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum number of characters allowed in the textarea."
            },
            "min-length": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum number of characters allowed in the textarea."
            },
            "value": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The value of the textarea input, also used as the default value during init."
            },
            "disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the textarea field is disabled and users cannot interact with it."
            },
            "read-only": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the textarea field is read-only and cannot be edited."
            },
            "required": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the textarea field must be filled out before the form can be submitted."
            },
            "variant": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "label-hidden",
                    "label-inline",
                    "label-stacked"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The variant changes the appearance of the textarea.\nAccepted variants include standard, label-hidden, label-inline, and label-stacked.\nThis value defaults to standard.\nUse label-hidden to hide the label but make it available to assistive technology.\nUse label-inline to horizontally align the label and textarea.\nUse label-stacked to place the label above the textarea."
            },
            "validity": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Represents the validity states of the textarea input, with respect to constraint validation."
            },
            "field-level-help": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The help text that appears in a popover.\nSet field-level help to provide an informational tooltip on the textarea input field."
            }
        },
        "description": "Represents a multiline text input field.",
        "access": "global"
    },
    "lightning-tile": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text label that displays in the tile as the heading and hover text."
            },
            "href": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The URL of the page that the link goes to."
            },
            "actions": {
                "type": "List",
                "access": "global",
                "required": false,
                "default": "",
                "description": "A list of actions that's displayed in a dropdown menu."
            },
            "type": {
                "type": "Picklist",
                "values": [
                    "standard",
                    "media"
                ],
                "access": "global",
                "required": false,
                "default": "",
                "description": "The tile type. Valid values are 'standard' and 'media'.\nThe default is 'standard'."
            }
        },
        "description": "A grouping of related information associated with a record.",
        "access": "global"
    },
    "lightning-tree": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "header": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The text that's displayed as the tree heading."
            },
            "items": {
                "type": "List",
                "access": "global",
                "required": false,
                "default": "",
                "description": "An array of key-value pairs that describe the tree. See the Documentation tab for more information."
            }
        },
        "description": "Displays a nested tree.",
        "access": "global"
    },
    "lightning-tree-grid": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "hide-checkbox-column": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "If present, the checkbox column for row selection is hidden."
            },
            "is-loading": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "If present, a spinner is displayed to indicate that more data is being loaded."
            },
            "key-field": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Required for better performance. Associates each row with a unique ID."
            },
            "max-column-width": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The maximum width for all columns. The default is 1000px."
            },
            "min-column-width": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The minimum width for all columns. The default is 50px."
            },
            "resize-column-disabled": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "If present, column resizing is disabled."
            },
            "row-number-offset": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Determines where to start counting the row number. The default is 0."
            },
            "selected-rows": {
                "type": "List",
                "access": "global",
                "required": false,
                "default": "[]",
                "description": "The array of unique row IDs that are selected."
            },
            "show-row-number-column": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "false",
                "description": "If present, the row number column are shown in the first column."
            },
            "columns": {
                "type": "List",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Array of the columns object that's used to define the data types.\nRequired properties include 'label', 'fieldName', and 'type'. The default type is 'text'.\nSee the Documentation tab for more information."
            },
            "data": {
                "type": "List",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The array of data to be displayed."
            },
            "expanded-rows": {
                "type": "List",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The array of unique row IDs for rows that are expanded."
            }
        },
        "description": "Displays a hierarchical view of data in a table.",
        "access": "global"
    },
    "lightning-ui-list-api": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": null,
        "access": "global"
    },
    "lightning-ui-object-info-api": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": null,
        "access": "global"
    },
    "lightning-ui-record-api": {
        "simple": false,
        "type": "lwc",
        "attribs": {},
        "description": null,
        "access": "global"
    },
    "lightning-vertical-navigation": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "compact": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, spacing between navigation items is reduced."
            },
            "shaded": {
                "type": "Boolean",
                "access": "global",
                "required": false,
                "default": "",
                "description": "If present, the vertical navigation is displayed on top of a shaded background."
            },
            "selected-item": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Name of the navigation item to make active.\nAn active item is highlighted in blue."
            }
        },
        "description": "A vertical list of links that either take the user to another page or parts of the page the user is in.",
        "access": "global"
    },
    "lightning-vertical-navigation-item": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text displayed for the navigation item."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "A unique identifier for the navigation item.\nThe name is used by the `select` event on lightning-vertical-navigation to identify which item is selected."
            },
            "href": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The URL of the page that the navigation item goes to."
            }
        },
        "description": "A text-only link within lightning-vertical-navigation-section or lightning-vertical-navigation-overflow.",
        "access": "global"
    },
    "lightning-vertical-navigation-item-badge": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text displayed for this navigation item."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "A unique identifier for this navigation item."
            },
            "badge-count": {
                "type": "Integer",
                "access": "global",
                "required": false,
                "default": "0",
                "description": "The number to show inside the badge. If this value is zero, the badge is hidden.\nThe default value is zero."
            },
            "assistive-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Assistive text describing the number in the badge, which enhances accessibility and is not displayed to the user.\nThe default is \"New Items\"."
            },
            "href": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The URL of the page that the navigation item goes to."
            }
        },
        "description": "A link and badge within lightning-vertical-navigation-section or lightning-vertical-navigation-overflow.",
        "access": "global"
    },
    "lightning-vertical-navigation-item-icon": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "label": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "The text displayed for this navigation item."
            },
            "name": {
                "type": "String",
                "access": "global",
                "required": true,
                "default": "",
                "description": "A unique identifier for this navigation item."
            },
            "icon-name": {
                "type": "Picklist",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The Lightning Design System name of the icon.\nNames are written in the format 'utility:down' where 'utility' is the category,\nand 'down' is the specific icon to be displayed.",
                "values": iconNames
            },
            "href": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The URL of the page that the navigation item goes to."
            }
        },
        "description": "A link and icon within lightning-vertical-navigation-section or lightning-vertical-navigation-overflow.",
        "access": "global"
    },
    "lightningsnapin-base-chat-message": {
        "attribs": {
            "message-content": {
                "type": "",
                "description": "Message content based on the concrete type of the chat message.",
                "access": "global",
                "required": false
            },
            "user-type": {
                "type": "",
                "description": "The user type, which is either \"agent\" or \"chasitor\".",
                "access": "global",
                "required": false
            }
        },
        "simple": false,
        "type": "lwc",
        "description": null,
        "access": "global"
    },
    "sfdc:sobjects": {
        "attribs": {},
        "simple": false,
        "type": "aura"
    },
    "sfdc:sobject": {
        "attribs": {},
        "simple": false,
        "type": "aura"
    },
    "aura:application": {
        "attribs": {
            "access": {
                "type": "Picklist",
                "values": [
                    "public",
                    "global"
                ]
            },
            "controller": {
                "description": "The server-side controller class for the app. The format is namespace.myController.",
                "type": "String"
            },
            "description": {
                "type": "String"
            },
            "extends": {
                "type": "Picklist",
                "values": [
                    "force:slds"
                ]
            },
            "extensible": {
                "type": "Boolean",
                "description": "Indicates whether the app is extensible by another app. Defaults to false."
            },
            "template": {
                "type": "Component"
            },
            "tokens": {
                "type": "String"
            },
            "implements": {
                "type": "String"
            },
            "useAppcache": {
                "type": "Boolean"
            }
        },
        "simple": false,
        "type": "aura"
    },
    "aura:attribute": {
        "attribs": {
            "access": {
                "type": "Picklist",
                "values": [
                    "public",
                    "global",
                    "private"
                ]
            },
            "default": {
                "type": "String"
            },
            "description": {
                "type": "String"
            },
            "name": {
                "type": "String"
            },
            "required": {
                "type": "Boolean"
            },
            "type": {
                "type": "Picklist",
                "supportSobjects": true,
                "values": [
                    "Boolean",
                    "Date",
                    "DateTime",
                    "Decimal",
                    "Double",
                    "Integer",
                    "Long",
                    "String",
                    "Method",
                    "Object",
                    "String[]",
                    "Integer[]",
                    "Map",
                    "List",
                    "Set",
                    "Aura.Action",
                    "Aura.Component",
                    "Aura.Component[]"
                ]
            }
        },
        "simple": false,
        "type": "aura"
    },
    "design:attribute": {
        "attribs": {
            "default": {
                "type": "String"
            },
            "description": {
                "type": "String"
            },
            "name": {
                "type": "String"
            },
            "required": {
                "type": "Boolean"
            }
        },
        "simple": false,
        "type": "aura"
    },
    "aura:dependency": {
        "attribs": {
            "resource": {
                "type": "String",
                "values": [
                    "markup://sampleNamespace:sampleComponent",
                    "markup://sampleNamespace:*",
                    "markup://sampleNamespace:input*"
                ]
            },
            "type": {
                "type": "Picklist",
                "values": [
                    "COMPONENT",
                    "APPLICATION",
                    "EVENT",
                    "INTERFACE"
                ]
            }
        },
        "simple": false,
        "type": "aura"
    },
    "aura:event": {
        "attribs": {
            "access": {
                "type": "Picklist",
                "values": [
                    "public",
                    "global"
                ]
            },
            "description": {
                "type": "String"
            },
            "extends": {
                "type": "String",
                "values": [
                    "namespace:myEvent"
                ]
            },
            "type": {
                "type": "Picklist",
                "values": [
                    "COMPONENT",
                    "APPLICATION"
                ]
            }
        },
        "simple": false,
        "type": "aura"
    },
    "aura:handler": {
        "attribs": {
            "action": {
                "type": "Object"
            },
            "event": {
                "type": "Picklist",
                "values": [
                    "${1:Customize}",
                    "aura:doneRendering",
                    "aura:doneWaiting",
                    "aura:locationChange",
                    "aura:systemError",
                    "aura:valueChange",
                    "aura:valueDestroy",
                    "aura:valueInit",
                    "aura:valueRender",
                    "aura:waiting"
                ]
            },
            "name": {
                "type": "text"
            },
            "value": {
                "type": "String"
            },
            "includeFacets": {
                "type": "Boolean"
            },
            "phase": {
                "type": "Picklist",
                "values": [
                    "bubble",
                    "capture"
                ]
            }
        },
        "simple": false,
        "type": "aura"
    },
    "aura:interface": {
        "attribs": {
            "access": {
                "type": "Picklist",
                "values": [
                    "public",
                    "global"
                ]
            },
            "description": {
                "type": "String"
            },
            "extends": {
                "type": "String",
                "values": [
                    "namespace:myEvent"
                ]
            }
        },
        "simple": false,
        "type": "aura"
    },
    "aura:method": {
        "attribs": {
            "access": {
                "type": "Picklist",
                "values": [
                    "public",
                    "global"
                ]
            },
            "action": {
                "type": "Expression",
                "values": [
                    "{!c.$0}",
                    "{!}"
                ]
            },
            "description": {
                "type": "String"
            },
            "name": {
                "description": "The method name. Use the method name to call the method in JavaScript code",
                "type": "String"
            }
        },
        "simple": false,
        "type": "aura"
    },
    "aura:registerEvent": {
        "attribs": {
            "name": {
                "type": "text"
            },
            "type": {
                "type": "Picklist",
                "values": [
                    "ui:expand",
                    "ui:collapse",
                    "ui:menuFocusChange",
                    "ui:menuSelect",
                    "ui:menuTriggerPress",
                    "c:${1:MyEvent}"
                ]
            }
        },
        "simple": false,
        "type": "aura"
    },
    "aura:set": {
        "attribs": {
            "attribute": {
                "type": "String"
            },
            "value": {
                "type": "String"
            }
        },
        "simple": false,
        "type": "aura"
    },
    "auraStorage:init": {
        "attribs": {
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]"
            },
            "clearStorageOnInit": {
                "description": "Set to true to delete all previous data on initialization (relevant for persistent storage only). This value defaults to true.",
                "type": "Boolean"
            },
            "debugLoggingEnabled": {
                "description": "Set to true to enable debug logging with $A.log(). This value defaults to false.",
                "type": "Boolean"
            },
            "defaultAutoRefreshInterval": {
                "description": "The default duration (seconds) before an auto refresh request will be initiated. Actions may override this on a per-entry basis with Action.setStorable(). This value defaults to 30.",
                "type": "Integer"
            },
            "defaultExpiration": {
                "description": "The default duration (seconds) that an object will be retained in storage. Actions may override this on a per-entry basis with Action.setStorable(). This value defaults to 10.",
                "type": "Integer"
            },
            "maxSize": {
                "description": "Maximum size (KB) of the storage instance. Existing items will be evicted to make room for new items; algorithm is adapter-specific. This value defaults to 1000. ",
                "type": "Integer"
            },
            "name": {
                "description": "The programmatic name for the storage instance.",
                "type": "String"
            },
            "persistent": {
                "description": "Set to true if this storage desires persistence. This value defaults to false.",
                "type": "Boolean"
            },
            "secure": {
                "description": "Set to true if this storage requires secure storage support. This value defaults to false.",
                "type": "Boolean"
            },
            "version": {
                "description": "Version to associate with all stored items.",
                "type": "String"
            }
        },
        "simple": false,
        "type": "aura"
    },
    "force:recordPreview": {
        "attribs": {
            "fields": {
                "description": "List of fields to query. This attribute or layoutType must be specified. If you specify both, the list of fields queried is the union of fields from fields and layoutType.",
                "type": "String[]"
            },
            "ignoreExistingAction": {
                "description": "Whether to skip the cache and force a server request. Defaults to false.Setting this attribute to true is useful for handling user-triggered actions such as pull-to-refresh.",
                "type": "Boolean"
            },
            "layoutType": {
                "description": "Name of the layout to query, which determines the fields included",
                "type": "String"
            },
            "mode": {
                "description": "The mode in which to access the record. Valid values are the following. -VIEW -EDIT. Defaults to VIEW.",
                "type": "Picklist",
                "values": [
                    "VIEW",
                    "EDIT"
                ]
            },
            "recordId": {
                "description": "The 15-character or 18-character ID of the record to load, modify, or delete. Defaults to null, to create a record.",
                "type": "String"
            },
            "recordUpdated": {
                "description": "The event fired when the record is loaded, changed, updated, or removed.",
                "type": "COMPONENT"
            },
            "targetError": {
                "description": "A reference to a component attribute to which a localized error message is assigned if necessary.",
                "type": "String"
            },
            "targetRecord": {
                "description": "A reference to a component attribute, to which the loaded record is assigned.Changes to the record are also assigned to this value, which triggers change handlers, re-renders, and so on.",
                "type": "Record"
            }
        },
        "simple": false,
        "type": "aura"
    },
    "lightning:progressStep": {
        "attribs": {
            "label": {
                "type": "String"
            },
            "value": {
                "type": "String"
            }
        },
        "simple": false,
        "type": "aura"
    },
    "lightning:tabSet": {
        "attribs": {
            "body": {
                "description": "The body of the component. This could be one or more lightning:tab components.",
                "type": "ComponentDefRef[]"
            },
            "class": {
                "description": "A CSS class for the outer element, in addition to the component's base classes.",
                "type": "String"
            },
            "onselect": {
                "description": "The action that will run when the tab is clicked.",
                "type": "Action"
            },
            "selectedTabId": {
                "description": "Allows you to set a specific tab to open by default. If this attribute is not used, the first tab opens by default.",
                "type": "String"
            },
            "variant": {
                "description": "The variant changes the appearance of the tabset. Accepted variants are default and scoped.",
                "type": "Picklist",
                "values": [
                    "default",
                    "scoped"
                ]
            }
        },
        "simple": false,
        "type": "aura"
    },
    "ui:spinner": {
        "attribs": {
            "aura:id": {
                "type": "String"
            },
            "body": {
                "description": "The body of the component. In markup, this is everything in the body of the tag.",
                "type": "Component[]"
            },
            "isVisible": {
                "description": "Specifies whether or not this spinner should be visible. Defaults to true.",
                "type": "Boolean"
            },
            "toggleLoadingIndicator": {
                "description": "Change the visibility of a ui:spinner component.",
                "type": "COMPONENT"
            }
        },
        "simple": false,
        "type": "aura"
    },
    "template": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "for:each": {
                "type": "TrackObject",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Use this directive to iterate over an array and render a list."
            },
            "for:item": {
                "type": "TrackObject",
                "access": "global",
                "required": false,
                "default": "",
                "description": ""
            },
            "if:true": {
                "type": "TrackObject",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Use this directive to conditionally render DOM elements in a template."
            },
            "if:false": {
                "type": "TrackObject",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Use this directive to conditionally render DOM elements in a template."
            },
            "key": {
                "type": "TrackObject",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Use this directive to improve rendering performance by assigning a unique identifier to each item in a list. The key must be a string or a number, it can\u2019t be an object. The engine uses the keys to determine which items have changed."
            },
            "lwc:dom": {
                "type": "TrackObject",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Add this directive to a native HTML element to call appendChild() on the element from the owner\u2019s JavaScript class and preserve styling."
            }
        }
    },
    "lightning-carousel-image": {
        "simple": false,
        "type": "lwc",
        "attribs": {
            "src": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "The path to the image."
            },
            "header": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "",
                "description": "Text for the label that's displayed under the image."
            },
            "description": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "5",
                "description": "Text displayed under the header."
            },
            "alternative-text": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "5",
                "description": "Assistive text for the image."
            },
            "href": {
                "type": "String",
                "access": "global",
                "required": false,
                "default": "5",
                "description": "A URL to create a link for the image. Clicking the image opens the link in the same frame."
            }
        }
    }
};