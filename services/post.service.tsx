import { http } from "@/lib/http";
import { Post, PostPayload } from "@/types/post";
import { POST_CATEGORIES } from "@/constants/post";
import { JSON_PLACEHOLDER_POSTS } from "@/constants/endpoint";

class PostsServiceClass {
  private normalizePost(post: Partial<Post>, index: number = 0): Post {
    return {
      id: post.id ?? Date.now(),
      title: post.title ?? "",
      body: post.body ?? "",
      userId: post.userId ?? 0,
      category: post.category ?? POST_CATEGORIES[(post.id! + index) % POST_CATEGORIES.length],
      updatedAt: new Date().toISOString(),
    };
  }

  private handleError(error: unknown, defaultMessage: string): never {
    throw new Error(
      error instanceof Error ? error.message : defaultMessage
    );
  }

  async fetchPosts(limit: number = 15): Promise<Post[]> {
    try {
      const posts = await http.get<Partial<Post>[]>(JSON_PLACEHOLDER_POSTS, {
        params: { _limit: limit },
      });
      return posts.map((post, index) => this.normalizePost(post, index));
    } catch (error) {
      this.handleError(error, "Unable to fetch posts.");
    }
  }

  async getPostById(id: number): Promise<Post> {
    try {
      const post = await http.get<Partial<Post>>(`${JSON_PLACEHOLDER_POSTS}/${id}`);
      return this.normalizePost(post);
    } catch (error) {
      this.handleError(error, "Unable to fetch post.");
    }
  }

  async getPostsByUserId(userId: number): Promise<Post[]> {
    try {
      const posts = await http.get<Partial<Post>[]>(JSON_PLACEHOLDER_POSTS, {
        params: { userId },
      });
      return posts.map((post, index) => this.normalizePost(post, index));
    } catch (error) {
      this.handleError(error, "Unable to fetch user posts.");
    }
  }

  async createPost(payload: PostPayload): Promise<Post> {
    try {
      const response = await http.post<Partial<Post>>(JSON_PLACEHOLDER_POSTS, { data: payload });
      return this.normalizePost({ ...response, ...payload });
    } catch (error) {
      this.handleError(error, "Unable to create post.");
    }
  }

  async updatePost(id: number, payload: PostPayload): Promise<Post> {
    try {
      await http.put<Partial<Post>>(`${JSON_PLACEHOLDER_POSTS}/${id}`, { data: payload });
      return this.normalizePost({ id, ...payload });
    } catch (error) {
      this.handleError(error, "Unable to update post.");
    }
  }

  async deletePost(id: number): Promise<void> {
    try {
      await http.delete(`${JSON_PLACEHOLDER_POSTS}/${id}`);
    } catch (error) {
      this.handleError(error, "Unable to delete post.");
    }
  }
}

export const PostsService = new PostsServiceClass();