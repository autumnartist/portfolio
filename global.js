console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}


//nav bar
let navLinks = $$("nav a");
let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname);
currentLink?.classList.add("current");

let pages = [
	{url: "", title: "Home"},
	{url: "projects/", title: "Projects"},
    {url: "contact/", title: "Contact"},
    {url: "https://github.com/autumnartist", title: "GitHub"},
    {url: "resume/", title: "Resume"}
];

let nav = document.createElement("nav");
nav.classList.add("navBar");
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains("home");

for (let p of pages) {
	let url = p.url;
    // if (!ARE_WE_HOME && !url.startsWith("http")) {
    if (!url.startsWith("http")) {
        url = "/portfolio/" + url;
    }    
	let title = p.title;
	// Create link and add it to nav
    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;
    // setting the current tab
    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }
    // making github open in another tab
    if (a.host !== location.host) {
        a.target = "_blank";
    };

    nav.append(a);

}

//dark mode
document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
		</select>
	</label>`
);

let select = document.querySelector("select");
if (localStorage.colorScheme) {
    document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}
select.addEventListener("input", function (event) {
	console.log("color scheme changed to", event.target.value);
    document.documentElement.style.setProperty("color-scheme", event.target.value);

    localStorage.colorScheme = event.target.value;
});

// contact page
let form = document.querySelector(".contactFields");

form?.addEventListener("submit", function (event) {
	event.preventDefault();
    let data = new FormData(form);

    let url = form.action + "?";
    for (let [name, value] of data) {
        url += (name + "=" + value + "&")
        console.log(name, value);
    }
    location.href = url;
})

