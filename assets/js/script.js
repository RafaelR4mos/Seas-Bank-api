const commentForm = document.getElementById("comment-form");
const btnSubmit = document.getElementById("comment-submit");
const btnClose = document.getElementById("btn-close");
const commentName = document.getElementById("comment-name");
const commentEmail = document.getElementById("comment-email");
const commentPlan = document.getElementById("comment-plan");
const commentTitle = document.getElementById("comment-title");
const commentText = document.getElementById("comment-text");
const testimonialsContainer = document.getElementById("testimonials-container");

var posts = [
    {
        name: "thassia silva",
        email: "thassia.silva@gmail.com",
        plan: "platinum",
        title: "Ótimos Planos",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        name: "bruno costa",
        email: "bruno.costa@gmail.com",
        plan: "gold",
        title: "Ótimo atendimento da equipe de suporte",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
        name: "Felipe Ferreira",
        email: "felipe.ferreira@gmail.com",
        plan: "silver",
        title: "Plano acessível e com vantagens",
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
];

window.addEventListener("DOMContentLoaded", () => {
    setComments(
        posts.map((post) => {
            return post;
        })
    );
});

function setComments(results) {
    let i = 0;
    for (comments of results) {
        console.log(results);
        const testimonialCard = document.createElement("div");
        testimonialCard.classList.add("testimonial-card");

        const commentData = `
        <div class="card-header">
            <strong>${results[i].name}</strong>
            <span class="${results[i].plan}">Seas ${results[i].plan}</span>
            <div class="card-badget ${results[i].plan}"></div>
        </div>

        <div class="card-title">
            <span>${results[i].title}</span>
        </div>

        <div class="card-text">
            <p>
                ${results[i].text}
            </p>
        </div>`;

        testimonialCard.innerHTML = commentData;
        testimonialsContainer.appendChild(testimonialCard);
        i++;
    }
}

function clearList() {
    while (testimonialsContainer.firstChild) {
        testimonialsContainer.removeChild(testimonialsContainer.firstChild);
    }
}

function getFormData(e) {
    e.preventDefault();

    var commentData = {
        name: commentName.value,
        email: commentEmail.value,
        plan: commentPlan.value,
        title: commentTitle.value,
        text: commentText.value,
    };

    posts.push(commentData);

    commentName.value = "";
    commentEmail.value = "";
    commentPlan.value = "";
    commentTitle.value = "";
    commentText.value = "";

    clearList();
    setComments(
        posts.map((post) => {
            return post;
        })
    );
    btnClose.click();
}

commentForm.addEventListener("submit", getFormData);
