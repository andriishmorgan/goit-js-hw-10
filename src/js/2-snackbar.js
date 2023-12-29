import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const promiseForm = document.querySelector('form');
const submitBtn = document.querySelector('button');

promiseForm.addEventListener('submit',
    e => {
        e.preventDefault();
        const delay = parseInt(promiseForm.delay.value, 10);
    const state = promiseForm.state.value;
managePromise(delay, state);
    });

    function managePromise(delay, state) {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === 'fulfilled') {
                resolve(delay);
            } else if (state === 'rejected') {
                reject(delay);
            }
        }, delay);
    });

    promise
        .then((delay) => {
            iziToast.success({
                title: 'Success',
                message: `✅ Fulfilled promise in ${delay}ms`
            });
        })
        .catch((delay) => {
            iziToast.error({
                title: 'Error',
                message: `❌ Rejected promise in ${delay}ms`
            });
        });
}