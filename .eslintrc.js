module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential", "@vue/prettier"],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "error" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
		"prettier/prettier": [
			"error",
			{
				singleQuote: true,
				tabWidth: 4,
				useTabs: true,
				printWidth: 100
			}
		],
	},
	parserOptions: {
		parser: "babel-eslint"
	}
};
