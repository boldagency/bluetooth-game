"use client";
import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import styles from "./QuizBody.module.scss";

const questionsList = [
    {
        question: "Question 1 Title",
        answer: "ans1",
        image: "/assets/media/question1_img.jpg"
    },
    {
        question: "Question 2 Title",
        answer: "ans2",
        image: "/assets/media/question1_img.jpg"
    },
    {
        question: "Question 3 Title",
        answer: "ans3",
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
        if (userAns === exactAns) return true;
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
                setCurrentQuestion(p => p + 1);
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
                                    <div className={cx(styles.question)}>{question}</div>
                                    <div className={cx(styles.questionImg)}>
                                        <img src={image} alt="" />
                                    </div>
                                    <div className={cx(styles.questionInput)}>
                                        <input value={submitValue} onInput={(e) => setSubmitValue(e.target.value)} type="text" />
                                    </div>
                                    <div
                                        onClick={
                                            () => questionSubmit(answer, submitValue, index === questionsList.length - 1)
                                        }
                                        className={cx(styles.questionSubmit)}>
                                        submit
                                    </div>
                                </div>
                        })
                    }
                </div>
            </div>

            {
                showSuccessPopup && <div className={cx(styles.successPopup, "bg-black")}>
                    <h1 className={cx(styles.successContainer)}>success</h1>
                </div>
            }
            {
                showFailsPopup && <div className={cx(styles.failsPopup, "bg-black")}>
                    <h1 className={cx(styles.failsContainer)}>fails</h1>
                </div>
            }

        </>
    )
}