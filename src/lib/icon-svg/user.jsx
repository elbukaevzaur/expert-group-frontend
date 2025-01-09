export function UserSvg(props) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width={props.width || 28}
        height={props.height || 28}
        fill="none"
        viewBox="0 0 28 28"
        {...props}
      >
        <path
          stroke={props.stroke || "#21A038"}
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 23.75a6.5 6.5 0 0 1 6.5-6.5h13a6.5 6.5 0 0 1 6.5 6.5A3.25 3.25 0 0 1 23.75 27H4.25A3.25 3.25 0 0 1 1 23.75Z"
        ></path>
        <path
          stroke="#21A038"
          strokeWidth="2"
          d="M14 10.75A4.875 4.875 0 1 0 14 1a4.875 4.875 0 0 0 0 9.75Z"
        ></path>
      </svg>
    )
}