import { deleteById, getById } from '../api/services.js';
import { html, nothing } from '../lib.js';
import { getUserData } from '../util.js';

const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${isOwner
                ? html `<a class="button warning" href="/edit/${meme._id}">Edit</a>
                        <button @click=${onDelete} class="button danger">Delete</button>`
                : nothing
            }

        </div>
    </div>
</section>
`;

export async function detailsPage(ctx) {
    const memeId = ctx.params.id;
    const meme = await getById(memeId);
    const userData = getUserData();
    const isOwner = userData && meme._ownerId == userData.id;

    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm(`Are you sure you want to delete ${meme.title}`);
        if(choice) {
            await deleteById(memeId);
            ctx.page.redirect('/memes');
        }
    }
}