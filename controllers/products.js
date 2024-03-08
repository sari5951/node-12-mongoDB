const fs = require('fs');
const { Module } = require('module');
const fsPromises = require('fs').promises;
const getData = async () => { const data = await (fsPromises.readFile('./data/products.json')); return JSON.parse(data); }
//import the class
const product = require('../classes/product');

const getAllProducts = async (req, res) => {
    const nameCategory = req.params.category;
    const allData = await getData();
    const allCatrgoryData = allData.filter(product => product.category === nameCategory);
    res.json(allCatrgoryData.sort((a, b) => {
        return a.name.localeCompare(b.name);
    }));
}
const getOneProduct = async (req, res) => {
    const allData = await getData();
    console.log(req.body.name);
    const id = parseInt(req.body.id);
    const category = req.body.category;
    const product = allData.find(product => (product.category === category && product.id === id));
    res.json(product)
}
const updateProduct = async (req, res) => {
    const allData = await getData();
    const id = parseInt(req.body.id); //accept id and convert him to int
    const category = req.body.category;
    const allDataWithUpdate = allData.map(product => (parseInt(product.id) === id && product.category === category) ? { name: (req.body.name == 'undifind' || req.body.name == null) ? product.name : req.body.name, category: category, id: id } : product);
    console.log(allDataWithUpdate);
    try {
        await fsPromises.writeFile("./data/products.json", JSON.stringify(allDataWithUpdate)); //write to categories.json
    }
    catch {
        console.log("mistake in write to JSON file");
    }
    res.json(allDataWithUpdate.sort((a, b) => {
        return a.name.localeCompare(b.name);
    }));
}
const deleteProduct = async (req, res) => {
    const id = Number(req.params.id);
    const allData = await getData();
    const category = req.body.category;
    const allDataAfterDelete = allData.filter(product => (Number(product.id) !== id || category !== product.category));
    try {
        await fsPromises.writeFile("./data/products.json", JSON.stringify(allDataAfterDelete)); //write to categories.json
    }
    catch {
        console.log("mistake in write to JSON file");
    }
    res.json({ message: "DELETE" });
}
const createProduct = async (req, res) => {
    console.log(`req.body.category: ${req.body.category}`);
    const data = req.body;
    const newProduct = new product(data.name, data.category, data.id);
    await newProduct.save();
    const allData = await getData();
    res.json(allData);
}
module.exports = {
    getAllProducts,
    getOneProduct,
    updateProduct,
    deleteProduct,
    createProduct
}
