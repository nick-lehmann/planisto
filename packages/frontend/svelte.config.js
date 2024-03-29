import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			resolve: {
				alias: {
					typeorm:
						'/Users/nick/Projekte/planisto/packages/backend/node_modules/typeorm/typeorm-model-shim.js'
				}
			}
		}
	}
};

export default config;
