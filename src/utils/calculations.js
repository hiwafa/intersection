import moment from 'moment';
import 'moment/locale/zh-cn';

const firstCounter = ({
    crashes, CRASH_COUNT, AADT,
    CRASH_END_DATE, CRASH_START_DATE
}) => {

    let a = 0, b = 0, c = 0, pdo = 0, epdo = 0,
        injuries = 0, fatalities = 0, crashRate = 0;

    if (!(CRASH_END_DATE && CRASH_START_DATE)) return false;

    let endDate = moment(CRASH_END_DATE);
    let startDate = moment(CRASH_START_DATE);
    let years = (endDate.diff(startDate, "days") / 365).toFixed(5);

    crashes && crashes.forEach(crash => {
        a += parseInt(crash.NUMBER_OF_A_INJURIES);
        b += parseInt(crash.NUMBER_OF_B_INJURIES);
        c += parseInt(crash.NUMBER_OF_C_INJURIES);
        injuries += parseInt(crash.NUMBER_OF_INJURIES);
        fatalities += parseInt(crash.NUMBER_OF_FATALITIES);
        pdo += parseInt(crash.NUMBER_OF_PDO);
    });

    crashRate = (CRASH_COUNT * 1000000) / (years * 365 * AADT);

    epdo = 542 * fatalities + 11 * injuries + 1 * pdo;

    return { a, b, c, injuries, fatalities, pdo, epdo, crashRate, years };
};

const getCalculatedData = ({
    treatments, AADT_GROWTH_FACTOR,
    fCrashCost, iCrashCost, pCrashCost,
    injuries, fatalities, pdo, years,
}) => {

    let crf = 1, EUAC = 0.0, EUAB = 0.0;
    treatments && treatments.forEach(treat => {
        let i = parseFloat(treat.INTEREST_RATE),
            Cest = parseFloat(treat.TOTAL_TREATMENT_COST),
            Sper = parseFloat(treat.SALVAGE_PERCENT),
            l = parseInt(treat.SERVICE_LIFE),

            cr = (i * Math.pow((1 + i), l)) / (Math.pow((1 + i), l) - 1),
            sf = i / (Math.pow((1 + i), l) - 1),
            sv = Cest * Sper;

        EUAC += (Cest * cr) - (sv * sf);
        crf *= (1 - parseFloat(treat.CRF));
    });

    crf = 1 - crf;
    let aADT = Math.pow((1 + AADT_GROWTH_FACTOR / 100), years);
    crf = aADT * crf;

    let crbF = fatalities * crf;
    let crbI = injuries * crf;
    let crbP = pdo * crf;

    let ccF = crbF * fCrashCost;
    let ccI = crbI * iCrashCost;
    let ccP = crbP * pCrashCost;

    EUAB = ((ccF + ccI + ccP) / years);

    const BEN_COST = (EUAB / EUAC).toFixed(3);

    EUAC = EUAC.toFixed(3);

    return { EUAC, EUAB, BEN_COST }
}



module.exports = { firstCounter, getCalculatedData };