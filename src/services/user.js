import {request} from './apiRequest'

export const userService = {
  getUser,
  updateUser,
  uploadAvatar,
  uploadCover
};

function getUser(id){
    return request.get(`/users/${id}`);
}

function updateUser(user) {
  return request.post(`/users`, user)
}


function uploadAvatar(file){
  return request.postFile('/users/avatar', file);
}

function uploadCover(file){
  return request.postFile('/users/cover', file);
}
