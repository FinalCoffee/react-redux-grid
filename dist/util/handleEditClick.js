'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.closestRow = exports.handleEditClick = undefined;

var _EditorActions = require('./../actions/plugins/editor/EditorActions');

var _prefix = require('./../util/prefix');

var _GridConstants = require('./../constants/GridConstants');

var handleEditClick = exports.handleEditClick = function handleEditClick(editor, store, rowId, rowData, rowIndex, columns, stateKey) {
    var events = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};
    var data = arguments[8];


    if (events.HANDLE_BEFORE_EDIT) {
        var result = events.HANDLE_BEFORE_EDIT({
            store: store,
            id: rowId,
            data: rowData
        });

        // if HANDLE_BEFORE_EDIT event returns false
        // do not trigger edit
        if (result === false) {
            return;
        }
    }

    var row = closestRow(data.reactEvent.target);
    var offset = 7;
    var top = row ? row.offsetTop + row.clientHeight + offset : 0;

    // if (editor.config.type === editor.editModes.inline) {
    store.dispatch((0, _EditorActions.editRow)({
        rowId: rowId,
        top: top,
        rowData: rowData,
        rowIndex: rowIndex,
        columns: columns,
        stateKey: stateKey,
        editMode: editor.config.type
    }));
    // }
};

var closestRow = exports.closestRow = function closestRow(target) {
    var _gridConfig = (0, _GridConstants.gridConfig)(),
        CLASS_NAMES = _gridConfig.CLASS_NAMES;

    var el = target;

    while (el && el !== document.body) {
        if (el && el.classList && el.classList.contains((0, _prefix.prefix)(CLASS_NAMES.ROW))) {
            return el;
        }
        el = el.parentNode;
    }
};