const changeDragItemLocation = (dropIndex, currentOrder, dragItem) => {
    const removeDragItem = currentOrder.filter(name => name !== dragItem);
    const beginning = removeDragItem.slice(0, dropIndex);
    const end = removeDragItem.slice(dropIndex);
    return [...beginning, dragItem, ...end];
};

export { changeDragItemLocation };
