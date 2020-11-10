const { Router } = require('express');
const {
  getAllPosts,
  getPostById,
  registerPost,
} = require('../services/postServices');

const postRoute = Router();

const createPost = async (req, res, next) => {
  const { body: { title, content }, user: { id } } = req;
  const { ok, status, message, post } = await registerPost(title, content, id);
  return ok
    ? res.status(status).json(post)
    : next({ status, message });
};

const getPosts = async (_req, res) => {
  const posts = await getAllPosts();
  return res.status(200).json(posts);
};

const getOnePost = async (req, res, next) => {
  const { id } = req.params;
  const { ok, status, message, post } = await getPostById(id);
  return ok
    ? res.status(status).json(post)
    : next({ status, message });
};

postRoute.route('/').get(getPosts).post(createPost);
postRoute.route('/:id').get(getOnePost).put();
postRoute.route('/me').delete();

module.exports = postRoute;

/**
 * endpoints:
 * PUT /post/:id
 * sobrescreve o post
 * GET /post/search?q=:searchTerm
 * pesquisa um post
 * DELETE /post/:id
 * deleta um post
 */
