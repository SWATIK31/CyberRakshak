import React, { useRef, useEffect } from 'react';
import VideoCard from './VideoCard';
import {motion} from 'framer-motion';
import { fadeIn } from './variants';
import './Resources.css';

const Resources = () => {
  const scrollRef = useRef(null);

  const videos = [
    { id: 1, title: "Know the Basics", thumbnail: "https://i.ytimg.com/vi/5MMoxyK1Y9o/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCOGGjO0NfgpiqWbOkm0-R5gQ8HAA", link: "https://www.youtube.com/watch?v=5MMoxyK1Y9o&pp=ygUVY3liZXIgc2VjdXJpdHkgYmFzaWNz"},
    { id: 2, title: "Hacking Explained", thumbnail: "https://i.ytimg.com/vi/RNwMeijExjg/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLA8dBiPLtGeqQTEHo5Cl3iztsNSGw", link: "https://www.youtube.com/watch?v=RNwMeijExjg&pp=ygUSaGFja2luZyBleHBsYWluZWQg" },
    {
        id:3,title:"2 Factor Authentication",thumbnail:"https://i.ytimg.com/vi/8Ql_lin-Ie4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC3TMzsMVOJw2ktByHWOaU1Nxk43w ",link:"https://www.youtube.com/watch?v=hGRii5f_uSc&pp=ygURd2h5IGlzIDJGQSB1c2VmdWw%3D"
    },
    {id:4,title:"Lets learn CyberSecurity",thumbnail:"https://i.ytimg.com/vi/FARSxWjlPkk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCh8YVWezGDh4KQ_D2wsUkvbl3QRg",link:"https://www.youtube.com/watch?v=FARSxWjlPkk&pp=ygUUY3liZXJzZWN1cml0eSBjb3Vyc2U%3D"},
    {id:5,title:"How to be Safe",thumbnail:"https://i.ytimg.com/vi/OpGaT5ovti4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLADz7PdtASlzDxNaLBCJEFSesK4-w",link:"https://www.youtube.com/watch?v=-l9hma2fKTg&pp=ygUWSG93IHRvIHByZXZlbnQgaGFja2luZw%3D%3D"},{
        id:6,title:"Online Transactions Safety",thumbnail:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8jJUbzdQCMtrjAAxmoz_7ba7Znttv9SILnw&s",link:"https://www.youtube.com/watch?v=rsxxXVs6mCg&pp=ygUiaG93IHRvIGRvIHNhZmUgb25saW5lIHRyYW5zYWN0aW9ucw%3D%3D"
    }
    
  ];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollInterval;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      }, 20);
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    scrollContainer.addEventListener('mouseenter', stopScrolling);
    scrollContainer.addEventListener('mouseleave', startScrolling);

    startScrolling();

    return () => {
      stopScrolling();
      scrollContainer.removeEventListener('mouseenter', stopScrolling);
      scrollContainer.removeEventListener('mouseleave', startScrolling);
    };
  }, []);

  return (
    <section className="resources-section">
      <h2 >Cybersecurity Resources</h2>
      <div className="video-container" ref={scrollRef}>
        {videos.concat(videos).map((video, index) => (
          <VideoCard key={`${video.id}-${index}`} {...video} />
        ))}
      </div>
      <p id='resourcepara'>Do check out these Resources to enhance your knowledge</p>
    </section>
  );
};

export default Resources;