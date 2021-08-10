const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: {
      val: 5,
      left: null,
      right: null,
    },
    right: {
      val: 6,
      left: null,
      right: null,
    },
  },
};

const isSubPath = function (tree, subPath) {
  const pathArr = [];
  const dfs = (root, val) => {
    if (!root) return;
    if (!root.left && !root.right) pathArr.push(`${val}`);
    if (root.left) dfs(root.left, `${val}->${root.left.val}`);
    if (root.right) dfs(root.right, `${val}->${root.right.val}`);
  };
  dfs(tree, tree.val);
  return pathArr.includes(subPath);
};

console.log(isSubPath(tree, '1->3->5'));
