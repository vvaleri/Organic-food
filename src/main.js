//модальное окно и меню
    function showMenu (itemSelector, modalSelector, closeSelector) {
        let item = document.querySelector(itemSelector),
            modal = document.querySelector(modalSelector),
            close= document.querySelector(closeSelector);
         
        let paddingOffset = window.innerWidth - document.body.clientWidth + 'px'; 

        item.addEventListener('click', () => {
            item.classList.toggle('active');
            modal.classList.toggle('active');
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = paddingOffset;

            if(item.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
        })
      
        modal.addEventListener('click', (e) => {
            if (e.target === close) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
                document.body.style.paddingRight = '0px';
            }
        }) 
     }

     showMenu('.header__burger', '.header__list')
     showMenu('.header__button', '.modal', '.modal__close')
  

 
    $(document).ready(function(){
        $('.reviews__slider').slick({
            arrows: false,
            dots: true,
            infinite: true,
        })
    })


    //отправка формы
    
let form = document.querySelector('.modal__send');

let message = {
    success: 'Thanks, we will respond as soon as possible',
    failure: 'Oops! Something wrong...'
};
    
let statusMessage = document.createElement('div');
    document.querySelector('.modal__item').appendChild(statusMessage);
    statusMessage.classList.add('status');
    
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
      let formData = new FormData(form); 
    
    fetch('./mail.php', {
        method: 'POST',
      //   headers: {
      //     'Content-type': 'multipart/form-data'
      // },
        body: formData
      })
    .then((res) => {
        
        if (res.ok) {
          form.reset();
          statusMessage.textContent = message.success;
        } else {
          throw new Error('Некорректный ответ от сервера');
        }
        setTimeout(() => {
          statusMessage.remove();
        }, 3000)
        return res.text();
      })
    .then((text) => {
        console.log(text);
      })
    .catch((error) => {
        statusMessage.textContent = message.failure;
        console.log(error.message);
      })
    })
    
    
