export function VectorSvg(props) {
    return(
          <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
     <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke={props.color || "currentColor"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
    />
  </svg>
    )
}