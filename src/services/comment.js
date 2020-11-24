import {request} from './apiRequest'

export const commentService = {
  getCommentsByArticle,
  getCommentById,
  saveComment,
  deleteComment,
  getRepliesByComment,
  getReplyById,
  saveReply,
  deleteReply
};

function getCommentsByArticle(articleId, page, size){
  let url = `/comments?`
  if(articleId) url = `${url}articleId=${articleId}`;
  if(page) url = `${url}&page=${page}`;
  if(size) url = `${url}&size=${size}`;
  return request.get(url);
}

function getCommentById(commentId) {
  return request.get(`/comments/${commentId}`);
}

function saveComment(comment){
  return request.post('/comments', comment);
}

function deleteComment(id){
  return request.del(`/comments/${id}`);
}

function getRepliesByComment(commentId, page, size){
  let url = `/replies?`
  if(commentId) url = `${url}commentId=${commentId}`;
  if(page) url = `${url}&page=${page}`;
  if(size) url = `${url}&size=${size}`;
  return request.get(url);
}

function getReplyById(replyId) {
  return request.get(`/replies/${replyId}`);
}

function saveReply(reply){
  return request.post('/replies', reply);
}

function deleteReply(id){
  return request.del(`/replies/${id}`);
}
