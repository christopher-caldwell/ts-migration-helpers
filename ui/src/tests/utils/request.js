import sinon from 'sinon';

import request from 'utils/request';
import { SERVICE_API_URL } from 'environment';

global.fetch = () => { };

describe('request', () => {
    afterEach(() => {
        global.fetch.restore();
    });

    it('should append query string parameters when supplied', () => {
        let actual = null;

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
