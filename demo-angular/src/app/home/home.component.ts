import { Component, AfterViewInit } from "@angular/core";
import { InitConfig, ZendeskSdk } from "nativescript-zendesk-monety";

const ZENDESK_APP_ID = "062ab7d4a255eeab9935f92bd44154552ffd22cfc2882807"
const ZENDESK_URL = "https://monety.zendesk.com"
const ZENDESK_CLIENT_ID = "mobile_sdk_client_253b169cff7ee13e7455"

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements AfterViewInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngAfterViewInit(): void {
        const initConfig: InitConfig = {
            applicationId: ZENDESK_APP_ID,
            zendeskUrl: ZENDESK_URL,
            clientId: ZENDESK_CLIENT_ID
        };
        ZendeskSdk.initialize(initConfig);
        ZendeskSdk.setAnonymousIdentity({
            name: "test",
            email: "test@gmail.com"
        });
    
        ZendeskSdk.setIosTheme({
            primaryColor: "red"
        });
    }
    
    onHelpCenter(): void {
        console.log("onHelpCenter")
        ZendeskSdk.showHelpCenter()
    }

    onContactList(): void {
        console.log("openContactList")
        ZendeskSdk.showRequestList()
    }

    onCreateContactRequest(): void {
        console.log("createContactRequest")
        ZendeskSdk.createRequest()
    }
}
