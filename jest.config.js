module.exports = {
	"roots": [
		"<rootDir>/src"
	],
	"testMatch": [
		"**/?(*.)+(spec|test).[tj]s?(x)"
	],
	"globals": {},
	"transform": {
		"^.+\\.ts$": "ts-jest"
	}
};
