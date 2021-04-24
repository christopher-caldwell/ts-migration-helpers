const pathEnvironment = environment => {
    const path = environment === '' ? './environment.local.json' : `./environment.${environment}.json`;

    return path;
};

const getEnvironment = () => {
    if (typeof process.env === 'undefined' || typeof process.env.REACT_APP_ENVIRONMNET === 'undefined') {
        return '';
    }

    return process.env.REACT_APP_ENVIRONMNET;
};

const tryRequire = () => {
    const environment = getEnvironment();
    const path = pathEnvironment(environment);

    try {
    // eslint-disable-next-line import/no-dynamic-require, global-require
        return require(`${path}`);
    } catch (err) {
        return console.error(err);
    }
};

module.exports = tryRequire();
