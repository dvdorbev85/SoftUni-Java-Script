import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteMemeById, getMemeById } from '../api/data.js';
import { getUserData } from '../util.js';

const detailsTemplate = (meme, isOwner, onDelete, isLoggedIn) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>

    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            ${isOwner 
                ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                        <button @click=${onDelete} class="button danger">Delete</button>`
                : ''}            

        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const memeId = ctx.params.id;
    const meme = await getMemeById(memeId);
    const user = getUserData();

    

    const isOwner = user && meme._ownerId == user.id;
    const isLoggedIn = user !== undefined;

    ctx.render(detailsTemplate(meme, isOwner, onDelete, isLoggedIn));

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${meme.title}`);
        if (confirmed) {
            await deleteMemeById(memeId);
            ctx.page.redirect('/catalog');
        }
    }
}