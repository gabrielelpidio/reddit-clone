import * as React from "react";

const ChevronsUpIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="11"
      viewBox="0 0 16 11"
      fill="none"
      ref={ref}
      {...props}
    >
      <path
        d="M1.33325 7.66667L7.99992 1L14.6666 7.66667M4.66659 10.1665L7.99992 6.83318L11.3333 10.1665"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});

ChevronsUpIcon.displayName = "ChevronsUpIcon";

export default ChevronsUpIcon;
