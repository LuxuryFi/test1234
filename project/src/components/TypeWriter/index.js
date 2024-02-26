import React, { useRef, useEffect, useState } from 'react';

export default function TypeWriter({ dataText, wait, typeSpeed }) {
  const [text, setText] = useState('');
  const [isDeleteting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const typeSpeedRef = useRef({
    speed: typeSpeed,
  });

  useEffect(() => {
    const type = () => {
      // // Get current word
      const current = wordIndex % dataText.length;

      // Get full text of current
      const fullText = dataText[current];

      // Check if delete
      if (isDeleteting) {
        // Remove char
        console.log(fullText);
        typeSpeedRef.current.speed = typeSpeed;
        setText(fullText.slice(0, text.length - 1));
      } else {
        // Add char
        setText(fullText.slice(0, text.length + 1));
      }

      // if (isDeleteting) {
      //   typeSpeedRef.current.speed = typeSpeed;
      //   typeSpeedRef.current.speed /= 2;
      // }

      // Check if word complete
      if (!isDeleteting && text === fullText) {
        // Make pause at the end
        typeSpeedRef.current.speed = wait;
        setIsDeleting(true);
      } else if (isDeleteting && text === '') {
        setWordIndex((prev) => prev + 1);
        typeSpeedRef.current.speed = typeSpeed;
        setIsDeleting(false);
      }
      // console.log(
      //   `Current: ${current} - Fulltext: ${fullText} - isDeleteting: ${isDeleteting} - Text: ${text} - WordIndex: ${wordIndex}`
      // );
    };

    setTimeout(() => {
      type();
    }, typeSpeedRef.current.speed);
  }, [dataText, text, typeSpeed, isDeleteting, wait, wordIndex]);

  return (
    <>
      <span className="type-writer-title">
        {text}
        <span className="type-cursor"></span>
        <span> -- {wordIndex}</span>
      </span>
    </>
  );
}

TypeWriter.defaultProps = {
  typeSpeed: 1000,
  wait: 3000,
};
