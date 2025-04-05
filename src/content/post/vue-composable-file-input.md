---
title: A Vue 3 composable for file inputs
description: Using the Vue 3 Composition API to help with uploading files to a server.
publishDate: 21 April 2023
tags: ["vue", "composables"]
draft: false
---

## Motivation

I developed this composable while working on a side project using Nuxt 3. I wanted to upload a file to the backend, so I needed the base64 encoded URL of the file.

Encoding a file into the base64 URL format allows you to send the file to a server through http, since the encoded URL is just a string.

I also wanted to know the filesize in bytes so I could do some client side validation if the file was too large.

## The Composable

```ts
// useFileInput.ts
import { computed, ref } from "vue";

export default function useFileInput() {
  const fileInput = ref<HTMLInputElement>(null!);
  const base64Url = ref("");

  const filesizeBytes = computed(() => {
    if (!base64Url.value) {
      return 0;
    }
    const [_head, encoded] = base64Url.value.split(",");
    return encoded.length * (3 / 4);
  });

  const filesizeKb = computed(() => filesizeBytes.value / 1000);

  /**
   * sets the base64Url ref to the base64 encoded url
   * of the file stored in the fileInput ref
   */
  const setBase64Url = () => {
    const { files } = fileInput.value;

    if (!files?.length) {
      return;
    }

    const f = files[0];

    const reader = new FileReader();
    reader.onloadend = function (this) {
      base64Url.value = this.result as string;
    };
    reader.readAsDataURL(f);
  };

  return {
    fileInput,
    base64Url,
    filesizeBytes,
    filesizeKb,
    setBase64Url
  };
}
```

How it works:
- We make use of the JavaScript [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) API to obtain the base64 encoded URL.
- The file size in bytes can be determined by the length of URL multiplied by (3/4) because base64 encodes 3 bytes of data in every 4 characters.
  - I didn't bother adding logic to adjust for string padding at the end of URL since it makes a negligible difference for most files.
- The composable only supports a single file. You can tweak the code to support multiple files if desired.

## Using The Composable

Set the `ref` attribute of the target file input element to the `fileInput` ref object returned by the composable. Use the `onchange` event of the input element to call the `setBase64Url` method from the composable. This will make the URL value available as well as the filesize computed values.

```vue title="App.vue"
<script setup>
import useFileInput from './useFileInput.ts';

const {
  fileInput,
  base64Url,
  setBase64Url,
  filesizeKb
  } = useFileInput();

</script>

<template>
  <input type="file" ref="fileInput" @change="setBase64Url" >
  <h1>
    Filesize Kb: {{ filesizeKb }}
  </h1>
  <h1>
    Base64 URL: {{ base64Url.slice(0,20)}}
  </h1>
</template>
```
