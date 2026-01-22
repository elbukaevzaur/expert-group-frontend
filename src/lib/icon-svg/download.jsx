export function DownloadSvg({ className, size = 24, style, ...props }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            className={className}
            style={style}
            {...props}
        >
            <path id="icn / FileArrowDown" d="M0 0h24v24H0z"></path>
            <path
                id="Vector 47"
                fill="currentColor"
                fillRule="nonzero"
                d="m20.03 7.72-5.25-5.25a.75.75 0 0 0-.53-.22h-9a1.5 1.5 0 0 0-1.5 1.5v16.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-12a.75.75 0 0 0-.22-.53M15 4.81l2.69 2.69H15zm3.75 15.44H5.25V3.75h8.25v4.5a.75.75 0 0 0 .75.75h4.5zm-3.97-5.78a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 1.06-1.06l.97.97v-4.19a.75.75 0 1 1 1.5 0v4.19l.97-.97a.75.75 0 0 1 1.06 0"
            ></path>
        </svg>
    );
}