const ws = require('ws');
const wss = new ws.Server({ port: 3000 });
wss.on('connection', (ws, req) => {
	ws.on('message', (data) => {
		console.log(data);
	});
	ws.on('upgrade', req);
});
wss.emit('123456', { status: 'ok' });
