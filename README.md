# ELK-BLEDOM-RECODE

This project is a completely restructured version of my old [ELK-BLEDOM](https://github.com/Amenofisch/ELK-BLEDOM)-named repository.
It basically has the same features although this version supports multiple LED Strips to be used with a single instance of this software.

## Endpoints
See api-spec.yml using a OpenAPI Editor (https://editor.swagger.io/ <-- copy and paste the file into there)

## Basic Setup
The installation steps are pretty much the same as with the old version.

1. Edit config.js to your needs (Don't forget to adjust the devices)
2. Install gatttool (`sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev`)
3. Install nodejs
4. (optional but recommended) Install pm2 `npm install -g pm2`
5. Install all neccessary packages using `npm i`
6. Start the project either using pm2 (`pm2 start index.js`) or using nodejs (`node index.js`)

## Development Workflow

1. Fork the project
2. Clone the project to a folder on your computer
3. Make your changes to the project
4. Push them to github with **appropriate and descriptive** commit messages
5. Make a pull request to the main repo with a **descriptive, appropriate and accurate** title and description
6. Wait for your PR to be approved/reviewed