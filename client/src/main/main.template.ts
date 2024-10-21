import { html, ViewTemplate } from '@genesislcap/web-core';
import type { Main } from './main';

// export const DynamicTemplate: ViewTemplate<Main> = html`
//     <zero-design-system-provider ${ref('provider')}>
//         <div class="dynamic-template">${(x) => x.selectTemplate()}</div>
//     </zero-design-system-provider>
// `;

export const LoadingTemplate: ViewTemplate<Main> = html`
    <rapid-progress-ring></rapid-progress-ring>
`;

export const MainTemplate: ViewTemplate<Main> = html`
    <rapid-button> New PBC </rapid-button>
`;
