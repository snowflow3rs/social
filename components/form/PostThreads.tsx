"use client";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "../ui/textarea";

import { updateUser } from "@/lib/actions/user.action";
import { usePathname, useRouter } from "next/navigation";
import { threadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.action";

const PostThreads = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof threadValidation>) => {
    await createThread({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname,
    });

    router.push("/");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10 flex flex-col justify-start gap-10"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col  gap-3  w-full">
              <FormLabel className=" text-base-semibold text-gray-200">
                Content
              </FormLabel>
              <FormControl className=" no-focus border border-dark-4  bg-dark-3 text-light-1">
                <Textarea
                  rows={15}
                  placeholder="Enter your name"
                  className=" account-form_input "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post
        </Button>
      </form>
    </Form>
  );
};

export default PostThreads;
