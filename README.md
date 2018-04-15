# react-preview

> a GitHub App built with [probot](https://github.com/probot/probot) that generates preview links for react based projects.

![Demo](assets/demonstration.png?raw=true)

## How to Use

* Go to the [app](https://github.com/apps/react-preview) page.
* Install the github app on your repo.
* If the react code is in the repo root directory then config ends here.
* Now on any PR, comment `/preview` and the github bot app will reply with a preview link.

* In case, your react code is not in the repo root. Say you have backend code in the repo root and inside that you have a folder named `client/`. The client folder contains the react code (along with it's package.json), then you have to tell the github app about this. Make sure the package.json containing the react dependency is directly in that folder. To do this, follow these steps -

1. Create a folder named `.github/` in repo root.
1. Inside `.github/` folder create a `config.yml` file.
1. Put this code in the `config.yml`. Replace client with whatever your folder name is. You can also go deeper like `/package/web`.
```yml
reactPreviewFolder: client
```

If you followed the example the folder structure should look like

![Folder Structure of Repo with react-preview installed](assets/folder-structure.png?raw=true)

## Setup for Development

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.
