"use client";
import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import styles from "./QuizBody.module.scss";

const questionsList = [
    {
        question: "What is the name of the breed of this cat?",
        answer: "Egyptian Mau",
        image: "/assets/media/question1_img.jpg"
    },
    {
        question: "What is the full birth name of Post Malone?",
        answer: "Austin Richard Post",
        image: "/assets/media/question1_img.jpg"
    },
    {
        question: "At what time did khalid make a reservation at the restaurant?",
        answer: "8pm",
        image: "/assets/media/question1_img.jpg"
    },
    {
        question: "Question 4 Title",
        answer: "ans4",
        image: "/assets/media/question1_img.jpg"
    },
]

export default function QuizBody() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [submitValue, setSubmitValue] = useState("");
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showFailsPopup, setShowFailsPopup,] = useState(false);

    useEffect(() => {

    }, [])

    const questionSubmit = (exactAns, userAns, isLastQuestion) => {
        let isCorrectAnswer = checkAnswer(exactAns, userAns);
        handlePopups(isCorrectAnswer, isLastQuestion);
    }

    const checkAnswer = (exactAns, userAns) => {
        if (userAns.toLowerCase() === exactAns.toLowerCase()) return true;
        else return false
    }

    const handlePopups = (isCorrectAnswer, isLastQuestion) => {
        if (isCorrectAnswer) {
            setShowSuccessPopup(true)

            if (!isLastQuestion) {
                setTimeout(() => {
                    setShowSuccessPopup(false)
                }, 2000);

                setSubmitValue("");
                setCurrentQuestion(p => p + 1);
            }
        }

        else {
            setShowFailsPopup(true)

            if (!isLastQuestion) {
                setTimeout(() => {
                    setShowFailsPopup(false);
                }, 2000);

                setSubmitValue("");
                setCurrentQuestion(p => p);
            }
        }
    }



    return (

        <>
            <div className={cx(styles.section, "space-horizontal")}>
                <div className={cx(styles.sectionContainer)}>
                    {
                        questionsList.map(({ question, answer, image }, index) => {
                            return currentQuestion === index &&
                                <div className={cx(styles.questionContainer)}>
                                    <div className={cx(styles.questionImg)}>
                                        <img src={image} alt="" />
                                    </div>
                                    <h5 className={cx(styles.question, "")}>{question}</h5>
                                    <div className={cx(styles.fieldsContainer)}>
                                        <div className={cx(styles.questionInput, "")}>
                                            <input value={submitValue} onInput={(e) => setSubmitValue(e.target.value)} type="text" />
                                        </div>
                                        <button
                                            onClick={
                                                () => questionSubmit(answer, submitValue, index === questionsList.length - 1)
                                            }
                                            className={cx(styles.questionSubmit, "body1-size color-white")}>
                                            <svg width="52" height="28" viewBox="0 0 52 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 14L50 14" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M38 2L50 14L38 26" stroke="black" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                        })
                    }
                </div>
            </div>

            {
                showSuccessPopup && <div className={cx(styles.successPopup, "bg-black")}>
                    <div className={cx(styles.popupContainer)}>
                        <div className={cx(styles.title, "h1")}>Great Job</div>
                        <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>Your answer is right</div>
                    </div>
                </div>
            }
            {
                showFailsPopup && <div className={cx(styles.failsPopup, "bg-black")}>
                    <div className={cx(styles.popupContainer)}>
                        <div className={cx(styles.title, "h1")}>Oops!</div>
                        <div className={cx(styles.description, "subTitle3-size font-weight-regular")}>Your answer is wrong</div>
                        <button className={cx(styles.tryAgainBtn, "subTitle3-size color-white")}>
                            Try again
                        </button>
                    </div>
                </div>
            }

        </>
    )
}