import * as React from "react";

const HomeIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => {
    return (
      <svg
        ref={ref}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g clip-path="url(#clip0_8_1599)">
          <path
            d="M18.3334 14.1667V10.4538C18.3334 9.09868 18.3334 8.42113 18.1679 7.79394C18.0058 7.17971 17.7281 6.602 17.3498 6.09172C16.9634 5.57066 16.4343 5.1474 15.3762 4.30088L14.9976 3.99805L14.9976 3.99804C13.214 2.57117 12.3223 1.85774 11.3332 1.58413C10.4609 1.34279 9.53931 1.34279 8.66692 1.58413C7.67791 1.85774 6.78611 2.57118 5.00252 3.99805L5.00252 3.99805L4.62398 4.30088C3.56583 5.1474 3.03675 5.57066 2.6504 6.09172C2.27203 6.602 1.99437 7.17971 1.83227 7.79394C1.66675 8.42113 1.66675 9.09868 1.66675 10.4538V14.1667C1.66675 16.4679 3.53223 18.3333 5.83342 18.3333C6.75389 18.3333 7.50008 17.5871 7.50008 16.6667V13.3333C7.50008 11.9526 8.61937 10.8333 10.0001 10.8333C11.3808 10.8333 12.5001 11.9526 12.5001 13.3333V16.6667C12.5001 17.5871 13.2463 18.3333 14.1667 18.3333C16.4679 18.3333 18.3334 16.4679 18.3334 14.1667Z"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_8_1599">
            <rect width="20" height="20" fill="transparent" />
          </clipPath>
        </defs>
      </svg>
    );
  },
);

HomeIcon.displayName = "HomeIcon";

export default HomeIcon;
