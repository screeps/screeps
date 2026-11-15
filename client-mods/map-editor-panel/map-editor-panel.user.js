// ==UserScript==
// @name         Screeps: Script, Console and Memory on the world map
// @namespace    https://github.com/screeps/screeps
// @version      1.0.0
// @description  Shows the bottom panel of the room view (Script, Console, Memory) on the world map pages.
// @match        https://screeps.com/a/*
// @match        https://screeps.com/ptr/*
// @match        https://screeps.com/season/*
// @run-at       document-idle
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Route segments of the world map pages: the classic map and the new one (with and without a shard).
    var MAP_SEGMENTS = ['top.game-world-map', 'top.map2', 'top.map2shard'];
    var HOST_CLASS = 'map-editor-panel';
    var HEIGHT_VAR = '--map-editor-panel-height';

    // The same include the room view uses. The panel is sized by the client's own resize directive, which
    // waits for a "section.room" next to the panel and keeps its "bottom" equal to the panel height.
    var HOST_HTML =
        '<div app:resize-panel class="' + HOST_CLASS + '">' +
            '<section class="room" style="display: none"></section>' +
            '<ng:include src="::\'components/game/editor-panel/editor-panel.html\' | bust"></ng:include>' +
        '</div>';

    // Both maps end above the panel, like the room does in the room view. Without the panel the variable
    // is not set and these are the values the client has itself.
    var MAP2_HEIGHT = 'calc(100vh - 42px - var(' + HEIGHT_VAR + ', 0px))';
    var STYLES =
        'section.world-map .map-container { bottom: var(' + HEIGHT_VAR + ', 0px); }' +
        'body app2-router-outlet app-world-map-base { height: ' + MAP2_HEIGHT + '; min-height: ' + MAP2_HEIGHT + '; }';

    function init($rootScope, $compile, $routeSegment, Auth, Connection) {
        var root = document.documentElement;
        var resizeFrame = null;

        var style = document.createElement('style');
        style.textContent = STYLES;
        document.head.appendChild(style);

        function setPanelHeight(height) {
            if (height) {
                root.style.setProperty(HEIGHT_VAR, height);
            } else {
                root.style.removeProperty(HEIGHT_VAR);
            }
            // Both maps take their size on window resize; one event per frame is enough while dragging.
            cancelAnimationFrame(resizeFrame);
            resizeFrame = requestAnimationFrame(function () {
                window.dispatchEvent(new Event('resize'));
            });
        }

        function mount() {
            if (MAP_SEGMENTS.indexOf($routeSegment.name) < 0 || !Auth.Me) {
                return;
            }
            // While the previous page fades out there are two containers, the new one is the last.
            var pages = document.querySelectorAll('.page-content');
            var page = angular.element(pages[pages.length - 1]);
            var pageScope = page.scope();
            if (!pageScope || page.children('.' + HOST_CLASS).length) {
                return;
            }

            // A child of the page scope: the panel goes away together with the map page.
            var scope = pageScope.$new();
            // What the panel reads from the "Game" controller of the room view.
            scope.Game = {player: Auth.Me._id, simulationMode: false, popped: false};

            // The room view does these two on load. listenSocket subscribes to the console log, and to
            // the current room through $watchCollection. There is no room here, so that part is skipped.
            Connection.setRunningLocal(false);
            scope.$watchCollection = function () {
                return angular.noop;
            };
            Connection.listenSocket(scope);
            delete scope.$watchCollection;

            var host = $compile(HOST_HTML)(scope);
            var room = host.children('section.room')[0];
            var layout = function () {
                // Ctrl+F11 hides the interface, the panel too.
                setPanelHeight(scope.Top && scope.Top.hideUi ? null : room.style.bottom);
            };
            scope.$on('resize', layout);
            scope.$watch('Top.hideUi', layout);
            scope.$on('$destroy', function () {
                setPanelHeight(null);
            });
            page.append(host);
        }

        // Emitted by every page container after its content is in place.
        $rootScope.$on('$viewContentLoaded', mount);
        // The map may be already open when this script starts.
        $rootScope.$evalAsync(mount);
    }

    // The client is an AngularJS app bootstrapped on <body> some time after the page is loaded.
    var attempts = 300;
    (function boot() {
        var injector = window.angular && window.angular.element(document.body).injector();
        if (injector) {
            injector.invoke(['$rootScope', '$compile', '$routeSegment', 'Auth', 'Connection', init]);
        } else if (attempts-- > 0) {
            setTimeout(boot, 200);
        }
    })();
})();
