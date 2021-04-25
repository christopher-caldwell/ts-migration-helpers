// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'configure'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'configure'... Remove this comment to see the full error message
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'configure'... Remove this comment to see the full error message
const { configure } = require('enzyme');
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Adapter'.
const Adapter = require('enzyme-adapter-react-16');

configure({ adapter: new Adapter() });
