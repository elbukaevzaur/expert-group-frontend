export function ArrowNewSvg(props) {
    return(
          <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path id="ArrowRight" d="M0 0h24v24H0z"></path>
    <path
      id="Vector 35"
      fill={props.color || "#272323"}
      fillRule="nonzero"
      d="m20.78 12.53-6.75 6.75a.75.75 0 0 1-1.06-1.06l5.47-5.47H3.75a.75.75 0 1 1 0-1.5h14.69l-5.47-5.47a.75.75 0 0 1 1.06-1.06l6.75 6.75a.75.75 0 0 1 0 1.06"
    ></path>
  </svg>
    )
}