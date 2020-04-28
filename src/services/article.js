import {request} from './apiRequest'

export const articleService = {
    getArticles,
    publishDraft
};

function getArticles(){
    return request.get('/articles');
}

function publishDraft(draftToPublish){
  return request.post('/articles/publish', draftToPublish);
}
