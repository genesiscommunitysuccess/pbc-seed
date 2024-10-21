import {customElement, GenesisElement, html, observable, when} from "@genesislcap/web-core";
import {Auth, AuthType, Connect} from "@genesislcap/foundation-comms";

@customElement({
    name: 'app-sandbox',
    template: html`${when(x => x.ready, html`
        <rapid-design-system-provider>
            <foundation-{{appName}}></foundation-{{appName}}>
        </rapid-design-system-provider>`)}`,
})
export class AppSandbox extends GenesisElement {
    @Connect connect!: Connect;
    @Auth auth!: Auth;
    @observable ready = false;

    async connectedCallback() {
        super.connectedCallback();

        console.log('Running with following env vars:', {
            GENX_SANDBOX_DEFAULT_USER,
            GENX_SANDBOX_DEFAULT_PASSWORD,
            GENX_SANDBOX_API_HOST
        });
        await this.connect.connect(GENX_SANDBOX_API_HOST)
        await this.auth.login({username: GENX_SANDBOX_DEFAULT_USER, password: GENX_SANDBOX_DEFAULT_PASSWORD, type: AuthType.BASIC})
        this.auth.isLoggedIn$.subscribe(isLoggedIn => {
            this.ready = isLoggedIn;
        })
    }

}