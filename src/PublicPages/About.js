import { useState } from "react";
import './About.css'
const FaqItem = ({ question, answer }) => {
    const [isActive, setIsActive] = useState(false);
  
    const toggleAnswer = () => {
      setIsActive(!isActive);
    };
    return (
        <li className="faq">
          <div className="question" onClick={toggleAnswer}>
            {question}
            <span className="icon-main">
              <i className={`fa-solid ${isActive ? "fa-angle-up" : "fa-plus"}`}></i>
            </span>
          </div>
          <p className={`answer ${isActive ? "" : "non-active"}`}>{answer}</p>
        </li>
      );
    };
const  About = () => {
    const faqsData = [
        {
          question: "Which is the best portal to study Computer Science?",
          answer: "GeeksforGeeks is the best Computer Science portal for geeks. It contains well written, well thought and well explained computer science and programming articles.",
        },
        {
          question: "What is a FAQ section?",
          answer: "The Frequently Asked Questions (FAQ) section is a part of your website where you address common concerns, questions, and objections that customers have.",
        },
        {
          question: "What should be included in a FAQ section?",
          answer: "Fully answer the question, don't just link to a different page.",
        },
      ];
    return (<>
        <section class="card">
        <div class="card__head-div">
            <h1 class="card__head">About the company</h1>
        </div>
        <div class="card__content">
            <h1 class="card__head">VROOMY</h1>
            <p class="card__desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima perferendis deserunt provident voluptates blanditiis saepe ad asperiores sint minus inventore ratione dolor eveniet, molestias officiis. Tempore veritatis quaerat a facere repudiandae eum sed id, earum culpa aliquam expedita. Laboriosam molestiae pariatur, saepe voluptatum dicta velit culpa asperiores. Quas, fuga labore!</p>
        </div>
        <div class="card__content-1">
            <h2 class="card__head">What sets us apart</h2>
            <p class="card__desc">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, saepe dolore vitae ipsa perferendis nostrum molestias nam. A dolorem iusto, voluptates doloribus reiciendis nisi error, voluptatem nesciunt esse animi cumque dolores quibusdam illum nemo autem ut debitis, odit maiores. Eveniet, voluptatum similique! Repudiandae illum illo consectetur et a facilis voluptatibus.</p>
        </div>
        <div class="card__content-2">
            <h2 class="card__head">why choose us?</h2>
            <p class="card__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, beatae blanditiis! Hic corrupti nemo, aliquid repellat vero incidunt sapiente pariatur, itaque blanditiis in illum beatae asperiores ut reiciendis cupiditate quae explicabo labore consequatur officiis molestias? Nam quae itaque modi distinctio facere qui! Voluptatibus nobis, deserunt facilis hic repellendus facere voluptatum.</p>
        </div>
    </section>
    <section class="card-1">
        <div class="container"> 
            <h1>FAQs</h1> 
            <ul>
          {faqsData.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </ul>       
       </div>
    </section>
    <section class="card-3">
        <div class="card-3__head-div">
            <h1>Meet our team</h1>
        </div>
        <div class="card-3__bigblock">
            <div class="card-3__smallblock-1">
                <div class="card-3__block">
                    <div class="card-3__content">
                        <span class="card-3__img"> <img class="card-3__img--img" src="./img/pexels-pixabay-47367.jpg"> </img> </span>
                        <span class="card-3__name">name</span>
                        <span class="card-3__prof">web design</span>
                    </div>
                    <div class="card-3__content-1">
                        <p class="card-3__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet optio ipsa quod consequatur incidunt eos voluptates aliquid voluptatum expedita animi?</p>
                    </div>
                    <div class="card-3__content-2" >
                        <p> <a href="#"> <i class="fa-brands fa-linkedin"></i></a> </p>
                        <p> <a href="#"> <i class="fa-brands fa-github"></i></a> </p>
                        <p> <a href="#"> <i class="fa-solid fa-envelope"></i> </a></p>
                    </div>
                </div>
            </div>

            <div class="card-3__smallblock-1">
                <div class="card-3__block">
                    <div class="card-3__content">
                        <span class="card-3__img"> <img class="card-3__img--img" src="./img/pexels-pixabay-47367.jpg"> </img></span>
                        <span class="card-3__name">name</span>
                        <span class="card-3__prof">web design</span>
                    </div>
                    <div class="card-3__content-1">
                        <p class="card-3__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet optio ipsa quod consequatur incidunt eos voluptates aliquid voluptatum expedita animi?</p>
                    </div>
                    <div class="card-3__content-2" >
                        <p> <a href="#"> <i class="fa-brands fa-linkedin"></i></a> </p>
                        <p> <a href="#"> <i class="fa-brands fa-github"></i></a> </p>
                        <p> <a href="#"> <i class="fa-solid fa-envelope"></i> </a></p>
                    </div>
                </div>
            </div>
            <div class="card-3__smallblock-1">
                <div class="card-3__block">
                    <div class="card-3__content">
                        <span class="card-3__img"> <img class="card-3__img--img" src="./img/pexels-pixabay-47367.jpg"> </img> </span>
                        <span class="card-3__name">name</span>
                        <span class="card-3__prof">web design</span>
                    </div>
                    <div class="card-3__content-1">
                        <p class="card-3__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet optio ipsa quod consequatur incidunt eos voluptates aliquid voluptatum expedita animi?</p>
                    </div>
                    <div class="card-3__content-2" >
                        <p> <a href="#"> <i class="fa-brands fa-linkedin"></i></a> </p>
                        <p> <a href="#"> <i class="fa-brands fa-github"></i></a> </p>
                        <p> <a href="#"> <i class="fa-solid fa-envelope"></i> </a></p>
                    </div>
                </div>
            </div>
            <div class="card-3__smallblock-1">
                <div class="card-3__block">
                    <div class="card-3__content">
                        <span class="card-3__img"> <img class="card-3__img--img" src="./img/pexels-pixabay-47367.jpg"> </img> </span>
                        <span class="card-3__name">name</span>
                        <span class="card-3__prof">web design</span>
                    </div>
                    <div class="card-3__content-1">
                        <p class="card-3__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet optio ipsa quod consequatur incidunt eos voluptates aliquid voluptatum expedita animi?</p>
                    </div>
                    <div class="card-3__content-2" >
                        <p> <a href="#"> <i class="fa-brands fa-linkedin"></i></a> </p>
                        <p> <a href="#"> <i class="fa-brands fa-github"></i></a> </p>
                        <p> <a href="#"> <i class="fa-solid fa-envelope"></i> </a></p>
                    </div>
                </div>
            </div>
            <div class="card-3__smallblock-1">
                <div class="card-3__block">
                    <div class="card-3__content">
                        <span class="card-3__img"> <img class="card-3__img--img" src="./img/pexels-pixabay-47367.jpg"></img> </span>
                        <span class="card-3__name">name</span>
                        <span class="card-3__prof">web design</span>
                    </div>
                    <div class="card-3__content-1">
                        <p class="card-3__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet optio ipsa quod consequatur incidunt eos voluptates aliquid voluptatum expedita animi?</p>
                    </div>
                    <div class="card-3__content-2" >
                        <p> <a href="#"> <i class="fa-brands fa-linkedin"></i></a> </p>
                        <p> <a href="#"> <i class="fa-brands fa-github"></i></a> </p>
                        <p> <a href="#"> <i class="fa-solid fa-envelope"></i> </a></p>
                    </div>
                </div>
            </div>
            <div class="card-3__smallblock-1">
                <div class="card-3__block">
                    <div class="card-3__content">
                        <span class="card-3__img"> <img class="card-3__img--img" src="./img/pexels-pixabay-47367.jpg"> </img></span>
                        <span class="card-3__name">name</span>
                        <span class="card-3__prof">web design</span>
                    </div>
                    <div class="card-3__content-1">
                        <p class="card-3__desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet optio ipsa quod consequatur incidunt eos voluptates aliquid voluptatum expedita animi?</p>
                    </div>
                    <div class="card-3__content-2" >
                        <p> <a href="#"> <i class="fa-brands fa-linkedin"></i></a> </p>
                        <p> <a href="#"> <i class="fa-brands fa-github"></i></a> </p>
                        <p> <a href="#"> <i class="fa-solid fa-envelope"></i> </a></p>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
        </>
        )
        
    
};

export default About;