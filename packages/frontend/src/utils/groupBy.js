function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
        let keys = keyGetter(item);

        if (!Array.isArray(keys)) {
            let keys = [keys];
        }

        for (const key of keys) {
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        }
    });
    return map;
}

export default groupBy;