const {getKeymaps} = require('../config');

// menus
const viewMenu = require('./menus/view');
const shellMenu = require('./menus/shell');
const editMenu = require('./menus/edit');
const pluginsMenu = require('./menus/plugins');
const windowMenu = require('./menus/window');
const helpMenu = require('./menus/help');
const darwinMenu = require('./menus/darwin');

module.exports = (createWindow, updatePlugins, getLoadedPluginVersions) => {
  const commands = getKeymaps().commands;
  const showAbout = () => {
    const loadedPlugins = getLoadedPluginVersions();
    const pluginList = loadedPlugins.length === 0 ?
      'none' :
      loadedPlugins.map(plugin => `\n  ${plugin.name} (${plugin.version})`);
    dialog.showMessageBox({
      title: `About ${appName}`,
      message: `${appName} ${appVersion}`,
      detail: `Plugins: ${pluginList}\n\nCreated by Guillermo Rauch\n© Zeit`,
      icon: path.join(__dirname, 'static/icon.png'),
      buttons: []
    });
  };
  const menu = [
    ...(process.platform === 'darwin' ? [darwinMenu(commands, showAbout)] : []),
    shellMenu(commands, createWindow),
    editMenu(commands),
    viewMenu(commands),
    pluginsMenu(commands, updatePlugins),
    windowMenu(commands),
    helpMenu(commands, showAbout)
  ];

  return menu;
};
