const planBtn = document.querySelectorAll(".plan-btn");

console.log(planBtn);

planBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const targetBtn = e.target.id;
        console.log(targetBtn);

        localStorage.setItem("planCard", targetBtn);
        window.location.href = "../sign-up";
    });
});
