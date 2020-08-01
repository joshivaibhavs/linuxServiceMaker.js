A basic command line tool to create a `.service` file for Node.js backend app. 

This allows you to run your app without blocking the terminal.

You can run your Node.js app as a background service after creating the service file. This package contains the bare minimum code required to generate the file and a set of instructions to run the service.

Run `npm i -g linux_service_maker` to install

Please type `linuxServiceMaker help` in your terminal (after installation) for more info.

When you run the command, a linux service file is generated in the directory of your choice (current directory by default). You have to copy this file to the `/etc/systemd/system/` directory.

The .service file is created following `@mikemaccana`'s <a href="https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953#29042953">answer</a> on

https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953

According to him,
>forever, monit, PM2, etc are no longer necessary - your OS already handles these tasks.


To report issues/bugs go to:

https://github.com/joshivaibhavs/linuxServiceMaker.js/issues
