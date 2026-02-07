import { useEffect } from "react";

const APP_NAME = "Forkify";

export default function useDocumentTitle(title) {
  useEffect(() => {
    const clean = (title || "").trim();
    document.title = clean ? `${clean} | ${APP_NAME}` : APP_NAME;
  }, [title]);
}

