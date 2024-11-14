import * as React from "react";
import { useEffect, useRef } from "react";
import './bottom.css'

function Bott() {
  const sections = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe sections only if they exist
    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      // Unobserve sections only if they exist
      sections.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <div className="timeline">
        <div className="div" ref={(el) => (sections.current[0] = el)}>
          <div className="div-2">
            <div className="column">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3749427e22f768db2604f225fafa5787060d67d3a69440330470192d0f1dadf6"
                className="img"
              />
            </div>
            <div className="column-2">
              <div className="div-3" />
            </div>
          </div>
        </div>
        <div className="div-4" ref={(el) => (sections.current[1] = el)}>
          <div className="div-5" />
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f6185807449e19c455c58baede5589de25fbce2260bffc5ddfdc53da7fbc3a2f"
            className="img-2"
          />
        </div>

        <div className="div-6" ref={(el) => (sections.current[2] = el)}>
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f6e8e3d161e0209df42cb7d8b641bedec30913dece831825d33491f4ba9b4c9c"
            className="img-3"
          />
          <div className="div-3" />
        </div>
      </div>
    </>
  );
}

export default Bott;
