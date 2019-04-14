# 🎚 [WIP] github-repo-configurator

## Usage
- Download

    `npm i -g github-repo-configurator`
- [Optional] If accessing a private repo, you'd need to set your github token
    - Set it into a `.env` file
        - Create `.env` file
        - Set it in `.env`
    - [WIP] Set it using the `-t` or `--token` flag


## Options

    - `-u` or `--user`: Repo's owner name
    - `-r` or `--repo`: Repo's name
    - `-t` or `--token`: Github's user token
    - `-d` or `--download`: Download labels as file or not
    - `-l` or `--labels`: Labels to import path. Default `imports/labels.json`

## Actions
- Get labels from repo

    `get-labels -u username -r repo -d`

    - `-u` or `--user`: Repo's owner name
    - `-r` or `--repo`: Repo's name
    - `-d` or `--download`: [Optional] If set, the labels would be downloaded in `repos-name.json`

- [WIP] Import labels
- [WIP] Create label
