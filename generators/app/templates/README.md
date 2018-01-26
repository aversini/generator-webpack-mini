# Mini webpack project

## Install dependencies

```sh
$ yarn
```
**NOTE**: While this README only refers to [Yarn](https://yarnpkg.com/en/), npm can be used if it is the only node package manager available.

## Update source code

Source code is located under `src`.
It is fully functional but you will want to add your own code there.

```sh
src
  ├── index.html
  ├── index.jsx
  ├── testbed.jsx
  └── testbed.css
```

## Start the dev server

```sh
$ yarn start
```

## Build a production distribution

```sh
$ yarn build
```

Generated files will be located under `build`.

- `build/index.html` loads js externally.
- `build/index-inline.html` can easily be shared/hosted since it is embedding js.
