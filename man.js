exports.manual = `A node package for running your backend as a background service on Linux

Note: the arguments are passed in the following format:
<command> <argument>=<value>

This is done to minimize the package size.
The argument parsers on npm are ridiculously large.

The .service file is created following @mikemaccana's answer on
https://stackoverflow.com/questions/4018154/how-do-i-run-a-node-js-app-as-a-background-service/29042953

Arguments:

char  | full argument    | Description
 h    | help             | Display this
 n    | name             | Name you want to give your service (eg. myApp)*
 e    | entry            | The entry point of the service (eg. index.js)
 u    | user             | [Optional] Provide user and group to run the process as that user
 g    | group            | [Optional] Provide user and group to run the process as that user
 f    | distro           | [Optional] Distribution family either of Ubuntu or RedHat (Required if user and group not provided)
 d    | directory        | [Optional] if the entry point is not in the current directory, specify the path where the entry point is located.

* Name must contain only characters, numbers and underscores

You can provide environment variables in lsm.env file.
Put the file in the same directory as the entry point.

Provide env vars in following format:
NAME=VALUE

example command:
linuxServiceMaker n=MyApp e=index.js f=Ubuntu
OR
linuxServiceMaker n=MyApp e=index.js u=username g=groupname
`;
