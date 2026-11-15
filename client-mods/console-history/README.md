Console command history
=======================

A script for the browser client of the game at https://screeps.com/a/. It makes the Up and Down keys of the console work like in a terminal.

The client keeps the commands of the console only while the page is open: after another page of the game was visited, or the page was reloaded, Up brings nothing back. With this script:

* Up and Down go through the commands sent before, also after a reload, on another day, in another tab and in the pop-out window of the editor panel.
* A command comes into the input line with the cursor at its end, so it can be changed and sent again.
* The line that was being typed is not lost: Down brings it back after the newest command.
* A command sent several times in a row is kept once.

The last 500 commands are kept. They are in the local storage of the browser under the key `client-mods.console-history` and are not sent anywhere. To forget them, run `localStorage.removeItem('client-mods.console-history')` in the developer tools of the browser.

The client is not a part of this repository, and nothing changes on the server.

Install
-------

Do one of these and reload the game page:

* **Chrome extension.** Open `chrome://extensions`, turn on *Developer mode*, press *Load unpacked* and choose this folder.
* **Userscript.** Add `console-history.user.js` to Tampermonkey or Violentmonkey.

The Steam client cannot load browser scripts, so it is not covered.
