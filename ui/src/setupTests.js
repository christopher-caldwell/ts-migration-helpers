const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

require('regenerator-runtime/runtime');

configure({ adapter: new Adapter() });
