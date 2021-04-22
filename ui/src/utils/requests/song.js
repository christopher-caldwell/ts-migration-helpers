import request from 'utils/request';

function version(songs) {
    return request('/song/version', songs);
}

export default version;
