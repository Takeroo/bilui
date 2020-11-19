import {request} from './apiRequest'

export const articleService = {
  getArticles,
  getArticlesByUser,
  getArticleById,
  publishDraft,
  getSavedArticles,
  saveArticle,
  getClappedArticles,
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

function getArticleById(articleId) {
  return request.get(`/articles/${articleId}`);
}

function publishDraft(draftToPublish){
  return request.post('/articles/publish', draftToPublish);
}

function getSavedArticles(){
  return request.get(`/articles/saved`);
}

function saveArticle(id){
  return request.post(`/articles/${id}/save`);
}

function getClappedArticles(){
  return request.get(`/articles/clapped`);
}

function clapArticle(id){
  return request.post(`/articles/${id}/clap`);
}
