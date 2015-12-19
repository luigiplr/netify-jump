import Promise from 'bluebird';
import needle from 'needle';
import path from 'path';
import notifier from 'node-notifier';
import shell from 'shell';
import {
	version
}
from '../../package.json';

const getJson = url => {
	return new Promise((resolve, reject) => {
		needle.get(url, {
			json: true
		}, (err, resp) => {
			if (err || !resp.body)
				return reject('something went Very Wong:' + err);
			resolve(resp.body)
		});
	})
}

module.exports = {
	check() {
		console.info('Checking for updates for client v.' + version);
		getJson('https://api.github.com/repos/luigiplr/netify-jump/releases/latest')
			.then(json => {
				if (version === json.tag_name)
					return console.info('No new updates available');

				console.info('New update available v.' + json.tag_name);

				notifier.notify({
					title: 'Netify Jump',
					message: 'v.' + json.tag_name + '  Update available',
					icon: path.join(__dirname, '../../images/icon.png'),
					sound: true,
					wait: true
				});

				notifier.on('click', () => {
					shell.openExternal(json.html_url);
				});
			})
			.catch(err => {
				console.error(err)
			})
	}


}