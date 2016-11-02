import React, { PropTypes } from 'react';

import { prefix } from './../../../../util/prefix';
import { keyFromObject } from './../../../../util/keyGenerator';
import { CLASS_NAMES } from './../../../../constants/GridConstants';

export const Text = ({
    actualIndex, col, columnManager, dragAndDropManager, sortHandle
}) => {

    const innerHTML = col.get('name');
    const draggable = col.get('moveable') !== undefined
        ? col.get('moveable')
        : columnManager.config.moveable;

    const spanProps = dragAndDropManager.initDragable({
        draggable: draggable,
        className: draggable
            ? prefix(CLASS_NAMES.DRAGGABLE_COLUMN, CLASS_NAMES.COLUMN)
            : prefix(CLASS_NAMES.COLUMN),
        onDrag: () => {},
        onDragStart: (reactEvent) => {
            const data = {
                key: keyFromObject(col),
                index: actualIndex
            };
            reactEvent.dataTransfer.setData('Text', JSON.stringify(data));
        }
    });

    return (
        <span { ...spanProps } >
            { innerHTML }
            { sortHandle }
        </span>
    );
};

Text.propTypes = {
    actualIndex: PropTypes.number,
    col: PropTypes.object,
    columnManager: PropTypes.object,
    dragAndDropManager: PropTypes.object,
    index: PropTypes.number,
    sortHandle: PropTypes.element
};
