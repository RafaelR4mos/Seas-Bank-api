const planBtn = document.querySelectorAll(".plan-btn");
const planAnchor = document.getElementById("plan-anchor");

planAnchor.addEventListener("click", () => {
    window.location.href = "../";
});

planBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const targetBtn = e.target.id;
        console.log(targetBtn);

        localStorage.setItem("planCard", targetBtn);
        window.location.href = "../sign-up/";
    });
});
