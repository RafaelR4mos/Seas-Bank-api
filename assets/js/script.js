const commentForm = document.getElementById("comment-form");
const btnSubmit = document.getElementById("comment-submit");
const btnClose = document.getElementById("btn-close");
const commentName = document.getElementById("comment-name");
const commentEmail = document.getElementById("comment-email");
const commentPlan = document.getElementById("comment-plan");
const commentTitle = document.getElementById("comment-title");
const commentText = document.getElementById("comment-text");
const testimonialsContainer = document.getElementById("testimonials-container");

// var posts = [
//     {
//         name: "thassia silva",
//         email: "thassia.silva@gmail.com",
//         plan: "platinum",
//         title: "Ótimos Planos",
//         text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     },
//     {
//         name: "bruno costa",
//         email: "bruno.costa@gmail.com",
//         plan: "gold",
//         title: "Ótimo atendimento da equipe de suporte",
//         text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     },
//     {
//         name: "Felipe Ferreira",
//         email: "felipe.ferreira@gmail.com",
//         plan: "silver",
//         title: "Plano acessível e com vantagens",
//         text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//     },
// ];

fetch("https://jsonplaceholder.typicode.com/posts/")
    .then((response) => response.json())
    .then((comment) => {
        console.log(comment);
        setComments(
            comment.filter((comment) => {
                if (comment.id <= 6) {
                    return comment;
                }
            })
        );
    });

function setComments(results) {
    console.log(Array.isArray(results));

    if (Array.isArray(results)) {
        let i = 0;
        for (comments of results) {
            const testimonialCard = document.createElement("div");
            testimonialCard.classList.add("testimonial-card");
            // testimonialCard.classList.add("pre-rendered-cards");
            console.log(i);
            console.log(results);
            const commentData = `
            <div class="card-header">
                <strong>${results[i].title}</strong>
            </div>
    
    
            <div class="card-text">
                <p>
                    ${results[i].body}
                </p>
            </div>`;

            testimonialCard.innerHTML = commentData;
            testimonialsContainer.appendChild(testimonialCard);
            i++;
        }
    } else {
        const testimonialCard = document.createElement("div");
        testimonialCard.classList.add("testimonial-card");
        // testimonialCard.classList.add("new-card");
        const commentData = `
        <div class="card-header">
            <strong>${results.title}</strong>
        </div>

        <div class="card-text">
            <p>
                ${results.body}
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

    const title = commentTitle.value;
    const text = commentText.value;

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

    // var commentData = {
    //     name:
    //     email: commentEmail.value,
    //     plan: commentPlan.value,
    //     title:
    // };

    commentName.value = "";
    commentEmail.value = "";
    commentPlan.value = "";
    commentTitle.value = "";
    commentText.value = "";

    // clearList();
    // setComments(
    //     posts.map((post) => {
    //         return post;
    //     })
    // );
    btnClose.click();
}

commentForm.addEventListener("submit", getFormData);
