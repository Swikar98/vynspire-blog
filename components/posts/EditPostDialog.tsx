"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostForm } from "@/components/posts/PostForm";
import { useAuth } from "@/hook/useAuth";
import { usePosts } from "@/hook/usePosts";
import { Post } from "@/types/post";

type EditPostDialogProps = {
  post: Post;
};

export const EditPostDialog = ({ post }: EditPostDialogProps) => {
  const { user } = useAuth();
  const { editPost } = usePosts();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (values: {
    title: string;
    body: string;
    category: string;
  }) => {
    try {
      setErrorMessage(null);
      await editPost(post.id, {
        ...values,
        userId: user?.id ?? post.userId ?? 0,
      });
      setOpen(false);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update the post.";
      setErrorMessage(message);
    }
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setErrorMessage(null);
    }
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="text-emerald-600 transition hover:text-emerald-500"
        >
          Edit
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl space-y-6">
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
          <DialogDescription>
            Adjust your content without leaving the dashboard.
          </DialogDescription>
        </DialogHeader>
        <PostForm
          initialValues={post}
          onSubmit={handleSubmit}
          submitLabel="Update post"
          errorMessage={errorMessage}
        />
      </DialogContent>
    </Dialog>
  );
};
