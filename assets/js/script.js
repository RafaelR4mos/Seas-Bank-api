const commentForm = document.getElementById("comment-form");
const btnSubmit = document.getElementById("comment-submit");
const btnClose = document.getElementById("btn-close");
const commentName = document.getElementById("comment-name");
const commentEmail = document.getElementById("comment-email");
const commentPlan = document.getElementById("comment-plan");
const commentTitle = document.getElementById("comment-title");
const commentText = document.getElementById("comment-text");
const testimonialsContainer = document.getElementById("testimonials-container");
const headerHeight = document.querySelector("header").offsetHeight;

function setSectionPadding() {
    const testimonialSection = document.getElementById("testimonials");
    const infoSection = document.getElementById("second-section");
    const benefitsSection = document.getElementById("third");
    const contactSection = document.getElementById("contact");
    const faqSection = document.getElementById("fourth");

    testimonialSection.style.paddingTop = `${headerHeight}px`;
    infoSection.style.paddingTop = `${headerHeight}px`;
    benefitsSection.style.paddingTop = `${headerHeight}px`;
    contactSection.style.paddingTop = `${headerHeight}px`;
    faqSection.style.paddingTop = `${headerHeight}px`;
}

window.onload = () => {
    setSectionPadding();
};

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const alert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        "</div>",
    ].join("");

    alertPlaceholder.append(wrapper);
};

const alertTrigger = document.getElementById("submit-btn-news");
if (alertTrigger) {
    alertTrigger.addEventListener("click", () => {
        alert("Nice, you triggered this alert message!", "success");
    });
}

fetch("https://jsonplaceholder.typicode.com/posts/")
    .then((response) => response.json())
    .then((comment) => {
        setComments(
            comment.filter((comment) => {
                if (comment.id <= 6) {
                    return comment;
                }
            })
        );
    });

function setComments(results) {
    if (Array.isArray(results)) {
        let i = 0;
        for (comments of results) {
            const testimonialCard = document.createElement("div");
            testimonialCard.classList.add("testimonial-card");
            const commentData = `
            <div class="card-header">
                <strong>${results[i].title.slice(0, 30)}</strong>
            </div>
            <div class="card-text">
                <p>
                    ${results[i].body.slice(0, 141)}
                </p>
            </div>`;

            testimonialCard.innerHTML = commentData;
            testimonialsContainer.appendChild(testimonialCard);
            i++;
        }
    } else {
        const testimonialCard = document.createElement("div");
        testimonialCard.classList.add("testimonial-card");
        const commentData = `
        <div class="card-header">
            <strong>${results.title.slice(0, 30)}</strong>
        </div>

        <div class="card-text">
            <p>
                ${results.body.slice(0, 141)}
            </p>
        </div>`;

        testimonialCard.innerHTML = commentData;
        testimonialsContainer.prepend(testimonialCard);
    }
}

function clearList() {
    while (testimonialsContainer.firstChild) {
        testimonialsContainer.removeChild(testimonialsContainer.firstChild);
    }
}

function getFormData(e) {
    e.preventDefault();

    const title = commentTitle.value.slice(0, 31);
    const text = commentText.value.slice(0, 141);

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify({
            title: title,
            body: text,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            setComments(json);
        });

    commentEmail.value = "";
    commentPlan.value = "";
    commentTitle.value = "";
    commentText.value = "";

    btnClose.click();
}

function validarEmail(e) {
    e.preventDefault();

    var email = document.getElementById("email");
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
        alert("Por favor, informe um endereço de e-mail válido.");
        email.focus();
        return false;
    } else {
        return true;
    }
}

function mascaraTelefone() {
    var telefone = document.getElementById("telefone");
    telefone.value = telefone.value.replace(/\D/g, "");
    telefone.value = telefone.value.replace(/^(\d{2})(\d)/g, "($1) $2");
    telefone.value = telefone.value.replace(/(\d)(\d{4})$/, "$1-$2");
}

commentForm.addEventListener("submit", getFormData);
