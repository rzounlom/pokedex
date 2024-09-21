import { CSSProperties, FC } from "react";

import { useRouteError } from "react-router-dom";

const ErrorPage: FC = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" style={style}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>
          {(error as { statusText?: string; message?: string }).statusText ||
            (error as { message?: string }).message}
        </i>
      </p>
    </div>
  );
};

const style: CSSProperties = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: "2rem",
  fontSize: "2rem",
};

export default ErrorPage;
