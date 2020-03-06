import { Post, PublishPostInput, PostResolvers, QueryPostArgs } from '../generated/graphql';
import PostModel, { PostDb, PostOmitId } from '../models/postModel';
import { Model } from './../models/index';
import { dateToString } from './helpers';
import { Context } from './../main.d';
import { UserDb } from '../models/userModel';

export const PostTransformResolvers: PostResolvers = {
  publishedAt: ({ publishedAt }: Post) => dateToString(publishedAt),
  author: async ({ author }: Post, _args: any, { loaders }: Context) => {
    // eslint-disable-next-line no-useless-catch
    try {
      console.log('TCL: author', author)
      const user = await loaders.user.load(author);
      if (!user) {
        throw new Error('no user was found');
      }
      return Promise.resolve(user);
    } catch (err) {
      // console.error(err);
      throw err;
    };
  },
  likedBy: async ({ likedBy }: Post, _args, { models }: Context) => {
    try {
      const usersLiked = await models.User.find({ _id: { $in: likedBy } });
      if (!usersLiked) {
        throw new Error('no one likes you');
      }
      return usersLiked;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};

export const post = async (_: any, { id }: QueryPostArgs, { models }: Context) => {
  try {
    const post = await models.Post.findOne(id);
    return Promise.resolve(post);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const posts = async (_: any, __: any, { models }: Context): Promise<PostDb[]> => {
  const posts = await models.Post.find();
  return Promise.resolve(posts);
}

export const batchPosts = async (keys: readonly unknown[], models: Model) => {
  const posts: PostDb[] = await models.Post.find({ _id: { $in: keys } });
  return keys.map(key => posts.find(post => post.id === key));
};

export const publishPost = async (
  _parent: any,
  { postInput }: { postInput: PublishPostInput },
  { user, models }: Context
) => {
  if (!user) {
    throw new Error('Not Authenticated');
  }
  const currentUser: UserDb | null = await models.User.findById(
    user.userId
  );
  if (!currentUser) {
    throw new Error('a user is required to publish a post');
  }
  const postInfo: PostOmitId = {
    author: currentUser,
    ...postInput,
    publishedAt: new Date(),
    likedBy: []
  };
  try {
    const newPost = new PostModel(postInfo);
    const savedpost: Post = await newPost.save();
    currentUser.posts = [...currentUser.posts, newPost.id];
    await currentUser.save();
    return Promise.resolve(savedpost);
  } catch (err) {
    console.error(err);
    throw err;
  }
};
