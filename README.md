# HKU 7405 Option Pricer GUI

This is a GUI project for FITE 7405 to price options. An electron startup template is used [electron-vite-vue](https://github.com/electron-vite/electron-vite-vue).
The program can be run on Windows, MacOS, and Linux.

## Quick start
The GUI will communicate with the backend server (default localhost:7405) to retrieve the calculation methods and parameters.
### Build by yourself
You can customize the server address (if you want to provide service remotely) or make customization in this way.
clone the whole repo, cd into the project directory, and run
```shell
npm install
# pnpm install #if you are using pnpm
```
For development
```
vite
```
For build
```
vue-tsc --noEmit && vite build && electron-builder
```
You can modify the `electron-builder.json5` config to modify the build configuration.

### Add new calculation methods
The calculation is done in a Python server, and implementing calculation methods should be done in Python, so to add new calculation methods no UI code needs to be modified.
To add new calculation methods, follow the README [here](https://github.com/atair-ibn-laahad/7405-assignment3).

### Run the whole Assignment
still, you can follow the README [here](https://github.com/atair-ibn-laahad/7405-assignment3)
