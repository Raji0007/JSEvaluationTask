document.addEventListener("DOMContentLoaded", function () {
    const navbarHTML = `
        <nav> 
            <div class="nav-left">
                <div class="icon"></div>
                <div class="title">MoviesDB</div>
                <div class="menu">
                    <a class="item" href="index.html">Home</a>
                    <a class="item" href="favourite.html">Favourites</a>
                </div>
            </div>
        </nav>
    `;
    document.getElementById('navbar-container').innerHTML = navbarHTML;
});