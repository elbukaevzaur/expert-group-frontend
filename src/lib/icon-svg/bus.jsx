export function BusSVG(props) {
    return(
          <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path id="icn / Truck" d="M0 0h24v24H0z" fill="none"></path>
    <path
      id="Vector 41"
      fill={props.color || "#272323"}
      fillRule="nonzero"
      d="m23.196 10.969-1.313-3.281a1.49 1.49 0 0 0-1.391-.938H17.25V6a.75.75 0 0 0-.75-.75H2.25a1.5 1.5 0 0 0-1.5 1.5v10.5a1.5 1.5 0 0 0 1.5 1.5h1.594a3 3 0 0 0 5.812 0h4.688a3 3 0 0 0 5.812 0h1.594a1.5 1.5 0 0 0 1.5-1.5v-6a.7.7 0 0 0-.054-.281M17.25 8.25h3.242l.9 2.25H17.25zm-15-1.5h13.5v6H2.25zm4.5 12.75a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m7.594-2.25H9.656a3 3 0 0 0-5.812 0H2.25v-3h13.5v1.154a3 3 0 0 0-1.406 1.846m2.906 2.25a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m4.5-2.25h-1.594A3.01 3.01 0 0 0 17.25 15v-3h4.5z"
    ></path>
  </svg>
    )
}