import * as React from "react";

const CommentIcon = React.forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>((props, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      ref={ref}
      {...props}
    >
      <path
        d="M1.33301 7.33347C1.33301 6.40446 1.33301 5.93996 1.39457 5.55129C1.73342 3.41183 3.41137 1.73388 5.55084 1.39502C5.9395 1.33347 6.404 1.33347 7.33301 1.33347H7.99968C9.54963 1.33347 10.3246 1.33347 10.9604 1.50384C12.6859 1.96617 14.0336 3.31391 14.496 5.03937C14.6663 5.6752 14.6663 6.45018 14.6663 8.00013V12.7807C14.6663 13.9041 13.4407 14.5981 12.4773 14.0201V14.0201C11.7285 13.5708 10.8717 13.3335 9.99852 13.3335H7.33301C6.404 13.3335 5.9395 13.3335 5.55084 13.2719C3.41137 12.9331 1.73342 11.2551 1.39457 9.11564C1.33301 8.72697 1.33301 8.26247 1.33301 7.33347V7.33347Z"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});

CommentIcon.displayName = "CommentIcon";

export default CommentIcon;
