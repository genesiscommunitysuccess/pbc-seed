import { html, ref } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { Main } from './main';

export const DynamicTemplate: ViewTemplate<Main> = html`
    <zero-design-system-provider ${ref('provider')}>
        <div class="dynamic-template">${(x) => x.selectTemplate()}</div>
    </zero-design-system-provider>
`;

export const LoadingTemplate: ViewTemplate<Main> = html`
    <fast-progress-ring></fast-progress-ring>
`;

export const MainTemplate: ViewTemplate<Main> = html`
    <fast-router :config=${(x) => x.config}></fast-router>
`;
