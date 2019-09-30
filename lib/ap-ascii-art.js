'use babel';

import { CompositeDisposable } from 'atom';

module.exports = {

  config: require('./config'),

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ap-ascii-art:convert': () => this.convert()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  convert() {
    // console.log('Convert text!');
    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      const selection = editor.getSelectedText()
      const figlet = require('figlet')
      // const font = 'o8'
      const font = atom.config.get('ap-ascii-art.font')
      const horizontalLayout = atom.config.get('ap-ascii-art.horizontalLayout')
      const verticalLayout = atom.config.get('ap-ascii-art.verticalLayout')
      console.log(font)
      figlet(selection, {font, horizontalLayout, verticalLayout}, function (error, art) {
        if (error) {
          console.error(error)
        } else {
          editor.insertText(`\n${art}\n`)
        }
      })
    }
  }

};
