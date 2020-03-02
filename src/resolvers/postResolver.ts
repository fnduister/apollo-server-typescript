import { Post, PublishPostInput, User } from '../generated/graphql';
import PostModel, { PostDb, PostOmitId } from '../models/postModel';
import userModel from '../models/userModel';

export const posts = async (postIds: string[]): Promise<PostDb[]> => {
  const posts = await PostModel.find({ _id: { $in: postIds } });
  return Promise.resolve(posts);
}

export const publishPost = async (
  _parent: any,
  { postInput }: {postInput: PublishPostInput}, { user }: any
) => {
  if (!user) {
    throw new Error('Not Authenticated');
  }
  const currentUser:User|null = await userModel.findById(user.userId);
  if (!currentUser) {
    throw new Error('a user is required to publish a post');
  }
  const postInfo: PostOmitId = {
    author: currentUser,
    ...postInput,
    publishedAt: new Date(),
    likedBy: []
  }
  try {
    const newPost = new PostModel(postInfo);
    const savedpost: Post = await newPost.save();
    return savedpost;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
