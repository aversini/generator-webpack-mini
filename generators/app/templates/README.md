# Mini webpack project

## Install dependencies

```sh
$ npm install
```

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
$ npm run start
```

## Start a graphical bundle analyzer

```sh
$ npm run stats
```

## Build a production distribution

```sh
$ npm run build
```

Generated files will be located under `build`.

- `build/index.html` loads js and css externally.
- `build/index-inline.html` can easily be shared/hosted since it is embedding js and css.
