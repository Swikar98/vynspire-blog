"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextArea } from "@/components/ui/textarea";
import { POST_CATEGORIES } from "@/constants/post";
import { Post } from "@/types/post";

const schema = z.object({
  title: z.string().min(4, "Title should be at least 4 characters."),
  body: z.string().min(30, "Body should be at least 30 characters long."),
  category: z.string().min(1, "Please choose a category."),
});

type PostFormValues = z.infer<typeof schema>;

type PostFormProps = {
  initialValues?: Post;
  onSubmit: (payload: PostFormValues) => Promise<void>;
  submitLabel?: string;
  errorMessage?: string | null;
};

export const PostForm = ({
  initialValues,
  onSubmit,
  submitLabel = "Publish post",
  errorMessage,
}: PostFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<PostFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: initialValues?.title ?? "",
      body: initialValues?.body ?? "",
      category: initialValues?.category ?? POST_CATEGORIES[0],
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        title: initialValues.title,
        body: initialValues.body,
        category: initialValues.category,
      });
    }
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-lg ring-1 ring-slate-100"
    >
      <div>
        <label className="text-sm font-semibold text-slate-700">Title</label>
        <Input
          placeholder="Write an irresistible title..."
          className="mt-2"
          {...register("title")}
        />
        {errors.title && (
          <p className="mt-2 text-sm text-rose-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">
          Category
        </label>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {POST_CATEGORIES.map((category) => (
            <label
              key={category}
              className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm font-medium shadow-sm transition hover:border-emerald-400"
            >
              <input
                type="radio"
                value={category}
                className="h-4 w-4 accent-emerald-600"
                {...register("category")}
              />
              {category}
            </label>
          ))}
        </div>
        {errors.category && (
          <p className="mt-2 text-sm text-rose-600">
            {errors.category.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-700">
          Body content
        </label>
        <TextArea
          rows={10}
          className="mt-2"
          placeholder="Capture your readers with a great story..."
          {...register("body")}
        />
        {errors.body && (
          <p className="mt-2 text-sm text-rose-600">{errors.body.message}</p>
        )}
      </div>

      {errorMessage && (
        <p className="text-sm text-rose-600">{errorMessage}</p>
      )}

      <Button
        type="submit"
        loading={isSubmitting}
        disabled={!isDirty && !initialValues}
        className="mt-4 self-start"
      >
        {submitLabel}
      </Button>
    </form>
  );
};
