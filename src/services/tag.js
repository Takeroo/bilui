import {request} from './apiRequest'

export const tagService = {
  getTags,
  getTagByName,
  getFamiliarTags
};

function getTags(){
  return request.get(`/tags`);
}

function getTagByName(tagName){
  return request.get(`/tags/${tagName}`);
}

function getFamiliarTags(tagName, size){
  let url = `/tags/familiar?`
  if(tagName) url = `${url}&tagName=${tagName}`;
  if(size) url = `${url}&size=${size}`;
  return request.get(url);
}
