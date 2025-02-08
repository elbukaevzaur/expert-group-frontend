export function CloseSvg(props) {
    return (
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    viewBox="0 0 26 26"
    {...props}
  >
    <defs>
      <filter
        id="filter_1650_907_dd"
        width="26"
        height="26"
        x="0"
        y="0"
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        ></feColorMatrix>
        <feOffset dy="4"></feOffset>
        <feGaussianBlur stdDeviation="1.333"></feGaussianBlur>
        <feComposite
          in2="hardAlpha"
          k2="-1"
          k3="1"
          operator="out"
        ></feComposite>
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
        <feBlend
          in2="BackgroundImageFix"
          result="effect_dropShadow_1"
        ></feBlend>
        <feBlend
          in="SourceGraphic"
          in2="effect_dropShadow_1"
          result="shape"
        ></feBlend>
      </filter>
    </defs>
    <g filter="url(#filter_1650_907_dd)">
      <path
        id="Vector"
        fill={props.fill || "#000"}
        fillOpacity="1"
        fillRule="evenodd"
        d="M6.21.36C5.96.12 5.64-.01 5.3 0a1.263 1.263 0 0 0-1.27 1.27c-.01.34.12.66.36.9l6.8 6.81-6.8 6.8c-.13.12-.22.27-.29.42-.07.16-.1.33-.1.5-.01.17.03.34.09.5.07.15.16.3.28.42s.27.21.42.28c.16.06.33.1.5.1a1.32 1.32 0 0 0 .92-.4l6.8-6.8 6.81 6.8c.24.24.56.37.9.36.34 0 .66-.13.9-.37s.37-.56.38-.9c0-.34-.13-.66-.37-.91l-6.8-6.8 6.8-6.81c.24-.24.37-.56.37-.9-.01-.34-.14-.66-.38-.9s-.56-.37-.9-.37c-.34-.01-.66.12-.9.36l-6.81 6.8z"
      ></path>
    </g>
  </svg>
    )
}

export function CloseSmall(props) {
    return (
        <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 10}
    height={props.height || 10}
    fill={props.fill || "none"}
    viewBox="0 0 10 10"
    {...props}
  >
    <path
      id="Vector"
      fill={props.stroke || "#000"}
      fillOpacity="1"
      fillRule="evenodd"
      d="M1.22.2a.66.66 0 0 0-.5-.2C.53 0 .35.07.22.2a.75.75 0 0 0-.21.5c0 .19.07.37.2.51l3.78 3.78L.21 8.77c-.07.06-.12.14-.16.23-.03.09-.05.18-.05.27-.01.1.01.19.05.28.03.09.09.17.15.24.07.06.15.12.24.15.09.04.18.06.28.06.09 0 .18-.03.27-.06.09-.04.17-.1.23-.16L5 6l3.78 3.78c.14.13.32.2.51.2.18 0 .36-.08.5-.21.13-.13.2-.31.21-.5 0-.19-.08-.37-.21-.5L6.01 4.99l3.78-3.78c.13-.14.21-.32.21-.51a.8.8 0 0 0-.21-.5.74.74 0 0 0-.5-.2.7.7 0 0 0-.51.2L5 3.98z"
    ></path>
  </svg>
    )
}