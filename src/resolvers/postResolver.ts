import { Post, PublishPostInput } from '../generated/graphql';
import PostModel from '../models/postModel';

export const publishPost = async (
  _parent: any,
  { postInput }: {postInput: PublishPostInput}
): Promise<Post> => {
  try {
    const newUser = new PostModel(postInput);
    return (await newUser.save()) as Post;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
