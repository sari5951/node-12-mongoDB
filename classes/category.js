const { log } = require('console');
const fs = require('fs');
const fsPromises = require('fs').promises;
const getData = async () => { const data = await (fsPromises.readFile('./data/categories.json')); return JSON.parse(data); }

class category {
    #id;
    #name;

    constructor(id, name) {
        this.#id = id;
        this.#name = name;
    }

    async save(newCategory) {
        console.log("I in saveCategory");
        const allData = await getData();
        let newCategoryObj = {
            id: this.#id,
            name: this.#name
        }
        allData.push(newCategoryObj);
        try {
            await fsPromises.writeFile("./data/categories.json", JSON.stringify(allData, null, 2));

        } catch {
            console.error("eror: mistake write to JSON file");
        }
    }

    static getId(obj) {
        return obj.#id;
    }

    static getName(obj) {
        return obj.#name;
    }
}
module.exports = category;