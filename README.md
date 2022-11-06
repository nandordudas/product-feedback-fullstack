# [WIP] Product feedback

> ❗ The related project will be filled with items until 15th November

This project is based on [developing inside a container] with VSCode.
[Development container] is a powerful way to create local development environments.

## For preview

Check [system requirements] and [installation] introduction.

```sh
$ # clone project's repository
$ npx degit nandordudas/product-feedback-fullstack product-feedback
$ # select project's folder
$ cd ./product-feedback
$ # create necessary dotfiles - update the value of COMPOSE_PROJECT_NAME variable
$ cp ./.env.example ./.env
$ cp ./apps/api/.env.example ./apps/api/.env
$ cp ./apps/web/.env.example ./apps/web/.env
$ # open the folder with VSCode
$ code . -n
```

Use the `Dev Containers: Reopen in Container` command from the Command Palette (<kbd>F1</kbd>, <kbd>Ctrl+Shift+P</kbd>).

This may take longer the first time, but it will be much faster after that.

## Checking the api

```sh
$ # run api migration and seed database with
$ pushd /workspace/apps/api
$ node ace migration:refresh --seed
$ popd
$ # run development - you can use alias d
$ nr dev
```

The web at http://localhost:3000/ and the api at http://localhost:3333/api/users are available.

[developing inside a container]: https://code.visualstudio.com/docs/devcontainers/containers
[Development container]: https://containers.dev/
[system requirements]: https://code.visualstudio.com/docs/devcontainers/containers#_system-requirements
[installation]: https://code.visualstudio.com/docs/devcontainers/containers#_installation
