import {Extent, Module} from "@planisto/university";

export const moduleFixtures = {
    'vertiefung': new Module({
        name: 'Vertiefung',
        code: 'INF-B-510',
        extent: new Extent({
            lecture: 4,
            practical: 4,
            exercise: 4
        }),
        mandatory: true,
    }),
    'spezialisierung': new Module({
        name: 'Spezialisierung',
        code: 'INF-B-520',
        extent: new Extent({
            lecture: 4,
            practical: 4,
            exercise: 4
        }),
        mandatory: true,
    })
}