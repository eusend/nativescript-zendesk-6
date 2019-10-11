import { Component, AfterViewInit } from "@angular/core";
import { InitConfig, ZendeskSdk } from "nativescript-zendesk-monety";

const ZENDESK_APP_ID = "dc7a21824e1596be8a4a75891e10461ca74d79e51fbb944d"
const ZENDESK_URL = "https://nativescript-sdk.zendesk.com"
const ZENDESK_CLIENT_ID = "mobile_sdk_client_f9d6dd75b827d16cc820"

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
