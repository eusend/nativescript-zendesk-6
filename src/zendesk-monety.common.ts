import { Observable } from 'tns-core-modules/data/observable';

export type OpenHelpCenterOptions = {
  name: string
  type: string
  id: string
} | null

export type ZendeskAccountConfig = {
  appId: string,
	url: string,
	clientId: string,
  ticketSubject: string,
  loggingEnabled: boolean,
  anonymous: boolean,
  additionalInfo?: string,
  tags?: Array<string>,
  locale?: string
}

export class ZendeskAccount {
  public appId: string
	public url: string
	public clientId: string
  public ticketSubject: string
  public loggingEnabled: boolean
  public initialized: boolean
  public anonymous: boolean
  public additionalInfo: string
  public tags: Array<string>
  public locale?: string

  constructor(config: ZendeskAccountConfig) {
    this.appId = config.appId
    this.url = config.url
    this.clientId = config.clientId
    this.ticketSubject = config.ticketSubject
    this.loggingEnabled = config.loggingEnabled
    this.initialized = true
    this.anonymous = config.anonymous
    this.additionalInfo = config.additionalInfo || ""
    this.tags = config.tags || []
    if(config.locale) {
      this.locale = config.locale
    }
  }
}

export class User {
  public id: string
  public name: string
  public email: string

  constructor(id: string, name: string, email: string) {
    this.id = id
    this.name = name
    this.email = email
  }

  public isInitalized(): boolean{
    return (this.id !== "" && this.name !== "" && this.email !== "")
  }
}

export class Common extends Observable {}