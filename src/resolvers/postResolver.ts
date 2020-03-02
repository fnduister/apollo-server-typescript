import { Post, PublishPostInput } from '../generated/graphql';
import PostModel, { PostDb, PostOmitId } from '../models/postModel';
import userModel from '../models/userModel';

export const posts = async (postIds: string[]): Promise<PostDb[]> => {
  const posts = await PostModel.find({ _id: { $in: postIds } });
  return Promise.resolve(posts);
}

export const publishPost = async (
  _parent: any,
  { postInput }: {postInput: PublishPostInput}, { user }: any
): Promise<Post> => {
  console.log('TCL: user', user)
  if (!user) {
    throw new Error('Not Authenticated');
  }
  const currentUser = await userModel.findById(user.userId);
  const postInfo: PostOmitId = {
    author: currentUser,
    ...postInput,
    publishedAt: new Date(),
    likedBy: []
  }
  try {
    const newPost = new PostModel(postInfo);
    return (await newPost.save()) as Post;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
