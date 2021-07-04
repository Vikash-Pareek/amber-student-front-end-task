import React, { Fragment, useState, useEffect } from 'react';
import './Testimonials.css';
import axios from 'axios';


function Testimonials() {


    const [isLoading, setIsLoading] = useState(true);
    const [responseData, setResponseData] = useState(0);
    const [accordionToggle, setAccordionToggle] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [currentTestimonialData, setCurrentTestimonialData] = useState({});
    const [avatarBorder, setAvatarsBorder] = useState(0);


    useEffect(() => {
        async function fetchTestimonialsData() {
            const response = await axios.get('https://testimonialapi.toolcarton.com/api');
            setResponseData(response.data);
            setCurrentTestimonialData(response.data[currentTestimonial]);
            setAvatarsBorder(avatarBorder);
            setIsLoading(!isLoading);
        }
        fetchTestimonialsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);



    const nextTestimonial = () => {
        if (currentTestimonial !== (responseData.length - 1)) {
            setCurrentTestimonial(currentTestimonial + 1);
            setCurrentTestimonialData(responseData[currentTestimonial]);
            setAvatarsBorder(currentTestimonial);
        }
        else if (currentTestimonial === (responseData.length - 1)) {
            setCurrentTestimonial(0);
            setCurrentTestimonialData(responseData[currentTestimonial]);
            setAvatarsBorder(currentTestimonial);
        }
    }

    const previousTestimonial = () => {
        if (currentTestimonial !== 0) {
            setCurrentTestimonial(currentTestimonial - 1);
            setCurrentTestimonialData(responseData[currentTestimonial]);
            setAvatarsBorder(currentTestimonial);
        }
        else if (currentTestimonial === 0) {
            setCurrentTestimonial(responseData.length - 1);
            setCurrentTestimonialData(responseData[currentTestimonial]);
            setAvatarsBorder(currentTestimonial);
        }
    }



    return (
        <article className="testimonials-container">

            <p className="testimonial-text"><u>Testimonials</u></p>

            {isLoading ? <p className="testimonial-loading">Loading...</p> :
                <Fragment>
                    <section className="testimonial-section">
                        <section key={currentTestimonialData.id} className="testimonial-card">
                            <p className="testimonial-heading">Hello World from this side.</p>
                            <p className="testimonial-message">{currentTestimonialData.message}</p>
                            <section className="testimonial-name-designation-read-more-section">
                                <section className="testimonial-name-designation-section">
                                    <p className="testimonial-name">{currentTestimonialData.name}&nbsp;</p>
                                    <p className="testimonial-designation">-&nbsp;{currentTestimonialData.designation}</p>
                                </section>
                                <p onClick={() => setAccordionToggle(!accordionToggle)} className="accordion-toggle-btn">
                                    {accordionToggle ? 'Read Less' : 'Read More'}
                                </p>
                            </section>

                            {accordionToggle ?
                                <section>
                                    <p className="testimonial-location">
                                        <span className="testimonial-rating-span">Location:&ensp;</span>
                                        {currentTestimonialData.location}
                                    </p>
                                    <em><q className="testimonial-lorem">{currentTestimonialData.lorem}</q></em>
                                    <p className="testimonial-rating">
                                        <span className="testimonial-rating-span">Rating:&ensp;</span>
                                        {currentTestimonialData.rating}
                                    </p>
                                    <audio controls>
                                        <source src={currentTestimonialData.audio} type='audio/mpeg' />
                                    </audio>
                                </section> : null}
                        </section>
                    </section>

                    <section className="testimonials-avatar-section">
                        <section className="testimonial-avatars-map-section">
                            {responseData.map((testimonialAvatars) => {
                                return (
                                    <img className={avatarBorder === (testimonialAvatars.id - 1) ? "testimonial-avatar-active" : "testimonial-avatar-inactive"}
                                        onClick={function () {
                                            setCurrentTestimonialData(responseData[testimonialAvatars.id - 1]);
                                            setAvatarsBorder(testimonialAvatars.id - 1);
                                        }}
                                        key={testimonialAvatars.id} src={testimonialAvatars.avatar} alt={testimonialAvatars.name + ' Avatar'} />
                                );
                            })}
                        </section>
                        <section className="carousel-buttons">
                            <button onClick={previousTestimonial} className="previous-btn">&lt;</button>
                            <button onClick={nextTestimonial} className="next-btn">&gt;</button>
                        </section>
                    </section>
                </Fragment>
            }

        </article>
    );
}


export default Testimonials;