#/bin/zsh

export PATH=$(npm bin):$PATH

electron-packager . --all --out ./publish/
