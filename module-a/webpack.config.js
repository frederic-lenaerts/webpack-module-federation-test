const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require("path");

const rules = [
	{
		test: /\.jsx?$/,
		include: path.resolve(__dirname, "src"),
		use: {
			loader: "babel-loader",
			options: {
				presets: ["@babel/react"]
			}
		}
	}
];

const optimization = {
	chunkIds: "named", // for this example only: readable filenames in production too
	nodeEnv: "production" // for this example only: always production version of react
};

const stats = {
	chunks: true,
	modules: false,
	chunkModules: true,
	chunkOrigins: true
};

module.exports = {
    name: "module-a",
    mode: "development",
    entry: {},
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
        uniqueName: "federation-module-a"
    },
    module: { rules },
    optimization,
    plugins: [
        new ModuleFederationPlugin({
            // A unique name
            name: "moduleA",
            // List of exposed modules
            exposes: {
                "./ModuleA": "./src/ModuleA.jsx"
            },
            // list of shared modules
            shared: [
                {
                    react: {
                        singleton: true // must be specified in each config
                    }
                }
            ]
        })
    ],
    stats
}