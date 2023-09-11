var TreeStore = /** @class */ (function () {
    function TreeStore(list) {
        this.list = [];
        this.objectDictionary = {};
        this.arrayIds = [];
        this.initialize(list);
    }
    TreeStore.prototype.initialize = function (list) {
        var _this = this;
        list.forEach(function (item) {
            _this.list = list;
            _this.objectDictionary[item.id] = item;
            if (_this.arrayIds.indexOf(item.id) !== -1)
                return;
            _this.arrayIds.push(item.id);
        });
    };
    TreeStore.prototype.getAll = function () {
        return this.list;
    };
    TreeStore.prototype.getItem = function (id) {
        return this.objectDictionary[id];
    };
    TreeStore.prototype.getChildren = function (id) {
        var _this = this;
        return this.arrayIds
            .filter(function (itemid) { return _this.objectDictionary[itemid].parent == id; })
            .map(function (itemid) { return _this.objectDictionary[itemid]; });
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var _this = this;
        var nextChildrens = this.getChildren(id);
        nextChildrens.forEach(function (c) {
            if (!c.id)
                return;
            var arr = _this.getAllChildren(c.id);
            nextChildrens = nextChildrens.concat(arr);
        });
        return nextChildrens;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var arr = [];
        var item = this.getItem(id);
        if (item) {
            if (!arr.length)
                arr.push(item);
            var ar = this.getAllParents(item.parent);
            arr = arr.concat(ar);
        }
        return arr;
    };
    return TreeStore;
}());
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
var ts = new TreeStore(items);
// console.log(ts)
// console.log(ts.getAll())
// console.log(ts.getItem(3))
// console.log(ts.getChildren(2))
// console.log(ts.getAllChildren(2))
console.log(ts.getAllParents(7));
