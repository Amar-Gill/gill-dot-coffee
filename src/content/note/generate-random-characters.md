---
title: Generate random characters for cryptographic use
description: Generate random characters for cryptographic use from the command line
publishDate: "2025-04-04T22:30:00Z"
---

Shell snippet to generate a random string of characters; use when in need of a cryptographic secret.
```shell
 LC_ALL=C tr -dc 'A-Za-z0-9!"#$%&'\''()*+,-./:;<=>?@[\]^_`{|}~' </dev/urandom | head -c 24; echo
```
- Setting `LC_ALL=C` environment variable prevents system locale settings from affecting output
- `tr` utility will strip out non-printable characters from the randomess source `/dev/random`
- The supplied regex will allow all alphanumeric characters, plus characters from the [OWASP password special characters list](https://owasp.org/www-community/password-special-characters)
- Adjust the length of the resulting string with the `-c` flag of the `head` utility

[source](https://unix.stackexchange.com/questions/230673/how-to-generate-a-random-string)

