
import { customElement, GenesisElement, observable } from '@genesislcap/web-core';
import { MainStyles as styles } from './main.styles';
import {LoadingTemplate, MainTemplate as template } from './main.template';

const name = 'foundation-{{appName}}';

@customElement({
    name,
    template,
    styles,
})
export class Main extends GenesisElement {
    @observable ready: boolean = false;
    async connectedCallback() {
        await this.loadRemotes();
        super.connectedCallback();
    }

    /**
     * @internal
     */
    protected async loadRemotes() {
        const { registerCommonRapidComponents } = await import('../components/rapid-components');
        await registerCommonRapidComponents();
        this.ready = true;
    }

    selectTemplate() {
        return this.ready ? template : LoadingTemplate;
    }
}
