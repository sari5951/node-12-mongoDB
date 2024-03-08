const fs = require('fs');
const fsPromises = require('fs').promises;
const getData = async () => { const data = await (fsPromises.readFile('./data/users.json')); return JSON.parse(data); }
class User {

    constructor(mobile, email, name, password, status) {
        this.mobile=mobile;
        this.email=email;
        this.name=name;
        this.password=password;
        this.status= status;
    }
    
    

    async saveToJson(newUser) {
        console.log("hello! I in saveToJson");
        const allData = await getData();
        allData.push(newUser);
        try {
            await fsPromises.writeFile("./data/users.json", JSON.stringify(allData));
        } catch {
            console.log("eror: mistake write to JSON file");
        }
    };
}
module.exports = User;

User.login=async(mobile, email)=> {

    try {
        console.log("I in login");
        const allUsers = await getData();
        const user = allUsers.find(user => user.mobile === mobile && user.email === email);
    return user;
    }
    catch {
        console.log("load data from user json is failed");
    }
}