import Cookies from 'universal-cookie';
const cookies = new Cookies();


async function setCookie(key, value) {
    try {
        cookies.set(key, JSON.stringify(value), { path: '/' });
    } catch (err) {
        console.log("Error:in:setCookie ", err);
    }
}

async function getCookie(key) {
    try {
        let result = cookies.get(key)
        if (result) return JSON.parse(result);
        return null;
    } catch (err) {
        console.log("Error:in:getCookie ", err);
        return null;
    }
}

module.exports = { setCookie, getCookie };