import { Common, User, ZendeskAccount, ZendeskAccountConfig, OpenHelpCenterOptions } from './zendesk-monety.common';

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

    public openHelpCenter(opts: OpenHelpCenterOptions = null): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }

    public openContactList(): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }

    public createContactRequest(): Promise<boolean> {
        return new Promise(resolve => resolve(true))
    }

    public setTheme() {
        console.warn("ZENDESK-MONETY: Set theme not defined for android. Implement theme in the manifest instead")
    }
}
