/* eslint-disable tailwindcss/no-custom-classname */
"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import Getlocation from "../test/getlocation";
import { text } from "micro";
import path from "path";
// import { myLocation } from "@/lib/geotagging";

interface Props {
  userId: string;
}

// interface GeolocationPosition {
//   coords: {
//     latitude: number;
//     longitude: number;
//   };
// }

// interface GeolocationPosition {
//   coords: {
//     latitude: number;
//     longitude: number;
//   };
// }

function PostThread({ userId }: Props) {
  const router = useRouter();

  const [cords, setCords] = useState({ latitude: 0, longitude: 0 });

  const pathname = usePathname();
  const { startUpload } = useUploadThing("media");

  const [files, setFiles] = useState<File[]>([]);

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      trash_photo: "",
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    const blob = values.trash_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);

      if (imgRes && imgRes[0].fileUrl) {
        values.trash_photo = imgRes[0].fileUrl;
      }
    }

    if (cords.latitude === 0 && cords.longitude === 0) {
      alert("Location is Required Please Hit Get Location");
      return;
    }

    await createThread({
      position: { coords: cords },
      photo: values.trash_photo,
      text: values.thread,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  };

  // const onSubmitf = async (values: z.infer<typeof ThreadValidation>) => {
  //   console.log("yo yo yo yo yo");
  //   alert("L");
  //   // console.log("yo yo yo yo yo");
  //   // // const position = await myLocation();
  //   // const position = {
  //   //   coords: {
  //   //     latitude: 123,
  //   //     longitude: 123,
  //   //   },
  //   // };
  //   // const blob = values.trash_photo;

  //   // const hasImageChanged = isBase64Image(blob);
  //   // if (hasImageChanged) {
  //   //   const imgRes = await startUpload(files);

  //   //   if (imgRes && imgRes[0].fileUrl) {
  //   //     values.trash_photo = imgRes[0].fileUrl;
  //   //   }
  //   // }

  //   await createThread({
  //     position: { coords: cords },
  //     photo: values.trash_photo,
  //     text: values.thread,
  //     author: userId,
  //     communityId: organization ? organization.id : null,
  //     path: pathname,
  //   });

  //   // router.push("/");
  // };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  return (
    <Form {...form}>
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="trash_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="text-base-semibold flex-1 text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Add profile photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border-dark-4 bg-dark-3 text-light-1 border">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Getlocation setCoords={setCords} />

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
