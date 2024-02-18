import * as z from "zod";

export const ThreadValidation = z.object({
  // position: z.object({
  //   longitude: z.number(),
  //   latitude: z.number(),
  // }),
  trash_photo: z.string().url().min(1),
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});
