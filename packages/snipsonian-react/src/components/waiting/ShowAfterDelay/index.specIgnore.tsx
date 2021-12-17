import * as React from 'react';
import ReactDOM from 'react-dom';
import ShowAfterDelay, { IShowAfterDelayProps } from './index';

describe('ShowAfterDelay component:', () => {
    it('is shown immediatelly when initialized with show=true, delayBeforeShow=0 and minDurationToShow=0', () => {
        const div = document.createElement('div');
        const component = (
            <ShowAfterDelay
                enabled={true}
                delayBeforeShow={0}
                minDurationToShow={0}
                showDuringDelayComponent="Loading"
            >
                Show immediatelly
            </ShowAfterDelay>
        );
        ReactDOM.render(component, div);
        expect(div.textContent).toBe('Show immediatelly');
    });

    it('is shown after a delay when initialized with show=true and delayBeforeShow=100', (done) => {
        expect.assertions(2);

        const div = document.createElement('div');
        const component = (
            <ShowAfterDelay
                enabled={true}
                delayBeforeShow={100}
                minDurationToShow={0}
                showDuringDelayComponent="Loading"
            >
                Show after delay
            </ShowAfterDelay>
        );
        ReactDOM.render(component, div);
        expect(div.textContent).toBe('');
        window.setTimeout(
            () => {
                expect(div.textContent).toBe('Loading');
                done();
            },
            101,
        );
    });

    it('is never shown when initialized with show=false and delayBeforeShow=0', (done) => {
        const div = document.createElement('div');
        const component = (
            <ShowAfterDelay
                enabled={false}
                delayBeforeShow={0}
                minDurationToShow={100}
                showDuringDelayComponent="Never shown"
            >
                Loaded
            </ShowAfterDelay>
        );
        ReactDOM.render(component, div);
        expect(div.textContent).toBe('Loaded');
        window.setTimeout(
            () => {
                expect(div.textContent).toBe('Loaded');
                done();
            },
            101,
        );
    });

    it('is started when enabled property is updated from false to true', (done) => {
        const div = document.createElement('div');
        const showDelayProps: IShowAfterDelayProps = {
            enabled: false,
            delayBeforeShow: 0,
            minDurationToShow: 0,
        };
        const render = (props: IShowAfterDelayProps) => {
            const component = <ShowAfterDelay {...props}>Not running</ShowAfterDelay>;
            ReactDOM.render(component, div);
        };

        render(showDelayProps);
        expect(div.textContent).toBe('Not running');

        showDelayProps.enabled = true;
        render(showDelayProps);
        window.setTimeout(
            () => {
                expect(div.textContent).toBe('');
                done();
            },
            0,
        );
    });

    it('is shown for a minimum duration', (done) => {
        expect.assertions(3);

        const div = document.createElement('div');
        const showDelayProps: IShowAfterDelayProps = {
            enabled: true,
            delayBeforeShow: 0,
            minDurationToShow: 100,
            showDuringDelayComponent: 'Show for a minimum time',
        };
        const render = (props: IShowAfterDelayProps) => {
            const component = <ShowAfterDelay {...props}>Not running</ShowAfterDelay>;
            ReactDOM.render(component, div);
        };

        render(showDelayProps);
        expect(div.textContent).toBe('Show for a minimum time');

        window.setTimeout(
            () => {
                showDelayProps.enabled = false;
                render(showDelayProps);
            },
            0,
        );

        window.setTimeout(() => expect(div.textContent).toBe('Show for a minimum time'), 90);
        window.setTimeout(
            () => {
                expect(div.textContent).toBe('Not running');
                done();
            },
            101,
        );
    });

    it('is shown for a minimum duration when enabled property is updated from true to false when running', (done) => {
        expect.assertions(10);

        const div = document.createElement('div');
        const showDelayProps: IShowAfterDelayProps = {
            enabled: false,
            delayBeforeShow: 100,
            minDurationToShow: 500,
            showDuringDelayComponent: 'Show for a minimum time',
        };
        const render = (props: IShowAfterDelayProps) => {
            const component = <ShowAfterDelay {...props}>Not running</ShowAfterDelay>;
            ReactDOM.render(component, div);
        };

        render(showDelayProps);
        expect(div.textContent).toBe('Not running');

        showDelayProps.enabled = true;
        render(showDelayProps);

        // Make sure they run in the correct sequence
        let timeoutsCalled = 0;

        // In delay before show phase
        window.setTimeout(
            () => {
                expect(div.textContent).toBe('Not running');
                timeoutsCalled += 1;
            },
            50,
        );

        // In show phase
        window.setTimeout(
            () => {
                expect(timeoutsCalled).toBe(1);
                expect(div.textContent).toBe('Show for a minimum time');
                timeoutsCalled += 1;
            },
            110,
        );

        // Disable again
        window.setTimeout(
            () => {
                expect(timeoutsCalled).toBe(2);
                showDelayProps.enabled = false;
                render(showDelayProps);
                expect(div.textContent).toBe('Show for a minimum time');
                timeoutsCalled += 1;
            },
            120,
        );

        // Still in show min time phase
        window.setTimeout(
            () => {
                expect(timeoutsCalled).toBe(3);
                expect(div.textContent).toBe('Show for a minimum time');
                timeoutsCalled += 1;
            },
            380,
        );

        // Finished
        window.setTimeout(
            () => {
                expect(timeoutsCalled).toBe(4);
                expect(div.textContent).toBe('Not running');
                done();
            },
            700,
        );
    });
});
