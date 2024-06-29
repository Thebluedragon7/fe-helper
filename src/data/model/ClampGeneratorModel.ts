import * as z from "zod";

export const ClampGeneratorModelSchema = z
  .object({
    minView: z.number().min(0, "Min view must be greater than 0"),
    maxView: z.number().min(0, "Max view must be greater than 0"),
    minSize: z.number().min(0, "Min size must be greater than 0"),
    maxSize: z.number().min(0, "Max size must be greater than 0")
  })
  .refine((data) => data.minView < data.maxView, {
    message: "Min view must be less than max view",
    path: ["minView"]
  })
  .refine((data) => data.minSize < data.maxSize, {
    message: "Min size must be less than max size",
    path: ["minSize"]
  });

export type ClampGeneratorModel = z.infer<typeof ClampGeneratorModelSchema>;
