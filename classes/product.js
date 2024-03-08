const fs = require('fs');
const fsPromises = require('fs').promises;
const getData = async () => { const data = await (fsPromises.readFile('./data/products.json')); return JSON.parse(data); }

class product {
    #name;
    #category;
    #id;

    constructor(name, category, id) {
        this.#name = name;
        this.#category = category;
        this.#id = id
    }

    async save() {
        const allData = await getData();

        let newJsonObj = {
            name: this.#name,
            category: this.#category,
            id: this.#id
        }
        allData.push(newJsonObj);
        console.log(allData);
        try {
            await fsPromises.writeFile("./data/products.json", JSON.stringify(allData));
            console.log("I after writing !!!");
        } catch {
            console.log("eror: mistake write to JSON file");
        }
    }
}
module.exports = product;