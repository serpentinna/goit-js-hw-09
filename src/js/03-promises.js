import Notiflix from 'notiflix';

const form = document.querySelector('form.form');
form.addEventListener('submit', onFormSubmit);

  
function onFormSubmit(event) {
    event.preventDefault;

    const { elements } = event.currentTarget;
    const amount = Number(elements.amount.value);
    const step = Number(elements.step.value);
    let delay = Number(elements.delay.value);

    for (i = 0; i < amount; i += 1) {
      createPromise(i + 1, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    
      delay += step;
    };
  }



function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      };
    }, delay);
  });
}
