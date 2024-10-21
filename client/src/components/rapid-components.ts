import { foundationLayoutComponents } from '@genesislcap/foundation-layout';
import {
  baseComponents,
  provideDesignSystem,
  rapidButton,
} from '@genesislcap/rapid-design-system';
import { rapidGridComponents } from '@genesislcap/rapid-grid-pro';

/**
 * @public
 */
export const registerCommonRapidComponents = async () => {
  /**
   * Register the components the app is using with the system.
   */
  provideDesignSystem()
    .register(
        /**
        * Common across most routes, so batch register these lightweight components upfront.
        */
        rapidButton(),
        rapidGridComponents,
        baseComponents.designSystemProvider(),
        foundationLayoutComponents,
    );
};
