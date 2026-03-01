"use client";
import React, { useEffect, useState } from "react";

type HtmlContentProps = {
  content: string;
};

const HtmlContent: React.FC<HtmlContentProps> = ({ content }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  ) : null;
};

export default HtmlContent;
