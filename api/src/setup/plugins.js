const excepciones = {
	requestDidStart() {
		return {
			parsingDidStart() {
				return (err) => {
					if (err) {
						console.error(err);
					}
				}
			},
			validationDidStart() {
				// This end hook is unique in that it can receive an array of errors,
				// which will contain every validation error that occurred.
				return (errs) => {
					if (errs) {
						errs.forEach(err => console.error(err));
					}
				}
			},
			executionDidStart() {
				return (err) => {
					if (err) {
						console.error(err);
					}
				}
			}
		}
	}
}
export default excepciones