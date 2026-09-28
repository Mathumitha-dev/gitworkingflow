
function toggleTheme(){
    document.body.classList.toggle("dark");
    const theme=document.body.classList.contains("dark");
    if(theme){
        localStorage.setItem("theme","dark");
        document.getElementById("themeButton").textContent="Light Mode";
    }
    else{
        localStorage.setItem("theme","light");
        document.getElementById("themeButton").textContent="Dark Mode";
    }
}

function loadTheme(){
    const theme=localStorage.getItem("theme");
    if(theme==="dark"){
        document.body.classList.add("dark");
        document.getElementById("themeButton").textContent="Light Mode";
    }
    else{
        document.body.classList.remove("dark");
        document.getElementById("themeButton").textContent="Dark Mode";
    }
}
loadTheme();

