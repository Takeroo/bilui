import {request} from './apiRequest'

export const draftService = {
  getDrafts,
  getUserDrafts,
  getDraftById,
  saveDraft,
  deleteDraft
}

function getDrafts(page, size, published){
  let url = `/drafts?`
  if(page) url = `${url}page=${page}`;
  if(size) url = `${url}&size=${size}`;
  if(published) url = `${url}&published=${published}`;
  return request.get(url);
}

function getUserDrafts(userId, published, page, size){
  let url = `/drafts?`
  if(userId) url = `${url}userId=${userId}`;
  url = `${url}&published=${published}`;
  if(page) url = `${url}&page=${page}`;
  if(size) url = `${url}&size=${size}`;
  return request.get(url);
}

function getDraftById(id){
  return request.get(`/drafts/${id}`);
}

function saveDraft(draft){
  return request.post('/drafts', draft);
}

function deleteDraft(id){
  return request.del(`/drafts/${id}`);
}
