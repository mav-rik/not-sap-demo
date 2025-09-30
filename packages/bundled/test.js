import { Metadata } from 'notsapodata/metadata'
import { OData } from 'notsapodata'
import { readFileSync, writeFileSync } from 'fs'
import { generateModelTypes } from 'notsapodata/codegen'

const model = new OData('')

const xml = readFileSync('metadata.xml').toString()

const m = new Metadata(xml, model, 'MODEL')

console.log(m.name)
console.log(m.getRawEntitySet('TBUPartners'))
console.log(m.getRawEntityType('UKDataService.TBUPartnersParameters'))

let content = ''
content += `/* eslint-disable */\n/* prettier-ignore */\n\n`;
content += `import { OData, type TOdataDummyInterface, type TODataOptions } from "notsapodata"\n\n`;
content += generateModelTypes(m, {
    entitySets: ['TBUPartners'],
})

writeFileSync('.odata.type.ts', content)

