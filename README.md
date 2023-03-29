# Young Adult Feud

This a almost-copy of the popular show "Family Feud" that is meant to be played in the browser.

## Install

This "game" does not yet have a release, so in order to install and run it just clone the repository:
```
git clone https://github.com/durhenkd/Young-Family-Feud
cd Young-Family-Feud
```

Then make sure you have npm installed:
- For Windows go to the [Node.js page](https://nodejs.org/en/download) and install the appropriate version. It should also install `npm` for you.
- For Arch-based Linux distros (like Manjaro): 
  ```
  $ sudo pacman -Syu nvm
  $ nvm install --lts
  ```
  Then check for correct installation: `$ node -v && npm -v`

- Debian-based Linux distros (like Ubuntu):
  ```
  $ sudo apt update
  $ sudo apt install Node.js
  $ sudo apt install npm
  ```
  Then check for correct installation: ` $ Node.js -v && npm --version `

## Run the game

After you installed all the prerequisites just type the following command while in the cloned folder to install all the dependencies (It is only neccessary to be executed once):
```
$ npm install
```

Then to actually run the game:

```
$ npm run dev
```

And open in the browser the shown page.

## Modify questions

In order to modify the questions, you must edit `src/data.ts`. More details as to how are described in the file.