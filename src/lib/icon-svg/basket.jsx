export function BasketSvg(props) {
    return (
        <svg
            width={28}
            height={28}
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 1h2.889l.578 2.889m0 0H27l-5.778 11.555H6.778M4.467 3.89l2.31 11.555m0 0l-3.311 3.313c-.91.91-.266 2.465 1.02 2.465h16.736m0 0a2.889 2.889 0 100 5.777 2.889 2.889 0 000-5.777zm-11.555 2.89a2.889 2.889 0 11-5.778 0 2.889 2.889 0 015.778 0z"
                stroke={props.stroke || "#21A038"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M12 16l-5-.5-1.913-11L26.5 4 21 15.5l-9 .5z" fill="none" {...props}/>
        </svg>
    )
}