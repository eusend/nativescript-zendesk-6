import { android as androidApp } from "tns-core-modules/application"
import * as utils from "tns-core-modules/utils/utils"
import { Common, User, ZendeskAccount, ZendeskAccountConfig, OpenHelpCenterOptions } from './zendesk-monety.common';

declare var com: any

// const ZENDESK_APP_ID = getEnv("ZENDESK_APP_ID") || "062ab7d4a255eeab9935f92bd44154552ffd22cfc2882807"
// const ZENDESK_URL = getEnv("ZENDESK_URL") || "https://monety.zendesk.com"
// const ZENDESK_CLIENT_ID = getEnv("ZENDESK_CLIENT_ID") || "mobile_sdk_client_253b169cff7ee13e7455"

// let zendesk = null

// const LOCALES = {
//   'en': 'en-us',
//   'es': 'es'
// }
// export function initZendesk(locale = 'en', ticketSubject = "Monety Support"){
//   zendesk = zendeskModule.init({
//       appId: ZENDESK_APP_ID,
//       url: ZENDESK_URL,
//       clientId: ZENDESK_CLIENT_ID,
//       enableLogging: true,
//       locale: LOCALES[locale],
//       ticketSubject: ticketSubject
//   })

export class ZendeskMonety extends Common {
    public user: User
    public account: ZendeskAccount

    public identifyUser(id: string, name: string, email: string){
        this.user = new User(id, name, email)
    }

    public init(config: ZendeskAccountConfig){
        this.account = new ZendeskAccount(config)
    }

    public logging(): boolean {
        return this.account && this.account.loggingEnabled
    }

    public async openHelpCenter(opts: OpenHelpCenterOptions = null): Promise<boolean> {
        if(this.account.initialized) {
            const activity = androidApp.foregroundActivity
            // const activity = this
            const account = this.account
            // TODO: Implement
            // if(this.account.locale !== "" && this.account.locale !== null){
            //     //var locale = new java.util.Locale(account.locale);
            //     //com.zendesk.com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setDeviceLocale(locale);
            // }
            const MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
                onSuccess: function(){
                    if(account.anonymous){
                        this.loadAnonUser()
                    }
                    
                    const builder = new com.zendesk.sdk.support.SupportActivity.Builder()
                    console.log("builder", builder)
                    builder.showContactUsButton(true)
                    
                    if(opts === null){
                        builder.listCategories()
                    } else {
                        // const name = (opts.name) ? opts.name : null
                        
                        switch(opts.type){
                            case "Category":
                                builder.listSections(opts.id)
                                break;
                            case "Section":
                                builder.listArticles(opts.id)
                                break;
                            default:
                                builder.listCategories()
                                break;   
                        }
                    }

                    try {
                        builder.show(activity)
                        console.log("Ta da??")
                    } catch(e) {
                        console.error(e)
                    }
                    
                },
                onError: function(error){
                    console.log(error)
                }
            });
            initSdk(this.account, activity, new MyZendeskCallback())
            return true
        } else {
            notInitialized()
            return false
        }
    }

    public async openContactList(): Promise<boolean> {
        if(this.account.initialized){
            const activity = androidApp.foregroundActivity
            const account = this.account
            
            // if(this.account.locale !== "" && this.account.locale !== null){
            //     //var locale = new java.util.Locale(account.locale);
            //     //com.zendesk.com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setDeviceLocale(locale);
            // }
           
            const MyZendeskCallback = com.zendesk.service.ZendeskCallback.extend({
                onSuccess: function(args){
                    if(account.anonymous){
                        this.loadAnonUser()
                    }

                    try {
                        var intent = new android.content.Intent(activity, com.zendesk.sdk.requests.RequestActivity.class)
                        intent.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK)
                        activity.startActivity(intent)
                        console.log("Ta da????")
                    } catch(e) {
                        console.error(e)
                    }
                    
                },
                onError: function(error){
                    console.log(error)
                }
            })
            initSdk(this.account, activity, new MyZendeskCallback())
            return true
       } else{
            notInitialized()
            return false
       }
    }

    public async createContactRequest(): Promise<boolean> {
        return true
    }

    public setTheme() {
        console.warn("ZENDESK-MONETY: Set theme not defined for android. Implement theme in the manifest instead")
    }

    loadAnonUser(){
        if(this.user.isInitalized()){
          const identity = new com.zendesk.sdk.model.access.AnonymousIdentity.Builder()
            .withNameIdentifier(this.user.name)
            .withExternalIdentifier(this.user.id)
            .withEmailIdentifier(this.user.email)
            .build()
          com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setIdentity(identity)
        } else{
          const anonymousIdentity = new com.zendesk.sdk.model.access.AnonymousIdentity.Builder().build()
          com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setIdentity(anonymousIdentity)
        }
    }
}

function notInitialized(){
    throw "Zendesk account info not initalized, please call the init function on the module";
}

function initSdk(account: ZendeskAccount, activity: any, callback: any){
    console.log({
        account,
        activity,
        callback
    })
	com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.setContactConfiguration(getConfig(account))
	com.zendesk.logger.Logger.setLoggable(account.loggingEnabled)
	com.zendesk.sdk.network.impl.ZendeskConfig.INSTANCE.init(activity, account.url, account.appId, account.clientId, callback)
}

function getConfig(account: ZendeskAccount) {
    var SampleFeedbackConfiguration = com.zendesk.sdk.feedback.impl.BaseZendeskFeedbackConfiguration.extend({
          getAdditionalInfo: function() {
              return account.additionalInfo;
          },
          
          getTags: function() {
              var arrayList = new java.util.ArrayList();
              
              
              for(var i = 0; i < account.tags.length; i++){
                  var tag = new java.lang.String(account.tags[i])
                  arrayList.add(tag);
              }
  
              return arrayList;
          },
  
          getRequestSubject: function() {
              return account.ticketSubject;
          }
    });
  
    return new SampleFeedbackConfiguration();
}
