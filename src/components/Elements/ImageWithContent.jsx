/**
 * Renders a centered container with image on the left side and content on the right side
 * @param {string} type - container type (signin/signup)
 * @param {string} imgSrc - image path
 * @param {string} imgSrc - image alt text
 * @param {ReactNode} content - Content to be shown
 */
function ImageWithContent({ type = "", imgSrc, imgAlt, content }) {
  return (
    <div className="img-content">
      <div className={`img-content-container ${type}`}>
        <img src={imgSrc} alt={imgAlt} />

        <div className="content-show">{content}</div>
      </div>
    </div>
  );
}

export default ImageWithContent;
