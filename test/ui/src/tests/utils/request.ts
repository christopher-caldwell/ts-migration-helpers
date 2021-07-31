import sinon from 'sinon';

import request from 'utils/request';
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"fetch"' is not assignable to pa... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/chriscaldwell/Code/test/ts-migrate/ui... Remove this comment to see the full error message
import { SERVICE_API_URL } from 'environment';

global.fetch = () => { };

describe('request', () => {
    afterEach(() => {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"fetch"' is not assignable to pa... Remove this comment to see the full error message
        global.fetch.restore();
    });

    it('should append query string parameters when supplied', () => {
        let actual = null;

        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"fetch"' is not assignable to pa... Remove this comment to see the full error message
        sinon.stub(global, 'fetch').callsFake(url => {
            actual = url;

            return { then: () => { } };
        });

        request('/api/test', {
            params: {
                hero: 'Jim Raynor',
                action: 'Move',
            },
        });

        expect(actual).toBe(`${SERVICE_API_URL}/api/test?hero=Jim%20Raynor&action=Move`);
    });
});
