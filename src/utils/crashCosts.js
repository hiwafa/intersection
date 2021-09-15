export default function crashCost(severity) {
    let result =0;
    switch(severity){
        case "fatal":
            result = 4008900;
            break;
        case "INJ":
            result = 81400;
            break;
        case "pdo":
            result = 7400;
            break;
    }
    return result
}