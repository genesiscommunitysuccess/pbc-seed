import { Session } from '@genesislcap/foundation-comms';
import { customElement, FASTElement, observable } from '@microsoft/fast-element';
import { Container, inject, Registration } from '@microsoft/fast-foundation';
import { DefaultRouteRecognizer } from '@microsoft/fast-router';
import * as Components from '../components';
import { MainRouterConfig } from '../routes';
import { logger } from '../utils';
import { MainStyles as styles } from './main.styles';
import { LoadingTemplate, MainTemplate, MainTemplate as template } from './main.template';

const name = 'foundation-{{appName}}';

@customElement({
    name,
    template,
    styles,
})
export class Main extends FASTElement {
    @inject(MainRouterConfig) config!: MainRouterConfig;
    @Container container!: Container;
    @Session session!: Session;
    @observable provider!: any;
    @observable ready: boolean = false;
    @observable data: any = null;

    connectedCallback() {
        this.container.register(Registration.transient(DefaultRouteRecognizer, DefaultRouteRecognizer));

        super.connectedCallback();

        logger.debug(`${name} is now connected to the DOM`);

        this.loadRemotes();
    }

    async loadRemotes() {
        /**
         * Send event to indicate some async work is happening. Will be picked up by overlay micro frontend.
         */
        const { registerComponents } = Components;
        await registerComponents();
        this.ready = true;
    }

    selectTemplate() {
        return this.ready ? MainTemplate : LoadingTemplate;
    }

    providerChanged() {
        /**
         * Configure foundation ui design system provider if needed
         */
    }
}
