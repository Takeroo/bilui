import {request} from './apiRequest'

export const articleService = {
  getArticles,
  getArticlesByUser,
  getArticlesByTagName,
  getArticleById,
  publishDraft,
  getSavedArticles,
  getSavedArticleIds,
  saveArticle,
  getClappedArticles,
  getClappedArticleIds,
  clapArticle
};

function getArticles(page, size, title){
  let url = `/articles?`
  if(page) url = `${url}page=${page}`;
  if(size) url = `${url}&size=${size}`;
  if(title) url = `${url}&title=${title}`;
  return request.get(url);
}

function getArticlesByUser(userId, page, size, title){
  let url = `/articles?`
  if(userId) url = `${url}userId=${userId}`;
  if(page) url = `${url}&page=${page}`;
  if(size) url = `${url}&size=${size}`;
  if(title) url = `${url}&title=${title}`;
  return request.get(url);
}

function getArticlesByTagName(tagName, page, size){
  let url = `/articles/tags?`
  if(tagName) url = `${url}tagName=${tagName}`;
  if(page) url = `${url}&page=${page}`;
  if(size) url = `${url}&size=${size}`;
  return request.get(url);
}

function getArticleById(articleId) {
  return request.get(`/articles/${articleId}`);
}

function publishDraft(draftToPublish){
  return request.post('/articles/publish', draftToPublish);
}

function getSavedArticles(page, size){
  let url = `/articles/saved?`
  if(page) url = `${url}&page=${page}`;
  if(size) url = `${url}&size=${size}`;
  return request.get(url);
}

function getSavedArticleIds(){
  return request.get(`/articles/saved/ids`);
}

function saveArticle(id){
  return request.post(`/articles/${id}/save`);
}

function getClappedArticles(page, size){
  let url = `/articles/clapped?`
  if(page) url = `${url}&page=${page}`;
  if(size) url = `${url}&size=${size}`;
  return request.get(url);
}

function getClappedArticleIds(){
  return request.get(`/articles/clapped/ids`);
}

function clapArticle(id){
  return request.post(`/articles/${id}/clap`);
}
