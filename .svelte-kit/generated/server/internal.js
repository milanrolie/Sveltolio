
import root from '../root.svelte';
import { set_building } from '__sveltekit/environment';
import { set_assets } from '__sveltekit/paths';
import { set_private_env, set_public_env } from '../../../node_modules/@sveltejs/kit/src/runtime/shared-server.js';

export const options = {
	app_template_contains_nonce: false,
	csp: {"mode":"auto","directives":{"upgrade-insecure-requests":false,"block-all-mixed-content":false},"reportOnly":{"upgrade-insecure-requests":false,"block-all-mixed-content":false}},
	csrf_check_origin: true,
	track_server_fetches: false,
	embedded: false,
	env_public_prefix: 'PUBLIC_',
	hooks: null, // added lazily, via `get_hooks`
	preload_strategy: "modulepreload",
	root,
	service_worker: false,
	templates: {
		app: ({ head, body, assets, nonce, env }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n\t<meta charset=\"utf-8\" />\n\t<link rel=\"icon\" href=\"" + assets + "/favicon.png\" />\n\t<meta name=\"viewport\" content=\"width=device-width\" />\n\t" + head + "\n</head>\n\n<body data-sveltekit-preload-data=\"hover\">\n\t<div style=\"display: contents\">" + body + "</div>\n\t<div class=\"ball\">\n\t\t<svg class=\"arrow\" xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\"></svg>\n\t\t\t<path d=\"M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z\" />\n\t\t</svg>\n\t</div>\n\n</body>\n\n</html>\n\n<script>\n\tconst ball = document.querySelector('.ball');\n\n\tlet mouseX = 0;\n\tlet mouseY = 0;\n\n\tlet ballX = 0;\n\tlet ballY = 0;\n\n\tlet speed = 0.1;\n\n\t// Update ball position\n\tfunction animate() {\n\t\t//Determine distance between ball and mouse\n\t\tlet distX = mouseX - ballX;\n\t\tlet distY = mouseY - ballY;\n\n\t\t// Find position of ball and some distance * speed\n\t\tballX = ballX + (distX * speed);\n\t\tballY = ballY + (distY * speed);\n\n\t\tball.style.left = ballX + \"px\";\n\t\tball.style.top = ballY + \"px\";\n\n\t\trequestAnimationFrame(animate);\n\t}\n\tanimate();\n\n\t// Move ball with cursor\n\tdocument.addEventListener(\"mousemove\", function (event) {\n\t\tmouseX = event.clientX;\n\t\tmouseY = event.clientY;\n\t});\n\n\tif (e.target.classList.contains('.case') || e.target.closest('.case')) {\n\t\tcircle.classList.add('show-arrow');\n\t} else {\n\t\tcircle.classList.remove('show-arrow');\n\t}\n</script>\n\n\n<style>\n\t@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100;300;400;500;600;700;800;900&display=swap');\n\t@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');\n\n\t:root {\n\t\t--flashWhite: #E9ECEB;\n\t\t--gunMetal: #dadada;\n\t\t--justBlue: #774ff0;\n\t\t--bitterSweet: #FE5F55;\n\t\t--webLavender: #bed0fa;\n\t\t--dark: #252525;\n\t\t--font2: 'Space Grotesk', sans-serif;\n\t}\n\n\t/* :global(:root) {\n\t\t--flashWhite: #E9ECEB;\n\t\t--gunMetal: #11110f;\n\t\t--justBlue: #774ff0;\n\t\t--bitterSweet: #FE5F55;\n\t\t--webLavender: #bed0fa;\n\t} */\n\n\t* {\n\t\tbox-sizing: border-box;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t}\n\n\thtml {\n\t\tscroll-behavior: smooth;\n\t}\n\n\tbody {\n\t\tbackground-color: var(--gunMetal);\n\t\tfont-family: 'Outfit', sans-serif;\n\t\toverflow-x: hidden;\n\t}\n\n\tsection {\n\t\tpadding: 0% 2%;\n\t}\n\n\th1 {\n\t\tcolor: var(--dark);\n\t\ttext-transform: uppercase;\n\t\tfont-size: 6vw;\n\t\tfont-weight: 300;\n\t\tline-height: 1em;\n\t}\n\n\th2 {\n\t\tfont-size: 2em;\n\t\tfont-weight: 700;\n\t}\n\n\timg {\n\t\tborder-radius: .5em;\n\t}\n\n\tp {\n\t\tcolor: var(--dark);\n\t}\n\n\t.ball {\n\t\tbackground: #fff;\n\t\twidth: 5em;\n\t\theight: 5em;\n\t\tborder-radius: 50%;\n\t\tposition: fixed;\n\t\ttop: 50%;\n\t\tleft: 50%;\n\t\ttransform: translate(-50%, -50%);\n\t\tmix-blend-mode: difference;\n\t\tz-index: 20;\n\t\tpointer-events: none;\n\t\tdisplay: block;\n\t}\n\n\t.arrow {\n\t\tposition: absolute;\n\t\ttransform: translate(120%, 120%) scale(0);\n\t}\n\n\t.show-arrow {\n\t\ttransform: scale(2.5);\n\t}\n</style>",
		error: ({ status, message }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<title>" + message + "</title>\n\n\t\t<style>\n\t\t\tbody {\n\t\t\t\t--bg: white;\n\t\t\t\t--fg: #222;\n\t\t\t\t--divider: #ccc;\n\t\t\t\tbackground: var(--bg);\n\t\t\t\tcolor: var(--fg);\n\t\t\t\tfont-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,\n\t\t\t\t\tUbuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tjustify-content: center;\n\t\t\t\theight: 100vh;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t.error {\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t\tmax-width: 32rem;\n\t\t\t\tmargin: 0 1rem;\n\t\t\t}\n\n\t\t\t.status {\n\t\t\t\tfont-weight: 200;\n\t\t\t\tfont-size: 3rem;\n\t\t\t\tline-height: 1;\n\t\t\t\tposition: relative;\n\t\t\t\ttop: -0.05rem;\n\t\t\t}\n\n\t\t\t.message {\n\t\t\t\tborder-left: 1px solid var(--divider);\n\t\t\t\tpadding: 0 0 0 1rem;\n\t\t\t\tmargin: 0 0 0 1rem;\n\t\t\t\tmin-height: 2.5rem;\n\t\t\t\tdisplay: flex;\n\t\t\t\talign-items: center;\n\t\t\t}\n\n\t\t\t.message h1 {\n\t\t\t\tfont-weight: 400;\n\t\t\t\tfont-size: 1em;\n\t\t\t\tmargin: 0;\n\t\t\t}\n\n\t\t\t@media (prefers-color-scheme: dark) {\n\t\t\t\tbody {\n\t\t\t\t\t--bg: #222;\n\t\t\t\t\t--fg: #ddd;\n\t\t\t\t\t--divider: #666;\n\t\t\t\t}\n\t\t\t}\n\t\t</style>\n\t</head>\n\t<body>\n\t\t<div class=\"error\">\n\t\t\t<span class=\"status\">" + status + "</span>\n\t\t\t<div class=\"message\">\n\t\t\t\t<h1>" + message + "</h1>\n\t\t\t</div>\n\t\t</div>\n\t</body>\n</html>\n"
	},
	version_hash: "qn42y9"
};

export function get_hooks() {
	return {};
}

export { set_assets, set_building, set_private_env, set_public_env };
