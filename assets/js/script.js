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
const counterTitle = document.getElementById('counter-title');
const limitedInput = document.querySelectorAll('.limited-input');
const counter = document.querySelectorAll('.counter');
console.log(counter)

const sizeTitleComent = 30
const sizeTextComent = 140

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
                <strong>${results[i].title.slice(0, sizeTitleComent)}</strong>
            </div>
            <div class="card-text">
                <p>
                    ${results[i].body.slice(0, sizeTextComent)}
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
            <strong>${results.title.slice(0, sizeTitleComent)}</strong>
        </div>

        <div class="card-text">
            <p>
                ${results.body.slice(0, sizeTextComent)}
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

    const title = commentTitle.value.slice(0, sizeTitleComent);
    const text = commentText.value.slice(0, sizeTextComent);

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

function countCharTitle() {
    counterTitle.style.display = "flex";
    let charTitle = sizeTitleComent - commentTitle.value.length;
    counterTitle.innerText = `${charTitle} / ${sizeTitleComent}`;
    if (charTitle < 0) {
        counterTitle.classList.add("counter-overflow");
    } else {
        counterTitle.classList.remove("counter-overflow");
    }
    console.log(`restantes: ${charTitle} | Ocupados: ${commentTitle.value.length}`)
    return charTitle;
}

function countChars(e) {
    const item = e.target;
    const size = parseInt(item.dataset.char, 10);
    const counter = item.parentElement.firstElementChild.firstElementChild;
    let chars = size - item.value.length;
    console.log(item.parentElement.firstElementChild)
    item.innerText = `${chars} / ${size}`;
}

// function countCharText() {
//     let charText = sizeTextComent - commentText.value.length;
//     console.log(`restantes: ${charText} | Ocupados: ${commentText.value.length}`)
//     return charText;
// }

function verifyNameComment(e) {
    e.preventDefault();
    regexName = /[a-zA-Z]{2}/g;
    if (regexName.test(commentName.value)) {
        commentName.classList.add("invalid-input");
    } else {
        commentName.classList.remove("invalid-input");
    }
}

limitedInput.forEach((item) => item.addEventListener("keyup", countChars))
commentForm.addEventListener("submit", getFormData);
commentTitle.addEventListener("keyup", countCharTitle);
commentTitle.addEventListener("blur", () => counterTitle.style.display = "none");
// commentText.addEventListener("keyup", countCharText);
commentName.addEventListener("blur", verifyNameComment);


/* function limitLength(length) {
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
*/
