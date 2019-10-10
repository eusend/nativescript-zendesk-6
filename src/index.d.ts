import { Common, User, ZendeskAccount, ZendeskAccountConfig, OpenHelpCenterOptions } from './zendesk-monety.common';
export declare class ZendeskMonety extends Common {
    user: User;
    account: ZendeskAccount;
    identifyUser(id: string, name: string, email: string): void;
    init(config: ZendeskAccountConfig): void;
    logging(): boolean;
    openHelpCenter(opts?: OpenHelpCenterOptions): Promise<boolean>;
    openContactList(): Promise<boolean>;
    createContactRequest(): Promise<boolean>;
    setTheme(): void;
}