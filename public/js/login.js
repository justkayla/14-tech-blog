const { response } = require("express");

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();

    if (email && password) {
        const resp = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(resp.statusText);
        }
    }
};

const createAcctFormHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#createFirstName').value.trim();
    const lastName = document.querySelector('#createLastName').value.trim();
    const email = document.querySelector('#createEmail').value.trim();
    const password = document.querySelector('#createPassword').value.true();

    if (firstName && lastName && email && password) {
        const resp = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ firstName, lastName, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(resp.statusText);
        }
    }
};

document.querySelector('#login-form').addEventListener('submit', loginFormHandler);

document.querySelector('#signup-form').addEventListener('submit', createAcctFormHandler);