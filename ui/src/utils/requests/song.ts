import request from 'utils/request';

function version(songs: any) {
    return request('/song/version', songs);
}

export default version;
