import { html } from '../../node_modules/lit-html/lit-html.js';
import { login, register } from '../api/data.js';

const resgisterTemplate = (onSubmit) => html`
<section id="register-page" class="register">
    <form @submit=${onSubmit} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>
`;

export function resgisterPage(ctx) {
    ctx.render(resgisterTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const repass = formData.get('confirm-pass').trim();


        if (email == '' || password == '' || repass == '') {
            return alert('Please fill all required fields');
        }

        if(password != repass) {
            return alert('Passwords do not match');
        }

        await register(email, password);
        ctx.updateUserNav();
        ctx.page.redirect('/')

    }
}