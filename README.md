# remove-extra-modules

Removes extra modules that exist in parent tree.

```sh
├───project
│   └───node_modules
│       ├───babel
│       └───child-module << when run from here
│           └───node_modules
│               ├───babel << removes this because it exists in parent tree
│               ├───eslint << but not this
```

It goes through entire parent tree (not just one level up).

It moves the extra dependencies in `extra_node_modules`

## Install

```sh
npm i -g remove-extra-modules
```

## Usage

```sh
$ remove-extra-modules
# or
$ rxm
```
