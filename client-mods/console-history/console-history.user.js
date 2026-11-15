// ==UserScript==
// @name         Screeps: console command history
// @namespace    https://github.com/screeps/screeps
// @version      1.0.0
// @description  Up and Down in the game console bring back the commands sent before, like in a terminal. They are kept between pages and page reloads.
// @match        https://screeps.com/a/*
// @match        https://screeps.com/ptr/*
// @match        https://screeps.com/season/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    var STORAGE_KEY = 'client-mods.console-history';
    var MAX_COMMANDS = 500;

    function load() {
        try {
            var commands = JSON.parse(localStorage.getItem(STORAGE_KEY));
            return Array.isArray(commands) ? commands : [];
        } catch (e) {
            return [];
        }
    }

    function remember(command) {
        var commands = load();
        // A command repeated in a row is kept once.
        if (!command.trim() || command === commands[commands.length - 1]) {
            return;
        }
        commands.push(command);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(commands.slice(-MAX_COMMANDS)));
    }

    function attach(editor) {
        // While Up and Down are in use: the kept commands, and the line that was being typed as the last one.
        var lines = null;
        var current;

        function text() {
            // The client leaves a line break in the editor after a command is sent.
            return editor.getValue().replace(/\r?\n/g, '');
        }

        function move(step) {
            if (!lines) {
                lines = load().concat(text());
                current = lines.length - 1;
            }
            var next = current + step;
            if (next >= 0 && next < lines.length) {
                // A changed line is not lost when moving away from it.
                lines[current] = text();
                current = next;
                // 1: the cursor goes to the end
                editor.setValue(lines[current], 1);
            }
            if (current === lines.length - 1) {
                // Back on the line being typed. The next Up reads the commands again: there may be new
                // ones from another tab.
                lines = null;
            }
        }

        var HashHandler = window.ace.require('ace/keyboard/hash_handler').HashHandler;
        var keys = new HashHandler();
        keys.addCommand({
            name: 'consoleHistoryUp',
            bindKey: {win: 'Up', mac: 'Up'},
            exec: function () {
                move(-1);
            }
        });
        keys.addCommand({
            name: 'consoleHistoryDown',
            bindKey: {win: 'Down', mac: 'Down'},
            exec: function () {
                move(1);
            }
        });
        keys.addCommand({
            name: 'consoleHistoryAdd',
            bindKey: {win: 'Enter', mac: 'Enter'},
            exec: function () {
                try {
                    remember(text());
                } catch (e) {
                    // The storage is full or turned off. The command has to be sent anyway.
                }
                lines = null;
                // false: not handled here, the client's own handler of Enter sends the command
                return false;
            }
        });
        // The handler added last is asked first, so these go before the Up and Down of the client,
        // which keeps the commands of the current page only.
        editor.keyBinding.addKeyboardHandler(keys);
    }

    var attached = new WeakSet();

    // The console is created and removed together with the pages of the client. Its editor is taken on the
    // first key pressed in it: this listener runs before the editor gets the key.
    document.addEventListener('keydown', function (event) {
        var input = event.target.closest && event.target.closest('.console-input');
        var container = input && input.querySelector('.ace_editor');
        var editor = container && container.env && container.env.editor;
        if (editor && !attached.has(editor)) {
            attached.add(editor);
            attach(editor);
        }
    }, true);
})();
