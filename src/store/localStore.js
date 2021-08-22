async function saveSecure(key, value) {
    try {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
        }
    } catch (err) {
        console.log("Error:in:saveSecure ", err);
    }
}

async function getValueFor(key) {
    try {
        if (typeof (Storage) !== "undefined") {
            let result = localStorage.getItem(key);
            if (result) return JSON.parse(result);
        }
        return null;
    } catch (err) {
        console.log("Error:in:getValueFor ", err);
        return null;
    }
}

module.exports = { saveSecure, getValueFor };