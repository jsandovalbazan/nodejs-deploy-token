var admin = require('firebase-admin');
var serviceAccount = require('./firebase-account.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

const process = async () => {
	const fs = require('fs');
	const newToken = await fs.readFileSync('./token.txt').toString();
	console.log('new token to update', newToken);

	try {
		const document = await db.collection('config').doc('accessToken');
		await document.update({ token: newToken });
	} catch (error) {
		console.error('there was an error', error);
	}
};

process();
