"use client";

import { Post } from "@/types/post";
import { EditPostDialog } from "@/components/posts/EditPostDialog";

type PostCardProps = {
  post: Post;
  onDelete: (id: number) => void;
};

export const PostCard = ({ post, onDelete }: PostCardProps) => (
  <article className="flex h-full flex-col justify-between rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-lg">
    <div className="flex flex-col gap-3">
      <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        {post.category}
      </span>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="mt-2 text-sm text-slate-500 line-clamp-3">{post.body}</p>
      </div>
    </div>
    <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
      <div>
        <p>Updated {new Date(post.updatedAt).toLocaleDateString()}</p>
        <p>Writer #{post.userId}</p>
      </div>
      <div className="flex gap-2 text-sm font-medium">
        <EditPostDialog post={post} />
        <button
          onClick={() => onDelete(post.id)}
          className="text-rose-600 hover:text-rose-500"
        >
          Delete
        </button>
      </div>
    </div>
  </article>
);
