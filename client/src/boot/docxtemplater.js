import docxtemplater from 'docxtemplater';

export default  ({ Vue , store}) => {
	Vue.use(docxtemplater)
	store.$doc = docxtemplater
}
