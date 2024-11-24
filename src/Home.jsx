import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SignIn from "./SignIn.jsx";
import vancelogo from "./assets/vancelogo.png";
import appleimg from "./assets/apple.png";
import android from "./assets/android.png";
import left1 from "./assets/left1.png";
import left2 from "./assets/left2.png";
import left3 from "./assets/left3.png";
import left4 from "./assets/left4.png";
import left5 from "./assets/left5.png";
import right1 from "./assets/right1.png";
import right2 from "./assets/right2.png";
import right3 from "./assets/right3.png";
import right4 from "./assets/right4.png";
import right5 from "./assets/right5.png";
import tabtop from "./assets/tabtop.png";
import tab1back from "./assets/tab1back.png";
import tab1content from "./assets/tab1content.png";
import tab2back from "./assets/tab2back.png";
import tab2content from "./assets/tab2content.png";
import tab3back from "./assets/tab3back.png";
import tab3content from "./assets/tab3content.png";
import ratealert from "./assets/ratealert.png";
import mobile from "./assets/mobile.png";

gsap.registerPlugin(ScrollTrigger);

const Home = ({handleGoogleSignIn}) => {
  const [activeButton, setActiveButton] = useState(0);
  const containerRef = useRef(null);
  const mobileRef = useRef(null);
  const scrollTriggerRef = useRef(null);
  const tabContentRef = useRef(null);
  const titleRef = useRef(null);

  const buttons = ["Currency Converter ₹", "Live rates", "Set rate"];

  const titles = {
    0: "Send money to India at Google rates.",
    1: "Always know when its good time to transfer with",
    2: "Always know when its good time to transfer with"
  };


  const tabImages = {
    0: tab1content,
    1: tab2content,
    2: tab3content,
  };

  const gradients = {
    0: "radial-gradient(circle, rgba(255, 255, 255, 0.7) 24%, rgba(5, 5, 7, 0.79) 72%)",
    1: "radial-gradient(circle, rgba(24, 53, 201, 0.7) 24%, rgba(5, 5, 7, 0.79) 72%)",
    2: "radial-gradient(circle, rgba(201, 24, 24, 0.7) 24%, rgba(5, 5, 7, 0.79) 72%)",
  };

  useEffect(()=>{
    setActiveButton(0);
  },[])

  // Initial entrance animations
  useGSAP(
    () => {
      const mainTl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          duration: 1,
        },
      });

      // Hero section entrance animation
      mainTl
        .from(".hero-title", {
          x: 70,
          opacity: 0,
          duration: 0.8,
        })
        .from(
          ".hero-para",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
          ".hero-dowload-btns",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.4"
        )
        .from(
            ".tab-top",
            {
              y: 0,
              opacity: 0,
              duration: 0.1,
            },
            "-=0.2"
          )
        .from(
          mobileRef.current,
          {
            y: 50,
            opacity: 0,
            duration: 1,
          },
          "-=0.2"
        )
       
        .from(
          ".left-images img",
          {
            x: -50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
          },
          "-=0.5"
        )
        .from(
          ".right-images img",
          {
            x: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
          },
          "-=0.5"
        )
        .from(
          ".hero-btns",
          {
            y: 30,
            opacity: 0,
            duration: 0.4,
          },
          "-=0.3"
        )
        .from(
          ".hero-btns .btn",
          {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.4,
          },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  // Function to animate title change
  const animateTitle = (newTitle) => {
    const tl = gsap.timeline();
    tl.to(titleRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        titleRef.current.textContent = newTitle;
      }
    })
    .to(titleRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.3
    });
  };

  // Scroll-based animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Clean up existing ScrollTrigger
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }

      const sections = 2; // Number of sections
      const sectionHeight = window.innerHeight;

      // Set container height to accommodate all sections
      gsap.set(".hero-section", {
        height: sectionHeight * sections,
      });

      // Create ScrollTrigger
      scrollTriggerRef.current = ScrollTrigger.create({
        trigger: ".hero-section",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentSection = Math.floor(progress * sections);

          if (currentSection !== activeButton) {

             // Animate title change if needed
             if (titles[currentSection] !== titles[activeButton]) {
                animateTitle(titles[currentSection]);
              }

            // Animate tab content change
            gsap.to(tabContentRef.current, {
              opacity: 0.8,
              duration: 0.2,
              onComplete: () => {
                setActiveButton(currentSection);
                gsap.to(tabContentRef.current, {
                  opacity: 1,
                  scale: 1,
                  duration: 0.3,
                });
              },
            });

            // Animate background gradient
            gsap.to(".hero-section", {
              backgroundImage: gradients[currentSection],
              duration: 0.5,
            });
          }
        },
      });
    });

    return () => ctx.revert();
  }, [activeButton]);

  return (
    <div>
        <nav className='navbar'>
            <img src={vancelogo} alt= 'logo' className="logo"/>
            <button className="navbar-btn">
                Download
            </button>
        </nav>
      <div ref={containerRef} className="hero-section">
        <div className="text-content">
          <h1 className="hero-title" ref={titleRef}>  {titles[activeButton]}</h1>
          <p className="hero-para">
            Say goodbye to fees-get the best value for your transfers
          </p>
          <div className="hero-dowload-btns">
            <img src={appleimg} alt="Download on App Store" />
            <img src={android} alt="Get it on Google Play" />
          </div>

          <div className="hero-mobile-image">
       
            <div className="tab-top">
              <img
                src={tabtop}
                alt={`Tab ${activeButton + 1} content`}
                className={`tab-image`}
              />
            
            </div>
            <div
              className={`mobile-image active-tab-${activeButton + 1}`}
              ref={mobileRef}
            >
              <div ref={tabContentRef} className="tab-content">
              <div className="mobile-overlay"></div>
                <img
                  src={tabImages[activeButton]}
                  alt={`Tab ${activeButton + 1} content`}
                  className={`tab-image tab-image-active-tab-${activeButton + 1}`}
                />
              </div>
              <img
                src={mobile}
                alt={`Tab ${activeButton + 1} content`}
                className="tab-image"
              />
            </div>

            <div className="left-images">
              {[left1, left2, left3, left4, left5].map((src, index) => (
                <div key={`left${index + 1}`} className={`left${index + 1}`}>
                  <img src={src} alt={`Left feature ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="right-images">
              {[right1, right2, right3, right4, right5].map((src, index) => (
                <div key={`right${index + 1}`} className={`right${index + 1}`}>
                  <img src={src} alt={`Right feature ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="hero-btns">
              {buttons.map((label, index) => (
                <div
                  key={index}
                  className={`btn ${
                    activeButton === index ? "active-btn" : ""
                  }`}
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>

        </div>
      </div>

      <div className="dashboard-entry">
       <SignIn handleGoogleSignIn={handleGoogleSignIn}/>
      </div>
    </div>
  );
};
export default Home;
