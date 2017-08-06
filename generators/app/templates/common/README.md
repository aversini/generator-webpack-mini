# Mini webpack project

## Install dependencies

If you use yarn:

```sh
$ yarn
```

Or if you use npm:

```sh
npm install
```

## Update source code

Source code is located under `src`.
It is fully functional but you will want to add your own code there.

```sh
src
  ├── index.html
  ├── <%= entry %>
  └── testbed.css
```

## Start the dev server

```sh
$ yarn dev
```

## Build a production distribution

```sh
$ yarn prod
```

Generated files will be located under `build`.

- `build/index.html` loads js externally.
- `build/index-inline.html` can easily be shared/hosted since it is embedding js.
