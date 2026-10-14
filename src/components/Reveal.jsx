import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';

// Devient vrai (définitivement) dès que l'élément entre dans la fenêtre.
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {threshold: 0.1, rootMargin: '0px 0px -8% 0px'},
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

// Fait apparaître son contenu en fondu/glissement au défilement (styles `.reveal` dans custom.css).
export default function Reveal({as: Tag = 'div', className, visibleClassName, children, ...props}) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={clsx('reveal', inView && 'reveal--visible', inView && visibleClassName, className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
