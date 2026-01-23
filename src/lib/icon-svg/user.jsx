export function UserSvg(props) {
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
        id="mask_0"
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <g filter="url(#pixso_custom_mask_type_alpha)">
          <g id="clip0_152_1808">
            <path id="Rectangle 2" fill="#272323" d="M0 0h24v24H0z"></path>
          </g>
        </g>
      </mask>
      <path id="icn / profile" d="M0 0h24v24H0z"></path>
      <g id="clip path group" mask="url(#mask_0)">
        <g id="Group 4">
          <path
            id="Vector 24"
            fill="currentColor"
            fillRule="evenodd"
            d="M16.46 12.249A5.97 5.97 0 0 0 18 8.25c0-3.308-2.692-6-6-6s-6 2.692-6 6 2.692 6 6 6c1.166 0 2.252-.34 3.175-.918A8.98 8.98 0 0 1 20.969 21H3.032a9 9 0 0 1 3.058-6.038.75.75 0 1 0-.985-1.131A10.5 10.5 0 0 0 1.5 21.75c0 .415.336.75.75.75h19.5a.75.75 0 0 0 .75-.75c0-4.114-2.385-7.789-6.04-9.501M7.5 8.25c0-2.482 2.018-4.5 4.5-4.5s4.5 2.018 4.5 4.5-2.018 4.5-4.5 4.5a4.505 4.505 0 0 1-4.5-4.5"
          ></path>
        </g>
      </g>
    </svg>
  );
}
