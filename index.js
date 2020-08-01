#!/usr/bin/env node
const os = require('os')
const fs = require('fs')

const { manual } = require('./man')

const updateArgs = args => {
    if (!args.d && !args.directory) args.d = process.cwd()
    if (!args.n && !args.name) {
        throw new Error('Provide a name=AppName argument')
    }
    if (!args.e && !args.entry) {
        throw new Error('Provide an entry=entryPoint.js argument')
    }
    if (!args.f && !args.distro) {
        throw new Error('Provide a distribution=distro argument [either of Ubuntu or Redhat]')
    }
    return args
}

const getAppNameAndTemplate = args => {
    const matchDir = args.d || args.directory,
        appName = args.n || args.name,
        entryPoint = args.e || args.entry,
        distro = args.f || args.distro
    if (!/^[\w\d]+$/.test(appName)) throw new Error('Invalid app name. App name can contain letters, numbers and underscores.')
    if (!fs.existsSync(matchDir)) throw new Error(`The given directory ${matchDir} doesn't exist.`)
    if (!fs.existsSync(`${matchDir}/${entryPoint}`)) throw new Error(`The given file ${entryPoint} doesn't exist.`)
    if (fs.existsSync(`${matchDir}/${appName}.service`)) throw new Error(`The file ${appName}.service already exists in the directory ${matchDir}. Please rename the file or choose another name for your service.`)
    let group
    switch (distro.toLowerCase()) {
        case 'ubuntu':
            group = 'nogroup'
            break;
        case 'redhat':
            group = 'nobody'
            break
        default:
            throw new Error('Invalid distribution. Please provide Ubuntu or RedHat')
    }
    const template = `[Unit]\nDescription=${appName}\n[Service]\nExecStart=${matchDir}/${entryPoint}\nRestart=always\nUser=nobody\nGroup=${group}\nEnvironment=PATH=/usr/bin:/usr/local/bin\nEnvironment=NODE_ENV=production\nWorkingDirectory=${matchDir}\n[Install]\nWantedBy=multi-user.target`
    return { template, appName, matchDir, entryPoint }
}

const parseArgs = () => {
    const argsLs = process.argv.slice(2)
    if (argsLs.length === 0) throw new Error('Please provide h or help argument to see help. (linuxServiceMaker help)')
    const args = {}
    argsLs.forEach(arg => {
        if (arg === 'h' || arg === 'help') return args[arg] = true
        const [key, value] = arg.split('=')
        args[key] = value
    })
    return args
}

const printInstructions = (appName, matchDir, entryPoint) => {
    const instructions = `
Congratulations. Your service file (${appName}.service) is ready in the directory:
${matchDir}

Please make note of the following commands:

To create the service, copy the file to the systemd folder:
sudo cp "${matchDir}/${appName}.service" /etc/systemd/system/${appName}.service

To run the service once:
sudo systemctl start ${appName}

To run the service on each reboot:
sudo systemctl enable ${appName}

To stop the service:
sudo systemctl stop ${appName}

To view logs:
sudo systemctl status ${appName}

Make sure you have a shebang (#!/usr/bin/env node) in ${entryPoint}
and the entry point has executable permission:

chmod +x ${entryPoint}

Thank you for using linuxServiceMaker.`
    console.log(instructions)
    return
}

const main = () => {
    if (os.platform() !== 'linux') {
        console.log('Non linux system found. The script can only run on linux systems.')
        return
    }
    try {
        const args = parseArgs()
        if (!!args.h || !!args.help) {
            return console.log(manual)
        }
        const updatedArgs = updateArgs(args)
        const { appName, template, matchDir, entryPoint } = getAppNameAndTemplate(updatedArgs)
        fs.writeFileSync(`${matchDir}/${appName}.service`, template)
        printInstructions(appName, matchDir, entryPoint)
    } catch (err) {
        return console.log(err.message)
    }
}

main()