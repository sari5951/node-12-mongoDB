const fs = require('fs');
const fsPromises = require('fs').promises;
const getData = async () => { const data = await (fsPromises.readFile('./data/categories.json')); return JSON.parse(data); }
//import the class
const category = require('../classes/category');
const { log } = require('console');

//POST- create new category
const newCategory = async (req, res) => {
    console.log("hello! I in newCategory");
    const newCategory = new category(req.body.id, req.body.name);
    await newCategory.save();
    res.send(fs.readFileSync("./data/categories.json"));
};

//DELETE '/categories/:id'
const deleteOneCategory = async (req, res, next) => {
    console.log("hello! I in deleteOneCategory");
    const id = Number(req.params.id);
    console.log("id: " + id);
    const allData = await getData();
    console.log(allData);
    const allDataAfterDelete = allData.filter(category => category.id !== id);
    try {
        await fsPromises.writeFile("./data/categories.json", JSON.stringify(allDataAfterDelete)); //write to categories.json
    }
    catch {
        console.log("mistake in write to JSON file");
    }
    res.json({ message: "DELETE" });
};

//GET '/categories/:name'
const getOneCategory = async (req, res, next) => {
    console.log("hello! I in getOneCategory");

    const id = Number(req.params.id);
    const allData = await getData();
    const oneCategory = allData.find(category => category.id === id);
    res.json(oneCategory);
};

//GET '/categories'
const getAllCategories = async (req, res, next) => {
    console.log("hello! I in getAllCategories");
    const allData = await getData();
    const sortedData = allData.slice().sort((a, b) => {
        if (a != undefined && b != undefined)
            return (a.name).localeCompare(b.name);
        else
            return 0;

    });
    res.json(sortedData);

    //גרסת הנוד שלי לא תמכה בפונקציה toSorted
    // const sortedData = allData.toSorted((a, b) => {
    //     return a.name.localeCompare(b.name);
    // });

    // }
    // catch {
    //     res.send("eror: mistake in sort")
    // }
};
//PUT
const changeCategory = async (req, res, next) => {
    const allData = await getData();
    const id = parseInt(req.body.id); //accept id and convert him to int
    const allDataWithUpdate = allData.map(category => (parseInt(category.id) === id) ? { id: id, name: (req.body.name == 'undifind' || req.body.name == null) ? category.name : req.body.name } : category);
    console.log(allDataWithUpdate);
    try {
        await fsPromises.writeFile("./data/categories.json", JSON.stringify(allDataWithUpdate)); //write to categories.json
    }
    catch {
        console.log("mistake in write to JSON file");
    }
    res.json(allDataWithUpdate);
};

//export controller functions
module.exports = {
    newCategory,
    deleteOneCategory,
    getOneCategory,
    getAllCategories,
    changeCategory

};
