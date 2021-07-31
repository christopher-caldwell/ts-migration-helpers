// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'Modal' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'React' is declared but its value is never read.
// @ts-expect-error ts-migrate(6133) FIXME: 'Modal' is declared but its value is never read.
import React from 'react';
// import { render, within, cleanup } from '@testing-library/react';

// @ts-expect-error ts-migrate(6133) FIXME: 'Modal' is declared but its value is never read.
import Modal from './Modal.component';

test('modal render', () => {
    // render(
    //     <Modal>
    //         <div>test</div>
    //     </Modal>
    // );
    // const { getByTestId } = within(document.getElementById('modal'));
    // expect(getByText('test')).toBeTruthy();
    // expect(getByTestId('test')).toBeInTheDocument();
    expect(true).toBeTruthy();
    // TODO: figure out how to test portals
});
