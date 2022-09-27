/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IBaseIntegrationTester {
    given: (...props: any[]) => void;
    when: (...props: any[]) => Promise<never>;
    then: (...props: any[]) => void;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
