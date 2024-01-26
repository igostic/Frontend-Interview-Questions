const useTraverseTree = () => {
  const insertNode = function (tree, folderId, item, isFolder) {
    if (tree.id === folderId && tree.isFolder) {
      tree.items.unshift({
        id: new Date().getTime(),
        name: item,
        isFolder: isFolder,
        items: []
      });

      return tree;
    }

    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, folderId, item, isFolder);
    });

    return { ...tree, items: latestNode };
  };

  // function deleteNode(tree, folderID) {
  //   if (tree.id === folderID) {
  //     return null;
  //   }

  //   let filteredTree = [];
  //   filteredTree = tree.items
  //     .filter((item) => item.id !== folderID)
  //     .map((item) => deleteNode(item, folderID));

  //   return { ...tree, items: filteredTree };
  // }

  // function renameNode(tree, folderID, item) {
  //   if (tree.id === folderID) {
  //     tree.name = item;
  //     return tree;
  //   }

  //   let updatedItem = [];
  //   updatedItem = tree.items.map((obj) => {
  //     return updateNode(obj, folderID, item);
  //   });

  //   return { ...tree, items: updatedItem };
  // }
  // return { insertNode, deleteNode, renameNode };
  return { insertNode };
};

export default useTraverseTree;
