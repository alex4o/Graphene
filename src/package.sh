#/bin/zsh

export PATH=$(npm bin):$PATH

electron-packager . --all --out ./publish/ --ignore=/js --ignore=/css --ignore=/node_modules --ignore=webpack.config.js #--icon=./out/icon.png