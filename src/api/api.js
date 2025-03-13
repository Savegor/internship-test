
const axiosMock = {
    get: (url) => {
        return new Promise((resolve, reject) => {
            if (url === '/api/AllPayments') {
                setTimeout(() => {
                    const data = require('./transactions.json')
                    resolve({ data })
                }, 1000)
            } else {
                reject(new Error('URL not found'));
            }
        });
    },
};
export async function getData() {
    return await axiosMock.get('/api/AllPayments')
}
