export function BasketSvg(props) {
    return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <filter id="pixso_custom_mask_type_alpha">
        <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
      </filter>
    </defs>
    <mask
      id="mask_1"
      width="24"
      height="24"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
    >
      <g filter="url(#pixso_custom_mask_type_alpha)">
        <g id="clip0_152_1823">
          <path id="Rectangle 1" fill="#272323" d="M0 0h24v24H0z"></path>
        </g>
      </g>
    </mask>
    <g id="clip path group" mask="url(#mask_1)">
      <g id="Group 2">
        <path
          id="Vector 23"
          fill="#272323"
          fillRule="evenodd"
          d="M23.34 7.14c-.48-.54-1.14-.9-1.86-.9h-9.24c-.3 0-.6.24-.6.6s.3.6.6.6h9.24c.36 0 .72.18.96.42.24.3.36.66.24 1.02l-.54 3h-6.6c-.3 0-.6.24-.6.6s.3.6.6.6h6.42l-.54 2.88c-.06.42-.48.72-.9.72H9c-.42 0-.78-.3-.9-.72L5.76 2.94c-.06-.3-.3-.48-.6-.48H.54c-.3 0-.6.24-.6.6s.3.6.6.6h4.14l2.28 12.6c.12.84.72 1.44 1.5 1.68-.3.42-.54.96-.54 1.56 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7c0-.54-.18-1.08-.48-1.5h3.66c-.3.42-.48.96-.48 1.5 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7c0-.6-.18-1.14-.48-1.56.78-.18 1.44-.84 1.62-1.68l1.32-7.08c.12-.72-.06-1.44-.54-2.04m-11.22 12.3c0 .84-.66 1.5-1.5 1.5s-1.5-.66-1.5-1.5.66-1.5 1.5-1.5 1.5.66 1.5 1.5m6.66 1.5c-.84 0-1.5-.66-1.5-1.5s.66-1.5 1.5-1.5 1.5.66 1.5 1.5-.66 1.5-1.5 1.5"
        ></path>
      </g>
    </g>
  </svg>
    )
}