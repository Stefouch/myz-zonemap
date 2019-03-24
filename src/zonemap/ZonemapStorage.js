/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * ============================================================================
 * ZONEMAP FILE READER
 * ============================================================================
 * @author       Stefouch <stefouch@gmail.com>
 * @copyright    Copyright (c) 2019, Stefouch
 * @license      MIT
 * @description  A collection of shortcut functions that stores and loads
 *                a Zonemap JSON file into/from "localStorage".
 */
const ZonemapStorage = {
	filter: /application\/json/,
	readFileAsync(file) {
		return new Promise((resolve, reject) => {
			// Exits early and warns the user if not a valid file type.
			if (!ZonemapStorage.filter.test(file.type)) {
				alert('You must select a valid Zonemap JSON file!');
				reject('[ERROR] - [ZonemapStorage] - Not a valid JSON file!');
			}

			// Warns if the file size > 5MB (could be too heavy for localStorage).
			if (file.size > 5000000) {
				alert('Warning: your Zonemap file is heavy!');
				// reject('[ERROR] - [ZonemapStorage] - File too heavy!');
			}

			const reader = new FileReader();

			reader.onload = () => {
				resolve(reader.result);
			};

			reader.onerror = () => {
				reject('[ERROR] - [ZonemapStorage] - Unable to load the file!');
			};

			reader.readAsText(file);
		});
	},
	async load(file) {
		try {
			const content = await ZonemapStorage.readFileAsync(file);
			ZonemapStorage.set(content);
			return content;
		}
		catch(error) {
			console.error(error);
			return null;
		}
	},
	set(zonemapJson) {
		localStorage.setItem('zonemap', zonemapJson);
	},
	get() {
		return localStorage.getItem('zonemap');
	},
	sweep() {
		localStorage.removeItem('zonemap');
	}
};

export default ZonemapStorage;
