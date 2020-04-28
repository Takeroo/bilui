import {request} from './apiRequest'

export const draftService = {
  getDraftById,
  saveDraft,
  deleteDraft,
  getUserDrafts
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

function getUserDrafts(id, published) {
  let url = `/drafts/user/${id}`;
  if(published === true || published === false) url += `/?published=${published}`;

  return request.get(url);
}
