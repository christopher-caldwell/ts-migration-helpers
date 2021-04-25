const changeDragItemLocation = (dropIndex: any, currentOrder: any, dragItem: any) => {
    const removeDragItem = currentOrder.filter((name: any) => name !== dragItem);
    const beginning = removeDragItem.slice(0, dropIndex);
    const end = removeDragItem.slice(dropIndex);
    return [...beginning, dragItem, ...end];
};

export { changeDragItemLocation };
