import { MODEL } from './.odata.type'

const odata = MODEL.getInstance()
const m = await odata.getMetadata()

m.getEntitySet('TBUPartners').readRecord({ YEAR: '2015' })