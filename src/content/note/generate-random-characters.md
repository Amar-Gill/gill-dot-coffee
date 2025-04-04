---
title: Generate random characters for cryptographic use
description: Generate random characters for cryptographic use from the command line
publishDate: "2025-04-04T22:30:00Z"
---

Handy shell snippet to generate a random string of characters that can be used as a cryptographic secret.
```shell
 LC_ALL=C tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' </dev/urandom | head -c 24; echo
```
- You may or may not need to set the env var `LC_ALL=C` on your system, it prevents system locale settings from affecting output
- We are using `tr` to strip out non-printable characters from the randomess sources `/dev/random`
- The supplied regex will allow all alphanumeric characters, plus characters from the [OWASP password special characters list](https://owasp.org/www-community/password-special-characters)
- And you can adjust the length of the resulting string with the flag provied to `head`

[source](https://unix.stackexchange.com/questions/230673/how-to-generate-a-random-string)

