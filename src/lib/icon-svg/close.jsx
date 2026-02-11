export function CloseSvg(props) {
    return (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
          <path
              d="M18.75 18.75L1.25 1.25m17.5 0l-17.5 17.5"
              stroke={props.color || "currentColor"}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
          />
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
            fill={props.stroke || "currentColor"}
            fillOpacity="1"
            fillRule="evenodd"
      d="M1.22.2a.66.66 0 0 0-.5-.2C.53 0 .35.07.22.2a.75.75 0 0 0-.21.5c0 .19.07.37.2.51l3.78 3.78L.21 8.77c-.07.06-.12.14-.16.23-.03.09-.05.18-.05.27-.01.1.01.19.05.28.03.09.09.17.15.24.07.06.15.12.24.15.09.04.18.06.28.06.09 0 .18-.03.27-.06.09-.04.17-.1.23-.16L5 6l3.78 3.78c.14.13.32.2.51.2.18 0 .36-.08.5-.21.13-.13.2-.31.21-.5 0-.19-.08-.37-.21-.5L6.01 4.99l3.78-3.78c.13-.14.21-.32.21-.51a.8.8 0 0 0-.21-.5.74.74 0 0 0-.5-.2.7.7 0 0 0-.51.2L5 3.98z"
    ></path>
  </svg>
    )
}