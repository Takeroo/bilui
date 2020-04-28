import {request} from './apiRequest'

export const imageService = {
    upload,
    download
};

function upload(file){
    return request.postFile('/images', file);
}

function download(id){
  return request.get(`/images/${id}`);
}
