import { Component, OnInit } from "@angular/core";
import { ZendeskMonety } from 'nativescript-zendesk-monety';

const ZENDESK_APP_ID = "062ab7d4a255eeab9935f92bd44154552ffd22cfc2882807"
const ZENDESK_URL = "https://monety.zendesk.com"
const ZENDESK_CLIENT_ID = "mobile_sdk_client_253b169cff7ee13e7455"

const zendesk = new ZendeskMonety();

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        console.log("All good")
        zendesk.init({
            appId: ZENDESK_APP_ID,
            url: ZENDESK_URL,
            clientId: ZENDESK_CLIENT_ID,
            ticketSubject: "ticket",
            loggingEnabled: true,
            anonymous: false,
            additionalInfo: "nope",
            locale: "en"
        })
        zendesk.identifyUser("dummy_id", "some name", "an@email.com")
    }
    
    onHelpCenter(): void {
        console.log("onHelpCenter")
        zendesk.openHelpCenter()
    }

    onContactList(): void {
        console.log("openContactList")
        zendesk.openContactList()
    }

    onCreateContactRequest(): void {
        console.log("createContactRequest")
        zendesk.createContactRequest()
    }
}
