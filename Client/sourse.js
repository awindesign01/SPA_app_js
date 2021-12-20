import home from "./Pages/Home.js";
import projects from "./Pages/Projects.js";
import skills from "./Pages/skills.js";

// 1. what view show to user based on Route
function router(params) {
	// todo comment: 1.create constants routes
	const routes = [
		{ path: "/", view: home },
		{ path: "/projects", view: projects },
		{ path: "/skills", view: skills },
	];

	// todo comment: 2. add change routes
	const potentialRoutes = routes.map((i) => {
		return {
			route: i,
			isMatch: location.pathname === i.path,
		};
	});

	// todo comment: 3. find match
	const match = potentialRoutes.find((route) => route.isMatch);
	if (!match) {
		match = {
			route: { path: "/not-found", view: () => console.log("not found page") },
			isMatch: true,
		};
	}
	document.querySelector("#app").innerHTML = match.route.view();
}

// 2. push user to new url
const navigateTo = (url) => {
	history.pushState(null, null, url);
	router();
};

// for history browsers
window.addEventListener("popstate", router());

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", (e) => {
		if (e.target.matches("[data-link]")) {
			e.preventDefault();
			navigateTo(e.target.href);
		}
	});
	router();
});
