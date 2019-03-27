let instance = null;

export default class IconsStorage {
	icons;

	constructor() {
		if (instance) return instance;
		instance = this;
	}

	async getIcons() {
		if (this.icons) return this.icons;

		return fetch('https://raw.githubusercontent.com/google/material-design-icons/master/iconfont/codepoints')
			.then(response => response.text())
			.then(data => data.split('\n'))
			.then(namesAndCodes => namesAndCodes.map(nameAndCode => {
				const parts = nameAndCode.split(' ');
				return {
					name: parts[0],
					code: parts[1]
				};
			}))
			.then(icons => {
				this.icons = icons;
				return icons;
			});
	}
}
