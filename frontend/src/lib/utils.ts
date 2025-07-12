import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function wrapHTML(htmlContent: string) {
  const fullHTML = `<!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="UTF-8">
                      <title>My Note</title>
                      <style>
                        body { font-family: sans-serif; padding: 2rem; }
                      </style>
                    </head>
                    <body>
                      ${htmlContent}
                    </body>
                    </html>`;
  return fullHTML;
}
