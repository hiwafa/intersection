import Cookies from 'universal-cookie';
const cookies = new Cookies();


async function setCookie(key, value) {
    try {
        if (value && value.jwt){
            cookies.set(key, JSON.stringify(value), { path: '/' });
        }
    } catch (err) {
        console.log("Error:in:setCookie ", err);
    }
}

async function getCookie(key) {
    try {
        let result = cookies.get(key);
        console.log('Cookie result: ',result)
        if (result) return result;
        // return null;
    } catch (err) {
        console.log("Error:in:getCookie ", err);
        return null;
    }
}

async function removeCookie(key) {
    try {
        cookies.remove(key);
    } catch (err) {
        console.log("Error:in:removeCookie ", err);
    }
}

module.exports = { setCookie, getCookie, removeCookie };