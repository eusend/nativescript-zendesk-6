<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <StackLayout class="page">
          <Button text="Help Center" @tap="onHelpCenter"></Button>
          <Button text="Contact List" @tap="onContactList"></Button>
          <Button text="Request" @tap="onCreateContactRequest"></Button>
        </StackLayout>
    </Page>
</template>

<script lang="ts">
import { InitConfig, ZendeskSdk } from "nativescript-zendesk-monety";

const ZENDESK_APP_ID = "dc7a21824e1596be8a4a75891e10461ca74d79e51fbb944d"
const ZENDESK_URL = "https://nativescript-sdk.zendesk.com"
const ZENDESK_CLIENT_ID = "mobile_sdk_client_f9d6dd75b827d16cc820"

  export default {
    mpunted(){
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
    },
    methods: {
      onHelpCenter(): void {
        console.log("onHelpCenter")
        try {
          ZendeskSdk.showHelpCenter()
        } catch(e) {
          console.error(e)
        }
      },

      onContactList(): void {
          console.log("openContactList")
          ZendeskSdk.showRequestList()
      },

      onCreateContactRequest(): void {
          console.log("createContactRequest")
          ZendeskSdk.createRequest()
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
